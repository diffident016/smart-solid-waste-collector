import React, { useMemo } from "react";
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

function TrackerMap({ map, setMap }) {
  const initialMap = useMemo(
    () => (
      <MapContainer
        ref={setMap}
        className="h-full z-0"
        center={[51.505, -0.09]}
        zoom={13}
      >
        <TileLayer
          maxZoom={19.8}
          minZoom={18}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    []
  );

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <button className="absolute z-10 w-[200px] flex flex-row items-center h-11 bg-[#19AF0C]/90 bottom-8 right-4 rounded-lg justify-center gap-2">
        <GpsFixed fontSize="small" />
        <p className="text-sm font-inter-bold">Track Garbage Truck</p>
      </button>
      {initialMap}
    </div>
  );
}

export default TrackerMap;
