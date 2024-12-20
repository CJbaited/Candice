import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Welcome to the Learning Platform</h1>
          <p className="mt-2">Your journey to knowledge starts here.</p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto p-4">
        <section className="my-8">
          <h2 className="text-2xl font-semibold text-gray-800">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {/* Example Course Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Course Title</h3>
              <p className="text-gray-700">Brief description of the course.</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">Enroll Now</button>
            </div>
            {/* Repeat for other courses */}
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Learning Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;