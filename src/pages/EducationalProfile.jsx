import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProgressHeader from "./ProgressHeader"; // Import ProgressHeader


const EducationalProfile = () => {
    const [currentStep, setCurrentStep] = useState(3); // Assuming this is step 2 in the form
    
  const [formValues, setFormValues] = useState({
    elementarySchool: "",
    elementaryAddress: "",
    elementaryType: "",
    elementaryYear: "",
    juniorSchool: "",
    juniorAddress: "",
    juniorType: "",
    juniorTrack: "",
    juniorYear: "",
    seniorSchool: "",
    seniorAddress: "",
    seniorType: "",
    seniorProgram: "",
    seniorYear: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Load saved data from sessionStorage when the component mounts
  useEffect(() => {
    const savedData = sessionStorage.getItem("educationalFormValues");
    if (savedData) {
      setFormValues(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  

  const validateFields = () => {
    const newErrors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (validateFields()) {
       // Save form data to sessionStorage before navigating
       sessionStorage.setItem("educationalFormValues", JSON.stringify(formValues));
      navigate("/UploadRequirements");
    }
  };
  const handleBack = () => {
    navigate("/FamilyProfile");
  };

return (
    <div className="containers" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    {/* ProgressHeader component */}
    <ProgressHeader currentStep={currentStep} /> {/* ProgressHeader displayed at the top */}

    {/* Card Container */}
 {/* Card Container */}
 <div
          className="card shadow p-4"
          style={{
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 className="mb-4">
            <i className="bi bi-mortarboard-fill  "></i> Educational Attainment
          </h1>
          <hr className="divider" /> 
          {/* Elementary Section */}
          <section className="mb-4">
            <h5 className="text-uppercase">Elementary</h5>
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">School Last Attended:</label>
                <input 
                type="text" 
                className="form-control" 
                name="elementarySchool"
                value={formValues.elementarySchool}
                onChange={handleInputChange}/>
                {errors.elementarySchool && (
                <small className="text-danger">{errors.elementarySchool}</small>
              )}
              </div>
              <div className="col-md-3">
                <label className="form-label">School Address:</label>
                <input 
                type="text" 
                className="form-control" 
                name="elementaryAddress"
                value={formValues.elementaryAddress}
                onChange={handleInputChange}/>
                {errors.elementaryAddress && (
                <small className="text-danger">{errors.elementaryAddress}</small>
              )}
              </div>
              <div className="col-md-3">
                <label className="form-label">Type of School:</label>
                <input 
                type="text" 
                className="form-control" 
                name="elementaryType"
                value={formValues.elementaryType}
                onChange={handleInputChange}/>
                {errors.elementaryType && (
                <small className="text-danger">{errors.elementaryType}</small>
              )}
              </div>
              <div className="col-md-3">
                <label className="form-label">Year Graduated:</label>
                <input 
                type="text" 
                className="form-control" 
                name="elementaryYear"
                value={formValues.elementaryYear}
                onChange={handleInputChange}/>
                {errors.elementaryYear && (
                <small className="text-danger">{errors.elementaryYear}</small>
              )}
              </div>
            </div>
          </section>
          <hr className="divider" /> 

          {/* Junior AelementaryAddressSection */}
          <section className="mb-4">
            <h5 className="text-uppercase">Junior High School</h5>
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">School Last Attended:</label>
                <input 
                type="text" 
                className="form-control"
                name="juniorSchool" 
                value={formValues.juniorSchool}
                onChange={handleInputChange}/>
                {errors.juniorSchool && (
                <small className="text-danger">{errors.juniorSchool}</small>
              )}
              </div>
              <div className="col-md-3">
                <label className="form-label">School Address:</label>
                <input 
                type="text" 
                className="form-control" 
                name="juniorAddress"
                value={formValues.juniorAddress}
                onChange={handleInputChange}/>
                {errors.juniorAddress && (
                <small className="text-danger">{errors.juniorAddress}</small>
              )}
              </div>
              <div className="col-md-3">
                <label className="form-label">Type of School:</label>
                <input 
                type="text" 
                className="form-control"
                name="juniorType" 
                value={formValues.juniorType}
                onChange={handleInputChange}/>
                {errors.juniorType && (
                <small className="text-danger">{errors.juniorType}</small>
              )}
              </div>
              <div className="col-md-3">
                <label className="form-label">Track:</label>
                <input 
                type="text" 
                className="form-control"
                name="juniorTrack" 
                value={formValues.juniorTrack}
                onChange={handleInputChange}/>
                {errors.juniorTrack && (
                <small className="text-danger">{errors.elementarySchool}</small>
              )}
              </div>
              <div className="col-md-3">
                <label className="form-label">Year Graduated:</label>
                <input 
                type="text" 
                className="form-control" 
                name="juniorYear"
                value={formValues.juniorYear}
                onChange={handleInputChange}/>
                {errors.juniorYear && (
                <small className="text-danger">{errors.juniorYear}</small>
              )}
              </div>
            </div>
          </section>
          <hr className="divider" /> 

          {/* Senior High School Section */}
          <section className="mb-4">
            <h5 className="text-uppercase">Senior High School</h5>
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">School Last Attended:</label>
                <input 
                type="text" 
                className="form-control"
                name="seniorSchool" 
                value={formValues.seniorSchool}
                onChange={handleInputChange}/>
                {errors.seniorSchool && (
                <small className="text-danger">{errors.seniorSchool}</small>
              )}
              </div>
              <div className="col-md-3">
                <label className="form-label">School Address:</label>
                <input 
                type="text" 
                className="form-control" 
                name="seniorAddress"
                value={formValues.seniorAddress}
                onChange={handleInputChange}/>
                {errors.seniorAddress && (
                <small className="text-danger">{errors.seniorAddress}</small>
              )}
              </div>
              <div className="col-md-3">
                <label className="form-label">Type of School:</label>
                <input 
                type="text" 
                className="form-control" 
                name="seniorType"
                value={formValues.seniorType}
                onChange={handleInputChange}/>
                {errors.seniorType && (
                <small className="text-danger">{errors.seniorType}</small>
              )}
              </div>
              <div className="col-md-3">
                <label className="form-label">Course/Program:</label>
                <input 
                type="text" 
                className="form-control" 
                name="seniorProgram"
                value={formValues.seniorProgram}
                onChange={handleInputChange}/>
                {errors.seniorProgram && (
                <small className="text-danger">{errors.seniorProgram}</small>
              )}
              </div>
              <div className="col-md-3">
                <label className="form-label">Year Graduated:</label>
                <input 
                type="text" 
                className="form-control" 
                name="seniorYear"
                value={formValues.seniorYear}
                onChange={handleInputChange}/>
                {errors.seniorYear && (
                <small className="text-danger">{errors.seniorYear}</small>
              )}
              </div>
            </div>
          </section>

          {/* Nav Button */}
          <div className="d-flex justify-content-between mt-4">
            
              <button 
              type="button" 
              className="btn btn-success mt-4"
              onClick={handleBack}>
                Back Page
              </button>
            
            
              <button 
              type="submit" 
              className="btn btn-success mt-4"
              onClick={handleNextPage}>
                Next Page
              </button>
            
          </div>
        </div>
  </div>
);
};


export default EducationalProfile;