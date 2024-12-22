const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const checkTeacherRole = async (req, res, next) => {
  const userId = req.session.user.id;

  // Fetch user role from the public.profiles table
  const { data: userData, error: userError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (userError) {
    return res.status(400).json({ error: userError.message });
  }

  if (userData.role !== 'teacher') {
    return res.status(403).json({ error: 'Access denied. Only teachers can access this page.' });
  }

  next();
};

module.exports = checkTeacherRole;