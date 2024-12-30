import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import API from '../api';

const CourseDetailsModal = ({ isOpen, onRequestClose, course }) => {
  const [classes, setClasses] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    if (course) {
      fetchClasses(course.id);
    }
  }, [course]);

  const fetchClasses = async (courseId) => {
    try {
      const response = await API.get(`/courses/${courseId}/classes`);
      setClasses(response.data);
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

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Course Details">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{course?.title}</h2>
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
        <button onClick={onRequestClose} className="mt-4 bg-red-600 text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CourseDetailsModal;