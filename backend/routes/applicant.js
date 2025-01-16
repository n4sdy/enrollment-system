const express = require('express');
const multer = require('multer');
const Applicant = require('../models/Applicant'); // Path to your Mongoose model
const router = express.Router();

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route to save applicant data
router.post('/api/applicant', upload.single('photo'), async (req, res) => {
  try {
    const { body, file } = req;
    const photoBase64 = file ? file.buffer.toString('base64') : null;

    const applicant = new Applicant({
      ...body,
      photo: photoBase64, // Save photo as Base64 string
    });

    await applicant.save();
    res.status(201).json({ message: 'Applicant saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save applicant data' });
  }
});

module.exports = router;
