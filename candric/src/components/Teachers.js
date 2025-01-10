import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Teachers = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const teachers = [
    {
      id: 1,
      name: 'Candice Chi',
      expertise: 'Business English',
      summary: 'Candice has over 10 years of experience teaching English to professionals as well as high school students. Click to see more.',
      details: 'Candice has worked with numerous people and companies, helping their students to improve their communication skills. She holds a Bachelors\'s degree in Applied English Litterature.',
      imageUrl: '/IMG_1760.jpeg',
    },
    {
      id: 2,
      name: 'Cedric Janssens',
      expertise: 'Travel and Conversation English',
      summary: 'Cedric specializes in Travel and Conversation English, making sure you are prepared for any travel situation. Click to see more.',
      details: 'Cedric has traveled to numerous countries and has a deep understanding of the language needs of travelers. She has a Bachelor\'s degree in Computer Programming.',
      imageUrl: '/fxn 2024-07-20 151702.757.jpeg',
    },
    // Add more teachers as needed
  ];

  const openModal = (teacher) => {
    setSelectedTeacher(teacher);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTeacher(null);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Top Section - Brief Description */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center pt-16">
          <h2 className="text-3xl font-bold text-[#622240] mb-8">Meet Our Teachers</h2>
          <p className="text-gray-700 mb-4">
            Our teachers are experienced professionals dedicated to helping you achieve your educational goals. They bring a wealth of knowledge and expertise to ensure you get the best learning experience.
          </p>
        </div>
      </section>

      {/* Second Section - Teachers Display */}
      <section className="min-h-screen flex items-center py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#622240] mb-8">Our Teachers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer"
                onClick={() => openModal(teacher)}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img src={teacher.imageUrl} alt={teacher.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-[#622240] mb-2">{teacher.name}</h3>
                <p className="text-gray-700 mb-2">{teacher.expertise}</p>
                <p className="text-gray-700">{teacher.summary}</p>
              </motion.div>
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

      {/* Modal for Teacher Details */}
      <AnimatePresence>
        {modalIsOpen && selectedTeacher && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <img src={selectedTeacher.imageUrl} alt={selectedTeacher.name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="text-2xl font-bold text-[#622240] mb-2">{selectedTeacher.name}</h3>
              <p className="text-gray-700 mb-2">{selectedTeacher.expertise}</p>
              <p className="text-gray-700">{selectedTeacher.details}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Teachers;