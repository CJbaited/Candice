import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white fixed w-full top-0 shadow-md z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Learning Platform</div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/courses" className="hover:text-gray-200">Courses</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/login" className="hover:text-gray-200">Login</Link>
          <Link to="/signup" className="hover:text-gray-200">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;