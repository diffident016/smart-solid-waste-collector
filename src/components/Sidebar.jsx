import React from "react";
import logo from "../assets/images/logo.png";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

function Sidebar({ screens, screen, setScreen }) {
  return (
    <div className="w-[300px] h-full bg-[#296441F5]/95 text-[#F2f2f2] select-none">
      <div className="flex flex-col h-full w-full">
        <div className="flex h-20 items-center px-2 gap-2 select-none">
          <img src={logo} className="w-20 cursor-pointer" />
          <h1 className="cursor-pointer font-inter-bold text-xl italic w-40 text-center">
            Smart Solid Waste Collector
          </h1>
        </div>
        <div className="flex flex-col w-full flex-1 mt-2 p-4 font-lato gap-2">
          {screens.map((item, index) => {
            return (
              <div
                id={item.label}
                onClick={() => {
                  setScreen(index);
                }}
                className={`flex flex-row h-12 ${
                  screen == index ? "text-white" : "text-white/60"
                } items-center gap-4 cursor-pointer hover:text-white`}
              >
                <div className={`w-[32px] h-[32px] p-1 rounded-full $`}>
                  {item.icon}
                </div>

                <p className={`font-inter-bold text-base`}>{item.label}</p>
              </div>
            );
          })}
        </div>

        <button className="h-10 w-32 rounded-lg bg-red-800 ml-4 my-6 flex flex-row items-center font-inter-bold justify-between px-4">
          Logout
          <ArrowRightStartOnRectangleIcon className="w-5" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
