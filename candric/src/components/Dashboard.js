import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { logoutUser, getCourses, checkUser, userBalance } from '../api';
import { CircleArrowUp, CloudSunRain, PlusCircle } from 'lucide-react';
import StudentCourseDetailsModal from './StudentCourseDetailsModal';

const WeatherCard = () => {
  return (
    <div className="relative flex size-52 flex-col rounded-3xl bg-opacity-10 bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter dark:from-gray-700 dark:to-gray-900">
      <div className="flex flex-1 flex-col gap-2 dark:text-white">
        <p className="city opacity-70">Tokyo</p>
        <div className="flex items-center">
          <CloudSunRain className="h-10 w-10" />
          <p className="text-5xl font-black">19&deg;</p>
        </div>
        <p className="feels-like opacity-70">Feels like 21&deg;</p>
      </div>
      <div className="flex justify-between rounded-xl bg-gray-400 bg-opacity-30 bg-clip-padding py-1 backdrop-blur-lg backdrop-filter">
        <div className="flex items-center gap-1 px-2 text-orange-500 dark:text-orange-200">
          <CircleArrowUp className="h-5 w-5" />
          24&deg;
        </div>
        <p className="text-black opacity-50">|</p>
        <div className="flex items-center gap-1 px-3 text-green-800 dark:text-green-200">
          <CircleArrowUp className="h-5 w-5 rotate-180" />
          9&deg;
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [credits, setCredits] = useState(0);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    fetchUserData();
    fetchCourses();
    fetchUserBalance();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await checkUser();
      setRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserBalance = async () => {
    try {
      const response = await userBalance();
      setCredits(response.data.credits);
    } catch (error) {
      console.error('Error fetching user balance:', error); 
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('authToken'); // Clear auth token from local storage
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">Credits: {credits}</h2>
            {role !== 'teacher' && (
              <PlusCircle
                className="ml-2 text-blue-600 cursor-pointer"
                onClick={() => navigate('/top-up')}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <WeatherCard />
          {courses.map((course) => (
            <motion.div
              key={course.id}
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewCourse(course)}
            >
              <h2 className="text-xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-700">{course.description}</p>
            </motion.div>
          ))}
          <motion.div
            className="bg-red-600 text-white p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
          >
            <h2 className="text-xl font-bold mb-2">Logout</h2>
            <p>Sign out of your account</p>
          </motion.div>
        </div>
        {selectedCourse && role !== 'teacher' && (
          <StudentCourseDetailsModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            course={selectedCourse}
            credits={credits}
          />
        )}
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </motion.div>
    </div>
  );
};

export default Dashboard;