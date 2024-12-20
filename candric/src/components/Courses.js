import React from 'react';
import Sidebar from './Sidebar';

const Courses = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6">Courses</h1>
                {/* Courses content here */}
            </div>
        </div>
    );
};

export default Courses;