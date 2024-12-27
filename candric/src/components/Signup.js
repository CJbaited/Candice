import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../api';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUpUser(formData);
      setMessage(response.data.message || 'Signup successful!');
      navigate('/verify-email', { state: { fromSignup: true } }); // Pass state
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Signup failed');
      } else if (error.request) {
        setMessage('No response from the server. Please try again later.');
      } else {
        setMessage('An error occurred during signup.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}></div>
      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button type="submit" className="w-full bg-[#622240] text-white py-2 rounded hover:bg-[#501a33] transition-colors">
            Signup
          </button>
        </form>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
