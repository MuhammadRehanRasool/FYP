import React, { useState } from "react";
import { Link } from "react-router-dom";

const Session = () => {
  const [sessions, setSessions] = useState(sessionsData);
  const [keywords, setKeywords] = useState(keywordsData);
  const [chats, setChats] = useState(chatsData);
  const [activeMember, setactiveMember] = useState("John");
  const active_member = "justify-end mr-4";
  return (
    <div className=" md:px-16 text-center h-[calc(100vh-180px)] max-h-[calc(100vh-180px)] overflow-hidden">
      <div className="flex items-start  space-x-8 h-full max-h-full overflow-hidden">
        <div className="w-[20%] h-full bg-white">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-12 mb-4"
            id="grid-state"
          >
            <option>Newly Added</option>
            <option>Old Sessions</option>
          </select>
          <div className="h-full overflow-y-auto hideScroll pb-10">
            <div className="flex flex-col space-y-3 my-5  pb-4">
              {/* Design 1  */}
              {sessions.map((session, index) => {
                return (
                  <div
                    key={index}
                    className="bg-teal-100 border-t-4 border-emerald-500 rounded-b text-emerald-800 px-4 py-3 shadow-md"
                    role="alert"
                  >
                    <div className="flex">
                      <div>
                        <p className="font-bold text-xl capitalize">
                          {" "}
                          {session.name} {index + 1}
                        </p>
                        <p className="text-xs">{session.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {sessions.map((session, index) => {
                return (
                  <div
                    key={index}
                    className="relative w-full px-4 py-3 flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500 rounded-md shadow-lg cursor-pointer"
                  >
                    <div className="absolute inset-0 border-l-4 border-teal-600 rounded-md"></div>
                    <div className="text-white">
                      <h1 className="text-xl font-bold  capitalize">
                        {session.name} {index + 1}
                      </h1>
                      <p className="text-xs">{session.desc}</p>
                    </div>
                  </div>
                );
              })}
              {sessions.map((session, index) => {
                return (
                  <div
                    key={index}
                    className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                    role="alert"
                  >
                    <h1 className="text-xl font-bold  capitalize">
                      {session.name} {index + 1}
                    </h1>
                    <p className="text-xs">{session.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-[80%] h-full space-y-4">
          <div className="text-center ">
            <h1
              className="text-4xl md:text-5xl font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate"
              data-aos="zoom-y-out"
            >
              My,
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                {" "}
                Session!{" "}
              </span>
            </h1>
          </div>

          <div className="h-[20%] ">
            <div className="flex justify-start items-start flex-wrap  gap-4">
              {keywords.map((keyword, index) => {
                if (keyword.type == "negative") {
                  return (
                    <div
                      className="py-2 px-4 border-2 border-yellow-200 rounded-full  text-xs text-yellow-800  bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                      role="alert"
                    >
                      {keyword.name}
                    </div>
                  );
                } else if (keyword.type == "neutral") {
                  return (
                    <div
                      className="py-2 px-4 text-xs border-2 border-gray-200 rounded-full  text-gray-800  bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                      role="alert"
                    >
                      {keyword.name}
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="py-2 px-4 text-xs border-2 border-green-200 rounded-full    text-green-800  bg-green-50 dark:bg-gray-800 dark:text-green-400"
                      role="alert"
                    >
                      {keyword.name}
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className="text-left h-[25%]  overflow-hidden">
            <div className="bg-gray-100  rounded-t px-4 py-2 flex justify-between items-center">
              <p className="text-gray-600 font-bold">Dr John Doe | MBBS</p>

              <p className="text-sm">Date: 28 May, 2023</p>
            </div>
            <div className="bg-gray-50 px-4 py-4 text-sm text-gray-800 h-full">
              <p className="overflow-y-auto h-full pb-10">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Delectus quas excepturi at quos fugit similique unde vitae eos
                tempora eligend incidunt eligendi Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Perferendis aliquam distinctio
                aperiam dicta est enim animi explicabo eveniet, alias laborum
                magni iusto nisi voluptates voluptatum esse minus consequatur
                consequuntur! Suscipit. ducimus dicta repellat. Eligendi
                nesciunt aspernatur explicabo officiis laborum aliquid aut
                quidem laudantium rem tempora!
              </p>
            </div>
          </div>

          <div className="h-[40%] overflow-y-auto  py-5">
            {chats.map((chat) => {
              return (
                <div
                  positionTransition
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex flex-row items-center ${
                    chat.name == activeMember && active_member
                  } `}
                >
                  <div className="relative  bg-gray-50 dark:bg-gray-800 py-3 px-4 shadow rounded-xl max-w-[86%] md:max-w-lg text-left">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-300 flex-shrink-0 text-gray-600 text-xs ">
                        {chat.name.substring(0, 1).toUpperCase()}
                      </div>
                      <span className="ml-2 text-gray-800 dark:text-gray-200 text-xs font-medium">
                        {chat.name}
                      </span>
                    </div>

                    {/* If chatbot ask a question and user select any options than It'll shows like a button otherwise its a normal */}
                    {chat?.isOptionSelected ? (
                      <button className="bg-gray-200 hover:bg-gray-400 hover:text-white text-gray-900 font-medium  rounded-lg shadow-md transition-all duration-300 min-w-[10rem] py-1 px-4 text-xs">
                        {chat.msg}
                      </button>
                    ) : (
                      <div className="text-sm md:text-sm text-gray-800 dark:text-gray-200 mb-2">
                        {chat.msg}
                      </div>
                    )}

                    {chat?.option && (
                      <div className="grid grid-cols-2 gap-2">
                        {chat.option.map((opt, index) => {
                          if (index % 2 == 0) {
                            return (
                              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 text-xs rounded-lg shadow-md transition-all duration-300 ">
                                {opt}
                              </button>
                            );
                          } else {
                            return (
                              <button className="bg-gray-200 hover:bg-gray-400 hover:text-white text-gray-900 font-medium rounded-lg shadow-md transition-all py-1 px-4 text-xs duration-300 ">
                                {opt}
                              </button>
                            );
                          }
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
const sessionsData = [
  {
    name: "session",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, repellat!",
  },
  {
    name: "session",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, repellat!",
  },
  {
    name: "session",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, repellat!",
  },
];

const keywordsData = [
  { name: "Cancer", type: "negative" },
  { name: "Common Cold", type: "positive" },
  { name: "COVID-19", type: "neutral" },
  { name: "Diabetes", type: "negative" },
  { name: "Influenza", type: "neutral" },
  { name: "Malaria", type: "positive" },
  { name: "Measles", type: "positive" },
  { name: "Pneumonia", type: "negative" },
  { name: "Tuberculosis", type: "negative" },
];

const chatsData = [
  {
    name: "Doctor Saloonke",
    msg: "Are you taking any pills?",
    option: ["Yes", "No"],
  },
  {
    name: "John",
    msg: "No.",
    isOptionSelected: true,
    selectedOption: "No",
  },
  {
    name: "Doctor Saloonke",
    msg: "Which medical conditions do you have?",
    option: null,
  },
  {
    name: "John",
    msg: "I have high blood pressure.",
  },
  {
    name: "Doctor Saloonke",
    msg: "Do you have any allergies?",
    option: ["Yes", "No"],
  },
  {
    name: "John",
    msg: "Yes.",
    isOptionSelected: true,
    selectedOption: "Yes",
  },
  {
    name: "Doctor Saloonke",
    msg: "Which allergies do you have?",
    option: null,
  },
  {
    name: "John",
    msg: "I am allergic to peanuts.",
    isOptionSelected: true,
    selectedOption: "Peanuts",
  },
  {
    name: "Doctor Saloonke",
    msg: "Do you have any medical conditions?",
    option: ["Yes", "No"],
  },
  {
    name: "John",
    msg: "Yes.",
    isOptionSelected: true,
    selectedOption: "Yes",
  },
  {
    name: "Doctor Saloonke",
    msg: "Which medical conditions do you have?",
    option: null,
  },
  {
    name: "John",
    msg: "I have high blood pressure.",
  },
  {
    name: "Doctor Saloonke",
    msg: "Which medical conditions do you have?",
    option: null,
  },
];

export default Session;
