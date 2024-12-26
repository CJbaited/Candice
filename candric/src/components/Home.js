import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setFeaturedCourses(response.data.slice(0, 3)); // Get the first 3 courses as featured courses
      } catch (error) {
        console.error('Error fetching featured courses:', error);
      }
    };

    fetchFeaturedCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Section */}
      <section className="relative h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/workspaces/Candice/candric/public/helena-lopes-e3OUQGT9bWU-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Welcome to the Learning Platform</h1>
          <div className="flex space-x-4 mb-8 justify-center">
            <Link to="/visitor-courses" className="px-6 py-3 bg-white bg-opacity-20 text-white font-semibold rounded-lg shadow-lg backdrop-blur-md hover:bg-opacity-30 transition-colors">Start Learning</Link>
            <Link to="/teachers" className="px-6 py-3 bg-white bg-opacity-20 text-white font-semibold rounded-lg shadow-lg backdrop-blur-md hover:bg-opacity-30 transition-colors">Meet Teachers</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-4 mt-8">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-md text-center">
              <div className="text-4xl text-[#622240] mb-4 mx-auto">Icon</div>
              <h3 className="text-xl font-bold text-white mb-2">Expert Teachers</h3>
              <p className="text-white">Learn from certified professionals</p>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-md text-center">
              <div className="text-4xl text-[#622240] mb-4 mx-auto">Icon</div>
              <h3 className="text-xl font-bold text-white mb-2">Structured Courses</h3>
              <p className="text-white">Follow proven learning paths</p>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-md text-center">
              <div className="text-4xl text-[#622240] mb-4 mx-auto">Icon</div>
              <h3 className="text-xl font-bold text-white mb-2">Interactive Classes</h3>
              <p className="text-white">Practice with fellow students</p>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-md text-center">
              <div className="text-4xl text-[#622240] mb-4 mx-auto">Icon</div>
              <h3 className="text-xl font-bold text-white mb-2">24/7 Access</h3>
              <p className="text-white">Learn at your own pace</p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - Featured Courses */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#622240] mb-8">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-md text-center">
                <img src="path/to/your/course-image.jpg" alt={course.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-[#622240] mb-2">{course.title}</h3>
                <p className="text-gray-700">{course.description}</p>
                <Link to="/signup" className="px-6 py-3 bg-[#622240] text-white font-semibold rounded-lg shadow-lg hover:bg-[#501a33] transition-colors">Enroll</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Third Section - About Our Platform */}
      <section className="relative py-16 bg-gray-100">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-[#622240] opacity-10 w-full h-full bg-decorative"></div>
        </div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-16 md:space-y-0 md:space-x-16">
          <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-lg backdrop-blur-md flex-1 relative z-10 md:mt-16">
            <img src="/path/to/your/image1.jpg" alt="Learning Platform" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-bold text-[#622240] mb-4">About Our Platform</h2>
            <p className="text-[#622240]">Our learning platform offers a wide range of courses to help you achieve your educational goals. Whether you're looking to learn a new skill or advance your career, we have something for everyone.</p>
          </div>
          <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-lg backdrop-blur-md flex-1 relative z-10 md:mt-32">
            <img src="/path/to/your/image2.jpg" alt="Learning Platform" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-bold text-[#622240] mb-4">Why Choose Us?</h2>
            <p className="text-[#622240]">We provide high-quality courses taught by experienced instructors. Our platform is user-friendly and accessible from anywhere, making it easy for you to learn at your own pace.</p>
          </div>
        </div>
      </section>

      {/* Other sections will go here */}
    </div>
  );
};

export default Home;