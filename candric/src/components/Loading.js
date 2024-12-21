import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../api';

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await checkUser();
        if (response.data.isTeacher) {
          navigate('/teacher-dashboard');
        } else {
          navigate('/dashboard');
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