import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const faqs = [
    { question: 'What is the platform about?', answer: 'Our platform offers a wide range of courses designed to help you achieve your personal and professional goals.' },
    { question: 'How do I sign up?', answer: 'You can sign up by clicking on the Sign Up button on the top right corner and filling out the registration form.' },
    { question: 'What courses are available?', answer: 'We offer courses in various fields including business, and personal development.' },
    { question: 'How do I contact support?', answer: 'You can contact us through the contact form.' },
    { question: 'Is there a mobile app?', answer: 'No, but we are currently working on our mobile app and makikng it available for both iOS and Android devices.' },
    { question: 'How do I reset my password?', answer: 'You can reset your password by clicking on the Forgot Password link on the login page or in your profile tab through the Dashboard.' },
    { question: 'Can I access the courses offline?', answer: 'Yes, you can download course materials and access them offline.' },
    { question: 'What payment methods are accepted?', answer: 'We accept primarely payments through Line and bank transfers.' },
    { question: 'Is there a refund policy?', answer: 'Yes, we offer a 30-day refund policy for all our courses.' },
    { question: 'How do I update my profile?', answer: 'You can update your profile by going to the Profile section in your account settings.' },
  ];

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = faqs.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(faqs.length / questionsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <section className="flex flex-col justify-center items-center min-h-[50vh]">
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-700 text-center">Here you'll find the most frequent questions and answers.</p>
        </section>
        <section className="min-h-[50vh]">
          {currentQuestions.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full text-left font-bold text-lg p-4 bg-white rounded shadow-md"
                onClick={() => handleClick(index)}
              >
                {faq.question}
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-gray-200 rounded-b shadow-md">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded shadow-md`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQ;