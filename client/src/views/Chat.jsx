import React, { useState, useEffect, useRef, useContext } from "react";
import ChatBox from "../components/ChatBox";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const active_member = "justify-end mr-4";
const active = "border-emerald-300 border-[3px]";
import { CONSTANT } from "../CONSTANT.jsx";
import axios from "axios";
import UserData from "../contexts/UserData";
import { v4 as uuidv4 } from "uuid";

export default function Chat() {
  let __INIT__ = [
    {
      from: "ChatDoc",
      message:
        "Hi! This is ChatDoc. Hope to be useful to you. Please answer the asked questions.",
    },
  ];
  const [chats, setChats] = useState(__INIT__);
  const { session, setSession } = useContext(UserData);
  const [activeMember, setActiveMember] = useState("Guest");
  const [sessionId, setSessionId] = useState(uuidv4());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (session?.personal?.id !== "") {
      setActiveMember(
        `${session?.personal?.firstName} ${session?.personal?.lastName}`
      );
    }
  }, [session]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const getQuestion = async (input) => {
    await axios
      .post(CONSTANT.server + `get_bot_response`, {
        user_input: input,
        session_id: sessionId,
      })
      .then((payload) => {
        let __data__ = {
          from: "ChatDoc",
          ...payload.data,
        };
        if (session?.isLoggedIn && chats.length > 2) {
          sendToDatabase(__data__);
        }
        setChats([...chats, __data__]);
      })
      .catch((e) => console.log(e));
  };

  const sendMessage = (input) => {
    let __data__ = {
      from: activeMember,
      message: input,
    };
    if (session?.isLoggedIn) {
      if (chats.length === 2) {
        sendToDatabase(chats[1]);
      }
      sendToDatabase(__data__);
    }
    setChats([...chats, __data__]);
  };

  useEffect(() => {
    if (chats.length > 0) {
      if (chats[chats.length - 1]?.from === activeMember) {
        getQuestion(chats[chats.length - 1]?.message);
      }
      if (
        chats[chats.length - 1]?.from === "ChatDoc" &&
        (chats[chats.length - 1]?.is_last ||
          chats[chats.length - 1]?.message === "")
      ) {
        let toAdd = [
          {
            id: "__last_btn",
            text: "Homepage",
            color: "green",
            to: "/",
          },
        ];
        if (session?.isLoggedIn) {
          toAdd.push({
            id: "__last_btn",
            text: "My Sessions",
            color: "green",
            to: "/sessions",
          });
        } else {
          toAdd.push({
            id: "__last_btn",
            text: "Login",
            color: "green",
            to: "/login",
          });
        }
        extractKeywords();
        setChats([
          ...chats,
          {
            from: "Moderator",
            message: "The session is ended. Thank you!",
            is_last: true,
            button: toAdd,
          },
        ]);
      }
    }
  }, [chats]);

  useState(() => {
    if (sessionId !== "" && session) {
      getQuestion("hi");
    }
  }, [sessionId, session]);

  const sendToDatabase = async (payload) => {
    if (payload?.message === "") {
      payload["is_last"] = true;
    }
    await axios
      .post(CONSTANT.server + `conversation`, {
        user: session?.personal?.id,
        sessionId: sessionId,
        payload: JSON.stringify(payload),
      })
      .then(() => {
        // Done
      })
      .catch((e) => console.log(e));
  };

  const extractKeywords = async () => {
    await axios
      .post(CONSTANT.server + `keyword`, {
        convo: chats,
        sessionId: sessionId,
      })
      .then(() => {
        // Done
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex flex-col flex-auto h-[100vh] section_scroll">
      <div className="w-full bg-red h-[70px] flex items-center justify-between px-10">
        <div className="flex items-center justify-center">
          <Link to="/">
            <span className="bg-clip-text text-transparent self-center bg-gradient-to-r from-blue-500 to-teal-400 text-3xl font-semibold whitespace-nowrap dark:text-white">
              ChatDoc
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          {session?.isLoggedIn ? (
            <Link to="/sessions">
              <h5
                className="text-md text-left font-bold leading-tighter tracking-tighter aos-init aos-animate"
                data-aos="zoom-y-out"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  {"← My Sessions"}
                </span>
              </h5>
            </Link>
          ) : (
            <Link to="/login">
              <h5
                className="text-md text-left font-bold leading-tighter tracking-tighter aos-init aos-animate"
                data-aos="zoom-y-out"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  {"← Login to Track"}
                </span>
              </h5>
            </Link>
          )}
        </div>
      </div>
      <div className=" flex flex-col flex-auto flex-shrink-0 bg-gray-100 dark:bg-gray-900  p-4">
        <div className="flex flex-col h-full  md:h-full  md:pb-4   section_scroll">
          <div className="flex flex-col space-y-6 pb-2 h-[calc(100vh-200px)] section_scroll md:h-[calc(100vh-200px)] overflow-x-hidden">
            {chats.map((chat, chat_index) => {
              if (chat?.message === "") return;

              return (
                <motion.div
                  positionTransition
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex flex-row items-center ${
                    chat?.from !== "ChatDoc" &&
                    chat?.from !== "Moderator" &&
                    active_member
                  } `}
                >
                  <div
                    className={`${
                      chat?.from === "Moderator"
                        ? "bg-gradient-to-r from-blue-500 to-teal-400"
                        : "bg-white"
                    } relative ml-3 dark:bg-gray-800 py-3 px-4 shadow rounded-xl max-w-[86%] md:max-w-lg text-left`}
                  >
                    <div className="flex items-center mb-2">
                      {chat?.from === "ChatDoc" ? (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-300 flex-shrink-0 text-gray-600 font-bold">
                          <img
                            className="h-6 w-6 rounded-full"
                            src="https://em-content.zobj.net/source/microsoft-teams/363/robot_1f916.png"
                          />
                        </div>
                      ) : chat?.from === "Moderator" ? (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-300 flex-shrink-0 text-gray-600 font-bold">
                          <img
                            className="h-6 w-6 rounded-full"
                            src="https://images.emojiterra.com/google/android-11/512px/2699.png"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-300 flex-shrink-0 text-gray-600 font-bold">
                          {chat.from.substring(0, 1).toUpperCase()}
                        </div>
                      )}
                      <span
                        className={`${
                          chat?.from === "Moderator"
                            ? "text-white"
                            : "text-gray-800"
                        } ml-2  dark:text-gray-200 text-sm font-medium`}
                      >
                        {chat.from}
                      </span>
                    </div>

                    <div
                      className={`${
                        chat?.from === "Moderator"
                          ? "text-white"
                          : "text-gray-800"
                      } text-sm md:text-base  dark:text-gray-200 mb-2`}
                    >
                      {chat?.message}
                    </div>

                    {chat?.button && (
                      <div className="mt-3">
                        <div className="grid grid-cols-2 gap-2">
                          {chat?.button.map((opt, index) => {
                            if (opt?.id === "__last_btn") {
                              return (
                                <Link
                                  to={opt?.to}
                                  className={`${
                                    chats.length - 1 !== chat_index
                                      ? "pointer-events-none opacity-50"
                                      : "opacity-100"
                                  }  hover:opacity-70 font-medium text-center text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 min-w-[7rem]`}
                                  style={{
                                    backgroundColor: opt?.color,
                                  }}
                                >
                                  {opt?.text}
                                </Link>
                              );
                            }
                            return (
                              <button
                                onClick={() => {
                                  sendMessage(opt?.text);
                                }}
                                className={`${
                                  chats.length - 1 !== chat_index
                                    ? "pointer-events-none opacity-50"
                                    : "opacity-100"
                                }  hover:opacity-70 font-medium text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 min-w-[7rem]`}
                                style={{
                                  backgroundColor: opt?.color,
                                }}
                              >
                                {opt?.text}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>
        </div>
        <ChatBox
          setActiveMember={setActiveMember}
          activeMember={activeMember}
          setChats={setChats}
          chats={chats}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

// const chatsData = [
//   {
//     name: "Doctor Saloonke",
//     msg: "Are you taking any pills?",
//     option: ["Yes", "No"],
//   },
//   {
//     name: "John",
//     msg: "No.",
//     isOptionSelected: true,
//     selectedOption: "No",
//   },
//   {
//     name: "Doctor Saloonke",
//     msg: "Which medical conditions do you have?",
//     option: null,
//   },
//   {
//     name: "John",
//     msg: "I have high blood pressure.",
//   },
//   {
//     name: "Doctor Saloonke",
//     msg: "Do you have any allergies?",
//     option: ["Yes", "No"],
//   },
//   {
//     name: "John",
//     msg: "Yes.",
//     isOptionSelected: true,
//     selectedOption: "Yes",
//   },
//   {
//     name: "Doctor Saloonke",
//     msg: "Which allergies do you have?",
//     option: null,
//   },
//   {
//     name: "John",
//     msg: "I am allergic to peanuts.",
//     isOptionSelected: true,
//     selectedOption: "Peanuts",
//   },
//   {
//     name: "Doctor Saloonke",
//     msg: "Do you have any medical conditions?",
//     option: ["Yes", "No"],
//   },
//   {
//     name: "John",
//     msg: "Yes.",
//     isOptionSelected: true,
//     selectedOption: "Yes",
//   },
//   {
//     name: "Doctor Saloonke",
//     msg: "Which medical conditions do you have?",
//     option: null,
//   },
//   {
//     name: "John",
//     msg: "I have high blood pressure.",
//   },
// ];
