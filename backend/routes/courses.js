const express = require('express');
const { getCourses, enrollCourse, createCourse, getUserCourses, deleteCourse, adminOnly } = require('../controllers/courseController');
const router = express.Router();

router.get('/', getCourses); // List available courses
router.post('/enroll', enrollCourse); // Enroll in a course
router.post('/create-course',adminOnly, createCourse); // Create a new course
router.get('/user/:userId', getUserCourses); // Fetch courses a user is enrolled in
router.delete('/delete-course/', adminOnly, deleteCourse);

module.exports = router;
