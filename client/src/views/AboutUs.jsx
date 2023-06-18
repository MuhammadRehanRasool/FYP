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
              About Us
            </h1>

            <div class="my-10 relative w-full h-[20vh] overflow-hidden">
              <img
                src="https://c1.wallpaperflare.com/preview/532/1002/497/doctor-surgeon-operation-instruments.jpg"
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
                ChatDoc is an innovative chat-based application designed to
                provide convenient and efficient healthcare services. Through an
                intuitive interface, users can engage in a conversation with the
                application, answering a series of questions related to their
                health concerns and symptoms. Once the user submits their
                responses, ChatDoc securely transfers this information to a
                qualified doctor.
              </p>
              <p
                className="text-xl text-gray-600 mb-8 aos-init aos-animate"
                data-aos="zoom-y-out"
                data-aos-delay={150}
              >
                The doctor, who specializes in the relevant medical field,
                reviews the user's inputs and carefully evaluates the provided
                information. Leveraging their expertise and medical knowledge,
                the doctor formulates a personalized prescription tailored to
                the user's specific needs. The prescription may include
                medication recommendations, dosage instructions, and any
                additional medical advice deemed necessary.
              </p>
              <p
                className="text-xl text-gray-600 mb-8 aos-init aos-animate"
                data-aos="zoom-y-out"
                data-aos-delay={150}
              >
                Upon completion, the doctor's prescription is transmitted back
                to the user through ChatDoc's secure channel. Users can
                conveniently access and review the prescription within the
                application. ChatDoc ensures the privacy and confidentiality of
                all user data, adhering to strict security protocols and
                maintaining compliance with applicable privacy regulations.
              </p>
              <p
                className="text-xl text-gray-600 mb-8 aos-init aos-animate"
                data-aos="zoom-y-out"
                data-aos-delay={150}
              >
                This chat-based healthcare solution offers numerous benefits. It
                eliminates the need for physical visits to a doctor's office,
                saving users valuable time and resources. It also provides a
                convenient platform for seeking medical advice and obtaining
                prescriptions from the comfort of one's own home or any location
                with internet access. By leveraging technology, ChatDoc aims to
                bridge the gap between patients and healthcare professionals,
                enhancing accessibility to quality healthcare services.
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
