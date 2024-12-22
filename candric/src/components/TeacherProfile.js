import React from 'react';
import Sidebar from './Sidebar';

const TeacherProfile = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Teacher Profile</h1>
        {/* Add your teacher profile content here */}
      </div>
    </div>
  );
};

export default TeacherProfile;