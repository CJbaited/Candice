const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

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
