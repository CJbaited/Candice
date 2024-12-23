import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold mb-2">Learning Platform</h2>
            <p className="text-gray-400">Empowering Your Future</p> {/* Slogan */}
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <Link to="/" className="hover:text-gray-400">Home</Link>
            <Link to="/visitor-courses" className="hover:text-gray-400">Courses</Link>
            <Link to="/about" className="hover:text-gray-400">About</Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold mb-2">Support</h3>
            <Link to="/faq" className="hover:text-gray-400">FAQ</Link>
            <Link to="/help" className="hover:text-gray-400">Help Center</Link>
            <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact</Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold mb-2">Connect with Us</h3>
            <a href="https://facebook.com" className="hover:text-gray-400">Facebook</a>
            <a href="https://twitter.com" className="hover:text-gray-400">Twitter</a>
            <a href="https://linkedin.com" className="hover:text-gray-400">LinkedIn</a>
            <a href="https://instagram.com" className="hover:text-gray-400">Instagram</a>
            <Link to="/teachers" className="hover:text-gray-400">Teachers</Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-400">© 2023 Learning Platform. All rights reserved.</p> {/* Trademark */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;