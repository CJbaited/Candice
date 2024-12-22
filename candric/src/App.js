import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Materials from './components/Materials';
import Profile from './components/Profile';
import VisitorCourses from './components/VisitorCourses'; // Import VisitorCourses component
import About from './components/About'; // Import About component
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute component
import VerifyEmail from './components/VerifyEmail'; // Import VerifyEmail component
import Loading from './components/Loading'; // Import Loading component
import CompleteProfile from './components/CompleteProfile'; // Import CompleteProfile component
import TeacherDashboard from './components/TeacherDashboard'; // Import TeacherDashboard component
import TeacherProtectedRoute from './components/TeacherProtectedRoute'; // Import TeacherProtectedRoute component
import ManageCourses from './components/ManageCourses'; // Import ManageCourses component
import ManageStudents from './components/ManageStudents'; // Import ManageStudents component
import ManageMaterials from './components/ManageMaterials'; // Import ManageMaterials component
import TeacherProfile from './components/TeacherProfile'; // Import TeacherProfile component

const App = () => {
  return (
    <Router>
      <ConditionalNavbar />
      <div className="pt-16"> {/* This adds padding to avoid content being hidden behind the navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} /> {/* Add VerifyEmail route */}
          <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
          <Route path="/courses" element={<ProtectedRoute element={Courses} />} />
          <Route path="/materials" element={<ProtectedRoute element={Materials} />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
          <Route path="/visitor-courses" element={<VisitorCourses />} /> {/* Add VisitorCourses route */}
          <Route path="/about" element={<About />} /> {/* Add About route */}
          <Route path="/loading" element={<Loading />} /> {/* Add Loading route */}
          <Route path="/complete-profile" element={<CompleteProfile />} /> {/* Add CompleteProfile route */}
          <Route path="/teacher-dashboard" element={<TeacherProtectedRoute element={TeacherDashboard} />} /> {/* Protect this route */}
          <Route path="/manage-courses" element={<TeacherProtectedRoute element={ManageCourses} />} /> {/* Add this line */}
          <Route path="/manage-students" element={<TeacherProtectedRoute element={ManageStudents} />} /> {/* Add this line */}
          <Route path="/manage-materials" element={<TeacherProtectedRoute element={ManageMaterials} />} /> {/* Add this line */}
          <Route path="/teacher-profile" element={<TeacherProtectedRoute element={TeacherProfile} />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
};

const ConditionalNavbar = () => {
  const location = useLocation();
  const publicRoutes = ['/', '/login', '/signup', '/visitor-courses', '/about'];

  return publicRoutes.includes(location.pathname) ? <Navbar /> : null;
};

export default App;