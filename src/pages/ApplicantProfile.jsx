import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressHeader from "./ProgressHeader"; // Import ProgressHeader
import styles from '../styles/ApplicantProfile.module.css';

const ApplicantProfile = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formValues, setFormValues] = useState({
    givenName: "",
    middleName: "",
    middleNameNotApplicable: false,
    familyName: "",
    suffix: "",
    sex: "",
    dateOfBirth: "",
    age:"",
    civilStatus: "",
    contactNumber: "",
    religion: "",
    nationality: "",
    emailAddress: "",
    addressLine1: "",
    addressLine2: "",
    subd:"",
    city: "",
    province: "",
    postalCode: "",
    district: "",
    municipality:"",
    region:"",
    hasDisability: false,
    disabilityNature: "",
    partOfIndigenousGroup: false,
    indigenousGroup: "",
    photo: null, // state to hold photo data
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const [isOpen, setIsOpen] = useState(true); // For mobile sidenav toggle
  
  // Load form data from session storage when the component mounts
  useEffect(() => {
    const savedFormValues = JSON.parse(sessionStorage.getItem("formValues"));
    if (savedFormValues) {
      setFormValues(savedFormValues);
    }
  }, []);
  

  // Handle image change for preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileSizeInKB = file.size / 1024; // Convert size to KB

      if (fileSizeInKB > 200) {
        setErrorMessage(
          "File size exceeds 200 KB. Please upload a smaller image."
        );
        e.target.value = ""; // Clear the file input to allow the user to select another file
        return;
      }

      setErrorMessage(""); // Reset error message if file size is valid

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handlePreviewClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value };
      sessionStorage.setItem("formValues", JSON.stringify(updatedValues));
      return updatedValues;
    });
    

    // Real-time validation
    validateField(name, value);
  };

  // Validate a single field
  const validateField = (name, value) => {
  let error = "";

  switch (name) {
    case "familyName":
    case "middleName": 
    case "religion":
    case "nationality":
    case "sex":  
    case "civilStatus":
    case "addressLine1":
    case "addressLine2":
    case "subd":
    case "city":
    case "province":
    case "postalCode":
    case "district":
    case "municipality":
    case "region":
    case "givenName":
      if (!value) error = "This field is required.";
      else if (value.length < 2) error = "Must be at least 2 characters.";
      break;
    case "contactNumber":
      if (!value) error = "This field is required.";
      else if (!/^\d{10,15}$/.test(value))
        error = "Must be a valid phone number (10-15 digits).";
      break;
    case "emailAddress":
      if (!value) error = "This field is required.";
      else if (!/\S+@\S+\.\S+/.test(value))
        error = "Must be a valid email address.";
      break;
    case "age":
    case "dateOfBirth":
      if (!value) error = "This field is required.";
      else {
        const age = calculateAge(value);
        if (age < 18) error = "Must be at least 18 years old.";
      }
      break;
    default:
      break;
  }
  setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  return error;
};

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
};  
const handleDOBChange = (e) => {
  const value = e.target.value;
    setFormValues((prev) => {
      const updatedValues = {
        ...prev,
        dateOfBirth: value,
        age: calculateAge(value),
      };
      sessionStorage.setItem("formValues", JSON.stringify(updatedValues));
      return updatedValues;
    });
};


  // Validate the entire form
  const validateForm = () => {
    const newErrors = {};
  
    // Validate all fields
    Object.entries(formValues).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
  
    setErrors(newErrors);
  
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  
  const navigate = useNavigate();  
  
  const handleNextPage = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/FamilyProfile");
    }
  };

  // Handle navigation to the previous page
  const handleBack = () => {
    setCurrentStep(0); // Return to the first step
    navigate("/RegistrationForm"); // Replace '/previous-page' with the desired route
  };

  return (
    <div>
      {/* ProgressHeader displayed at the top */}
      <ProgressHeader currentStep={1} />

      {/* Main Content */}
      <div
        className="card shadow p-4"
        style={{
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit= {handleNextPage}>
          <h1 className="mb-4 text-center">
            <i className="bi bi-person-fill"></i> Personal Information
          </h1>
          <div className="row mb-4">
            {/* Image Upload on the Left */}
            <div className="col-md-3 d-flex flex-column align-items-center">
              <div
                className="border rounded mb-2"
                onClick={handlePreviewClick}
                style={{
                  width: "150px",
                  height: "150px",
                  cursor: "pointer",
                  backgroundColor: "#f8f9fa",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span className="text-muted text-center">
                    Click to upload
                    <br />
                    2x2
                  </span>
                )}
              </div>
              <input
                id="fileInput"
                type="file"
                className="form-control d-none"
                accept="image/*"
                onChange={handleImageChange}
              />
              {/* Center the label */}
              <small className="text-muted text-center mt-2">
                Photo (200 KB max.)
              </small>
              {/* Display error message if the file size is too large */}
              {errorMessage && (
                <div className="text-danger text-center mt-2">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Personal Information and Address on the Right */}
            <div className="col-md-9">
              <h5>Personal Information</h5>
              {/* Personal Information */}
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Family Name:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="familyName"
                  value={formValues.familyName}
                  onChange={handleInputChange}/>
                  {errors.familyName && (
                  <small className="text-danger">{errors.familyName}</small>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">First Name:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="givenName"
                  value={formValues.givenName}
                  onChange={handleInputChange}/>
                  {errors.givenName && (
                  <small className="text-danger">{errors.givenName}</small>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Middle Name:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="middleName"
                  value={formValues.middleName}
                  onChange={handleInputChange}/>
                  {errors.middleName && (
                  <small className="text-danger">{errors.middleName}</small>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Suffix (Optional):</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="suffix"
                  value={formValues.suffix}
                  onChange={handleInputChange}/>
                  {errors.suffix && (
                  <small className="text-danger">{errors.suffix}</small>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Date of Birth:</label>
                  <input 
                  type="date" 
                  className="form-control" 
                  name="dateOfBirth"
                  value={formValues.dateOfBirth}
                  onChange={handleDOBChange}/>
                  {errors.dateOfBirth && (
                  <small className="text-danger">{errors.dateOfBirth}</small>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Contact Number:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="contactNumber"
                  value={formValues.contactNumber}
                  onChange={handleInputChange}/>
                  {errors.contactNumber && (
                  <small className="text-danger">{errors.contactNumber}</small>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Religion:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="religion"
                  value={formValues.religion}
                  onChange={handleInputChange}/>
                  {errors.religion && (
                  <small className="text-danger">{errors.religion}</small>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Citizenship:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="nationality"
                  value={formValues.nationality}
                  onChange={handleInputChange}/>
                  {errors.nationality && (
                  <small className="text-danger">{errors.nationality}</small>
                  )}
                </div>
                <div className="col-md-6">
                  {/* Gender */}
                  <label className="form-label">Gender at Birth:</label>
                  <select 
                  className="form-select" 
                  aria-label="Select gender"
                  name="sex"
                  value={formValues.sex}
                  onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.sex && <small className="text-danger">{errors.sex}</small>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Age:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="age"
                  value={formValues.age}
                  onChange={handleInputChange}/>
                  {errors.age && (
                  <small className="text-danger">{errors.age}</small>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Civil Status:</label>
                  <select 
                  className="form-select" 
                  aria-label="Select civil status"
                  name="civilStatus"
                  value={formValues.civilStatus}
                  onChange={handleInputChange}
                  >
                    <option value="">Select Civil Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="divorced">Divorced</option>
                    <option value="separated">Separated</option>
                    <option value="annulled">Annulled</option>
                  </select>
                  <small className="text-danger">{errors.civilStatus}</small>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email Address:</label>
                  <input type="text" className="form-control" 
                  name="emailAddress"
                  value={formValues.emailAddress}
                  onChange={handleInputChange}/>
                  {errors.emailAddress && (
                  <small className="text-danger">{errors.emailAddress}</small>
                  )}
                </div>
              </div>

              {/* Address Section */}
              <hr className="mt-4" />
              <h5>Permanent Address</h5>

              <div className="row g-3 mt-3">
                <div className="col-md-4">
                  <label className="form-label">Unit Number:</label>
                  <input 
                  type="text" 
                  className="form-control"
                  name="addressLine1"
                  value={formValues.addressLine1}
                  onChange={handleInputChange}/>
                  {errors.addressLine1 && (
                  <small className="text-danger">{errors.addressLine1}</small>
                  )}
                </div>
                <div className="col-md-4">
                  <label className="form-label">Street Name:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="addressLine2"
                  value={formValues.addressLine2}
                  onChange={handleInputChange}/>
                  {errors.addressLine2 && (
                  <small className="text-danger">{errors.addressLine2}</small>
                  )}
                </div>
                <div className="col-md-4">
                  <label className="form-label">Subdivision/Barangay:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="subd"
                  value={formValues.subd}
                  onChange={handleInputChange}/>
                  {errors.subd && (
                  <small className="text-danger">{errors.subd}</small>
                  )}
                </div>
                <div className="col-md-4">
                  <label className="form-label">City:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="city"
                  value={formValues.city}
                  onChange={handleInputChange}/>
                  {errors.city && (
                  <small className="text-danger">{errors.city}</small>
                  )}
                </div>
                <div className="col-md-4">
                  <label className="form-label">Province:</label>
                  <input 
                  type="text" 
                  className="form-control"
                  name="province"
                  value={formValues.province}
                  onChange={handleInputChange}/>
                  {errors.province && (
                  <small className="text-danger">{errors.province}</small>
                  )}
                </div>
                <div className="col-md-4">
                  <label className="form-label">Zip Code:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="postalCode"
                  value={formValues.postalCode}
                  onChange={handleInputChange}/>
                  {errors.postalCode && (
                  <small className="text-danger">{errors.postalCode}</small>
                  )}
                </div>
                <div className="col-md-4">
                  <label className="form-label">District:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="district"
                  value={formValues.district}
                  onChange={handleInputChange}/>
                  {errors.district && (
                  <small className="text-danger">{errors.district}</small>
                  )}
                </div>
                <div className="col-md-4">
                  <label className="form-label">Municipality:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="municipality"
                  value={formValues.municipality}
                  onChange={handleInputChange}/>
                  {errors.municipality && (
                  <small className="text-danger">{errors.municipality}</small>
                  )}
                </div>
                <div className="col-md-4">
                  <label className="form-label">Region:</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  name="region"
                  value={formValues.region}
                  onChange={handleInputChange}/>
                  {errors.region && (
                  <small className="text-danger">{errors.region}</small>
                  )}
                </div>
              </div>

              <hr className="mt-4" />
              <div className="row g-3 mt-3">
                <h5>Other Information:</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input check"
                      type="checkbox"
                      name="hasDisability"
                      checked={formValues.hasDisability}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          hasDisability: e.target.checked,
                        }))
                      }
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      I have disability
                    </label>
                  </div>
                  <br />
                  <div className="form-check">
                    <input
                      className="form-check-input check"
                      type="checkbox"
                      name="partOfIndigenousGroup"
                      checked={formValues.partOfIndigenousGroup}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          partOfIndigenousGroup: e.target.checked,
                        }))
                      }
                    />
                    
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      I am part of an indigenous group
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Buttons to navigate */}
          <div className="d-flex justify-content-between mt-4">
            
              <button type="button" 
              className="btn btn-success mt-4"
              onClick={handleBack}
              >
                Back Page
              </button>
            
            
              <button 
              type="button" 
              className="btn btn-success mt-4"
              onClick={handleNextPage} 
              >
                Next Page
              </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicantProfile;