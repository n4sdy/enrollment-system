const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");
require("dotenv").config();

const applicantRoutes = require("./routes/applicant");
const familyProfileRoutes = require("./routes/familyProfileRoutes");
const requirementsRoutes = require("./routes/requirementsRoutes");
const appointmentsRoutes = require("./routes/appointmentRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

const Registration = require("./models/Registration");
const Applicant = require("./models/Applicant");
const FamilyProfile = require("./models/FamilyProfile");

const app = express()
app.get('api', (req, res) => {
  res.json({ "users": ["userOne", "userTwo", "userThree"] })
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// MongoDB Connection
const mongodbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/backend";
mongoose
  .connect(mongodbUrl, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Routes
app.get("/api/applicant", applicantRoutes);
app.get("/api/familyprofile", familyProfileRoutes);
app.get("/api/requirements", requirementsRoutes);
app.get("/api/appointments", appointmentsRoutes);
app.get("/api/student", studentRoutes);
app.get("/api/faculty", facultyRoutes);
app.get("/api/registration", registrationRoutes);

// Registration Route
app.post("/api/registration", async (req, res) => {
  const { applicantType, seniorHighTrack, preferredCourse, preferredProgram } = req.body;

  try {
    const newRegistration = new Registration({
      applicantType,
      seniorHighTrack,
      preferredCourse,
      preferredProgram,
    });

    await newRegistration.save();
    res.status(201).json({ message: "Application saved successfully!" });
  } catch (err) {
    console.error("Error saving registration:", err);
    res.status(500).json({ error: "Failed to save application" });
  }
});

// Applicant Schema and File Upload
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
  address: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  hasDisability: Boolean,
  disabilityNature: String,
  partOfIndigenousGroup: Boolean,
  indigenousGroup: String,
  photo: String, // Store photo path or base64 encoded string
});

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/api/applicant", upload.single("photo"), async (req, res) => {
  try {
    const { body, file } = req;

    const newApplicant = new Applicant({
      ...body,
      photo: file ? file.path : null,
      address: {
        addressLine1: body.addressLine1,
        addressLine2: body.addressLine2,
        city: body.city,
        state: body.state,
        postalCode: body.postalCode,
        country: body.country,
      },
    });

    await newApplicant.save();
    res.status(201).json({ message: "Applicant data saved successfully!" });
  } catch (error) {
    console.error("Error saving applicant:", error);
    res.status(500).json({ message: "Error saving applicant data." });
  }
});

// Serve uploads directory
app.use("/uploads", express.static(uploadDir));

// Family Profile Route
app.post("/api/familyprofile", async (req, res) => {
  try {
    const profile = new FamilyProfile(req.body);
    await profile.save();
    res.status(200).json({ message: "Profile saved successfully" });
  } catch (err) {
    console.error("Error saving family profile:", err);
    res.status(500).json({ error: "Error saving family profile" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});
