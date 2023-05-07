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
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/patient-portal" element={<PatientPortal />} />
          <Route path="/chat" element={<Test />} />
          <Route
            path="/patient-register"
            element={<Register mode="patient" />}
          />
          <Route path="/doctor-register" element={<Register mode="doctor" />} />
          <Route path="/patient-login" element={<Login mode="patient" />} />
          <Route path="/doctor-login" element={<Login mode="doctor" />} />
          <Route
            path="/"
            element={
              <Layout>
                <Landing />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
