import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { format } from 'date-fns';
import API from '../api';

const CourseDetailsModal = ({ isOpen, onRequestClose, course }) => {
  const [classes, setClasses] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [courseData, setCourseData] = useState(course);
  const [classData, setClassData] = useState({ unit_title: '', schedule: '', material_id: '' });
  const [materialData, setMaterialData] = useState({ material_title: '', file_url: '' });
  const [selectedClass, setSelectedClass] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [updateType, setUpdateType] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (course) {
      setCourseData(course);
      fetchClasses(course.id);
    }
  }, [course]);

  const fetchClasses = async (courseId) => {
    try {
      const response = await API.get(`/courses/${courseId}/classes`);
      const formattedClasses = response.data.map(cls => ({
        ...cls,
        schedule: format(new Date(cls.schedule), 'yyyy-MM-dd HH:mm')
      }));
      setClasses(formattedClasses);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchMaterials = async (classId) => {
    try {
      const response = await API.get(`/courses/classes/${classId}/materials`);
      setMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/courses/${courseData.id}`, courseData);
      setNotification('Course updated successfully!');
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleUpdateClass = async (e) => {
    e.preventDefault();
    try {
      const classDataToSend = {
        ...classData,
        schedule: new Date(classData.schedule).toISOString(),
        material_id: classData.material_id || null
      };
      await API.put(`/courses/classes/${selectedClass.id}`, classDataToSend);
      setNotification('Class updated successfully!');
      setIsUpdateModalOpen(false);
      fetchClasses(course.id);
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      const classDataToSend = {
        ...classData,
        course_id: course.id,
        schedule: new Date(classData.schedule).toISOString(),
        material_id: classData.material_id || null
      };
      await API.post('/courses/classes', classDataToSend);
      setClassData({ unit_title: '', schedule: '', material_id: '' });
      fetchClasses(course.id);
      setIsAddClassModalOpen(false);
      setNotification('Class added successfully!');
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  const handleDeleteCourse = async () => {
    try {
      await API.delete(`/courses/${course.id}`);
      alert('Course deleted successfully!');
      onRequestClose();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleDeleteClass = async (classId) => {
    try {
      await API.delete(`/courses/classes/${classId}`);
      alert('Class deleted successfully!');
      fetchClasses(course.id);
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openUpdateModal = (type) => {
    setUpdateType(type);
    setIsUpdateModalOpen(true);
    setDropdownOpen(false);
  };

  const openAddClassModal = () => {
    setIsAddClassModalOpen(true);
    setDropdownOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Course Details">
      <div className="p-6 relative">
        <button onClick={onRequestClose} className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
          &times;
        </button>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{course?.title}</h2>
          <div className="relative">
            <button onClick={handleDropdownToggle} className="bg-gray-300 text-gray-700 py-2 px-4 rounded">
              Options
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <button
                  onClick={() => openUpdateModal('course')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Update Course
                </button>
                <button
                  onClick={openAddClassModal}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Add Class
                </button>
                <div className="relative group">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Update Class
                  </button>
                  <div className="absolute right-full top-0 mt-2 w-48 bg-white border rounded shadow-lg hidden group-hover:block">
                    {classes.map((cls) => (
                      <button
                        key={cls.id}
                        onClick={() => {
                          setSelectedClass(cls);
                          openUpdateModal('class');
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {cls.unit_title}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleDeleteCourse}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Delete Course
                </button>
                <div className="relative group">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Delete Class
                  </button>
                  <div className="absolute right-full top-0 mt-2 w-48 bg-white border rounded shadow-lg hidden group-hover:block">
                    {classes.map((cls) => (
                      <button
                        key={cls.id}
                        onClick={() => handleDeleteClass(cls.id)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {cls.unit_title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-700 mb-4">{course?.description}</p>
        <h3 className="text-xl font-bold mb-2">Classes</h3>
        {classes.length > 0 ? (
          classes.map((cls) => (
            <div key={cls.id} className="mb-4">
              <h4 className="text-lg font-bold">{cls.unit_title}</h4>
              <p className="text-gray-700">Schedule: {cls.schedule}</p>
              <button onClick={() => fetchMaterials(cls.id)} className="mt-2 bg-blue-600 text-white py-1 px-2 rounded">
                View Materials
              </button>
              <h5 className="text-md font-bold">Materials</h5>
              {materials.length > 0 ? (
                materials.map((material) => (
                  <div key={material.id}>
                    <a href={material.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {material.material_title}
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No materials available</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-700">No classes available</p>
        )}
        {notification && <p className="mt-4 text-green-600">{notification}</p>}
      </div>

      {/* Update Modal */}
      <Modal isOpen={isUpdateModalOpen} onRequestClose={() => setIsUpdateModalOpen(false)} contentLabel="Update Details">
        <div className="p-6 relative">
          <button onClick={() => setIsUpdateModalOpen(false)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4">{updateType === 'course' ? 'Update Course' : 'Update Class'}</h2>
          <form onSubmit={updateType === 'course' ? handleUpdateCourse : handleUpdateClass}>
            {updateType === 'course' ? (
              <>
                <input
                  type="text"
                  placeholder="Title"
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <input
                  type="date"
                  placeholder="Start Date"
                  value={courseData.start_date}
                  onChange={(e) => setCourseData({ ...courseData, start_date: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <input
                  type="time"
                  placeholder="Time"
                  value={courseData.time}
                  onChange={(e) => setCourseData({ ...courseData, time: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <input
                  type="date"
                  placeholder="Valid Until"
                  value={courseData.valid_until}
                  onChange={(e) => setCourseData({ ...courseData, valid_until: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
              </>
            ) : (
              <>
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
              </>
            )}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              {updateType === 'course' ? 'Update Course' : 'Update Class'}
            </button>
          </form>
        </div>
      </Modal>

      {/* Add Class Modal */}
      <Modal isOpen={isAddClassModalOpen} onRequestClose={() => setIsAddClassModalOpen(false)} contentLabel="Add Class">
        <div className="p-6 relative">
          <button onClick={() => setIsAddClassModalOpen(false)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4">Add Class</h2>
          <form onSubmit={handleAddClass}>
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
        </div>
      </Modal>
    </Modal>
  );
};

export default CourseDetailsModal;