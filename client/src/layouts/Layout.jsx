import React, { useState, useEffect, useContext } from "react";
// import "./../css/Layout.css";
import { useNavigate, Link } from "react-router-dom";
import { checkLoginFromNonLogin } from "../CONSTANT";
import Navbar from "./../components/Navbar";
import UserData from "../contexts/UserData";
import axios from "axios";

function Layout(props) {
  let navigate = useNavigate();
  // useEffect(() => {
  //   if (checkLoginFromNonLogin()) {
  //     // navigate("/login");
  //     navigate("/patient-login");
  //   }
  // }, []);
  let __init_session = {
    access_token: "",
    personal: {
      id: "",
      firstName: "",
      lastName: "",
      username: "",
      gender: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      country: "",
      state: "",
      street: "",
      existingConditions: "",
      allergies: "",
      currentMedications: "",
      days: "",
      hours: "",
      speciality: "",
      affiliation: "",
      timestamp: "",
    },
    isLoggedIn: false,
  };
  const [session, setSession] = useState(__init_session);
  useEffect(() => {
    let sessionData = JSON.parse(sessionStorage.getItem("loggedin"));
    if (sessionData) {
      setSession({
        access_token: "",
        personal: sessionData.data,
        isLoggedIn: true,
      });
    }
  }, []);
  const value = { session, setSession };
  if (props.mode === "navbar-less") {
    return (
      <UserData.Provider value={value}>{props.children}</UserData.Provider>
    );
  }

  return (
    <UserData.Provider value={value}>
      <div className="__Layout">
        <Navbar
          isLoggedIn={session.isLoggedIn}
          __init_session={__init_session}
          setSession={setSession}
          mode={props?.mode}
        />
        <div className="mt-5">{props.children}</div>
      </div>
    </UserData.Provider>
  );
}
export default Layout;
