const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration'); // Import your Registration model

// POST route to handle form submission
router.post('/registration', async (req, res) => {
  try {
    const registrationData = req.body;

    // Save the registration data to MongoDB
    const newRegistration = new Registration(registrationData);
    await newRegistration.save();

    res.status(200).json({ message: 'Registration successful', data: newRegistration });
  } catch (err) {
    res.status(500).json({ message: 'Error saving registration', error: err.message });
  }
});

module.exports = router;
