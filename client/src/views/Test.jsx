import React, { useState, useEffect, useRef } from "react";
import ChatBox from "../components/ChatBox";
import { motion } from "framer-motion";
const active_member = "justify-end mr-4";
const active = "border-emerald-300 border-[3px]";

export default function Test() {
  const [chats, setChats] = useState(chatsData);
  const [activeMember, setactiveMember] = useState("John");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

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
            })}

            <div ref={messagesEndRef} />
          </div>
        </div>
        <ChatBox
          setactiveMember={setactiveMember}
          activeMember={activeMember}
          setChats={setChats}
          chats={chats}
        />
      </div>
    </div>
  );
}

const chatsData = [
  {
    name: "Doctor Saloonke",
    msg: "Are you taking any pills?",
    option: ["Yes", "No"],
  },
  {
    name: "John",
    msg: "No.",
    option: ["Yes", "No"],
  },
];
