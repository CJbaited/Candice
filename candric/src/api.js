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

export default API;
