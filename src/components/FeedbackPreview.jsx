import { XMarkIcon } from "@heroicons/react/24/outline";
import { Backdrop } from "@mui/material";
import React, { useState } from "react";

function FeedbackPreview({ feedback, close }) {
  const [showImage, setShowImage] = useState(null);
  return (
    <div className="w-[450px] min-h-[150px] bg-[#A5D8B6] rounded-lg flex flex-col p-4 text-[#2f2f2f]">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-inter-bold text-base">{feedback["Name"]}</h1>
        <div
          onClick={() => {
            close();
          }}
          className="p-[2px] bg-red-800 rounded-full cursor-pointer"
        >
          <XMarkIcon className="w-4 h-4 text-white" />
        </div>
      </div>
      <p className="text-sm py-4 truncate text-wrap">{feedback["Feedback"]}</p>
      {feedback["Images"] && (
        <div className="flex flex-row gap-2 pb-2">
          {feedback["Images"].map((item) => {
            return (
              <div
                onClick={() => {
                  setShowImage(item);
                }}
                className="w-30 bg-white h-30 rounded-lg border cursor-pointer"
              >
                <img src={item} className="object-cover w-28 h-28 rounded-lg" />
              </div>
            );
          })}
        </div>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!!showImage}
        onClick={() => {
          setShowImage(false);
        }}
      >
        {!!showImage && (
          <div className="p-4 w-[500px] h-[500px]">
            <img src={showImage} alt="feedback" className="w-full h-full" />
          </div>
        )}
      </Backdrop>
    </div>
  );
}

export default FeedbackPreview;
