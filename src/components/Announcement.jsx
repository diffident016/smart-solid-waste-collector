import { MegaphoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Backdrop } from "@mui/material";
import { format, formatDistance } from "date-fns";
import React, { useState } from "react";

function Announcement() {
  const [isCreate, setCreate] = useState(false);
  const [message, setMessage] = useState("");
  const [sample, setSample] = useState([
    {
      announcement: "This is a sample announcement.",
      createdAt: new Date(),
    },
    {
      announcement: "This is a sample announcement.",
      createdAt: new Date(),
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    var temp = [];
    temp.push({
      announcement: message,
      createdAt: new Date(),
    });

    temp = temp.concat(sample);

    setSample(temp);
    setMessage("");
    setCreate(false);
  };

  return (
    <div className="w-full h-full bg-[#D9D9D9] rounded-lg">
      <div className="w-full h-full p-4 flex flex-row">
        <div className="flex-1 px-4 flex flex-col overflow-hidden">
          <div className="border-dashed border w-full my-6 h-[1px] border-[#F2f2f2]" />
          <div className="w-full h-full flex flex-col overflow-auto gap-3 my-2">
            {sample.map((item) => {
              return (
                <div className=" bg-[#19AF0C] h-16 rounded-lg flex flex-row items-center px-4 gap-2">
                  <MegaphoneIcon className="w-6" />
                  <h1 className="flex-1 text-lg font-inter">
                    {item.announcement}
                  </h1>
                  <p className="text-sm font-inter-light">
                    {formatDistance(item.createdAt, Date.now())}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[200px] flex flex-row justify-end px-4">
          <button
            onClick={() => {
              setCreate(true);
            }}
            className="w-[150px] bg-[#19AF0C] h-10 rounded-lg font-inter-bold"
          >
            Create
          </button>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isCreate}
      >
        <form
          onSubmit={handleSubmit}
          className="w-[400px] h-[350px] bg-[#A5D8B6] rounded-lg flex flex-col p-4 text-[#2f2f2f]"
        >
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="font-inter-bold text-lg">Create Announcement</h1>
            <div
              onClick={() => {
                setCreate(false);
              }}
              className="p-[2px] bg-red-800 rounded-full cursor-pointer"
            >
              <XMarkIcon className="w-4 h-4 text-white" />
            </div>
          </div>
          <textarea
            rows={8}
            required
            placeholder="Input message..."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="mt-2 bg-[#E9E9E9]/60 rounded-md resize-none focus:outline-none p-4 placeholder:text-[#2f2f2f]/80"
          />
          <button
            type="submit"
            className="bg-[#19AF0C] w-[150px] h-9 rounded-lg text-white mt-4 self-center text-sm"
          >
            Post
          </button>
        </form>
      </Backdrop>
    </div>
  );
}

export default Announcement;
