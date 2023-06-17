import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserData from "../contexts/UserData";
import { CONSTANT } from "../CONSTANT.jsx";
import axios from "axios";

const Session = () => {
  const { session, setSession } = useContext(UserData);
  const active_member = "justify-end mr-4";
  const keywordStyles = {
    negative: {
      container:
        "py-2 px-4 border-2 border-yellow-200 rounded-full text-xs text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
    },
    neutral: {
      container:
        "py-2 px-4 text-xs border-2 border-gray-200 rounded-full text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300",
    },
    positive: {
      container:
        "py-2 px-4 text-xs border-2 border-green-200 rounded-full text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
    },
  };

  // For description
  const [mode, setMode] = useState(session?.personal?.userType ?? "patient");
  const [sessions, setSessions] = useState([]);
  const [activeMember, setActiveMember] = useState("Guest");
  const [sessionId, setSessionId] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (session?.personal?.id !== "") {
      setActiveMember(
        `${session?.personal?.firstName} ${session?.personal?.lastName}`
      );
    }
  }, [session]);

  const getSessions = async () => {
    await axios
      .put(CONSTANT.server + `conversation`, {
        type: "sessions",
        user_id: session?.personal?.id,
      })
      .then((payload) => {
        setSessions(payload.data);
        if (payload.data.length > 0) {
          setSessionId(payload.data[0]?.sessionId);
        }
      })
      .catch((e) => console.log(e));
  };

  const getChats = async () => {
    await axios
      .put(CONSTANT.server + `conversation`, {
        type: "chats",
        user_id: session?.personal?.id,
        session_id: sessionId,
      })
      .then((payload) => {
        setChats(
          payload.data.map((a, b) => {
            return {
              ...a,
              payload: JSON.parse(a?.payload),
            };
          })
        );
        console.log(
          payload.data.map((a, b) => {
            return {
              ...a,
              payload: JSON.parse(a?.payload),
            };
          })
        );
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (session?.personal?.id !== "") {
      getSessions();
    }
  }, [session]);

  useEffect(() => {
    if (sessionId !== "") {
      getChats();
    }
  }, [sessionId]);

  const [keywords, setKeywords] = useState(keywordsData);

  return (
    <div className=" md:px-16 text-center h-[calc(100vh-180px)] max-h-[calc(100vh-180px)] overflow-hidden">
      <div className="flex items-start  space-x-8 h-full max-h-full overflow-hidden">
        <div className="w-[20%] h-full bg-white">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 text-sm px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-8 mb-4"
            id="grid-state"
          >
            <option>Newly Added</option>
            <option>Old Sessions</option>
          </select>
          <div className="h-full overflow-y-auto hideScroll pb-10">
            <div className="flex flex-col space-y-3 my-5  pb-4">
              {sessions.map((session, index) => {
                return (
                  <div
                    key={index}
                    sessionId={session?.sessionId}
                    onClick={() => {
                      setSessionId(session.sessionId);
                    }}
                    className="cursor-pointer opacity-100 hover:opacity-70 duration-300 transition-all rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-3 shadow-md"
                  >
                    <p className="font-bold text-xl capitalize">
                      Session#{index + 1}
                    </p>
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
              My{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Sessions
              </span>
            </h1>
          </div>

          {sessionId !== "" && (
            <>
              {" "}
              <div className="h-[20%] ">
                <div className="flex justify-start items-start flex-wrap  gap-4">
                  {keywords.map((keyword, index) => {
                    const keywordStyle = keywordStyles[keyword.type];

                    return (
                      <div className={keywordStyle.container} role="alert">
                        {keyword.name}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="text-left h-[25%]  overflow-hidden">
                <div className="bg-gray-100  rounded-t px-4 py-2 flex justify-between items-center">
                  <p className="text-gray-600 font-bold">Dr John Doe | MBBS</p>

                  <p className="text-sm">Date: 28 May, 2023</p>
                </div>
                <div className="bg-gray-50 px-4 py-4 text-sm text-gray-800 h-full">
                  {mode == "doctor" ? (
                    <textarea className="w-full h-full bg-transparent outline-none"></textarea>
                  ) : (
                    <p className="overflow-y-auto h-full pb-10">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Delectus quas excepturi at quos fugit similique unde vitae
                      eos tempora eligend incidunt eligendi Lorem ipsum dolor,
                      sit amet consectetur adipisicing elit. Perferendis aliquam
                      distinctio aperiam dicta est enim animi explicabo eveniet,
                      alias laborum magni iusto nisi voluptates voluptatum esse
                      minus consequatur consequuntur! Suscipit. ducimus dicta
                      repellat. Eligendi nesciunt aspernatur explicabo officiis
                      laborum aliquid aut quidem laudantium rem tempora!
                    </p>
                  )}
                </div>
              </div>
              <div className="h-[40%] overflow-y-auto  py-5">
                {chats.map((chat) => {
                  if (chat?.payload?.message === "") return;
                  return (
                    <div
                      className={`flex flex-row my-3 items-center ${
                        chat?.payload?.from == activeMember && active_member
                      } `}
                    >
                      <div className="relative  bg-gray-50 dark:bg-gray-800 py-3 px-4 shadow rounded-xl max-w-[86%] md:max-w-lg text-left">
                        <div className="flex items-center mb-2">
                          {chat?.payload?.from === "ChatDoc" ? (
                            <div className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-300 flex-shrink-0 text-gray-600 font-bold">
                              <img
                                className="h-6 w-6 rounded-full"
                                src="https://em-content.zobj.net/source/microsoft-teams/363/robot_1f916.png"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-300 flex-shrink-0 text-gray-600 text-xs ">
                              {chat?.payload?.from
                                .substring(0, 1)
                                .toUpperCase()}
                            </div>
                          )}
                          <span className="ml-2 text-gray-800 dark:text-gray-200 text-xs font-medium">
                            {chat?.payload?.from}
                          </span>
                        </div>

                        <div className="text-sm md:text-sm text-gray-800 dark:text-gray-200 mb-2">
                          {chat?.payload?.message}
                        </div>
                        {chat?.payload?.button && (
                          <div className="grid grid-cols-2 gap-2">
                            {chat.payload?.button.map((opt, index) => {
                              return (
                                <button
                                  className={`text-white opacity-100 font-medium py-1 px-4 text-xs rounded-lg shadow-md transition-all duration-300`}
                                  style={{
                                    backgroundColor: opt?.color,
                                  }}
                                >
                                  {opt?.text}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {sessionId === "" && (
            <p className="text-gray-400">No session selected at the moment.</p>
          )}
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
