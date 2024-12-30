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

// Add update user profile function
export const updateUserProfile = (data) => API.post('/auth/update-profile', data);

// Add courses functions
export const getCourses = () => API.get('/courses');
export const createCourse = (data) => API.post('/courses', data);
export const updateCourse = (id, data) => API.put(`/courses/${id}`, data);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);

// Add classes function
export const addClass = (data) => API.post('/courses/classes', data);

// Add materials functions
export const addMaterial = (data) => API.post('/courses/materials', data);
export const deleteMaterial = (id) => API.delete(`/courses/materials/${id}`);

export default API;
