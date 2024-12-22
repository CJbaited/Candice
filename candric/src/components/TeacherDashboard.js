import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import Sidebar from './Sidebar';

const TeacherDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Manage Courses</h2>
            <p>View and manage your courses.</p>
            <Link to="/manage-courses" className="text-blue-600 hover:underline">
              Go to Manage Courses
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Manage Students</h2>
            <p>View and manage your students.</p>
            <Link to="/manage-students" className="text-blue-600 hover:underline">
              Go to Manage Students
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;