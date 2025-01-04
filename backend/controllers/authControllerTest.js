const express = require('express');
const session = require('express-session');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Set up Express app and session middleware
const app = express();
app.use(express.json()); // To parse JSON requests

app.use(
  session({
    secret: 'your-secret-key', // Use a strong, random secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Middleware to check inactivity and logout user
let inactivityTimeouts = {}; // Object to track timeouts per session

const resetInactivityTimer = (req, res, next) => {
  const sessionId = req.sessionID;
  if (inactivityTimeouts[sessionId]) {
    clearTimeout(inactivityTimeouts[sessionId]);
  }

  // Set a new inactivity timer (e.g., 30 minutes)
  inactivityTimeouts[sessionId] = setTimeout(async () => {
    if (req.session) {
      await supabase.auth.signOut(); // Ensure Supabase logout
      delete req.session.user; // Clear session data
      delete inactivityTimeouts[sessionId];
    }
  }, 30 * 60 * 1000);

  next();
};

// Use the inactivity middleware
app.use(resetInactivityTimer);

// Sign up
const signUp = async (req, res) => {
  const { email, password } = req.body;

  // Check if the email already exists
  const { data: existingUser, error: existingUserError } = await supabase
    .from('auth.users')
    .select('email')
    .eq('email', email)
    .single();

  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  // Save user data in the session
  req.session.user = { id: data.user.id, email: data.user.email };

  res.status(201).json({ message: 'User created successfully!', user: data });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  // Save user data in the session
  req.session.user = { id: data.user.id, email: data.user.email };

  res.status(200).json({ message: 'Login successful!', user: data });
};

const logout = async (req, res) => {
  await supabase.auth.signOut(); // Ensure Supabase logout
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Failed to log out' });
    res.clearCookie('connect.sid'); // Clear session cookie
    res.status(200).json({ message: 'Logout successful!' });
  });
};

const checkUser = async (req, res) => {
  const userId = req.session.user.id;

  const { data: userData, error: userError } = await supabase
    .from('profiles')
    .select('id, username, location, role, credits') // Include credits
    .eq('id', userId)
    .single();

  if (userError) {
    console.error('Error fetching user data:', userError.message); // Debug log
    return res.status(400).json({ error: userError.message });
  }

  console.log('User Data:', userData); // Debug log
  res.status(200).json(userData);
};

const updateUserProfile = async (req, res) => {
  const userId = req.session.user.id;
  const { username, location } = req.body;

  // Update user profile in the public.profiles table
  const { data, error } = await supabase
    .from('profiles')
    .update({ username, location }) // Update the relevant columns
    .eq('id', userId); // Match the session user's ID

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: 'Profile updated successfully!', user: data });
};

const userBalance = async (req, res) => {
  const userId = req.session.user.id;

  const { data: userData, error: userError } = await supabase
    .from('profiles')
    .select('credits') // Include credits
    .eq('id', userId)
    .single();

  if (userError) {
    console.error('Error fetching user data:', userError.message); // Debug log
    return res.status(400).json({ error: userError.message });
  }

  console.log('User Data:', userData); // Debug log
  res.status(200).json(userData);
};

const searchStudents = async (req, res) => {
  const { username } = req.query;

  let query = supabase
    .from('profiles')
    .select('id, username, location')
    .is('role', null); // Only fetch students (role = null)

  if (username) {
    query = query.ilike('username', `%${username}%`);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json(data);
};

module.exports = { signUp, login, logout, checkUser, updateUserProfile, userBalance, searchStudents };
