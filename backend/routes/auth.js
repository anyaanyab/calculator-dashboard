// Express.js router module for handling user authentication functionalities

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// User registration by email and password
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  // Password hashed using 'bcrypt'
  const hashedPassword = await bcrypt.hash(password, 10);
  // New user object created and saved to database
  const user = new User({ email, password: hashedPassword });
  await user.save();
  
  // JWT generated using user's ID
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

// User Login by email and password
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Check by email if user exists
  const user = await User.findOne({ email });
  
  // If no user found, it is proposed to register
  if (!user) {
    return res.status(400).json({ message: 'User not found. Please register first!' });
  }
  
  // If user found, provided password compared with stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  // JWT generated if credentials are valid
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Token Verification - checks validity of JWT 
// Uses 'auth' middleware for verification
router.get('/verify', auth, async (req, res) => {
  // If token valid, user's information retrieved and sent
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  // If token invalid, 401 status code
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
});

module.exports = router;