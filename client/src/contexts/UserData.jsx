import React from "react";

const UserData = React.createContext({
  session: {
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
  },
  setSession: () => {},
});

export default UserData;
