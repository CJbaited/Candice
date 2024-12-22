import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkUser } from '../api';

const TeacherProtectedRoute = ({ element: Element, ...rest }) => {
  const [isTeacher, setIsTeacher] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await checkUser();
        const { role } = response.data;
        setIsTeacher(role === 'teacher');
      } catch (error) {
        console.error('Error verifying user:', error);
        setIsTeacher(false);
      }
    };

    verifyUser();
  }, []);

  if (isTeacher === null) {
    return <div>Loading...</div>; // Show a loading indicator while checking the role
  }

  return isTeacher ? <Element {...rest} /> : <Navigate to="/dashboard" />;
};

export default TeacherProtectedRoute;