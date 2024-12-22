import React from 'react';
import Sidebar from './Sidebar';

const ManageStudents = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Manage Students</h1>
        {/* Add your student management content here */}
      </div>
    </div>
  );
};

export default ManageStudents;