import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Teachers = () => {
  const [expandedTeacher, setExpandedTeacher] = useState(null);

  const teachers = [
    {
      id: 1,
      name: 'John Doe',
      expertise: 'Business English',
      summary: 'John has over 10 years of experience teaching Business English to professionals.',
      details: 'John has worked with numerous multinational companies, helping their employees improve their business communication skills. He holds a Master\'s degree in Applied Linguistics.',
      imageUrl: 'path/to/john-doe.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      expertise: 'Travel and Conversation English',
      summary: 'Jane specializes in Travel and Conversation English, making sure you are prepared for any travel situation.',
      details: 'Jane has traveled to over 30 countries and has a deep understanding of the language needs of travelers. She has a Bachelor\'s degree in English Literature.',
      imageUrl: 'path/to/jane-smith.jpg',
    },
    // Add more teachers as needed
  ];

  const toggleExpand = (id) => {
    setExpandedTeacher(expandedTeacher === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Top Section - Brief Description */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#622240] mb-8">Meet Our Teachers</h2>
          <p className="text-gray-700 mb-4">
            Our teachers are experienced professionals dedicated to helping you achieve your educational goals. They bring a wealth of knowledge and expertise to ensure you get the best learning experience.
          </p>
        </div>
      </section>

      {/* Second Section - Teachers Display */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#622240] mb-8">Our Teachers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src={teacher.imageUrl} alt={teacher.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-[#622240] mb-2">{teacher.name}</h3>
                <p className="text-gray-700 mb-2">{teacher.expertise}</p>
                <p className="text-gray-700">{teacher.summary}</p>
                {expandedTeacher === teacher.id && (
                  <p className="text-gray-700 mt-4">{teacher.details}</p>
                )}
                <button
                  onClick={() => toggleExpand(teacher.id)}
                  className="mt-4 px-6 py-3 bg-[#622240] text-white font-semibold rounded hover:bg-[#501a33] transition-colors"
                >
                  {expandedTeacher === teacher.id ? 'See Less' : 'See More'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Third Section - Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#622240] mb-8">Ready to Start?</h2>
          <p className="text-gray-700 mb-4">
            Sign up today to start learning with our expert teachers and achieve your educational goals.
          </p>
          <Link to="/signup" className="px-6 py-3 bg-[#622240] text-white font-semibold rounded hover:bg-[#501a33] transition-colors">
            Sign Up
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Teachers;