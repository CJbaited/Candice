import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto space-y-40"> {/* Increased spacing between sections */}
        {/* First Section */}
        <section className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">About Us</h1>
            <p className="text-gray-700 mb-4">
              Welcome to the Learning Platform! Our mission is to provide high-quality education to everyone, everywhere. We offer a wide range of courses designed to help you achieve your personal and professional goals.
            </p>
            <p className="text-gray-700 mb-4">
              Our platform is built with the latest technology to ensure a seamless learning experience. Whether you are looking to learn a new skill, advance your career, or simply explore new interests, we have something for you.
            </p>
          </div>
          <div className="flex-1">
            <img src="/path/to/your/image1.jpg" alt="About Us" className="w-full h-64 object-cover rounded-lg shadow-md" />
          </div>
        </section>

        {/* Second Section */}
        <section className="flex flex-col md:flex-row-reverse items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-gray-700 mb-4">
              Join us on this journey to knowledge and success. We are committed to supporting you every step of the way. Our vision is to create a world where everyone has access to the education they need to succeed.
            </p>
            <p className="text-gray-700 mb-4">
              We believe in the power of education to transform lives and communities. Our courses are designed to be engaging, interactive, and accessible to learners of all levels.
            </p>
          </div>
          <div className="flex-1">
            <img src="/path/to/your/image2.jpg" alt="Our Vision" className="w-full h-64 object-cover rounded-lg shadow-md" />
          </div>
        </section>

        {/* Third Section */}
        <section className="text-center mb-64"> {/* Added large margin-bottom to increase space before footer */}
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