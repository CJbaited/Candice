const express = require('express');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'your-secret-key', // Replace with a strong, random secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  })
);

// Routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
