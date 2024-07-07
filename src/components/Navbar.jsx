import React from "react";

function Navbar({ screen, index, toggleAdd }) {
  return (
    <div className="relative w-full min-h-14 h-14 flex flex-row bg-[#296441F5]/95 rounded-lg items-center justify-center">
      <h1 className="font-inter-bold text-[#F2F2F2] text-lg">
        {screen["header"]}
      </h1>
      {index == 2 && (
        <div className="absolute flex flex-row right-4 gap-2">
          <button
            onClick={() => {
              toggleAdd();
            }}
            className="px-4 bg-[#19AF0C] py-2 rounded-md font-inter-bold text-xs"
          >
            Add table
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
