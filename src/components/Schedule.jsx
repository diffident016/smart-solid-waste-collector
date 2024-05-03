import React from "react";
import ScheduleBox from "./ScheduleBox";

function Schedule({ schedules }) {
  return (
    <div className="w-full h-full flex flex-row overflow-auto">
      <div className="w-full h-max bg-[#D9D9D9] rounded-lg flex flex-row p-2 gap-4 ">
        <div className="w-full h-full flex flex-col bg-[#3CA040]  rounded-md">
          <div className="w-full h-12 bg-[#5B7F5C] rounded-t-md flex items-center justify-center px-4 font-inter-bold text-lg italic">
            Malaybalay City Proper
          </div>
          <ScheduleBox
            schedules={schedules["group"]["Sumpong"]}
            location={"Sumpong"}
          />
          <ScheduleBox
            schedules={schedules["group"]["Casisang"]}
            location={"Casisang"}
          />
        </div>
        <div className="w-full h-full flex flex-col bg-[#3CA040] rounded-md">
          <div className="w-full h-12 bg-[#5B7F5C] rounded-t-md flex items-center justify-center px-4 font-inter-bold text-lg italic">
            Basakan Area
          </div>
          <ScheduleBox
            schedules={schedules["group"]["Apo Macote"]}
            location={"Apo Macote"}
          />
          <ScheduleBox
            schedules={schedules["group"]["Linabo"]}
            location={"Linabo"}
          />
        </div>
      </div>
    </div>
  );
}

export default Schedule;
