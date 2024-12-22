import React from 'react';
import Sidebar from './Sidebar';

const TeacherDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
        {/* Add your teacher dashboard content here */}
      </div>
    </div>
  );
};

export default TeacherDashboard;