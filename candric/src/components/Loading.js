import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../api';

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await checkUser();
        const { username, location, role } = response.data;

        console.log('Username:', username);
        console.log('Location:', location);
        console.log('Role:', role);

        if (!username || !location) {
          navigate('/complete-profile'); // Redirect to complete profile page
        } else {
          localStorage.setItem('username', username); // Store username in local storage
          if (role === 'teacher') {
            navigate('/teacher-dashboard'); // Redirect to teacher dashboard
          } else {
            navigate('/dashboard'); // Redirect to dashboard
          }
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        navigate('/login');
      }
    };

    verifyUser();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Loading;