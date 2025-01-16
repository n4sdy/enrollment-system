const mongoose = require("mongoose");

const siblingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
});

const familyProfileSchema = new mongoose.Schema({
  parent1: {
    name: { type: String },
    relationship: { type: String },
    highestEducation: { type: String },
    occupation: { type: String },
    employer: { type: String },
    monthlyIncome: { type: String },
    contactNumber: { type: String },
  },
  parent2: {
    name: { type: String },
    relationship: { type: String },
    highestEducation: { type: String },
    occupation: { type: String },
    employer: { type: String },
    monthlyIncome: { type: String },
    contactNumber: { type: String },
  },
  guardian: {
    name: { type: String },
    relationship: { type: String },
    highestEducation: { type: String },
    occupation: { type: String },
    employer: { type: String },
    monthlyIncome: { type: String },
    contactNumber: { type: String },
  },
  siblings: [siblingSchema],
});

const FamilyProfileModel = mongoose.model("FamilyProfile", familyProfileSchema);
module.exports = FamilyProfileModel