const express = require('express');
const { getCourses, enrollCourse, createCourse, getUserCourses } = require('../controllers/courseController');
const router = express.Router();

router.get('/', getCourses); // List available courses
router.post('/enroll', enrollCourse); // Enroll in a course
router.post('/', createCourse); // Create a new course
router.get('/user/:userId', getUserCourses); // Fetch courses a user is enrolled in

module.exports = router;
