import React, { useEffect, useState } from "react";
// import ChatParticipant from "./ChatParticipant";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const ChatBox = ({
  setActiveMember,
  activeMember,
  setChats,
  chats,
  sendMessage,
}) => {
  const [settingOpen, setSettingOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [option, setOption] = useState("view");

  // handle send message button
  const handleSend = () => {
    if (message.trim() != "") {
      sendMessage(message);
      setMessage("");
    }
  };

  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    if (chats.length > 0) {
      if (
        chats[chats.length - 1]?.from === "ChatDoc" &&
        chats[chats.length - 1]?.type === "open" &&
        !chats[chats.length - 1]?.is_last
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [chats]);

  return (
    <>
      <div className="h-[128px] md:h-auto rounded-xl fixed left-0 bottom-0 md:relative  py-3 md:py-2 bg-white dark:bg-slate-900 w-full px-2 ">
        <div className="flex flex-row items-center">
          <div className="flex-grow">
            <div className="relative w-full">
              <input
                type="text"
                disabled={isDisabled}
                className={`${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : "opacity-100 hover:opacity-70"
                } flex w-full border rounded-xl dark:bg-gray-900  focus:outline-none focus:border-indigo-300 pl-4 h-10`}
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
            className={`${
              isDisabled
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : "opacity-100 hover:opacity-70"
            } transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl text-white px-4 py-1 flex-shrink-0  h-10`}
            onClick={handleSend}
          >
            <span>Send</span>
            <span className="ml-1">
              <svg
                className="w-4 h-4 transform rotate-90 -mt-px"
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
      </div>
    </>
  );
};
export default ChatBox;
