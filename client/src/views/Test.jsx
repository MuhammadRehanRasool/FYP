import React, { useState, useEffect, useRef } from "react";
import ChatBox from "../components/ChatBox";
import { motion } from "framer-motion";
const active_member = "justify-end mr-4";
const active = "border-emerald-300 border-[3px]";

import { CONSTANT } from "./../CONSTANT.jsx";
import axios from "axios";

let testData = [{
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
  name: "Rehan",
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
  name: "Rehan",
  msg: "I have high blood pressure.",
},];

export default function Test() {


  const [chats, setChats] = useState([]);
  const [activeMember, setactiveMember] = useState("Rehan");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);


  const getQuestion = async (input, session_id, coming = false) => {
    await axios.post(CONSTANT.server + `api/get_bot_response/`, {
      "user_input": input,
      "session_id": session_id
    }).then((resp) => {
      let toAppend = [];
      if (coming) {
        toAppend.push({
          name: "Rehan",
          msg: input,
        })
      }
      toAppend.push({
        name: "ChatDoc",
        msg: resp.data["english"],
        option: resp.data["button"].map((a, b) => {
          return a.text
        }),
      })
      setChats([...chats, ...toAppend])
    }).catch(e => console.log(e))
  }

  // {
  //   name: "Rehan",
  //   msg: "I have high blood pressure.",
  // }

  const sendMessage = (input) => {
    getQuestion(input, "a", true)
  }

  useState(() => {
    getQuestion("hi", "a");
  }, [])


  return (
    <div className="flex flex-col flex-auto h-[100vh] section_scroll">
      <div className=" flex flex-col flex-auto flex-shrink-0 bg-gray-100 dark:bg-gray-900  p-4">
        <div className="flex flex-col h-full  md:h-full  md:pb-4   section_scroll ">
          <div
            className="flex flex-col space-y-6 pb-2 h-[calc(100vh-138px)] section_scroll md:h-[calc(100vh-169px)] overflow-x-hidden"
            style={{}}
          >
            {chats.map((chat) => {
              return (
                <motion.div
                  positionTransition
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex flex-row items-center ${chat.name == activeMember && active_member
                    } `}
                >
                  <div className="relative ml-3 bg-gray-100 dark:bg-gray-800 py-3 px-4 shadow rounded-xl max-w-[86%] md:max-w-lg text-left">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-300 flex-shrink-0 text-gray-600 font-bold">
                        {chat.name.substring(0, 1).toUpperCase()}
                      </div>
                      <span className="ml-2 text-gray-800 dark:text-gray-200 text-sm font-medium">
                        {chat.name}
                      </span>
                    </div>

                    {/* If chatbot ask a question and user select any options than It'll shows like a button otherwise its a normal */}
                    {chat?.isOptionSelected ? (
                      <button className="bg-gray-300 hover:bg-gray-400 hover:text-white text-gray-900 font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300 min-w-[10rem]">
                        {chat.msg}
                      </button>
                    ) : (
                      <div className="text-sm md:text-base text-gray-800 dark:text-gray-200 mb-2">
                        {chat.msg}
                      </div>
                    )}

                    {chat?.option && (
                      <div className="grid grid-cols-2 gap-2">
                        {chat.option.map((opt, index) => {
                          if (index % 2 == 0) {
                            return (
                              <button onClick={() => {
                                sendMessage(opt)
                              }} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300 min-w-[7rem]">
                                {opt}
                              </button>
                            );
                          } else {
                            return (
                              <button onClick={() => {
                                sendMessage(opt)
                              }} className="bg-gray-300 hover:bg-gray-400 hover:text-white text-gray-900 font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300 min-w-[7rem]">
                                {opt}
                              </button>
                            );
                          }
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
            {/* {chats.map((chat) => {
              return (
                <motion.div
                  positionTransition
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex flex-row items-center ${
                    chat.name == activeMember && active_member
                  } `}
                >
                  <div className="relative ml-3 text-sm bg-white dark:bg-gray-800 py-2 px-4 shadow rounded-xl max-w-[86%] md:max-w-lg text-left">
                    <div className="flex items-center justify-start py-2">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-500 flex-shrink-0 text-xs">
                        {chat.name[0]}
                      </div>

                      <span className="text-emerald-400 block text-left  p-2 text-xs">
                        {chat.name}
                      </span>
                    </div>
                    <div className="text-xs md:text-sm">{chat.msg}</div>
                  </div>
                </motion.div>
              );
            })} */}

            <div ref={messagesEndRef} />
          </div>
        </div>
        <ChatBox
          setactiveMember={setactiveMember}
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
