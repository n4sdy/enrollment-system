const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const { studentId, preferredDate, preferredTime } = req.body;

    // Validate input
    if (!studentId || !preferredDate || !preferredTime) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create and save the appointment
    const newAppointment = new Appointment({
      studentId,
      preferredDate,
      preferredTime,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
