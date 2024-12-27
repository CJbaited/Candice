import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            const response = await loginUser({ email, password });
            console.log('Login successful:', response.data);

            // Save auth token to local storage
            localStorage.setItem('authToken', response.data.token);
            
            // Store user data in local storage
            localStorage.setItem('userId', response.data.user.id);

            // Navigate to dashboard on successful login
            setMessage('Login successful!');
            navigate('/loading'); // Redirect to the loading page
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.error || 'Login failed');
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                setMessage('No response from server. Please try again later.');
                console.error('Error request:', error.request);
            } else {
                setMessage('An error occurred during login.');
                console.error('Error message:', error.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/surface-91HFUXYi_Jg-unsplash.jpg')" }}></div>
            <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
                        Login
                    </button>
                </form>
                {message && <p className="mt-4 text-red-600">{message}</p>}
            </div>
        </div>
    );
};

export default Login;