import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUpUser } from '../api';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    if (!acceptPolicy) {
      setMessage('You must accept the policy and terms of service');
      return;
    }
    try {
      const response = await signUpUser({ email: formData.email, password: formData.password });
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
    <div className="min-h-screen flex">
      <div className="w-1/2">
        <img src="/surface-91HFUXYi_Jg-unsplash.jpg" alt="Background" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 flex items-start justify-center bg-white pt-32">
        <div className="p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img src="/IMG_0104.png" alt="Logo" className="h-16" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={acceptPolicy}
                onChange={(e) => setAcceptPolicy(e.target.checked)}
                className="mr-2"
                required
              />
              <label className="text-gray-700">I accept the <Link to="/policy" className="text-[#622240] underline">Policy</Link> and <Link to="/tos" className="text-[#622240] underline">Terms of Service</Link></label>
            </div>
            <div className="text-center mb-4">
              <Link to="/login" className="text-[#622240] underline">Already have an account? Login</Link>
            </div>
            <button type="submit" className="w-full bg-[#622240] text-white py-2 rounded hover:bg-[#501a33] transition-colors">
              Sign up
            </button>
          </form>
          {message && <p className="mt-4 text-red-600">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;

