import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser, checkUser } from '../api';

const Sidebar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve username from local storage
  const [role, setRole] = useState(null);

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

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('authToken'); // Clear auth token from local storage
      localStorage.removeItem('username'); // Clear username from local storage
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="bg-blue-600 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Welcome, {username}!</h2> {/* Display username */}
      <nav className="space-y-4">
        {role === 'teacher' ? (
          <>
            <Link to="/teacher-dashboard" className="block hover:bg-blue-700 p-2 rounded">
              Teacher Dashboard
            </Link>
            <Link to="/manage-courses" className="block hover:bg-blue-700 p-2 rounded">
              Manage Courses
            </Link>
            <Link to="/manage-students" className="block hover:bg-blue-700 p-2 rounded">
              Manage Students
            </Link>
            <Link to="/manage-materials" className="block hover:bg-blue-700 p-2 rounded">
              Manage Materials
            </Link>
            <Link to="/teacher-profile" className="block hover:bg-blue-700 p-2 rounded">
              Teacher Profile
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="block hover:bg-blue-700 p-2 rounded">
              Home
            </Link>
            <Link to="/courses" className="block hover:bg-blue-700 p-2 rounded">
              Courses
            </Link>
            <Link to="/materials" className="block hover:bg-blue-700 p-2 rounded">
              Materials
            </Link>
            <Link to="/profile" className="block hover:bg-blue-700 p-2 rounded">
              Profile
            </Link>
          </>
        )}
        <button onClick={handleLogout} className="block hover:bg-blue-700 p-2 rounded">
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;