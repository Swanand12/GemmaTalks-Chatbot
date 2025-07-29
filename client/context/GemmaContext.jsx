"use client";

import { createContext, useContext, useState } from "react";

const GemmaContext = createContext();

export const GemmaProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]); // List of chat objects from backend
  return (
    <GemmaContext.Provider
      value={{
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </GemmaContext.Provider>
  );
};

export const useGemmaContext = () => useContext(GemmaContext);
