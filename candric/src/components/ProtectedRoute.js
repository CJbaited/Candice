import React from 'react';
import { Navigate } from 'react-router-dom';

// Mock authentication function. Replace this with your actual authentication logic.
const isAuthenticated = () => {
  return !!localStorage.getItem('authToken'); // Check if an auth token exists in local storage
};

const ProtectedRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;