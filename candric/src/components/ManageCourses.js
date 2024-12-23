import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import API from '../api';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', start_date: '', time: '', valid_until: '' });
  const [classData, setClassData] = useState({ course_id: '', unit_title: '', schedule: '', material_id: '' });
  const [materialData, setMaterialData] = useState({ unit_id: '', material_title: '', file_url: '' });
  const [editCourseId, setEditCourseId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await API.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
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
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course) => {
    setFormData(course);
    setEditCourseId(course.id);
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
      await API.post('/classes', classData);
      setClassData({ course_id: '', unit_title: '', schedule: '', material_id: '' });
      fetchCourses();
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    try {
      await API.post('/materials', materialData);
      setMaterialData({ unit_id: '', material_title: '', file_url: '' });
      fetchCourses();
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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>
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
        <form onSubmit={handleAddClass} className="mb-6">
          <select
            value={classData.course_id}
            onChange={(e) => setClassData({ ...classData, course_id: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          >
            <option value="" disabled>Select Course</option>
            {courses.map((course) => (
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
            placeholder="Material ID"
            value={classData.material_id}
            onChange={(e) => setClassData({ ...classData, material_id: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Add Class
          </button>
        </form>
        <form onSubmit={handleAddMaterial} className="mb-6">
          <select
            value={materialData.unit_id}
            onChange={(e) => setMaterialData({ ...materialData, unit_id: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          >
            <option value="" disabled>Select Unit</option>
            {courses.flatMap(course => course.units).map(unit => (
              <option key={unit.id} value={unit.id}>{unit.unit_title}</option>
            ))}
          </select>
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
              <div className="mt-4">
                <h4 className="text-lg font-bold mb-2">Materials</h4>
                {course.materials.map((material) => (
                  <div key={material.id} className="flex justify-between items-center mb-2">
                    <a href={material.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {material.material_title}
                    </a>
                    <button onClick={() => handleDeleteMaterial(material.id)} className="bg-red-600 text-white py-1 px-2 rounded">
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;