import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { axiosInstance } from "../axiosApi";
import {
  CONSTANT,
  setMessage,
  resetMessage,
  checkLoginFromLogin,
} from "../CONSTANT";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (checkLoginFromLogin()) {
      navigate("/");
    }
  }, []);

  const __init = {
    username: "",
    email: "",
    password: "",
    name: "",
  };
  const [credentials, setCredentials] = useState(__init);
  const changeCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const regsiter = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();
    if (
      credentials.email !== "" &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(credentials.email)
    ) {
      if (
        credentials.password !== "" &&
        credentials.username !== "" &&
        credentials.name !== ""
      ) {
        await axiosInstance
          .post("authentication/users", {
            ...credentials,
          })
          .then((responce) => {
            if (responce.status === 200) {
              let res = responce.data;
              if (res.message) {
                let message = "";
                if (res.message.email) {
                  message += "Email : ";
                  message += "Already exists!" + "<br/>";
                }
                if (res.message.username) {
                  message += "Username : ";
                  message += "Already exists!" + "<br/>";
                }
                if (res.message.password) {
                  message += "Password : ";
                  message +=
                    res.message.password.map((a, b) => {
                      return a + " ";
                    }) + "<br/>";
                }
                if (res.message.name) {
                  message += "Name : ";
                  message +=
                    res.message.name.map((a, b) => {
                      return a + " ";
                    }) + "<br/>";
                }
                setMessage(message, "red-500");
              } else {
                axiosInstance
                  .post("authentication/token/obtain", {
                    username: credentials.username,
                    password: credentials.password,
                  })
                  .then((response) => {
                    if (response.data) {
                      axiosInstance.defaults.headers["Authorization"] =
                        "JWT " + response.data.access;
                      localStorage.setItem(
                        "access_token",
                        response.data.access
                      );
                      localStorage.setItem(
                        "refresh_token",
                        response.data.refresh
                      );
                      localStorage.setItem(
                        "loggedin",
                        JSON.stringify({
                          data: {
                            id: response.data.id,
                            name: response.data.name,
                            email: response.data.email,
                            username: response.data.username,
                            name: response.data.name,
                            signedUpAt: response.data.signedUpAt,
                          },
                        })
                      );
                      navigate("/");
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setMessage("Fill All Fields", "red-500");
      }
    } else {
      setMessage("Please Enter Valid Email", "red-500");
    }
    e.target.style.pointerEvents = "unset";
    e.target.innerHTML = "Register";
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      className=" py-4 absolute w-screen bottom-0 h-[calc(100vh-4rem)] flex items-center justify-center bg-login"
    >
      <div className="container mx-auto p-4 bg-white">
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
          <h1 className="text-lg font-bold">Create a new account</h1>
          <div className="flex flex-col mt-4">
            <div className="relative mb-5">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="name"
                value={credentials.name}
                onChange={changeCredentials}
                id="default-search"
                className="block p-4 pl-12 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
                required
              />
            </div>
            <div className="relative mb-5">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={changeCredentials}
                id="default-search"
                className="block p-4 pl-12 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Username"
                required
              />
            </div>
            <div className="relative mb-5">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={changeCredentials}
                id="default-search"
                className="block p-4 pl-12 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email"
                required
              />
            </div>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={changeCredentials}
                id="default-search"
                className="block p-4 pl-12 w-full outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
                required
              />
            </div>

            <button
              className="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center  font-medium "
              onClick={regsiter}
            >
              Register
            </button>
            <div className="my-10" id="error" style={{ display: "none" }}></div>
            <div className="flex flex-col items-center mt-5">
              <p className="mt-1 text-xs font-light text-gray-500">
                Already a member?
                <Link to="/" className="ml-1 font-medium text-blue-700">
                  login now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
