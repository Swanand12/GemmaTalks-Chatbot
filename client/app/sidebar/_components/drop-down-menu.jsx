import React from "react";

const DropDownMenu = ({ onEditClick, onDeleteClick }) => {
  return (
    <div
      className={`flex flex-col absolute top-14 right-1.5 z-[20] p-4 rounded-lg shadow-md bg-gray-200 before:content-[' '] before:absolute before:bg-gray-200 before:h-[1rem] before:w-[1rem] before:-top-2 before:right-4 before:rotate-45`}
    >
      {/* Trigger edit action */}
      <button
        type="button"
        onClick={onEditClick}
        className="px-3 w-full text-start text-gray-700 py-1.5 hover:bg-gray-300 cursor-pointer rounded-md"
      >
        Edit title
      </button>

      {/* Trigger delete action */}
      <button
        onClick={onDeleteClick}
        type="button"
        className="px-3 w-full text-start text-[#ef233c] py-1.5 hover:bg-gray-300 cursor-pointer rounded-md"
      >
        Delete chat
      </button>
    </div>
  );
};

export default DropDownMenu;
