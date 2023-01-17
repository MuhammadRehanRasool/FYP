import React, { useEffect, useState } from "react";
// import ChatParticipant from "./ChatParticipant";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const ChatBox = ({ setactiveMember, activeMember, setChats, chats }) => {
  const [settingOpen, setSettingOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [option, setOption] = useState("view");

  // handle send message button
  const handleSend = () => {
    if (message.trim() != "") {
      console.log(message);
      setChats([
        ...chats,
        {
          name: activeMember,
          msg: message,
        },
      ]);
      setMessage("");
    }
  };

  const removeParticipant = (name) => {
    const filter = participants.filter((e) => e.name !== name);
    setparticipants(filter);
  };
  return (
    <>
      <div className="h-[128px] md:h-auto rounded-xl fixed left-0 bottom-0 md:relative  py-3 md:py-2 px-3  bg-white dark:bg-slate-900 w-full md:px-4 ">
        <div className="flex flex-row items-center">
          <div className="flex-grow md:ml-4 ">
            <div className="relative w-full">
              <input
                type="text"
                className="flex w-full border rounded-xl dark:bg-gray-900  focus:outline-none focus:border-indigo-300 pl-4 h-10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend(e);
                  }
                }}
              />
            </div>
          </div>
          <div className="ml-4"></div>
          <button
            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0  h-10"
            onClick={handleSend}
          >
            <span>Send</span>
            <span className="ml-2">
              <svg
                className="w-4 h-4 transform rotate-45 -mt-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </span>
          </button>
        </div>

        <div className="flex items-center py-5 space-x-4 justify-between md:hidden">
          <div className="flex" onClick={() => setSettingOpen(!settingOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => setSettingOpen(!settingOpen)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

const participantsData = [
  {
    name: "Henry Boyd",
  },
  {
    name: "John doe",
  },
  {
    name: "Will Smith",
  },
  {
    name: "Alison Wilson",
  },
  {
    name: "Iron Man",
  },
];
export default ChatBox;
