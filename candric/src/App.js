import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Materials from './components/Materials';
import Profile from './components/Profile';
import VisitorCourses from './components/VisitorCourses';
import About from './components/About';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import Teachers from './components/Teachers';
import ProtectedRoute from './components/ProtectedRoute';
import VerifyEmail from './components/VerifyEmail';
import Loading from './components/Loading';
import CompleteProfile from './components/CompleteProfile';
import TeacherDashboard from './components/TeacherDashboard';
import TeacherProtectedRoute from './components/TeacherProtectedRoute';
import ManageCourses from './components/ManageCourses';
import ManageStudents from './components/ManageStudents';
import ManageMaterials from './components/ManageMaterials';
import TeacherProfile from './components/TeacherProfile';

const App = () => {
  return (
    <Router>
      <ConditionalNavbar />
      <div> {/* This adds padding to avoid content being hidden behind the navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
          <Route path="/courses" element={<ProtectedRoute element={Courses} />} />
          <Route path="/materials" element={<ProtectedRoute element={Materials} />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
          <Route path="/visitor-courses" element={<VisitorCourses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/teacher-dashboard" element={<TeacherProtectedRoute element={TeacherDashboard} />} />
          <Route path="/manage-courses" element={<TeacherProtectedRoute element={ManageCourses} />} />
          <Route path="/manage-students" element={<TeacherProtectedRoute element={ManageStudents} />} />
          <Route path="/manage-materials" element={<TeacherProtectedRoute element={ManageMaterials} />} />
          <Route path="/teacher-profile" element={<TeacherProtectedRoute element={TeacherProfile} />} />
        </Routes>
      </div>
      <ConditionalFooter />
    </Router>
  );
};

const ConditionalNavbar = () => {
  const location = useLocation();
  const publicRoutes = ['/', '/visitor-courses', '/about', '/contact', '/faq', '/terms', '/privacy', '/teachers'];

  return publicRoutes.includes(location.pathname) ? <Navbar /> : null;
};

const ConditionalFooter = () => {
  const location = useLocation();
  const publicRoutes = ['/', '/visitor-courses', '/about', '/contact', '/faq', '/terms', '/privacy', '/teachers'];

  return publicRoutes.includes(location.pathname) ? <Footer /> : null;
};

export default App;