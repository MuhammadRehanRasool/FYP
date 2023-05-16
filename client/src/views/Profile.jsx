import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile(props) {
  // form field change based on mode
  const [mode, setMode] = useState("patient");
  const __init = {
    firstName: "Bruce",
    lastName: "Wayne",
    gender: "Male",
    dateOfBirth: "05/01/2003",
    phoneNumber: "032211342",
    emailAddress: "brucewayne@anywhere.com",
    existingConditions: "High Blood Pressure",
    country: "Pakistan",
    city: "Karachi",
    alergies: "Skin",
    currentMedications: "cipralex",
    street: "DHA Phase II , Street 4",
    days: "Monday",
    hours: "10",
    speciality: "Heart",
    affiliation: "MBBS",
  };
  const [credentials, setCredentials] = useState(__init);
  const [editInformation, setEditInformation] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const renderNormalDiv = (text) => {
    return (
      <div className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 text-left px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ">
        {text}
      </div>
    );
  };
  const renderInput = (fieldName, type) => {
    // console.log(fieldName, type, credentials[fieldName]);
    return (
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={fieldName}
        type="text"
        placeholder={fieldName}
        name={fieldName}
        value={credentials[fieldName]}
        onChange={handleChange}
      />
    );
  };
  return (
    <div className="w-full">
      <div className="">
        <div className="text-center mt-10 md:pb-16 max-w-lg mx-auto">
          <div className="flex items-center justify-center space-x-10">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate text-gray-700"
              data-aos="zoom-y-out"
            >
              {editInformation && "Edit "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                {" "}
                Profile!{" "}
              </span>
            </h1>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => setEditInformation(!editInformation)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>

          <div className="w-full max-w-lg mt-10 mx-auto">
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>

                {editInformation
                  ? renderInput("firstName", "text")
                  : renderNormalDiv(credentials.firstName)}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                {editInformation
                  ? renderInput("lastName", "text")
                  : renderNormalDiv(credentials.lastName)}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Gender
                </label>

                {editInformation ? (
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="gender"
                      value={credentials.gender}
                      onChange={handleChange}
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  renderNormalDiv(credentials.gender)
                )}
              </div>{" "}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Date of Birth
                </label>
                {editInformation
                  ? renderInput("dateOfBirth", "date")
                  : renderNormalDiv(credentials.dateOfBirth)}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Phone Number
                </label>

                {editInformation
                  ? renderInput("phoneNumber", "number")
                  : renderNormalDiv(credentials.phoneNumber)}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email Address
                </label>

                {editInformation
                  ? renderInput("emailAddress", "email")
                  : renderNormalDiv(credentials.emailAddress)}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Country
                </label>

                {editInformation ? (
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="country"
                      value={credentials.country}
                      onChange={handleChange}
                    >
                      <option>Pakistan</option>
                      <option>India</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  renderNormalDiv(credentials.country)
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  City
                </label>
                {editInformation ? (
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="city"
                      value={credentials.city}
                      onChange={handleChange}
                    >
                      <option>Karachi</option>
                      <option>Larkana</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  renderNormalDiv(credentials.city)
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-zip"
                >
                  Street
                </label>
                {editInformation
                  ? renderInput("street", "text")
                  : renderNormalDiv(credentials.street)}
              </div>
            </div>

            {mode === "patient" ? (
              <>
                {" "}
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Existing Conditions
                    </label>

                    {editInformation
                      ? renderInput("existingConditions", "text")
                      : renderNormalDiv(credentials.existingConditions)}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Allergies
                    </label>

                    {editInformation
                      ? renderInput("alergies", "text")
                      : renderNormalDiv(credentials.alergies)}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Current Medications
                    </label>
                    {editInformation
                      ? renderInput("currentMedications", "text")
                      : renderNormalDiv(credentials.currentMedications)}
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Days
                    </label>

                    {editInformation
                      ? renderInput("days", "text")
                      : renderNormalDiv(credentials.days)}
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Hours
                    </label>
                    {editInformation
                      ? renderInput("hours", "text")
                      : renderNormalDiv(credentials.hours)}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/1 px-3 mb-6 md:mb-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Speciality
                    </label>
                    {editInformation
                      ? renderInput("speciality", "text")
                      : renderNormalDiv(credentials.speciality)}
                  </div>
                  <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Affiliation
                    </label>
                    {editInformation
                      ? renderInput("affiliation", "text")
                      : renderNormalDiv(credentials.affiliation)}
                  </div>
                </div>
              </>
            )}

            {editInformation && (
              <div className="flex items-center justify-center w-full mt-5">
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload Profile Image</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            )}
            <div className="my-5"></div>

            {editInformation && (
              <div className="flex justify-center">
                <button className="text-center bg-gradient-to-r px-5 py-3 rounded from-blue-500 to-teal-400 btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
