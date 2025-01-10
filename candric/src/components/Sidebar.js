import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logoutUser, checkUser } from '../api';
import { LayoutDashboard, House, Book, Users, Library, CircleUser, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username');
  const [role, setRole] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await checkUser();
        setRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    setIsSidebarOpen(true); // Keep the sidebar open when the user navigates to a different page
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };

  const getLinkClass = (path) =>
    location.pathname === path ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 hover:text-white';

  return (
    <div
      className={`relative bg-blue-600 text-white min-h-screen transition-all duration-300 flex flex-col ${
        isSidebarOpen ? 'w-64 p-4' : 'w-20 p-2'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isSidebarOpen && (
        <>
          <h2 className="text-2xl font-bold mb-1">Welcome,</h2>
          <h3 className="text-lg mb-6">{username}!</h3>
          <hr className="border-t border-gray-300 mb-6" />
        </>
      )}

      <nav className="absolute top-[20%] left-0 w-full flex flex-col space-y-4 pl-2">
        {role === 'teacher' ? (
          <>
            <Link
              to="/teacher-dashboard"
              className={`block p-2 rounded ${getLinkClass('/teacher-dashboard')} flex items-center`}
            >
              <LayoutDashboard className="w-6 h-6 flex-shrink-0" />
              {isSidebarOpen && <span className="ml-2">Teacher Dashboard</span>}
            </Link>
            <Link
              to="/manage-courses"
              className={`block p-2 rounded ${getLinkClass('/manage-courses')} flex items-center`}
            >
              <Book className="w-6 h-6 flex-shrink-0" />
              {isSidebarOpen && <span className="ml-2">Manage Courses</span>}
            </Link>
            <Link
              to="/manage-students"
              className={`block p-2 rounded ${getLinkClass('/manage-students')} flex items-center`}
            >
              <Users className="w-6 h-6 flex-shrink-0" />
              {isSidebarOpen && <span className="ml-2">Manage Students</span>}
            </Link>
            <Link
              to="/manage-materials"
              className={`block p-2 rounded ${getLinkClass('/manage-materials')} flex items-center`}
            >
              <Library className="w-6 h-6 flex-shrink-0" />
              {isSidebarOpen && <span className="ml-2">Manage Materials</span>}
            </Link>
            <Link
              to="/teacher-profile"
              className={`block p-2 rounded ${getLinkClass('/teacher-profile')} flex items-center`}
            >
              <CircleUser className="w-6 h-6 flex-shrink-0" />
              {isSidebarOpen && <span className="ml-2">Teacher Profile</span>}
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className={`block p-2 rounded ${getLinkClass('/dashboard')} flex items-center`}
            >
              <House className="w-6 h-6 flex-shrink-0" />
              {isSidebarOpen && <span className="ml-2">Home</span>}
            </Link>
            <Link
              to="/courses"
              className={`block p-2 rounded ${getLinkClass('/courses')} flex items-center`}
            >
              <Book className="w-6 h-6 flex-shrink-0" />
              {isSidebarOpen && <span className="ml-2">Courses</span>}
            </Link>
            <Link
              to="/materials"
              className={`block p-2 rounded ${getLinkClass('/materials')} flex items-center`}
            >
              <Library className="w-6 h-6 flex-shrink-0" />
              {isSidebarOpen && <span className="ml-2">Materials</span>}
            </Link>
            <Link
              to="/profile"
              className={`block p-2 rounded ${getLinkClass('/profile')} flex items-center`}
            >
              <CircleUser className="w-6 h-6 flex-shrink-0" />
              {isSidebarOpen && <span className="ml-2">Profile</span>}
            </Link>
          </>
        )}
      </nav>

      <motion.button
        onClick={handleLogout}
        className="absolute bottom-4 left-4 block p-2 rounded hover:bg-blue-700 flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogOut className="w-6 h-6 flex-shrink-0" />
        {isSidebarOpen && <span className="ml-2">Logout</span>}
      </motion.button>
    </div>
  );
};

export default Sidebar;