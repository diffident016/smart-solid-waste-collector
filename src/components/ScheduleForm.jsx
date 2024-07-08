import { format } from "date-fns";
import React from "react";

function ScheduleForm({ item, onDelete, scheds, setScheds, index }) {
  return (
    <div className="flex flex-row text-sm font-inter-light">
      <p className="w-1/2 uppercase">{item.area}</p>
      <p className="w-1/4 uppercase">{item.day}</p>
      <p className="w-1/4 flex flex-row justify-between items-center">
        {`${format(`Tue Aug 03 2021 ${item.timeF}:00 UTC+8`, "ha")} - ${format(
          `Tue Aug 03 2021 ${item.timeT}:00 UTC+8`,
          "ha"
        )}`}
        {onDelete && (
          <span>
            <input
              type="checkbox"
              className=""
              onChange={(e) => {
                var temp = [...scheds];
                temp[index].selected = e.target.checked;
                setScheds(temp);
              }}
            />
          </span>
        )}
      </p>
    </div>
  );
}

export default ScheduleForm;
