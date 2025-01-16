import React, { createContext, useState } from "react";

// Create a Context
export const FormContext = createContext();

// Create a Provider Component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    applicationDetails: {},
    applicantProfile: {},
    familyProfile: {},
    educationalProfile: {},
    uploadRequirements: {},
    scheduleAppointment: {},
  });

  // Update specific section of the form data
  const updateFormData = (pageData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...pageData, // Merge new data with the existing formData
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
