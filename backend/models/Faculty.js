const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const FacultySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

FacultySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const FacultyModel = mongoose.model("Faculty", FacultySchema);
module.exports = FacultyModel