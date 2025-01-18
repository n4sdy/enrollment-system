import React, { useState, useEffect } from "react";
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

  const [errors, setErrors] = useState({});

  // Load form data from session storage when the component mounts
  useEffect(() => {
    const savedFormData = JSON.parse(sessionStorage.getItem("formData"));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value,
      ...(name === "applicantType" && { seniorHighTrack: "", preferredCourse: "" }),
      ...(name === "preferredProgram" && { preferredCourse: "" }),
    };
    setFormData(updatedData);
    sessionStorage.setItem("formData", JSON.stringify(updatedData));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleCancel = () => {
    const resetData = {
      applicantType: "",
      seniorHighTrack: "",
      preferredProgram: "",
      preferredCourse: "",
    };
    setFormData(resetData);
    setErrors({});
    sessionStorage.removeItem("formData");
  };

  const validateForm = () => {
    const newErrors = {};
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
    return Object.keys(newErrors).length === 0;
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    navigate("/ApplicantProfile");
  };

  

  return (
    <div className={styles.container}>
      <ProgressHeader currentStep={currentStep} />
      <form className={styles.form} onSubmit={handleNextPage}>
        <h2 className={styles.formTitle}>Application Details</h2>

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

        {formData.applicantType === "Senior High School Graduate" && (
          <>
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
                  <option value="Information Technology - BSIT">Information Technology - BSIT</option>
                </select>
                {errors.preferredCourse && <p className={styles.error}>{errors.preferredCourse}</p>}
              </div>
            )}
          </>
        )}

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
