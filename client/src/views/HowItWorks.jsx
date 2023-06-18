import React, { useState } from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const [steps, setSteps] = useState([
    {
      title: "User Registration",
      desc: "Users create an account on ChatDoc, providing their basic information and medical history, ensuring a personalized healthcare experience.",
    },
    {
      title: "Symptom Assessment",
      desc: "Users engage in a conversation with ChatDoc, answering a series of questions about their symptoms and health concerns, providing relevant details for accurate evaluation.",
    },
    {
      title: "Secure Data Transmission",
      desc: "Once the user submits their responses, ChatDoc securely transfers the information to a qualified doctor, ensuring privacy and confidentiality.",
    },
    {
      title: "Doctor Evaluation",
      desc: "A specialized doctor reviews the user's inputs, carefully analyzing the provided information, and leveraging their medical expertise to evaluate the symptoms.",
    },
    {
      title: "Personalized Prescription",
      desc: "Based on the evaluation, the doctor formulates a personalized prescription, including medication recommendations, dosage instructions, and any additional medical advice deemed necessary.",
    },
    {
      title: "Prescription Delivery",
      desc: "The doctor's prescription is securely transmitted back to the user through ChatDoc. Users can conveniently access and review the prescription within the application.",
    },
  ]);

  return (
    <div>
      <div className="text-center mt-10 md:pb-16">
        <h1
          className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate"
          data-aos="zoom-y-out"
        >
          How it Works,
          <br />
          <div className="my-5"></div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            {" "}
            Let's Check{" "}
          </span>
          it
        </h1>

        <div class="my-10 relative w-full h-[20vh] overflow-hidden">
          <img
            src="https://wallpaperaccess.com/full/3275630.jpg"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xl text-gray-600 mb-8 aos-init aos-animate"
            data-aos="zoom-y-out"
            data-aos-delay={150}
          >
            Unlock the power of ChatDoc and experience healthcare at your
            fingertips. From expert medical advice to personalized
            prescriptions, let ChatDoc work its magic and bring wellness
            straight to you, making healthcare a breeze.
          </p>
          <div
            className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center aos-init aos-animate"
            data-aos="zoom-y-out"
            data-aos-delay={300}
          >
            <div>
              <Link
                className="bg-gradient-to-r px-5 py-3 rounded from-blue-500 to-teal-400 btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
                to="#0"
              >
                Start Chat
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Timeline --> */}
      <div className="container  mx-auto w-full h-full">
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div
            className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
            style={{ left: "50%" }}
          ></div>

          {steps.map((elem, index) => {
            return index % 2 == 0 ? (
              <>
                {" "}
                <div className="mb-8 flex justify-between items-center w-full right-timeline">
                  <div className="order-1 w-5/12"></div>
                  <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                    <h1 className="mx-auto font-semibold text-lg text-white">
                      {index + 1}
                    </h1>
                  </div>
                  <div className="order-1 bg-gray-100 rounded-lg shadow-xl w-5/12 px-6 py-4">
                    <h3 className="mb-3 font-bold text-gray-800 text-xl">
                      {elem?.title}
                    </h3>
                    <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                      {elem?.desc}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                  <div className="order-1 w-5/12"></div>
                  <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                    <h1 className="mx-auto text-white font-semibold text-lg">
                      {index + 1}
                    </h1>
                  </div>
                  <div className="order-1 bg-blue-500 rounded-lg shadow-xl w-5/12 px-6 py-4">
                    <h3 className="mb-3 font-bold text-white text-xl">
                      {elem?.title}
                    </h3>
                    <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">
                      {elem?.desc}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
