import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProgressHeader from "./ProgressHeader"; // Import the ProgressHeader component
import styles from "../styles/ProgressHeader.module.css"; // Import CSS module for ProgressHeader

const UploadRequirements = () => {
  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [missingFilesError, setMissingFilesError] = useState(false);
  const [currentStep, setCurrentStep] = useState(4); // Assuming you are on step 4 (Upload Requirements)

  // Validation constants
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];
  const REQUIRED_FILES = [
    "grade11_1st",
    "grade11_2nd",
    "grade12_1st",
    "grade12_2nd",
    "certificate_form_137",
  ];

  // Handle image change for preview and validation
  const handleImageChange = async (e, key) => {
    const file = e.target.files[0];

    if (file) {
      // File type validation
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setValidationErrors((prev) => ({
          ...prev,
          [key]: "Only JPG and PNG files are allowed.",
        }));
        return;
      }

      // File size validation
      if (file.size > MAX_FILE_SIZE) {
        setValidationErrors((prev) => ({
          ...prev,
          [key]: "File size must not exceed 5MB.",
        }));
        return;
      }

      // If validation passes, clear previous errors
      setValidationErrors((prev) => ({ ...prev, [key]: null }));
      setMissingFilesError(false);

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews((prev) => ({
          ...prev,
          [key]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (key) => {
    setImagePreviews((prev) => {
      const updatedPreviews = { ...prev };
      delete updatedPreviews[key];
      return updatedPreviews;
    });
  };

  // Validate all required files before proceeding
  const validateAndProceed = () => {
    const missingFiles = REQUIRED_FILES.filter((key) => !imagePreviews[key]);

    if (missingFiles.length > 0) {
      setMissingFilesError(true);
    } else {
      setMissingFilesError(false);
      navigate("/ScheduleAppointment");
    }
  };

  // Render Upload Box
  const renderUploadBox = (key, label) => (
    <label
      className="upload-box border position-relative"
      style={{
        width: "150px",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        overflow: "hidden",
        backgroundColor: "#f8f9fa",
        cursor: "pointer",
        border: "2px dashed #6c757d",
      }}
    >
      {imagePreviews[key] ? (
        <>
          <img
            src={imagePreviews[key]}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <button
            type="button"
            className="btn btn-danger btn-sm position-absolute"
            style={{ top: "5px", right: "5px" }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from triggering file input
              handleDeleteImage(key);
            }}
          >
            X
          </button>
        </>
      ) : (
        <span className="text-muted text-center">{label}</span>
      )}
      <input
        type="file"
        className="form-control d-none"
        accept="image/*"
        onChange={(e) => handleImageChange(e, key)}
      />
      {validationErrors[key] && (
        <div
          className="text-danger position-absolute"
          style={{
            bottom: "-20px",
            fontSize: "12px",
          }}
        >
          {validationErrors[key]}
        </div>
      )}
    </label>
  );

  return (
    <div
      className="card shadow p-4"
      style={{
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Include ProgressHeader at the top */}
      <ProgressHeader currentStep={currentStep} />

      <div>
        <h1 className="mb-4">
          <i className="bi bi-paperclip"></i> Requirements
        </h1>
        <hr />

        {/* Grade 11 Report Card */}
        <section className="mb-4">
          <h5>Grade 11 Report Card</h5>
          <div className="d-flex flex-wrap gap-3">
            {renderUploadBox("grade11_1st", "1st Semester")}
            {renderUploadBox("grade11_2nd", "2nd Semester")}
          </div>
        </section>
        <hr />

        {/* Grade 12 Report Card */}
        <section className="mb-4">
          <h5>Grade 12 Report Card</h5>
          <div className="d-flex flex-wrap gap-3">
            {renderUploadBox("grade12_1st", "1st Semester")}
            {renderUploadBox("grade12_2nd", "2nd Semester")}
          </div>
        </section>
        <hr />

        {/* Certificate of Non-Issuance of Form 137 */}
        <section className="mb-4">
          <h5>Certificate of Non-Issuance of Form 137</h5>
          {renderUploadBox("certificate_form_137", "Upload Certificate")}
        </section>

        {/* Error message if files are missing */}
        {missingFilesError && (
          <div className="text-danger mb-3">
            Please upload all required files before proceeding.
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <Link to="/EducationalProfile">
            <button type="button" className="btn btn-success">
              Back Page
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-success"
            onClick={validateAndProceed}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadRequirements;
