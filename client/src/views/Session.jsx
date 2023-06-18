import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserData from "../contexts/UserData";
import { CONSTANT } from "../CONSTANT.jsx";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

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
  const [order, setOrder] = useState("new");
  const [prescription, setPrescription] = useState({
    doctor: {
      userType: null,
      firstName: "",
      lastName: "",
      username: "",
      gender: "",
      dateOfBirth: null,
      phoneNumber: "",
      email: "",
      country: "",
      state: "",
      street: "",
      existingConditions: "",
      allergies: "",
      currentMedications: "",
      days: "",
      hours: "",
      speciality: "",
      affiliation: "",
    },
    sessionId: "",
    message: "",
  });

  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    if (session?.personal?.id !== "") {
      setActiveMember(
        `${session?.personal?.firstName} ${session?.personal?.lastName}`
      );
    }
    if (session?.personal?.userType !== "") {
      setMode(session?.personal?.userType);
    }
  }, [session]);

  const getPrescription = async () => {
    await axios
      .put(CONSTANT.server + `prescription`, {
        sessionId: sessionId,
      })
      .then((payload) => {
        setPrescription(payload.data);
      })
      .catch((e) => console.log(e));
  };

  const getKeywords = async () => {
    await axios
      .put(CONSTANT.server + `keyword`, {
        sessionId: sessionId,
      })
      .then((payload) => {
        if (payload.data?.keywords !== "") {
          setKeywords(JSON.parse(payload.data?.keywords));
        } else {
          setKeywords([]);
        }
      })
      .catch((e) => console.log(e));
  };

  const getSessions = async () => {
    await axios
      .put(CONSTANT.server + `conversation`, {
        type: "sessions",
        user_id: session?.personal?.id,
        mode: session?.personal?.userType,
      })
      .then((payload) => {
        setSessions(payload.data);
        if (payload.data.length > 0) {
          setSessionId(payload.data[0]?.sessionId);
        }
        s;
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
      getPrescription();
      getKeywords();
    }
  }, [sessionId]);

  const [pres, setPres] = useState("");

  const givePrescription = async () => {
    await axios
      .post(CONSTANT.server + `prescription`, {
        doctor: session?.personal?.id,
        sessionId: sessionId,
        message: pres,
      })
      .then(() => {
        getPrescription();
        getSessions();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className=" md:px-16 text-center h-100 overflow-hidden">
      <div className="flex items-start  space-x-8 h-full max-h-full overflow-hidden">
        <div className="w-[20%] h-full bg-white">
          <select
            onChange={(e) => {
              setOrder(e.target.value);
            }}
            value={order}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 text-sm px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-8 mb-4"
          >
            <option value={"new"}>Newly Added</option>
            <option value={"old"}>Old Sessions</option>
            <option value={"unattended"}>Unattended</option>
          </select>
          <div className="h-full overflow-y-auto hideScroll pb-10">
            <div className="flex flex-col space-y-3 my-5  pb-4">
              {mode !== "doctor" && (
                <Link to="/chat">
                  <div className="cursor-pointer opacity-100 hover:opacity-70 duration-300 transition-all rounded-lg bg-gray-500 text-white px-4 py-3 shadow-md">
                    <p className="font-bold text-xl capitalize">
                      Start New Session
                    </p>
                  </div>
                </Link>
              )}
              {sessions
                .sort((a, b) => {
                  if (order === "new") {
                    return (
                      new Date(b.first_timestamp) - new Date(a.first_timestamp)
                    );
                  }
                  if (order === "unattended") {
                    // Sort by 'is_prescribed' field
                    if (a.is_prescribed && !b.is_prescribed) {
                      return 1; // 'a' is prescribed, 'b' is unattended, so 'b' comes first
                    }
                    if (!a.is_prescribed && b.is_prescribed) {
                      return -1; // 'a' is unattended, 'b' is prescribed, so 'a' comes first
                    }
                    // Sort by 'first_timestamp' field for unattended sessions
                    if (!a.is_prescribed && !b.is_prescribed) {
                      return (
                        new Date(b.first_timestamp) -
                        new Date(a.first_timestamp)
                      );
                    }
                  }
                  return (
                    new Date(a.first_timestamp) - new Date(b.first_timestamp)
                  );
                })
                .map((session, index) => {
                  return (
                    <div
                      key={index}
                      sessionId={session?.sessionId}
                      onClick={() => {
                        setSessionId(session.sessionId);
                      }}
                      className={`${
                        sessionId === session?.sessionId
                          ? "opacity-50 pointer-events-none"
                          : "opacity-100"
                      } ${
                        session?.is_prescribed
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-500 text-white"
                      } cursor-pointer hover:opacity-70 duration-300 transition-all rounded-lg px-4 py-3 shadow-md`}
                    >
                      <p className="font-bold text-xl capitalize">
                        Session#
                        {order === "new"
                          ? sessions.length - index
                          : index + 1}{" "}
                      </p>
                      {mode === "doctor" && (
                        <p className="text-xs font-semibold my-1">
                          by {session?.user_fullname}
                        </p>
                      )}
                      <p className="text-xs font-semibold my-1">
                        {timeAgo.format(new Date(session.first_timestamp))}
                      </p>
                      {new Date(session.first_timestamp)
                        .toLocaleString()
                        .split(", ")
                        .map((a) => {
                          return <p className="text-gray-200 text-xs">{a}</p>;
                        })}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="w-[80%] h-full space-y-4">
          <div className="text-center mb-5">
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
              <div className="text-center mb-5">
                <h4
                  className="text-lg font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate"
                  data-aos="zoom-y-out"
                >
                  Session#{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    {sessionId}
                  </span>
                </h4>
              </div>

              <div className="text-left mb-5">
                <h4
                  className="text-lg font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate"
                  data-aos="zoom-y-out"
                >
                  Extracted
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    {" "}
                    Keywords
                  </span>
                </h4>
              </div>
              <div className="mb-10">
                <div className="flex justify-start items-start flex-wrap  gap-4">
                  {keywords.length <= 0 && (
                    <p className="text-gray-400 mx-auto">No keywords...</p>
                  )}
                  {keywords.map((keyword, index) => {
                    let styless = `bg-${keyword?.color}-500`;
                    return (
                      <div
                        className={`${styless} text-white py-2 px-4 text-xs rounded-full`}
                        role="alert"
                      >
                        {keyword?.keyword}
                      </div>
                    );
                  })}
                </div>
              </div>

              {mode === "doctor" && (
                <>
                  <div className="text-left mb-5">
                    <h4
                      className="text-lg font-extrabold leading-tighter tracking-tighter mb-4 mt-10 aos-init aos-animate"
                      data-aos="zoom-y-out"
                    >
                      Patient
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                        {" "}
                        Details
                      </span>
                    </h4>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-300 flex-shrink-0 text-gray-600 text-xs ">
                        {sessions
                          .filter((a, b) => {
                            return a?.sessionId === sessionId;
                          })[0]
                          ?.user_fullname.substring(0, 1)
                          .toUpperCase()}
                      </div>
                      <span className="ml-2 text-gray-800 dark:text-gray-200 text-xs font-medium">
                        {
                          sessions.filter((a, b) => {
                            return a?.sessionId === sessionId;
                          })[0]?.user_fullname
                        }
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="text-left mb-5">
                <h4
                  className="text-lg font-extrabold leading-tighter tracking-tighter mb-4 mt-10 aos-init aos-animate"
                  data-aos="zoom-y-out"
                >
                  Doctor
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    {" "}
                    Prescription
                  </span>
                </h4>
              </div>
              {prescription?.message === "" && mode === "patient" ? (
                <p className="text-gray-400">No prescription yet...</p>
              ) : (
                <div className="text-left">
                  <div className="bg-gray-100  rounded-t px-4 py-2 flex justify-between items-center">
                    {prescription?.message !== "" ? (
                      <p className="text-gray-600 font-bold capitalize">
                        Dr {prescription?.doctor?.firstName}{" "}
                        {prescription?.doctor?.lastName} |{" "}
                        {prescription?.doctor?.speciality}
                      </p>
                    ) : (
                      <p className="text-gray-600 font-bold capitalize">
                        Dr {session?.personal?.firstName}{" "}
                        {session?.personal?.lastName} |{" "}
                        {session?.personal?.speciality}
                      </p>
                    )}
                    <p className="text-sm">
                      Dated:{" "}
                      {prescription?.message !== ""
                        ? new Date(prescription?.timestamp).toLocaleString()
                        : new Date().toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 px-4 py-4 text-sm text-gray-800 h-full">
                    {mode == "doctor" && prescription?.message === "" ? (
                      <>
                        <textarea
                          onChange={(e) => {
                            setPres(e.target.value);
                          }}
                          value={pres}
                          placeholder="Write your prescription..."
                          className="w-full h-full bg-transparent outline-none"
                          rows={3}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              givePrescription();
                            }
                          }}
                        ></textarea>
                        <button
                          onClick={givePrescription}
                          className="rounded-lg px-2 text-xs text-white bg-gradient-to-r from-blue-500 to-teal-400"
                        >
                          Send
                        </button>
                      </>
                    ) : (
                      <p className="overflow-y-auto h-full pb-10">
                        {prescription?.message === ""
                          ? "No prescription yet..."
                          : prescription.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="text-left mb-5">
                <h4
                  className="text-lg font-extrabold leading-tighter tracking-tighter mb-4 mt-10 aos-init aos-animate"
                  data-aos="zoom-y-out"
                >
                  Chat
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    {" "}
                    History
                  </span>
                </h4>
              </div>
              <div className="py-5 bg-slate-100 px-5 rounded-lg">
                {chats.map((chat) => {
                  if (chat?.payload?.message === "") return;
                  return (
                    <div
                      className={`flex flex-row my-3 items-center ${
                        chat?.payload?.from !== "ChatDoc" && active_member
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
              <span className="mb-10 block"></span>
              <span className="mb-10 block"></span>
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
