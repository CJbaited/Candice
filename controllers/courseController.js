const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Secure admin check in other functions
const adminOnly = async (req, res, next) => {
  const { userId } = req.user;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
  }

  const isAdminRole = await isAdmin(userId);
  if (!isAdminRole) {
    return res.status(403).json({ error: 'Only admins are allowed to perform this action.' });
  }

  next(); 
};
// Helper function to check if the user is an admin
const isAdmin = async (userId) => {
  const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

  if (error || !data) return false;
  return data.role === 'admin';
};

// Create courses
const createCourse = async (req, res) => {
  const { userId } = req.user; // Assuming `req.user` contains the authenticated user's ID
  const { title, description, date, start_date, time, duration_in_months } = req.body;

  // Check if the user is an admin
  const admin = await isAdmin(userId);
  if (!admin) {
      return res.status(403).json({ error: 'Only admins can create courses.' });
  }

  // Calculate the course's valid_until date
  const valid_until = new Date(start_date);
  valid_until.setMonth(valid_until.getMonth() + duration_in_months);

  // Insert the course into the database
  const { data, error } = await supabase
      .from('courses')
      .insert([
          {
              title,
              description,
              date,
              start_date,
              time,
              valid_until
          }
      ]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: 'Course created successfully!', course: data });
};

// Delete courses
const deleteCourse = async (req, res) => {
  const { userId } = req.user; // Assuming `req.user` contains the authenticated user's ID
  const { id } = req.body;

  // Check if the user is an admin
  const admin = await isAdmin(userId);
  if (!admin) {
      return res.status(403).json({ error: 'Only admins can delete courses.' });
  }

  // Insert the course into the database
  const { data, error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: 'Course deleted successfully!', course: data });
};

// Fetch courses
const getCourses = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 items per page

  const offset = (page - 1) * limit;

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .range(offset, offset + limit - 1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};

// Enroll in a course
const enrollCourse = async (req, res) => {
  const { courseId, userId } = req.body;

  // Check if the enrollment already exists
  const { data: existingEnrollment, error: checkError } = await supabase
    .from('enrollments')
    .select('*')
    .eq('course_id', courseId)
    .eq('user_id', userId)
    .single();

  if (checkError && checkError.code !== 'PGRST116') { // Ignore 'no rows found' error
    return res.status(500).json({ error: checkError.message });
  }

  if (existingEnrollment) {
    return res.status(400).json({ error: 'User is already enrolled in this course.' });
  }

  // Proceed to enroll the user
  const { data, error } = await supabase
    .from('enrollments')
    .insert([{ course_id: courseId, user_id: userId }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: 'Enrolled successfully!', enrollment: data });
};


// Fetch courses a user is enrolled in
const getUserCourses = async (req, res) => {
  const { userId } = req.params; // Assuming the user ID is passed in the URL

  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      courses (
        id,
        title,
        description,
        date,
        time
      )
    `)
    .eq('user_id', userId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};


module.exports = { createCourse, getCourses, enrollCourse, getUserCourses, deleteCourse, adminOnly };
