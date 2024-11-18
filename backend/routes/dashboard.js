// Espress.js router for handling user dashboard configuration

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Retrieval current user's dashboard configuration
// 'auth' middleware ysed to ensure user's authentication
router.get('/config', auth, async (req, res) => {
  // User's data fetched from DB using ID
  const user = await User.findById(req.user.id);
  // User's dashboard configuration returned as JSON response
  res.json(user.dashboardConfig);
});

// Allows users to update dashboard configuration
// Also uses 'auth'
router.post('/config', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  // Current configuration is fetched and new configuration taken from request body
  user.dashboardConfig = req.body.config;
  // Configuration updated and saved to DB
  await user.save();
  // Updated configuration returned as JSON response
  res.json(user.dashboardConfig);
});

// Saving of more detailed dashboard configuration
// Also uses 'auth'
router.post('/save-config', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // Expects request body to contain an array of calculators
    user.dashboardConfig = req.body.calculators.map(calc => ({
      // Each calculator mapped to an object with properties:
      id: calc.id,
      type: calc.type,
      notes: calc.notes,
      position: calc.position,
      state: calc.state
    }));
    // Configuration updated and saved to DB
    await user.save();
    // Success message returned
    res.json({ message: 'Dashboard configuration saved!' });
  // In case of error -> 500 status code
  } catch (error) {
    res.status(500).json({ message: 'Error saving configuration' });
  }
});

// Retrieves user's dashboard configuration
// Also uses 'auth'
router.get('/load-config', auth, async (req, res) => {
  // Configuration fetched and sent back
  try {
    const user = await User.findById(req.user.id);
    res.json(user.dashboardConfig || []);
  } catch (error) {
    res.status(500).json({ message: 'Error loading configuration' });
  }
});

module.exports = router;