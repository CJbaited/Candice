const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
  auth: {
    storage: sessionStorage,
  },
});
// Function to log out the user after inactivity
let inactivityTimeout;

const logoutUser = async () => {
  await supabase.auth.signOut();
  alert('You have been logged out due to inactivity.');
  window.location.reload(); // Redirect to login page
};

const resetInactivityTimer = () => {
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(logoutUser, 120 * 60 * 1000); // 30 minutes
};

// Listen for user activity
['mousemove', 'keydown', 'click'].forEach((event) => {
  window.addEventListener(event, resetInactivityTimer);
});

// Start the inactivity timer
resetInactivityTimer();

// Sign up
const signUp = async (req, res) => {
  const { email, password, name} = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password }, {data: {name}});
  if (error) return res.status(400).json({ error: error.message });
  await supabase
        .from('users')
        .insert([{ id: data.user.id, role: 'student' }]);
  res.status(201).json({ message: 'User created successfully!', user: data });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: 'Login successful!', user: data });
};

module.exports = { signUp, login };
