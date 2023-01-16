import "./App.css";
// import Login from "./auth/Login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Register from "./auth/Register";
import Layout from "./Layouts/Layout";
import Landing from "./views/Landing";
// import Home from "./views/Home";
// import Subscription from "./views/Subscription";
// import Profile from "./views/Profile";
// import DetailedSubscription from "./views/GetSubscription";
// import TakeMeToAdmin from "./components/TakeMeToAdmin";
// import GetSubscription from "./views/GetSubscription";
// import ExploreSubscription from "./views/ExploreSubscription";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route
            path="/"
            exact
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} /> */}
          <Route path="/patient-register" element={<Register mode="patient"/>} />
          <Route path="/doctor-register" element={<Register mode="doctor"/>} />
          <Route path="/" element={<Landing />} />
          {/* <Route
            path="/subscriptions"
            element={
              <Layout>
                <Subscription />
              </Layout>
            }
          />
          <Route
            path="/get-subscription/:id"
            element={
              <Layout>
                <GetSubscription />
              </Layout>
            }
          />
          <Route
            path="/explore-quiz/:id"
            element={
              <Layout>
                <ExploreSubscription />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route path="/admin" element={<TakeMeToAdmin />} />
          <Route
            path="*"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
