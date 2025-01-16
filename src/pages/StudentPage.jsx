import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import Header from '../components/Header.jsx';
import styles from '../styles/StudentPage.module.css';

const StudentPage = () => {
  const [formData, setFormData] = useState({ studentID: '', password: '' });
  const [message, setMessage] = useState(''); // For feedback messages

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/student/login', formData);
      setMessage(response.data.message); // Display success message
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
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
        <h2 className={styles.sectionTitle}>Student Login</h2>
        <div className={styles.loginForm}>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="studentID">Student ID</label>
              <input
                type="text"
                id="studentID"
                name="studentID"
                placeholder="Enter your student ID."
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

export default StudentPage;