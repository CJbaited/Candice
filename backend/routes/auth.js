const express = require('express');
const { signUp, login, logout, checkUser, updateUserProfile } = require('../controllers/authControllerTest');
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-user', checkUser);
router.post('/update-profile', updateUserProfile);

module.exports = router;
