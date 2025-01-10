import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import API from '../api';
import StudentDetailsModal from './StudentDetailsModal';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (username = '') => {
    try {
      const response = await API.get('/auth/search-students', {
        params: { username },
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents(searchTerm);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Manage Students</h1>
        <form onSubmit={handleSearch} className="mb-6">
          <input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
          <button type="submit" className="ml-2 p-2 bg-blue-600 text-white rounded">
            Search
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
              onClick={() => handleViewStudent(student)}
            >
              <h3 className="text-xl font-bold mb-2">{student.username}</h3>
              <p className="text-gray-700">{student.location}</p>
            </div>
          ))}
        </div>
        {selectedStudent && (
          <StudentDetailsModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            student={selectedStudent}
          />
        )}
      </div>
    </div>
  );
};

export default ManageStudents;