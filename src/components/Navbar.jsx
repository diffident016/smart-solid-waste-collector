import React from "react";

function Navbar({ screen }) {
  return (
    <div className="w-full min-h-14 h-14 flex bg-[#296441F5]/95 rounded-lg items-center justify-center">
      <h1 className="font-inter-bold text-[#F2F2F2] text-lg">
        {screen["header"]}
      </h1>
    </div>
  );
}

export default Navbar;
