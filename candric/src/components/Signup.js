import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../api';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', location: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUpUser(formData);
      setMessage(response.data.message || 'Signup successful!');
      navigate('/login');
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <select
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          >
            <option value="" disabled>Select your city</option>
            <option value="City1">City1</option>
            <option value="City2">City2</option>
            {/* Add more cities as needed */}
          </select>
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
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Signup
          </button>
        </form>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
