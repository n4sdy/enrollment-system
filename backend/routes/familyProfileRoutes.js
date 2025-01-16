const express = require("express");
const router = express.Router();
const FamilyProfile = require("../models/FamilyProfile");

// Create or update family profile
router.post("/family-profile", async (req, res) => {
  try {
    const { parent1, parent2, guardian, siblings } = req.body;

    // Save to the database
    const familyProfile = new FamilyProfile({
      parent1,
      parent2,
      guardian,
      siblings,
    });

    await familyProfile.save();
    res.status(201).json({ message: "Family profile saved successfully!" });
  } catch (error) {
    console.error("Error saving family profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
