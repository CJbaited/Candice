import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addCredits, removeCredits, sendPasswordResetLink, deleteUser } from '../api';

const StudentDetailsModal = ({ isOpen, onRequestClose, student }) => {
  const [message, setMessage] = useState('');
  const [credits, setCredits] = useState(0);

  const handleAddCredits = async () => {
    try {
      const response = await addCredits({ userId: student.id, credits: parseInt(credits, 10) });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Failed to add credits');
      } else if (error.request) {
        setMessage('No response from the server. Please try again later.');
      } else {
        setMessage('An error occurred during the request.');
      }
    }
  };

  const handleRemoveCredits = async () => {
    try {
      const response = await removeCredits({ userId: student.id, credits: parseInt(credits, 10) });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Failed to remove credits');
      } else if (error.request) {
        setMessage('No response from the server. Please try again later.');
      } else {
        setMessage('An error occurred during the request.');
      }
    }
  };

  const handleSendPasswordResetLink = async () => {
    try {
      const response = await sendPasswordResetLink({ email: student.email });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Failed to send password reset link');
      } else if (error.request) {
        setMessage('No response from the server. Please try again later.');
      } else {
        setMessage('An error occurred during the request.');
      }
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        const response = await deleteUser({ userId: student.id });
        setMessage(response.data.message);
        onRequestClose(); // Close the modal after deleting the user
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.error || 'Failed to delete user');
        } else if (error.request) {
          setMessage('No response from the server. Please try again later.');
        } else {
          setMessage('An error occurred during the request.');
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 relative w-3/4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{student.username}</h2>
              <button onClick={onRequestClose} className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                &times;
              </button>
            </div>
            <div>
              <p className="text-gray-700 mb-4">Location: {student.location}</p>
              <div className="flex space-x-4 mb-4">
                <input
                  type="number"
                  placeholder="Credits"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  className="p-2 border rounded"
                />
                <button onClick={handleAddCredits} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Add Credits
                </button>
                <button onClick={handleRemoveCredits} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                  Remove Credits
                </button>
              </div>
              <div className="flex space-x-4">
                <button onClick={handleSendPasswordResetLink} className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700">
                  Send Password Reset Link
                </button>
                <button onClick={handleDeleteUser} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                  Delete User
                </button>
              </div>
              {message && <p className="mt-4 text-red-600">{message}</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StudentDetailsModal;