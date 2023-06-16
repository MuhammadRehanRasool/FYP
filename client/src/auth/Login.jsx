import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CONSTANT,
  setMessage,
  resetMessage,
  checkLoginFromLogin,
  capitalizeFirstLetter,
} from "../CONSTANT";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (checkLoginFromLogin()) {
  //     //   navigate("/");
  //     }
  //   }, []);

  const __init = {
    username: "",
    password: "",
  };

  const [payload, setPayload] = useState(__init);
  const changePayload = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();
    if (payload.username !== "") {
      if (payload.password !== "") {
        await axios
          .post(CONSTANT.server + "validate", payload)
          .then((responce) => {
            if (responce.status === 200) {
              let res = responce.data;
              if (res.message) {
                setMessage(res.message, "red-500");
              } else {
                sessionStorage.setItem(
                  "loggedin",
                  JSON.stringify({
                    data: res,
                  })
                );
                navigate("/");
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setMessage("Please enter password", "red-500");
      }
    } else {
      setMessage("Please enter username", "red-500");
    }
    e.target.style.pointerEvents = "unset";
    e.target.innerHTML = "Log In";
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
        Login
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
              id="grid-password"
              type="text"
              name="username"
              placeholder=""
              value={payload.username}
              onChange={changePayload}
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
              id="grid-password"
              type="password"
              name="password"
              placeholder=""
              value={payload.password}
              onChange={changePayload}
            />
          </div>
        </div>
        <div className="my-5"></div>
        <div className="flex flex-col items-center mb-5">
          <p className="mt-1 text-sm font-light text-gray-800">
            Don't have a account?
            <Link
              className="ml-1 font-medium text-blue-400"
              to={`/patient-register`}
            >
              Register now.
            </Link>
          </p>
          <p id="error" className="mt-3 text-sm font-light"></p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={login}
            className="text-center bg-gradient-to-r px-5 py-3 rounded from-blue-500 to-teal-400 btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
          >
            Login
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
