const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  givenName: String,
  middleName: String,
  familyName: String,
  suffix: String,
  sex: String,
  dateOfBirth: Date,
  civilStatus: String,
  contactNumber: String,
  religion: String,
  nationality: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  hasDisability: Boolean,
  disabilityNature: String,
  partOfIndigenousGroup: Boolean,
  indigenousGroup: String,
  photo: String, // URL or Base64 string for uploaded photo
});

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
