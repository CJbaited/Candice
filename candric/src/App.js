import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Materials from './components/Materials';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute component

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-16"> {/* This adds padding to avoid content being hidden behind the navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
          <Route path="/courses" element={<ProtectedRoute element={Courses} />} />
          <Route path="/materials" element={<ProtectedRoute element={Materials} />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;