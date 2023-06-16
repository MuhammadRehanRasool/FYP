import "./App.css";
// import Login from "./auth/Login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Register from "./auth/Register";
import Layout from "./layouts/Layout";
import Landing from "./views/Landing";
import Login from "./auth/Login";
import Home from "./views/Home";
import Test from "./views/Test";
import PatientPortal from "./patientPortal/PatientPortal";
import HowItWorks from "./views/HowItWorks";
import Navbar from "./components/Navbar";
import Session from "./views/Session";
import Profile from "./views/Profile";
import AboutUs from "./views/AboutUs";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/patient-portal" element={<PatientPortal />} /> */}
          <Route
            path="/patient-portal"
            element={
              <Layout mode="tt">
                <PatientPortal />
              </Layout>
            }
          />
          <Route path="/chat" element={<Test />} />
          <Route
            path="/patient-register"
            element={<Register mode="patient" />}
          />
          <Route path="/doctor-register" element={<Register mode="doctor" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Layout>
                <Landing />
              </Layout>
            }
          />
          <Route
            path="/about-us"
            element={
              <Layout>
                <AboutUs />
              </Layout>
            }
          />
          <Route
            path="/how-it-works"
            element={
              <Layout>
                <HowItWorks />
              </Layout>
            }
          />
          <Route
            path="/sessions"
            element={
              <Layout mode="tt">
                <Session />
              </Layout>
            }
          />
          <Route
            path="/my-profile"
            element={
              <Layout mode="tt">
                <Profile />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
