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

const PatientRegister = () => {
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

  //   return (
  //     <motion.div
  //       initial={{
  //         opacity: 0,
  //       }}
  //       animate={{
  //         opacity: 1,
  //       }}
  //       exit={{ opacity: 0 }}
  //       className=" py-4 absolute w-screen bottom-0 h-[calc(100vh-4rem)] flex items-center justify-center bg-login"
  //     >
  //       <div className="container mx-auto p-4 bg-white">
  //         <div className="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
  //           <h1 className="text-lg font-bold">Create a new account</h1>
  //           <div className="flex flex-col mt-4">
  //             <div className="relative mb-5">
  //               <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   fill="none"
  //                   viewBox="0 0 24 24"
  //                   strokeWidth={1.5}
  //                   stroke="currentColor"
  //                   className="w-6 h-6"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
  //                   />
  //                 </svg>
  //               </div>
  //               <input
  //                 type="text"
  //                 name="name"
  //                 value={credentials.name}
  //                 onChange={changeCredentials}
  //                 id="default-search"
  //                 className="block p-4 pl-12 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
  //                 placeholder="Name"
  //                 required
  //               />
  //             </div>
  //             <div className="relative mb-5">
  //               <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   fill="none"
  //                   viewBox="0 0 24 24"
  //                   strokeWidth={1.5}
  //                   stroke="currentColor"
  //                   className="w-6 h-6"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
  //                   />
  //                 </svg>
  //               </div>
  //               <input
  //                 type="text"
  //                 name="username"
  //                 value={credentials.username}
  //                 onChange={changeCredentials}
  //                 id="default-search"
  //                 className="block p-4 pl-12 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
  //                 placeholder="Username"
  //                 required
  //               />
  //             </div>
  //             <div className="relative mb-5">
  //               <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   fill="none"
  //                   viewBox="0 0 24 24"
  //                   strokeWidth={1.5}
  //                   stroke="currentColor"
  //                   className="w-6 h-6"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
  //                   />
  //                 </svg>
  //               </div>
  //               <input
  //                 type="email"
  //                 name="email"
  //                 value={credentials.email}
  //                 onChange={changeCredentials}
  //                 id="default-search"
  //                 className="block p-4 pl-12 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
  //                 placeholder="Email"
  //                 required
  //               />
  //             </div>
  //             <div className="relative">
  //               <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   fill="none"
  //                   viewBox="0 0 24 24"
  //                   strokeWidth={1.5}
  //                   stroke="currentColor"
  //                   className="w-6 h-6"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
  //                   />
  //                 </svg>
  //               </div>
  //               <input
  //                 type="password"
  //                 name="password"
  //                 value={credentials.password}
  //                 onChange={changeCredentials}
  //                 id="default-search"
  //                 className="block p-4 pl-12 w-full outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
  //                 placeholder="Password"
  //                 required
  //               />
  //             </div>

  //             <button
  //               className="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center  font-medium "
  //               onClick={regsiter}
  //             >
  //               Register
  //             </button>
  //             <div className="my-10" id="error" style={{ display: "none" }}></div>
  //             <div className="flex flex-col items-center mt-5">
  //               <p className="mt-1 text-xs font-light text-gray-500">
  //                 Already a member?
  //                 <Link to="/" className="ml-1 font-medium text-blue-700">
  //                   login now
  //                 </Link>
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </motion.div>
  //   );

  return (
    <div className="a1B ae[920px] aS aT an a46 a18 dark:aZ dark:a_[#1D232D] sm:a3X[70px]">
      <h3 className="a3s aE a1Y a1K a1k dark:aI sm:a1J lg:a1Y xl:a1F[40px] xl:a2E">
        Create your Account
      </h3>
      <p className="a2J aF a1K aG">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <h3 className="a1E aE a2Z a1t dark:aI">Sign Up with Social Media</h3>
      <div className="a2J a5 a9 a4g">
        <button className="a5 ah[50px] aR[50px] a9 am aS aT aF aG dark:aZ dark:a_[#2C3443] sm:a14 sm:a4h">
          <span className="sm:a2H">
            <svg
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1416_409)">
                <path
                  d="M18 9.19932C18.0109 8.58059 17.9457 7.96284 17.806 7.35938H9.18372V10.6993H14.2449C14.149 11.2849 13.9333 11.8455 13.6106 12.3473C13.288 12.8491 12.8651 13.2818 12.3674 13.6193L12.3497 13.7311L15.0761 15.8009L15.2649 15.8194C16.9995 14.2493 17.9997 11.9393 17.9997 9.19932"
                  fill="#4285F4"
                />
                <path
                  d="M9.18382 18.0003C11.6633 18.0003 13.745 17.2003 15.2655 15.8203L12.3675 13.6202C11.592 14.1503 10.5512 14.5203 9.18382 14.5203C8.02249 14.5137 6.89279 14.1488 5.955 13.4775C5.0172 12.8061 4.31894 11.8624 3.95927 10.7803L3.85164 10.7893L1.01679 12.9392L0.979736 13.0402C1.74323 14.5314 2.91494 15.7851 4.36385 16.661C5.81276 17.537 7.48174 18.0007 9.18417 18.0003"
                  fill="#34A853"
                />
                <path
                  d="M3.95921 10.7798C3.75834 10.2069 3.65469 9.60558 3.65239 8.99982C3.65609 8.39505 3.75591 7.79453 3.94828 7.21988L3.94316 7.10057L1.07355 4.91602L0.979681 4.95976C0.335608 6.21294 0.00012207 7.59658 0.00012207 8.99973C0.00012207 10.4029 0.335608 11.7865 0.979681 13.0397L3.95921 10.7798Z"
                  fill="#FBBC05"
                />
                <path
                  d="M9.1838 3.47965C10.4997 3.45963 11.7725 3.93991 12.7348 4.81971L15.3267 2.33965C13.6644 0.811346 11.463 -0.0272143 9.1838 -0.000350488C7.48139 -0.000747434 5.81242 0.462942 4.36352 1.33887C2.91461 2.2148 1.74289 3.46843 0.97937 4.95959L3.94902 7.21971C4.31223 6.13773 5.01281 5.19476 5.95199 4.52376C6.89117 3.85275 8.02156 3.48755 9.1838 3.47965Z"
                  fill="#EB4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_1416_409">
                  <rect width={18} height={18} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          <span className="ag sm:aD">Sign up with Google</span>
        </button>
        <button className="a5 ah[50px] aR[50px] a9 am aS aT dark:aZ dark:a_[#2C3443]">
          <svg
            width={28}
            height={22}
            viewBox="0 0 28 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.0729 2.58824C26.0765 3.04118 25.0024 3.33882 23.8894 3.48118C25.0282 2.79529 25.9082 1.70824 26.3224 0.401176C25.2482 1.04824 24.0576 1.50118 22.8024 1.76C21.78 0.647059 20.3435 0 18.7129 0C15.6718 0 13.1871 2.48471 13.1871 5.55176C13.1871 5.99177 13.2388 6.41882 13.3294 6.82C8.72235 6.58706 4.62 4.37412 1.88941 1.02235C1.41059 1.83765 1.13882 2.79529 1.13882 3.80471C1.13882 5.73294 2.10941 7.44118 3.61059 8.41177C2.69176 8.41177 1.83765 8.15294 1.08706 7.76471C1.08706 7.76471 1.08706 7.76471 1.08706 7.80353C1.08706 10.4953 3.00235 12.7471 5.53882 13.2518C5.07294 13.3812 4.58118 13.4459 4.07647 13.4459C3.72706 13.4459 3.37765 13.4071 3.04118 13.3424C3.74 15.5294 5.77177 17.16 8.21765 17.1988C6.32824 18.7 3.93412 19.58 1.32 19.58C0.88 19.58 0.44 19.5541 0 19.5024C2.45882 21.0812 5.38353 22 8.51529 22C18.7129 22 24.3165 13.5365 24.3165 6.19882C24.3165 5.95294 24.3165 5.72 24.3035 5.47412C25.3906 4.69765 26.3224 3.71412 27.0729 2.58824Z"
              fill="#00AFED"
            />
          </svg>
        </button>
        <button className="a5 ah[50px] aR[50px] a9 am aS aT dark:aZ dark:a_[#2C3443]">
          <svg
            width={12}
            height={22}
            viewBox="0 0 12 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.7 12.65H10.45L11.55 8.25H7.7V6.05C7.7 4.917 7.7 3.85 9.9 3.85H11.55V0.154C11.1914 0.1067 9.8373 0 8.4073 0C5.4208 0 3.3 1.8227 3.3 5.17V8.25H0V12.65H3.3V22H7.7V12.65Z"
              fill="#1877F2"
            />
          </svg>
        </button>
        <button className="a5 ah[50px] aR[50px] a9 am a4i aT dark:aZ dark:a_[#2C3443]">
          <svg
            width={23}
            height={22}
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2731 0C9.7927 0 8.32679 0.291587 6.95907 0.858113C5.59136 1.42464 4.34862 2.25501 3.30182 3.30181C1.1877 5.41593 0 8.28329 0 11.2731C0 16.2558 3.23538 20.4832 7.7108 21.9825C8.27446 22.0727 8.45483 21.7233 8.45483 21.4189C8.45483 21.1596 8.45483 20.4494 8.45483 19.5137C5.33218 20.1901 4.66706 18.0031 4.66706 18.0031C4.1485 16.6955 3.41575 16.346 3.41575 16.346C2.3899 15.6471 3.49466 15.6696 3.49466 15.6696C4.62197 15.7485 5.21945 16.8307 5.21945 16.8307C6.20021 18.5442 7.85735 18.037 8.49992 17.7664C8.60138 17.0336 8.89448 16.5376 9.21013 16.2558C6.7075 15.974 4.08086 15.0045 4.08086 10.7094C4.08086 9.45813 4.50924 8.45482 5.24199 7.65443C5.12926 7.37261 4.7347 6.2002 5.35472 4.67834C5.35472 4.67834 6.30167 4.37396 8.45483 5.82819C9.3454 5.58018 10.3149 5.45618 11.2731 5.45618C12.2313 5.45618 13.2008 5.58018 14.0914 5.82819C16.2445 4.37396 17.1915 4.67834 17.1915 4.67834C17.8115 6.2002 17.4169 7.37261 17.3042 7.65443C18.037 8.45482 18.4653 9.45813 18.4653 10.7094C18.4653 15.0158 15.8274 15.9627 13.3135 16.2445C13.7194 16.594 14.0914 17.2817 14.0914 18.3301C14.0914 19.8407 14.0914 21.0581 14.0914 21.4189C14.0914 21.7233 14.2717 22.084 14.8467 21.9825C19.3221 20.4719 22.5462 16.2558 22.5462 11.2731C22.5462 9.79269 22.2546 8.32678 21.6881 6.95907C21.1216 5.59135 20.2912 4.34862 19.2444 3.30181C18.1976 2.25501 16.9549 1.42464 15.5871 0.858113C14.2194 0.291587 12.7535 0 11.2731 0Z"
              fill="#79808A"
            />
          </svg>
        </button>
      </div>
      <div className="ac a2w a1E a5 a9 am">
        <span className="a1 a1a/2 a3 a2D ag ah[1px] a4 a1c/2 a4j dark:a_[#2E333D] sm:ai" />
        <p className="an aF a1K aG dark:a_[#1D232D] sm:a1v">
          Or create account with email
        </p>
      </div>
      <form>
        <div className="a1R a5 a6">
          <div className="a4 a1v sm:a1S/2">
            <div className="a1M">
              <label htmlFor="name" className="a3s ai aE aF a1t dark:aI">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Jhon Andrio"
                className="a4 a1x at a2e aF a1K a1t a2P a27 focus:a28 dark:a1z[#2C3443] dark:aI dark:focus:a2v"
              />
            </div>
          </div>
          <div className="a4 a1v sm:a1S/2">
            <div className="a1M">
              <label htmlFor="email" className="a3s ai aE aF a1t dark:aI">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="jhonandrio@domain.com"
                className="a4 a1x at a2e aF a1K a1t a2P a27 focus:a28 dark:a1z[#2C3443] dark:aI dark:focus:a2v"
              />
            </div>
          </div>
          <div className="a4 a1v sm:a1S/2">
            <div className="a1M">
              <label htmlFor="password" className="a3s ai aE aF a1t dark:aI">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="**********"
                className="a4 a1x at a2e aF a1K a1t a2P a27 focus:a28 dark:a1z[#2C3443] dark:aI dark:focus:a2v"
              />
            </div>
          </div>
          <div className="a4 a1v sm:a1S/2">
            <div className="a1M">
              <label htmlFor="re-password" className="a3s ai aE aF a1t dark:aI">
                Retype Password
              </label>
              <input
                type="password"
                name="re-password"
                placeholder="**********"
                className="a4 a1x at a2e aF a1K a1t a2P a27 focus:a28 dark:a1z[#2C3443] dark:aI dark:focus:a2v"
              />
            </div>
          </div>
          <div className="a4 a1v">
            <div className="a1E">
              <label
                htmlFor="supportCheckbox"
                className="a5 ae[425px] a1i a2R aG hover:aH"
              >
                <div className="ac">
                  <input type="checkbox" id="supportCheckbox" className="a1n" />
                  <div className="box a2G a2S a5 a1o a1p a9 am aS aT dark:a1z[#414652]">
                    <span className="aX">
                      <svg
                        width={11}
                        height={8}
                        viewBox="0 0 11 8"
                        fill="none"
                        className="a1q"
                      >
                        <path
                          d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                          strokeWidth="0.4"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                By creating account means you agree to the Terms and Conditions
                and our Privacy Policy
              </label>
            </div>
          </div>
          <div className="a4 a1v">
            <button className="a5 a9 am aS a16 a1N[14px] a3W a1O a1G aI">
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientRegister;
