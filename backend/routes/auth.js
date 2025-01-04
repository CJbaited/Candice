const express = require('express');
const { signUp, login, logout, checkUser, updateUserProfile, userBalance } = require('../controllers/authControllerTest');
const checkTeacherRole = require('../middleware/checkTeacherRole'); // Import the middleware
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-user', checkUser);
router.get('/user-balance', userBalance);
router.post('/update-profile', updateUserProfile);
router.get('/teacher-dashboard', checkTeacherRole, (req, res) => {
  res.send('Welcome to the Teacher Dashboard');
});

module.exports = router;
