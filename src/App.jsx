import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../src/pages/landingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import StudentPage from './pages/StudentPage.jsx';
import FacultyPage from './pages/FacultyPage.jsx';
import RegistrationForm from './pages/RegistrationForm.jsx';
import ApplicantProfile from './pages/ApplicantProfile.jsx';
import FamilyProfile from './pages/FamilyProfile.jsx';
import EducationalProfile from './pages/EducationalProfile.jsx';
import UploadRequirements from './pages/UploadRequirements.jsx';
import ScheduleAppointment from './pages/ScheduleAppointment.jsx';



function App() {

  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/StudentPage" element={<StudentPage />} />
        <Route path="/FacultyPage" element={<FacultyPage />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/ApplicantProfile" element={<ApplicantProfile />} />
        <Route path="/FamilyProfile" element={<FamilyProfile />} />
        <Route path="/EducationalProfile" element={<EducationalProfile />} />
        <Route path="/UploadRequirements" element={<UploadRequirements />} />
        <Route path="/ScheduleAppointment" element={<ScheduleAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
