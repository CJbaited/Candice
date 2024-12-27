import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VisitorCourses = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setAllCourses(response.data);
        setFeaturedCourses(response.data.slice(0, 3)); // Get the first 3 courses as featured courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const learningPathCourses = [
    {
      id: 1,
      title: 'Business English',
      description: 'Enhance your business communication skills with our Business English course. Learn how to effectively communicate in professional settings, write business emails, and conduct meetings.',
      imageUrl: '/mimi-thian-lp1AKIUV3yo-unsplash.jpg',
    },
    {
      id: 2,
      title: 'Travel and Conversation English',
      description: 'Prepare for your travels with our Travel and Conversation English course. Learn essential phrases, vocabulary, and conversation skills to navigate through various travel situations.',
      imageUrl: '/helena-lopes-e3OUQGT9bWU-unsplash.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Featured Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#622240] mb-8">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-[#622240] mb-2">{course.title}</h3>
                <p className="text-gray-700">{course.description}</p>
                <Link to="/signup" className="px-6 py-3 bg-[#622240] text-white font-semibold rounded hover:bg-[#501a33] transition-colors">Enroll</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#622240] mb-8">Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {learningPathCourses.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-2xl font-bold text-[#622240] mb-4">{course.title}</h3>
                <p className="text-gray-700">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Available Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#622240] mb-8">All Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCourses.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-[#622240] mb-2">{course.title}</h3>
                <p className="text-gray-700">{course.description}</p>
                <Link to="/signup" className="px-6 py-3 bg-[#622240] text-white font-semibold rounded hover:bg-[#501a33] transition-colors">Enroll</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisitorCourses;