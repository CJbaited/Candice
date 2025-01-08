import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = () => {
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto space-y-40"> {/* Increased spacing between sections */}
        {/* First Section */}
        <section className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 min-h-[50vh] pt-16"> {/* Half viewport height and extra padding */}
          <motion.div
            className="flex-1 max-w-md mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={textVariants}
          >
            <h1 className="text-3xl font-bold mb-6">About Us</h1>
            <p className="text-gray-700 mb-4">
              Welcome to the Learning Platform! Our mission is to provide high-quality education to everyone, everywhere. We offer a wide range of courses designed to help you achieve your personal and professional goals.
            </p>
            <p className="text-gray-700 mb-4">
              Our platform is built with the latest technology to ensure a seamless learning experience. Whether you are looking to learn a new skill, advance your career, or simply explore new interests, we have something for you.
            </p>
          </motion.div>
          <motion.div
            className="flex-1 max-w-md mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={imageVariants}
          >
            <img src="/jason-goodman-Oalh2MojUuk-unsplash.jpg" alt="About Us" className="w-full h-64 object-cover rounded-lg shadow-md" />
          </motion.div>
        </section>

        {/* Second Section */}
        <section className="flex flex-col md:flex-row-reverse items-center space-y-8 md:space-y-0 md:space-x-8 min-h-[25vh]"> {/* 1/4th of viewport height */}
          <motion.div
            className="flex-1 max-w-md mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={textVariants}
          >
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-gray-700 mb-4">
              Join us on this journey to knowledge and success. We are committed to supporting you every step of the way. Our vision is to create a world where everyone has access to the education they need to succeed.
            </p>
            <p className="text-gray-700 mb-4">
              We believe in the power of education to transform lives and communities. Our courses are designed to be engaging, interactive, and accessible to learners of all levels.
            </p>
          </motion.div>
          <motion.div
            className="flex-1 max-w-md mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={imageVariants}
          >
            <img src="/yasmina-h-p8DjPfqEhW0-unsplash.jpg" alt="Our Vision" className="w-full h-64 object-cover rounded-lg shadow-md" />
          </motion.div>
        </section>

        {/* Third Section */}
        <section className="text-center min-h-[33vh] mb-64 p-16"> {/* Set height to 1/3 of the viewport */}
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-gray-700 mb-4">
            Explore our wide range of courses and start your learning journey today. Whether you're looking to develop new skills or advance your career, we have the right course for you.
          </p>
          <Link to="/visitor-courses" className="px-6 py-3 bg-[#622240] text-white font-semibold rounded-lg shadow-lg hover:bg-[#501a33] transition-colors">
            View Courses
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;