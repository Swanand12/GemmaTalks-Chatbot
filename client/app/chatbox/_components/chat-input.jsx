import React from "react";
import { FaSquare } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const ChatInput = ({
  query,
  setQuery,
  sendMessage,
  stopMessage,
  streaming,
}) => {
  return (
    <div className="bg-[#edf2f4] px-[1rem] flex items-center py-2 pr-10">
      <input
        type="text"
        value={query}
        className="focus:outline-none text-md text-gray-500 placeholder:text-gray-500 w-full px-10 py-4"
        placeholder="Ask anything..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          // Trigger sendMessage when Enter key is pressed
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      {streaming ? (
        <button
          onClick={stopMessage}
          type="text"
          className="ml-auto flex items-center justify-center h-[2.3rem] w-[2.3rem] rounded-full bg-[#ef223c] hover:scale-105 transform duration-300  cursor-pointer "
        >
          {/* Stop button shown when message is streaming */}
          <FaSquare size={16} className="text-white animate-pulse" />
        </button>
      ) : (
        <button
          onClick={sendMessage}
          type="text"
          className="ml-auto flex items-center justify-center h-[2.3rem] w-[2.5rem] rounded-sm bg-[#ef223c] hover:scale-105 transform duration-300  cursor-pointer "
        >
          {/* Send button shown when not streaming */}
          <IoMdSend size={22} className="text-white" />
        </button>
      )}
    </div>
  );
};

export default ChatInput;
