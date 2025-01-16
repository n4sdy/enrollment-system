import React, { useState } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import Header from "../components/Header.jsx";
import styles from "../styles/StudentPage.module.css";

const FacultyPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/faculty/login", formData);
      alert(response.data.message); // Display success message
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className={styles.studentPage}> {/* Use styles from the module */}
      {/* Left Section */}
      <div className={styles.left}>
        <Header />
      </div>

      {/* Right Section */}
      <div className={styles.right}>
        <h2 className={styles.sectionTitle}>Faculty Login</h2>
        <div className={styles.loginForm}>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="emailID">CvSU Email</label>
              <input
                type="text"
                id="emailID"
                name="emailID"
                placeholder="Enter your CvSU Email here."
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password."
                required
              />
            </div>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacultyPage;