const express = require("express");
const multer = require("multer");
const path = require("path");
const Requirement = require("../models/Requirement");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});
const upload = multer({ storage });

// Upload a file and save metadata to the database
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const newRequirement = new Requirement({
      studentId: req.body.studentId, // Replace with actual student ID
      fileName: req.file.filename,
      filePath: req.file.path,
    });
    const savedRequirement = await newRequirement.save();
    res.status(200).json(savedRequirement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
