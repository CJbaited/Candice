import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-blue-600 text-white w-64 min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <nav className="space-y-4">
                <Link to="/dashboard" className="block hover:bg-blue-700 p-2 rounded">
                    Dashboard
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
                <Link to="/" className="block hover:bg-blue-700 p-2 rounded">
                    Logout
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;