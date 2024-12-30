const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Create courses
const createCourse = async (req, res) => {
  const { title, description, start_date, time, valid_until } = req.body;

  const { data, error } = await supabase
    .from('courses')
    .insert([{ title, description, start_date, time, valid_until }]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: 'Course created successfully!', course: data });
};

// Update courses
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, start_date, time, valid_until } = req.body;

  const { data, error } = await supabase
    .from('courses')
    .update([{ title, description, start_date, time, valid_until }])
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: 'Course updated successfully!', course: data });
};

// Delete courses
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: 'Course deleted successfully!', course: data });
};

// Fetch courses
const getCourses = async (req, res) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*');

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

// Fetch available courses
const getAvailableCourses = async (req, res) => {
  const { data, error } = await supabase
    .from('courses')
    .select('id, title');

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

// Enroll in a course
const enrollCourse = async (req, res) => {
  const { courseId, userId } = req.body;

  const { data, error } = await supabase
    .from('enrollments')
    .insert([{ course_id: courseId, user_id: userId }]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: 'Enrolled successfully!', enrollment: data });
};

// Fetch courses a user is enrolled in
const getUserCourses = async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from('enrollments')
    .select('courses (*)')
    .eq('user_id', userId);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

// Add a class to a course
const addClass = async (req, res) => {
  const { course_id, unit_title, schedule, material_id } = req.body;

  // Ensure course_id is an integer and schedule includes timezone
  const classData = {
    course_id: parseInt(course_id, 10),
    unit_title,
    schedule: new Date(schedule).toISOString(),
    material_id: material_id || null
  };

  const { data, error } = await supabase
    .from('Classes')
    .insert([classData]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: 'Class added successfully!', class: data });
};

// Add material to a class
const addMaterial = async (req, res) => {
  const { unit_id, material_title, file_url } = req.body;

  const { data, error } = await supabase
    .from('materials')
    .insert([{ unit_id, material_title, file_url }]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: 'Material added successfully!', material: data });
};

// Delete material from a class
const deleteMaterial = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('materials')
    .delete()
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: 'Material deleted successfully!', material: data });
};

const getClasses = async (req, res) => {
  const { courseId } = req.params;
  const { data, error } = await supabase
    .from('Classes')
    .select('*')
    .eq('course_id', courseId);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

const getMaterials = async (req, res) => {
  const { classId } = req.params;
  const { data, error } = await supabase
    .from('materials')
    .select('*')
    .eq('class_id', classId);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

module.exports = { createCourse, getCourses, enrollCourse, getUserCourses, deleteCourse, updateCourse, addClass, addMaterial, deleteMaterial, getAvailableCourses, getClasses, getMaterials };
