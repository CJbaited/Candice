import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import API from '../api';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await API.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
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
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-700">{course.description}</p>
              <p className="text-gray-700">Start Date: {course.start_date}</p>
              <p className="text-gray-700">Duration: {course.duration_in_months} months</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Courses;