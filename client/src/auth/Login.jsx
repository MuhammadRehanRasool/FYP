import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { axiosInstance } from "../axiosApi";
import {
  CONSTANT,
  setMessage,
  resetMessage,
  checkLoginFromLogin,
  capitalizeFirstLetter,
} from "../CONSTANT";

const Login = (props) => {
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (checkLoginFromLogin()) {
  //     //   navigate("/");
  //     }
  //   }, []);

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
      className="my-20 w-full bottom-0 flex flex-col items-center justify-center bg-login"
    >
      {" "}
      <Link to="/">
        <h5
          className="text-md text-left font-bold leading-tighter tracking-tighter mb-4 aos-init aos-animate"
          data-aos="zoom-y-out"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            {"← Go Back"}
          </span>
        </h5>
      </Link>
      <h1
        className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate"
        data-aos="zoom-y-out"
      >
        Login as
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          {" "}
          {capitalizeFirstLetter(props.mode)}
        </span>
      </h1>
      <div className="w-full max-w-lg mt-10">
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Email/Username
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="johndoe@gmail.com"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="password"
              placeholder="************"
            />
          </div>
        </div>
        <div className="my-5"></div>
        <div className="flex flex-col items-center mb-5">
          <p className="mt-1 text-sm font-light text-gray-800">
            Don't have a account?
            <Link
              className="ml-1 font-medium text-blue-400"
              to={`/${props.mode}-register`}
            >
              Register now.
            </Link>
          </p>
          {props.mode === "patient" ? (
            <p className="mt-1 text-sm font-light text-gray-800">
              Want to access doctor portal?
              <Link
                className="ml-1 font-medium text-blue-400"
                to={`/${"doctor"}-login`}
              >
                Login here.
              </Link>
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-center">
          <Link
            to="/patient-portal"
            className="text-center bg-gradient-to-r px-5 py-3 rounded from-blue-500 to-teal-400 btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
          >
            Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
