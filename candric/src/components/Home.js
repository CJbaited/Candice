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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      document.body.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen parallax">
      {/* Top Section */}
      <section className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "url('/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center mt-32">
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 animate-fade-in leading-tight">
            Welcome to the <br className="hidden md:block" /> Learning Platform
          </h1>
          <div className="flex space-x-4 mb-16 justify-center">
            <Link to="/visitor-courses" className="px-6 py-3 border border-white text-white font-semibold rounded-lg shadow-lg backdrop-blur-md hover:bg-[#622240] hover:text-white transition-colors">Start Learning</Link>
            <Link to="/teachers" className="px-6 py-3 border border-white text-white font-semibold rounded-lg shadow-lg backdrop-blur-md hover:bg-[#622240] hover:text-white transition-colors">Meet Teachers</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24 px-4">
            <div className="bg-white bg-opacity-20 p-4 border border-white rounded-lg shadow-lg backdrop-blur-md text-center">
              <div className="icon-placeholder mb-4">[Icon]</div>
              <h3 className="text-lg font-bold text-white mb-2">Quality Education</h3>
              <p className="text-white">Access high-quality courses designed by experts.</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 border border-white rounded-lg shadow-lg backdrop-blur-md text-center">
              <div className="icon-placeholder mb-4">[Icon]</div>
              <h3 className="text-lg font-bold text-white mb-2">Flexible Learning</h3>
              <p className="text-white">Learn at your own pace, anytime, anywhere.</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 border border-white rounded-lg shadow-lg backdrop-blur-md text-center">
              <div className="icon-placeholder mb-4">[Icon]</div>
              <h3 className="text-lg font-bold text-white mb-2">Expert Instructors</h3>
              <p className="text-white">Learn from industry professionals and experienced teachers.</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 border border-white rounded-lg shadow-lg backdrop-blur-md text-center">
              <div className="icon-placeholder mb-4">[Icon]</div>
              <h3 className="text-lg font-bold text-white mb-2">Community Support</h3>
              <p className="text-white">Join a community of learners and get support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Section - Learn English the Fun Way */}
      <section className="min-h-screen py-24 flex flex-col justify-center">
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center">
            <img src="/emma-dau-n_4iTY1KmDE-unsplash.jpg" alt="Graphic 1" className="w-full h-full object-cover rounded-lg mb-4 animate-fade-in" />
          </div>
          <div className="flex flex-col justify-center text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#622240] mb-4 animate-fade-in leading-tight">
              Learn English,<br className="hidden md:block" /> The Fun Way!
            </h2>
            <p className="text-lg text-gray-700 mb-4 animate-fade-in font-bold">Our platform offers a unique and engaging way to learn English. With weekly lessons, fun activities, and assignments! You'll enjoy every step of your learning journey.</p>
            <p className="text-lg text-gray-700 animate-fade-in font-bold">Click on one of the buttons to know more!</p>
            <div className="mt-8 flex space-x-4 justify-center md:justify-start">
              <Link to="/about" className="px-6 py-3 bg-[#622240] text-white font-semibold rounded-lg shadow-lg hover:bg-[#501a33] transition-colors">About Us</Link>
              <Link to="/teachers" className="px-6 py-3 bg-[#622240] text-white font-semibold rounded-lg shadow-lg hover:bg-[#501a33] transition-colors">Meet Teachers</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Third Section - Features */}
      <section className="min-h-screen py-24 flex flex-col justify-center">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center h-64">
              <div className="icon-placeholder mb-4">[Icon 1]</div>
              <p className="text-gray-700">Feature 1 description goes here.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center h-64">
              <div className="icon-placeholder mb-4">[Icon 2]</div>
              <p className="text-gray-700">Feature 2 description goes here.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center h-64">
              <div className="icon-placeholder mb-4">[Icon 3]</div>
              <p className="text-gray-700">Feature 3 description goes here.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center h-64">
              <div className="icon-placeholder mb-4">[Icon 4]</div>
              <p className="text-gray-700">Feature 4 description goes here.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center h-64">
              <div className="icon-placeholder mb-4">[Icon 5]</div>
              <p className="text-gray-700">Feature 5 description goes here.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center h-64">
              <div className="icon-placeholder mb-4">[Icon 6]</div>
              <p className="text-gray-700">Feature 6 description goes here.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Section - Popular Courses */}
      <section className="min-h-screen py-24 bg-white flex flex-col justify-center">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-[#622240] mb-8">Popular Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-[#622240] mb-2">{course.title}</h3>
                <p className="text-gray-700">{course.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/visitor-courses" className="text-lg font-semibold text-[#622240] hover:underline">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* Final Section - Call to Action */}
      <section className="min-h-[50vh] py-24 flex flex-col justify-center items-center">
        <div className="container mx-auto px-8">
          <div className="bg-[#633340] p-16 rounded-lg shadow-lg text-center text-white">
            <h2 className="text-4xl font-bold mb-8">Convinced? <br className="hidden md:block" /> Click on the link below to start your journey!</h2>
            <Link to="/signup" className="text-2xl font-semibold underline text-[#ffcc00]">Start Your Journey</Link>
          </div>
        </div>
      </section>

      {/* Other sections will go here */}
    </div>
  );
};

export default Home;