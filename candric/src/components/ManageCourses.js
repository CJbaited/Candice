import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import API from '../api';
import CourseDetailsModal from './CourseDetailsModal';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', start_date: '', time: '', valid_until: '' });
  const [classData, setClassData] = useState({ course_id: '', unit_title: '', schedule: '', material_id: '' });
  const [materialData, setMaterialData] = useState({ material_title: '', file_url: '' });
  const [editCourseId, setEditCourseId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchCourses();
    fetchAvailableCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await API.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchAvailableCourses = async () => {
    try {
      const response = await API.get('/courses/available-courses');
      setAvailableCourses(response.data);
    } catch (error) {
      console.error('Error fetching available courses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCourseId) {
        await API.put(`/courses/${editCourseId}`, formData);
      } else {
        await API.post('/courses', formData);
      }
      setFormData({ title: '', description: '', start_date: '', time: '', valid_until: '' });
      setEditCourseId(null);
      fetchCourses();
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course) => {
    setFormData(course);
    setEditCourseId(course.id);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      const classDataToSend = {
        ...classData,
        course_id: parseInt(classData.course_id, 10),
        schedule: new Date(classData.schedule).toISOString(),
        material_id: classData.material_id || null
      };
      await API.post('/courses/classes', classDataToSend);
      setClassData({ course_id: '', unit_title: '', schedule: '', material_id: '' });
      fetchCourses();
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    try {
      await API.post('/materials', materialData);
      setMaterialData({ material_title: '', file_url: '' });
      fetchCourses();
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Error adding material:', error);
    }
  };

  const handleDeleteMaterial = async (id) => {
    try {
      await API.delete(`/materials/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      // Reset form data when closing the drawer
      setFormData({ title: '', description: '', start_date: '', time: '', valid_until: '' });
      setClassData({ course_id: '', unit_title: '', schedule: '', material_id: '' });
      setMaterialData({ material_title: '', file_url: '' });
      setEditCourseId(null);
    }
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Courses</h1>
          <button onClick={toggleDrawer} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            +
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-700">{course.description}</p>
              <p className="text-gray-700">Start Date: {course.start_date}</p>
              <p className="text-gray-700">Time: {course.time}</p>
              <p className="text-gray-700">Valid Until: {course.valid_until}</p>
              <button onClick={() => handleEdit(course)} className="mt-4 bg-yellow-600 text-white py-2 px-4 rounded mr-2">
                Edit
              </button>
              <button onClick={() => handleDelete(course.id)} className="mt-4 bg-red-600 text-white py-2 px-4 rounded">
                Delete
              </button>
              <button onClick={() => handleViewCourse(course)} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
                View Details
              </button>
            </div>
          ))}
        </div>
        {selectedCourse && (
          <CourseDetailsModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            course={selectedCourse}
          />
        )}
        <div className={`fixed inset-y-0 right-0 transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out bg-white w-80 shadow-lg z-50 overflow-y-auto`}>
          <div className="p-6 h-full">
            <button onClick={toggleDrawer} className="text-gray-600 hover:text-gray-900">
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4">{editCourseId ? 'Update Course' : 'Add Course'}</h2>
            <form onSubmit={handleSubmit} className="mb-6">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="date"
                placeholder="Start Date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="time"
                placeholder="Time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="date"
                placeholder="Valid Until"
                value={formData.valid_until}
                onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                {editCourseId ? 'Update Course' : 'Add Course'}
              </button>
            </form>
            <h2 className="text-2xl font-bold mb-4">Add Class</h2>
            <form onSubmit={handleAddClass} className="mb-6">
              <select
                value={classData.course_id}
                onChange={(e) => setClassData({ ...classData, course_id: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              >
                <option value="" disabled>Select Course</option>
                {availableCourses.map((course) => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Unit Title"
                value={classData.unit_title}
                onChange={(e) => setClassData({ ...classData, unit_title: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="datetime-local"
                placeholder="Schedule"
                value={classData.schedule}
                onChange={(e) => setClassData({ ...classData, schedule: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Material ID (optional)"
                value={classData.material_id}
                onChange={(e) => setClassData({ ...classData, material_id: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
              />
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Add Class
              </button>
            </form>
            <h2 className="text-2xl font-bold mb-4">Add Material</h2>
            <form onSubmit={handleAddMaterial} className="mb-6">
              <input
                type="text"
                placeholder="Material Title"
                value={materialData.material_title}
                onChange={(e) => setMaterialData({ ...materialData, material_title: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="url"
                placeholder="File URL"
                value={materialData.file_url}
                onChange={(e) => setMaterialData({ ...materialData, file_url: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                Add Material
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;