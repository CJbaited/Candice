import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api'; // Import loginUser function

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData; // Destructure email and password

        try {
            // Use loginUser function
            const response = await loginUser({ email, password });
            console.log('Login successful:', response.data);

            // Navigate to home page on successful login
            setMessage('Login successful!');
            navigate('/home');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || 'Login failed. Please try again.');
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                setMessage('No response from server. Please try again later.');
                console.error('Error request:', error.request);
            } else {
                setMessage('An error occurred. Please try again.');
                console.error('Error message:', error.message);
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
