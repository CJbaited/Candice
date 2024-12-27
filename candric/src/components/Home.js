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
      <section className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "url('/emma-dau-n_4iTY1KmDE-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center mt-32"> {/* Added margin-top to bring down the title and buttons */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Welcome to the Learning Platform</h1>
          <div className="flex space-x-4 mb-16 justify-center">
            <Link to="/visitor-courses" className="px-6 py-3 bg-white bg-opacity-20 text-white font-semibold rounded-lg shadow-lg backdrop-blur-md hover:bg-signup transition-colors">Start Learning</Link>
            <Link to="/teachers" className="px-6 py-3 bg-white bg-opacity-20 text-white font-semibold rounded-lg shadow-lg backdrop-blur-md hover:bg-signup transition-colors">Meet Teachers</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24 px-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg backdrop-blur-md text-center">
              <div className="icon-placeholder mb-4">[Icon]</div>
              <h3 className="text-lg font-bold text-white mb-2">Quality Education</h3>
              <p className="text-white">Access high-quality courses designed by experts.</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg backdrop-blur-md text-center">
              <div className="icon-placeholder mb-4">[Icon]</div>
              <h3 className="text-lg font-bold text-white mb-2">Flexible Learning</h3>
              <p className="text-white">Learn at your own pace, anytime, anywhere.</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg backdrop-blur-md text-center">
              <div className="icon-placeholder mb-4">[Icon]</div>
              <h3 className="text-lg font-bold text-white mb-2">Expert Instructors</h3>
              <p className="text-white">Learn from industry professionals and experienced teachers.</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg backdrop-blur-md text-center">
              <div className="icon-placeholder mb-4">[Icon]</div>
              <h3 className="text-lg font-bold text-white mb-2">Community Support</h3>
              <p className="text-white">Join a community of learners and get support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - Featured Courses */}
      <section className="h-screen py-24 bg-gray-100 flex flex-col justify-center"> {/* Set height to full viewport */}
        <div className="container mx-auto px-8"> {/* Increased padding */}
          <h2 className="text-3xl font-bold text-center text-[#622240] mb-16">Featured Courses</h2> {/* Increased margin */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Adjusted gap */}
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white p-8 rounded-lg shadow-lg text-center"> {/* Increased padding */}
                <img src="path/to/your/course-image.jpg" alt={course.title} className="w-full h-64 object-cover rounded-lg mb-4" /> {/* Increased height */}
                <h3 className="text-xl font-bold text-[#622240] mb-4">{course.title}</h3> {/* Increased margin */}
                <p className="text-gray-700 mb-4">{course.description}</p> {/* Increased margin */}
                <Link to="/signup" className="px-6 py-3 bg-[#622240] text-white font-semibold rounded-lg shadow-lg hover:bg-[#501a33] transition-colors">Enroll</Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-16"> {/* Added margin-top */}
            <Link to="/visitor-courses" className="px-6 py-3 bg-[#622240] text-white font-semibold rounded-lg shadow-lg hover:bg-[#501a33] transition-colors">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Third Section - About Our Platform */}
      <section className="relative h-screen py-24 bg-gray-100 flex flex-col justify-center"> {/* Set height to full viewport */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-[#622240] opacity-10 w-full h-full bg-decorative"></div>
        </div>
        <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between space-y-16 md:space-y-0 md:space-x-16"> {/* Increased padding */}
          <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-lg backdrop-blur-md flex-1 relative z-10 md:mt-16">
            <img src="/atikh-bana-Ycds6emp7BA-unsplash.jpg" alt="Learning Platform" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-bold text-[#622240] mb-4">About Our Platform</h2>
            <p className="text-[#622240]">Our learning platform offers a wide range of courses to help you achieve your educational goals. Whether you're looking to learn a new skill or advance your career, we have something for everyone.</p>
          </div>
          <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-lg backdrop-blur-md flex-1 relative z-10 md:mt-32">
            <img src="/jason-goodman-Oalh2MojUuk-unsplash.jpg" alt="Learning Platform" className="w-full h-48 object-cover rounded-lg mb-4" />
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