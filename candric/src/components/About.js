import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="text-gray-700 mb-4">
          Welcome to the Learning Platform! Our mission is to provide high-quality education to everyone, everywhere. We offer a wide range of courses designed to help you achieve your personal and professional goals.
        </p>
        <p className="text-gray-700 mb-4">
          Our platform is built with the latest technology to ensure a seamless learning experience. Whether you are looking to learn a new skill, advance your career, or simply explore new interests, we have something for you.
        </p>
        <p className="text-gray-700 mb-4">
          Join us on this journey to knowledge and success. We are committed to supporting you every step of the way.
        </p>
        <p className="text-gray-700">
          If you have any questions or need assistance, please do not hesitate to contact us. We are here to help!
        </p>
      </div>
    </motion.div>
  );
};

export default About;