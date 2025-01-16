import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressHeader from "./ProgressHeader";
import styles from "../styles/RegistrationForm.module.css";


const RegistrationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    applicantType: "",
    seniorHighTrack: "",
    preferredProgram: "",
    preferredCourse: "",
  });

  const [errors, setErrors] = useState({}); // Tracks validation errors

  // Handle input changes for dropdowns
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // Reset dependent fields if parent field changes
      ...(name === "applicantType" && { seniorHighTrack: "", preferredCourse: "" }),
      ...(name === "preferredProgram" && { preferredCourse: "" }),
    }));

    // Clear the error for the field being updated
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleCancel = () => {
    setFormData({
      applicantType: "",
      seniorHighTrack: "",
      preferredProgram: "",
      preferredCourse: "",
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate fields based on applicant type
    if (!formData.applicantType) {
      newErrors.applicantType = "Applicant type is required.";
    }

    if (formData.applicantType === "Senior High School Graduate") {
      if (!formData.seniorHighTrack) {
        newErrors.seniorHighTrack = "Senior High School track is required.";
      }
      if (!formData.preferredCourse) {
        newErrors.preferredCourse = "Preferred course is required.";
      }
    } else if (formData.applicantType === "Transferee") {
      if (!formData.preferredProgram) {
        newErrors.preferredProgram = "Preferred program is required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleNextPage = async (e) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    try {
      
      navigate("/ApplicantProfile");
    } catch (error) {
      console.error("Error submitting the form:", error);
      
    }
  };

  return (
    <div className={styles.container}>
      <ProgressHeader currentStep={currentStep} />
      <form className={styles.form} onSubmit={handleNextPage}>
        <h2 className={styles.formTitle}>Application Details</h2>

        {/* Applicant Type */}
        <div className={styles.field}>
          <label htmlFor="applicantType">Type of Applicant</label>
          <select
            name="applicantType"
            id="applicantType"
            value={formData.applicantType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="Senior High School Graduate">Senior High School Graduate</option>
            <option value="Transferee">Transferee</option>
          </select>
          {errors.applicantType && <p className={styles.error}>{errors.applicantType}</p>}
        </div>

        {/* Senior High School Graduate Fields */}
        {formData.applicantType === "Senior High School Graduate" && (
          <>
            {/* Senior High Track */}
            <div className={styles.field}>
              <label htmlFor="seniorHighTrack">Senior High School Track</label>
              <select
                name="seniorHighTrack"
                id="seniorHighTrack"
                value={formData.seniorHighTrack}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="STEM">STEM</option>
                <option value="ABM">ABM</option>
                <option value="HUMSS">HUMSS</option>
                <option value="TVL">TVL</option>
              </select>
              {errors.seniorHighTrack && <p className={styles.error}>{errors.seniorHighTrack}</p>}
            </div>

            {/* Preferred Course */}
            {formData.seniorHighTrack && (
              <div className={styles.field}>
                <label htmlFor="preferredCourse">Preferred Course</label>
                <select
                  name="preferredCourse"
                  id="preferredCourse"
                  value={formData.preferredCourse}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Computer Science - BSCS">Computer Science - BSCS</option>
                  <option value="Information Technology - BSIT">Information Technology - IT</option>
                </select>
                {errors.preferredCourse && <p className={styles.error}>{errors.preferredCourse}</p>}
              </div>
            )}
          </>
        )}

        {/* Transferee Fields */}
        {formData.applicantType === "Transferee" && (
          <div className={styles.field}>
            <label htmlFor="preferredProgram">Preferred Program</label>
            <select
              name="preferredProgram"
              id="preferredProgram"
              value={formData.preferredProgram}
              onChange={handleInputChange}
              required
            >
              <option value="">Choose your preferred program</option>
              <option value="Computer Science - BSCS">Computer Science - BSCS</option>
              <option value="Information Technology - BSIT">Information Technology - BSIT</option>
            </select>
            {errors.preferredProgram && <p className={styles.error}>{errors.preferredProgram}</p>}
          </div>
        )}

        {/* Buttons */}
        <div className={styles.buttons}>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>
            Reset
          </button>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
