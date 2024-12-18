const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Create courses
const createCourse = async (req, res) => {
  const { title, description, date, time } = req.body;

  const { data, error } = await supabase
    .from('courses')
    .insert([
      {
        title,
        description,
        date,
        time
      }
    ]);
  
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: 'Course created successfully!', course: data });
};

// Fetch courses
const getCourses = async (req, res) => {
  const { data, error } = await supabase.from('courses').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
};

// Enroll in a course
const enrollCourse = async (req, res) => {
  const { courseId, userId } = req.body;
  const { data, error } = await supabase.from('enrollments').insert([{ course_id: courseId, user_id: userId }]);
  if (error) return res.status(500).json({ error: error.message });
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


module.exports = { createCourse, getCourses, enrollCourse, getUserCourses };
