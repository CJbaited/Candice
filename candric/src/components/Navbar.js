import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-20 transition-opacity duration-300 ${isScrolled ? 'bg-white bg-opacity-90' : 'bg-white bg-opacity-100'}`}>
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#622240]">Learning Platform</div>
        <div className="flex space-x-4 items-center">
          <Link to="/login" className="hover:text-[#622240]">Login</Link>
          <Link to="/signup" className="px-4 py-2 border border-[#622240] rounded hover:bg-[#622240] hover:text-white transition-colors">Signup</Link>
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6 text-[#622240]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <button onClick={toggleMenu} className="focus:outline-none mb-4">
            <svg className="w-6 h-6 text-[#622240]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <Link to="/" className="block px-4 py-2 text-lg hover:bg-[#f5f5f5]" onClick={toggleMenu}>Home</Link>
          <Link to="/visitor-courses" className="block px-4 py-2 text-lg hover:bg-[#f5f5f5]" onClick={toggleMenu}>Courses</Link>
          <Link to="/about" className="block px-4 py-2 text-lg hover:bg-[#f5f5f5]" onClick={toggleMenu}>About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;