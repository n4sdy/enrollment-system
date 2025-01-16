const mongoose = require("mongoose");

const RequirementSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }, // Reference to student
  fileName: String,
  filePath: String,
  uploadedAt: { type: Date, default: Date.now },
});

const RequirementModel = mongoose.model("Requirement", RequirementSchema);
module.exports = RequirementModel