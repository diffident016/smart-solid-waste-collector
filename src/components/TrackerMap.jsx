import React, { useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Polygon,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GpsFixed } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

function TrackerMap({ map, setMap, trucks, track, screenshotter, onReset }) {
  const initialMap = useMemo(
    () => (
      <MapContainer
        id="map-container"
        ref={setMap}
        className="h-full z-0"
        center={[8.054375, 125.195331]}
        zoom={13}
        rotate={true}
        touchRotate={true}
        rotateControl={{
          closeOnZeroBearing: false,
        }}
      >
        <TileLayer
          maxZoom={19.8}
          minZoom={13}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    []
  );

  const takeScreenShot = () => {
    screenshotter.takeScreen("image").then((image) => {
      var img = new Image();
      var imageSize = { x: 1080, y: 1080 };
      var topLeft = { x: 0, y: 0 };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = imageSize.x;
        canvas.height = imageSize.y;

        ctx.drawImage(
          img,
          topLeft.x,
          topLeft.y,
          imageSize.x,
          imageSize.y,
          0,
          0,
          imageSize.x,
          imageSize.y
        );

        var imageurl = canvas.toDataURL("image/png");

        const resultantImage = new Image();
        resultantImage.style = "border: 1px solid black";
        resultantImage.src = imageurl;

        document.body.appendChild(canvas);

        canvas.toBlob(function (blob) {
          saveAs(blob, "map_screenshot.png");
        });
      };

      img.src = image;
    });
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {trucks.fetchState == 0 && (
        <div className="w-full h-full absolute bg-white/20 text-[#2f2f2f] z-10 gap-2 flex flex-col items-center justify-center">
          <CircularProgress color="inherit" size={"32px"} />
          <h1 className="font-arimo font-bold text-sm">
            Loading, please wait...
          </h1>
        </div>
      )}
      <div className="absolute z-10 flex flex-row bottom-8 left-4 gap-4 ">
        <button
          disabled={trucks.fetchState === 2}
          className="w-20 bg-[#19AF0C]/90 rounded-lg p-2 disabled:bg-[#19AF0C]/70"
          onClick={() => {
            takeScreenShot();
          }}
        >
          Save
        </button>
        <button
          disabled={trucks.fetchState === 2}
          className="w-20 bg-red-800/90 rounded-lg p-2 disabled:bg-red-800/70"
          onClick={() => {
            onReset();
          }}
        >
          Reset
        </button>
      </div>
      <button
        onClick={() => {
          track();
        }}
        className="absolute z-10 w-[200px] flex flex-row items-center h-11 bg-[#19AF0C]/90 bottom-8 right-4 rounded-lg justify-center gap-2"
      >
        <GpsFixed fontSize="small" />
        <p className="text-sm font-inter-bold">Track Garbage Truck</p>
      </button>
      {initialMap}
    </div>
  );
}

export default TrackerMap;
