import React, { createContext, useState, useContext } from "react";

// Create a context for the form data
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    applicantType: "",
    seniorHighTrack: "",
    preferredProgram: "",
    preferredCourse: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook for using the context
export const useFormContext = () => useContext(FormContext);
