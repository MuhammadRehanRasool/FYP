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
            it.
          </h1>
          <div class="my-10 relative w-full h-[20vh] overflow-hidden">
            <img
              src="https://c1.wallpaperflare.com/preview/532/1002/497/doctor-surgeon-operation-instruments.jpg"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black opacity-50"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p
              className="text-xl text-gray-600 mb-8 aos-init aos-animate"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Welcome to ChatDoc, where your health is our top priority! Let's
              embark on a journey towards better well-being together. Just ask a
              question, and we'll provide you with the expert guidance you need.
              Get ready to experience healthcare at your fingertips!
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
          <h1
            className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate"
            data-aos="zoom-y-out"
          >
            Best way to
            <br />
            <div className="my-1"></div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              {" "}
              learn{" "}
            </span>
            about:
          </h1>
          <div className="flex justify-center items-center mt-5">
            <div className="cursor-pointer mx-2 max-w-sm p-6 bg-white border border-blue-500 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Common Health Conditions
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Discover comprehensive information on a wide range of common
                health conditions through ChatDoc. Get detailed insights into
                symptoms, causes, prevention, and treatment options, empowering
                you with knowledge to make informed decisions about your
                well-being.
              </p>
            </div>
            <div className="cursor-pointer mx-2 max-w-sm p-6 bg-white border border-blue-500 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Medication Interactions
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                ChatDoc provides a reliable source of information on potential
                medication interactions. Learn about the possible effects of
                combining different medications and receive expert advice on how
                to safely manage your prescriptions to ensure optimal health
                outcomes.
              </p>
            </div>
            <div className="cursor-pointer mx-2 max-w-sm p-6 bg-white border border-blue-500 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Healthy Lifestyle Practices
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Explore ChatDoc to access expert guidance on maintaining a
                healthy lifestyle. Learn about nutrition, exercise, stress
                management, and other wellness practices to improve your overall
                well-being. ChatDoc can be your trusted companion on the journey
                to a healthier and happier life.
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
