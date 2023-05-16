import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div className="w-full">
      <div className="">
        <div className="text-center mt-10 md:pb-16">
          <h1
            className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate"
            data-aos="zoom-y-out"
          >
            When something feels off,
            <br />
            <div className="my-5"></div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              {" "}
              ChatDoc{" "}
            </span>
            it
          </h1>
          <div className="max-w-3xl mx-auto">
            <p
              className="text-xl text-gray-600 mb-8 aos-init aos-animate"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              We help people solve their health problems and find the right
              treatment
            </p>
            <div
              className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center aos-init aos-animate"
              data-aos="zoom-y-out"
              data-aos-delay={300}
            >
              <div>
                <Link
                  className="bg-gradient-to-r px-5 py-3 rounded from-blue-500 to-teal-400 btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
                  to="/chat"
                >
                  Start Chat
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 md:pb-16">
          <h1 className="text-3xl text-gray-800 mb-8 aos-init aos-animate">
            Answers, options, onward
          </h1>
          <p className="text-md text-gray-800 mb-8 aos-init aos-animate">
            ChatDoc is the best way to learn about:
          </p>
          <div className="flex justify-center items-center">
            <div className="cursor-pointer mx-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  What's going on
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                ChatDoc listens and helps you make sense of symptoms
              </p>
            </div>
            <div className="cursor-pointer mx-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  How to fix it
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Self-care or urgent care? ChatDoc provides the right next steps
              </p>
            </div>
            <div className="cursor-pointer mx-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Whether you're covered
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Use ChatDoc to see which options make most sense financially
              </p>
            </div>
          </div>
        </div>
        <span
          className=""
          style={{
            backgroundImage:
              "https://cdn.sanity.io/images/0b678gck/buoy-public-site/26ad698e8dcdb89f3d5499999ad57915bd01c703-1086x352.svg?w=1990&q=70&auto=format&dpr=1",
          }}
        ></span>
      </div>
      <Footer />
    </div>
  );
}
