import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const VerifyEmail = () => {
  const location = useLocation();

  // Check if the user navigated from the signup page
  if (!location.state || !location.state.fromSignup) {
    return <Navigate to="/signup" />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
        <p>Please check your email and verify your account to continue.</p>
      </div>
    </div>
  );
};

export default VerifyEmail;