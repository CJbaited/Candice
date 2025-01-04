import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`navbar fixed w-full top-0 z-20 transition-all duration-300 ${isOpen ? 'open' : ''}`}>
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/IMG_0104.png" alt="Logo" className="h-14" />
          </div>
          <div className="flex space-x-4 items-center">
            <Link to="/login" className="px-4 py-2 border border-[#622240] text-[#622240] rounded-lg shadow-lg backdrop-blur-md transition-transform duration-300 transform hover:scale-110 hover:bg-[#622240] hover:text-white">Login</Link>
            <Link to="/signup" className="px-4 py-2 border border-[#622240] text-[#622240] rounded-lg shadow-lg backdrop-blur-md transition-transform duration-300 transform hover:scale-110 hover:bg-[#622240] hover:text-white">Signup</Link>
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-6 h-6 text-[#622240]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8">
            <button onClick={toggleMenu} className="focus:outline-none mb-8">
              <svg className="w-6 h-6 text-[#622240]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <Link to="/" className="block px-6 py-4 text-lg font-semibold hover:bg-[#f5f5f5] rounded-lg mb-4" onClick={toggleMenu}>Home</Link>
            <Link to="/visitor-courses" className="block px-6 py-4 text-lg font-semibold hover:bg-[#f5f5f5] rounded-lg mb-4" onClick={toggleMenu}>Courses</Link>
            <Link to="/about" className="block px-6 py-4 text-lg font-semibold hover:bg-[#f5f5f5] rounded-lg mb-4" onClick={toggleMenu}>About</Link>
            <Link to="/teachers" className="block px-6 py-4 text-lg font-semibold hover:bg-[#f5f5f5] rounded-lg mb-4" onClick={toggleMenu}>Teachers</Link>
            <Link to="/faq" className="block px-6 py-4 text-lg font-semibold hover:bg-[#f5f5f5] rounded-lg mb-4" onClick={toggleMenu}>FAQ</Link>
            <Link to="/contact" className="block px-6 py-4 text-lg font-semibold hover:bg-[#f5f5f5] rounded-lg mb-4" onClick={toggleMenu}>Contact</Link>
          </div>
        </div>
      </nav>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
    </>
  );
};

export default Navbar;