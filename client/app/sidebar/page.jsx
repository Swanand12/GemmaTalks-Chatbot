"use client";

import React from "react";
import { FaBahai } from "react-icons/fa";
import ChatItem from "./_components/chat-item";
import { useSidebarChats } from "@/hooks/useSidebarChats";

const SideBar = () => {
  const {
    chats,
    selectedChat,
    setSelectedChat,
    activeDropdownId,
    setActiveDropdownId,
    editingChatId,
    setEditingChatId,
    editedTitle,
    setEditedTitle,
    chatRef,
    loading,
    createNewChat,
    editChatTitle,
    deleteChat,
  } = useSidebarChats(); // Custom hook to manage sidebar chat logic and state

  return (
    <div className="flex flex-col space-y-4 max-w-[30%] w-[30%] rounded-l-3xl px-2">
      {/* New Chat button */}
      <div className="px-6 pt-8">
        <button
          onClick={createNewChat} // Creates a new chat
          type="button"
          className="text-center w-full rounded-lg cursor-pointer bg-[#ef233c] text-white py-2"
        >
          {loading ? (
            <span className="animate-spin flex justify-center">
              <FaBahai size={23} />
            </span>
          ) : (
            "New Chat"
          )}
        </button>
      </div>

      <h1 className="text-[#ef233c] text-xl pl-6">Chats History</h1>

      <div className="overflow-y-scroll h-full scrollbar">
        <ul className="flex flex-col mx-4">
          {chats?.map((chat, i) => (
            <ChatItem
              key={i}
              chat={chat}
              isSelected={selectedChat?.id === chat?.id} // Highlights selected chat
              editTitle={editingChatId === chat?.id} // Enables title edit mode for current chat
              editedTitle={editedTitle}
              setEditedTitle={setEditedTitle}
              chatRef={chatRef}
              onClick={() => setSelectedChat(chat)} // Sets selected chat
              onDropdownToggle={
                () =>
                  setActiveDropdownId((prev) =>
                    prev === chat?.id ? null : chat?.id
                  ) // Toggles dropdown for a specific chat
              }
              isDropdownOpen={activeDropdownId === chat?.id}
              onEdit={() => {
                setEditingChatId(chat?.id); // Enables title editing
                setActiveDropdownId(null); // Closes dropdown after clicking "Edit"
              }}
              onDelete={() => deleteChat(chat.id)} // Deletes the chat
              onEditSubmit={() => editChatTitle(chat.id)} // Submits the edited title
            />
          ))}
        </ul>
      </div>

      {/* Invisible overlay to close dropdown when clicking outside */}
      <div
        onClick={() => setActiveDropdownId(null)}
        className={`${
          activeDropdownId ? "pointer-events-auto" : "pointer-events-none"
        } inset-0 absolute bg-transparent cursor-pointer`}
      ></div>
    </div>
  );
};

export default SideBar;
