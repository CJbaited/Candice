const express = require('express');
const { getCourses, enrollCourse, createCourse, getUserCourses, deleteCourse, updateCourse, addClass, addMaterial, deleteMaterial } = require('../controllers/courseController');
//const checkTeacherRole = require('../middleware/checkTeacherRole');
const router = express.Router();

router.get('/', getCourses); // List available courses
router.post('/', createCourse); // Create a new course
router.put('/:id', updateCourse); // Update a course
router.delete('/:id', deleteCourse); // Delete a course
router.post('/enroll', enrollCourse); // Enroll in a course
router.get('/user/:userId', getUserCourses); // Fetch courses a user is enrolled in
router.post('/classes', addClass); // Add a class to a course
router.post('/materials', addMaterial); // Add material to a class
router.delete('/materials/:id', deleteMaterial); // Delete material from a class

module.exports = router;
