import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentDetailsModal = ({ isOpen, onRequestClose, student }) => {
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
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Option 1
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                  Option 2
                </button>
                <button className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700">
                  Option 3
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StudentDetailsModal;