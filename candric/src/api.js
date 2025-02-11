import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
  withCredentials: true, // Ensure cookies are sent with requests
});

// Add user signup function
export const signUpUser = (data) => API.post('/auth/signup', data);

// Add user login function
export const loginUser = (data) => API.post('/auth/login', data);

// Add user logout function
export const logoutUser = () => API.post('/auth/logout');

// Add check user function
export const checkUser = () => API.get('/auth/check-user');
export const userBalance = () => API.get('/auth/user-balance');

// Add update user profile function
export const updateUserProfile = (data) => API.post('/auth/update-profile', data);

// Add credits functions
export const addCredits = (data) => API.post('/auth/add-credits', data);
export const removeCredits = (data) => API.post('/auth/remove-credits', data);

// Add password reset function
export const sendPasswordResetLink = (data) => API.post('/auth/send-password-reset-link', data);

// Add delete user function
export const deleteUser = (data) => API.post('/auth/delete-user');

// Add courses functions
export const getCourses = () => API.get('/courses');
export const createCourse = (data) => API.post('/courses', data);
export const updateCourse = (id, data) => API.put(`/courses/${id}`, data);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);

// Add classes functions
export const addClass = (data) => API.post('/courses/classes', data);
export const updateClass = (id, data) => API.put(`/courses/classes/${id}`, data);
export const deleteClass = (id) => API.delete(`/courses/classes/${id}`);
export const getClasses = (courseId) => API.get(`/courses/${courseId}/classes`);

// Add materials functions
export const addMaterial = (data) => API.post('/courses/materials', data);
export const deleteMaterial = (id) => API.delete(`/courses/materials/${id}`);
export const getMaterials = (classId) => API.get(`/courses/classes/${classId}/materials`);

// Add search students function
export const searchStudents = (username) => API.get('/auth/search-students', { params: { username } });

export default API;
