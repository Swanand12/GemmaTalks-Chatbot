import { formatDate, formatedTitle } from "@/utils/importantFunc";
import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import DropDownMenu from "./drop-down-menu";

const ChatItem = ({
  chat,
  isSelected,
  editTitle,
  editedTitle,
  setEditedTitle,
  chatRef,
  onClick,
  onDropdownToggle,
  isDropdownOpen,
  onEdit,
  onDelete,
  onEditSubmit,
}) => {
  return (
    <div
      onClick={onClick} // When chat item is clicked, trigger selection
      className={`${
        isSelected &&
        "shadow-[0_10px_30px_-3px_rgba(0,0,0,0.1),_0_4px_6px_-2px_rgba(0,0,0,0.05)] shadow-gray-300"
      } px-4 py-3 transform text-gray-500 duration-300 cursor-pointer relative rounded-xl flex justify-between items-center`}
    >
      {/* If chat title is being edited, show input field */}
      {editTitle ? (
        <input
          ref={chatRef}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          type="text"
          className="w-full focus:outline-none caret-[#ef233c] text-[#ef233c]"
          onKeyDown={(e) => e.key === "Enter" && onEditSubmit()} // Submit on Enter key
        />
      ) : (
        <div className="flex items-center justify-between w-full pr-2">
          <span>{formatedTitle(chat?.title)}</span>
          <span className="text-[#ef233c] text-[12px]">
            {formatDate(chat?.createdAt).slice(0, 9).trim()}
          </span>
        </div>
      )}

      {/* Dropdown icon to toggle chat actions (Edit/Delete) */}
      <button
        type="button"
        onClick={() => {
          onDropdownToggle(); // Toggle dropdown for current chat
        }}
        className="cursor-pointer hover:bg-gray-300 transform duration-200 rounded-full p-1"
      >
        <FiMoreVertical size={20} className="text-black" />
      </button>

      {/* Conditionally render dropdown menu for current chat */}
      {isDropdownOpen && (
        <DropDownMenu
          onEditClick={onEdit} // Edit handler
          onDeleteClick={onDelete} // Delete handler
        />
      )}
    </div>
  );
};

export default ChatItem;
