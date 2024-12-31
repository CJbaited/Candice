import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { logoutUser } from '../api';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('authToken'); // Clear auth token from local storage
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <motion.div
        className="flex-1 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="flex flex-col space-y-4">
          <motion.button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/courses')}
          >
            Courses
          </motion.button>
          <motion.button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/materials')}
          >
            Materials
          </motion.button>
          <motion.button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/profile')}
          >
            Profile
          </motion.button>
          <motion.button
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
          >
            Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;