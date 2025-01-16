const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  applicantType: { type: String, required: true },
  seniorHighTrack: { type: String },
  preferredProgram: {
    type: String,
    required: true,
    enum: ['Computer Science', 'IT'], // Allowed values
    message: '{VALUE} is not a valid program',
  },
  preferredCourse: { type: String },
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
