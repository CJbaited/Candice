import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api'; // Import logoutUser function

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            // Perform any client-side cleanup here, if necessary
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <div className="flex flex-col space-y-4">
                    <button 
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" 
                        onClick={() => navigate('/courses')}
                    >
                        Courses
                    </button>
                    <button 
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" 
                        onClick={() => navigate('/materials')}
                    >
                        Materials
                    </button>
                    <button 
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" 
                        onClick={() => navigate('/profile')}
                    >
                        Profile
                    </button>
                    <button 
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700" 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;