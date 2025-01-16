import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProgressHeader from "./ProgressHeader";


const FamilyProfile = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [siblings, setSiblings] = useState([{ fullName: "", age: "" }]);
  const [form, setForm] = useState({
    parent1: { name: "", relationship: "", education: "", occupation: "", employer: "", income: "", contact: "" },
    parent2: { name: "", relationship: "", education: "", occupation: "", employer: "", income: "", contact: "" },
    guardian: { name: "", relationship: "", education: "", occupation: "", employer: "", income: "", contact: "" },
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleAddSibling = () => {
    setSiblings([...siblings, { fullName: "", age: "" }]);
  };

  const handleRemoveSibling = (index) => {
    const updatedSiblings = siblings.filter((_, i) => i !== index);
    setSiblings(updatedSiblings);
  };

  const handleSiblingChange = (index, field, value) => {
    const updatedSiblings = [...siblings];
    updatedSiblings[index][field] = value;
    setSiblings(updatedSiblings);
  };

  const validate = () => {
    const newErrors = {};

    // Validate parents and guardian
    ["parent1", "parent2", "guardian"].forEach((section) => {
      const fields = form[section];
      if (!fields.name.trim()) newErrors[`${section}Name`] = "Name is required.";
      if (!fields.relationship.trim())
        newErrors[`${section}Relationship`] = "Relationship is required.";
      if (!fields.education.trim())
        newErrors[`${section}Education`] = "Education level is required.";
      if (!fields.occupation.trim())
        newErrors[`${section}Occupation`] = "Occupation is required.";
      if (!fields.employer.trim()) newErrors[`${section}Employer`] = "Employer is required.";
      if (!fields.income.trim() || isNaN(fields.income))
        newErrors[`${section}Income`] = "Valid monthly income is required.";
      if (!fields.contact.trim() || !/^\d{10,15}$/.test(fields.contact))
        newErrors[`${section}Contact`] = "Valid contact number is required.";
    });

    // Validate siblings
    siblings.forEach((sibling, index) => {
      if (!sibling.fullName.trim())
        newErrors[`siblingFullName${index}`] = "Full name is required.";
      if (!sibling.age || sibling.age <= 0)
        newErrors[`siblingAge${index}`] = "Valid age is required.";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();
  const handleNextPage = (e) => {
    e.preventDefault();
    if (validate()) {
      // Proceed to the next page
      console.log("Form data:", { form, siblings });
      navigate("/EducationalProfile");
    }
  };

  const handleBack = () => {
    setCurrentStep(0); // Return to the first step
    navigate("/ApplicantProfile"); // Replace '/previous-page' with the desired route
  };

  return (
    <div
      className="containers"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <ProgressHeader currentStep={currentStep} />

      <div
        className="card shadow p-4"
        style={{
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          flex: 1,
          overflowY: "auto",
        }}
      >
        <h1 className="mb-4">
          <i className="bi bi-people-fill"></i> Family Background
        </h1>
        <hr className="divider" />

        {/* Parents Section */}
        <div className="row">
          {["parent1", "parent2"].map((parent, idx) => (
            <div className="col-md-6" key={parent}>
              <h5>{`Parent ${idx + 1}`}</h5>
              {["name", "relationship", "education", "occupation", "employer", "income", "contact"].map((field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label">
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </label>
                  <input
                    type={field === "income" ? "number" : "text"}
                    className={`form-control ${
                      errors[`${parent}${field.charAt(0).toUpperCase() + field.slice(1)}`]
                        ? "is-invalid"
                        : ""
                    }`}
                    value={form[parent][field]}
                    onChange={(e) => handleInputChange(parent, field, e.target.value)}
                  />
                  {errors[`${parent}${field.charAt(0).toUpperCase() + field.slice(1)}`] && (
                    <div className="invalid-feedback">
                      {errors[`${parent}${field.charAt(0).toUpperCase() + field.slice(1)}`]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <hr className="divider" />

        {/* Guardian Section */}
        <div className="row">
          <div className="col-md-6">
            <h4 className="mb-3">Guardian</h4>
            {["name", "relationship", "education", "occupation", "employer", "income", "contact"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type={field === "income" ? "number" : "text"}
                  className={`form-control ${
                    errors[`guardian${field.charAt(0).toUpperCase() + field.slice(1)}`]
                      ? "is-invalid"
                      : ""
                  }`}
                  value={form.guardian[field]}
                  onChange={(e) => handleInputChange("guardian", field, e.target.value)}
                />
                {errors[`guardian${field.charAt(0).toUpperCase() + field.slice(1)}`] && (
                  <div className="invalid-feedback">
                    {errors[`guardian${field.charAt(0).toUpperCase() + field.slice(1)}`]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Siblings Section */}
          <div className="col-md-6">
            <h4 className="mb-3">Siblings</h4>
            {siblings.map((sibling, index) => (
              <div className="d-flex align-items-center mb-3" key={index}>
                <span className="me-2">{index + 1}</span>
                <div className="me-2" style={{ flex: 1 }}>
                  <input
                    type="text"
                    className={`form-control ${
                      errors[`siblingFullName${index}`] ? "is-invalid" : ""
                    }`}
                    placeholder="Full Name"
                    value={sibling.fullName}
                    onChange={(e) => handleSiblingChange(index, "fullName", e.target.value)}
                  />
                  {errors[`siblingFullName${index}`] && (
                    <div className="invalid-feedback">
                      {errors[`siblingFullName${index}`]}
                    </div>
                  )}
                </div>
                <div className="me-2" style={{ width: "100px" }}>
                  <input
                    type="number"
                    className={`form-control ${
                      errors[`siblingAge${index}`] ? "is-invalid" : ""
                    }`}
                    placeholder="Age"
                    value={sibling.age}
                    onChange={(e) => handleSiblingChange(index, "age", e.target.value)}
                  />
                  {errors[`siblingAge${index}`] && (
                    <div className="invalid-feedback">
                      {errors[`siblingAge${index}`]}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-success me-2"
                  onClick={handleAddSibling}
                >
                  +
                </button>
                {siblings.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveSibling(index)}
                  >
                    -
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-4">
          
            <button type="button"
            className="btn btn-success mt-4"
            onClick={handleBack}
            >
              Back Page
              </button>
          
          <button
            type="submit"
            className="btn btn-success mt-4"
            onClick={handleNextPage}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default FamilyProfile;
