import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <div className="w-full">
        <div className="">
          <div className="text-center mt-10 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate"
              data-aos="zoom-y-out"
            >
              Our Story
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8 aos-init aos-animate"
                data-aos="zoom-y-out"
                data-aos-delay={150}
              >
                We are an AI chatbot platform that assists patients in
                understanding their diseases, asking questions, and generating
                keywords for better diagnosis.
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
            <h1 className="text-3xl text-gray-800 mb-8">What We Offer</h1>
            <p className="text-md text-gray-800 mb-8">
              ChatDoc provides the best solutions for:
            </p>
            <div className="flex justify-center items-center">
              <div className="cursor-pointer mx-2 max-w-sm p-6 bg-white border border-blue-500 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
                <a href="#">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    Understanding Symptoms
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                  ChatDoc assists in finding the appropriate treatment options
                  for your condition.
                </p>
              </div>

              <div className="cursor-pointer mx-2 max-w-sm p-6 bg-white border border-blue-500 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
                <a href="#">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    Finding the Right Treatment
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                  ChatDoc assists in finding the appropriate treatment options
                  for your condition.
                </p>
              </div>
              <div className="cursor-pointer mx-2 max-w-sm p-6 bg-white border border-blue-500 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
                <a href="#">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    Financial Considerations
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                  Use ChatDoc to explore the financial coverage options related
                  to your healthcare.
                </p>
              </div>
            </div>
          </div>

          <span
            className=""
            style={{
              backgroundImage:
                "url('https://cdn.sanity.io/images/0b678gck/buoy-public-site/26ad698e8dcdb89f3d5499999ad57915bd01c703-1086x352.svg?w=1990&q=70&auto=format&dpr=1')",
            }}
          ></span>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
