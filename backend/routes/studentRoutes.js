const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For password hashing
const Student = require('../models/Student'); // Replace with your student model

// Login endpoint
router.post('/login', async (req, res) => {
  const { studentID, password } = req.body;

  try {
    // Find student by ID
    const student = await Student.findOne({ studentID });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Login successful', student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
