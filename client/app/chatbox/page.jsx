"use client";
import React, { useEffect, useRef } from "react";
import { FaBahai } from "react-icons/fa";
import { useGemmaContext } from "@/context/GemmaContext";
import { useChatMessages } from "@/hooks/useChatMessages";
import MessageBubble from "./_components/message-bubble";
import ChatInput from "./_components/chat-input";

const ChatBox = () => {
  const { selectedChat } = useGemmaContext();

  // Custom hook to manage chat state and actions
  const {
    messages,
    query,
    setQuery,
    sendMessage,
    stopMessage,
    streaming,
    typing,
  } = useChatMessages();

  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-[70%] w-[70%] h-full flex flex-col">
      <div className="px-[1rem] py-4">
        <h1 className="text-3xl pb-1 text-[#ef233c] flex items-center gap-3">
          <FaBahai /> GemmaTalks
        </h1>

        {/* Show chat status: streaming, typing, or intro message */}
        {streaming ? (
          <p className="text-[#ef233c] pl-3">streaming...</p>
        ) : typing ? (
          <p className="text-[#ef233c] pl-3">typing...</p>
        ) : (
          <p className="text-gray-500 pl-2">
            Hi, I'm GemmaTalks — your smart chat companion. Ask me anything!
          </p>
        )}
      </div>

      {/* Message list container with scroll */}
      <div className="flex-1 bg-gray-300 p-4 overflow-y-auto scrollbar scrollbar-red">
        {selectedChat ? (
          <>
            {/* Render each message bubble */}
            {messages.map((message, i) => (
              <MessageBubble key={i} message={message} />
            ))}

            {/* Scroll anchor to auto-scroll into view */}
            <div ref={messagesEndRef} />
          </>
        ) : (
          // Placeholder UI when no chat is selected
          <div className="flex flex-col gap-2 items-center justify-center h-full">
            <span className="text-2xl text-[#ef233c] flex items-center gap-2">
              Welcome to GemmaTalks <FaBahai className="animate-spin" />
            </span>
            <span className="text-gray-500">
              Your AI assistant is ready to chat with you in real time.
            </span>
          </div>
        )}
      </div>

      {/* Show input bar only when a chat is selected */}
      {selectedChat && (
        <ChatInput
          query={query}
          setQuery={setQuery}
          sendMessage={sendMessage}
          streaming={streaming}
          stopMessage={stopMessage}
        />
      )}
    </div>
  );
};

export default ChatBox;
