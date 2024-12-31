import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updateUserProfile } from '../api';

const CompleteProfile = () => {
  const [formData, setFormData] = useState({ username: '', location: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile(formData);
      setMessage(response.data.message || 'Profile updated successfully!');
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Profile update failed');
      } else if (error.request) {
        setMessage('No response from the server. Please try again later.');
      } else {
        setMessage('An error occurred during profile update.');
      }
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <select
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          >
            <option value="" disabled>Select your city</option>
            <option value="City1">City1</option>
            <option value="City2">City2</option>
            {/* Add more cities as needed */}
          </select>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Update Profile
          </button>
        </form>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </motion.div>
  );
};

export default CompleteProfile;