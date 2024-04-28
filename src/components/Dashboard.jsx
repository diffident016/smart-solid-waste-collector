import React, { useState } from "react";
import TrackerMap from "./TrackerMap";

function Dashboard() {
  const [map, setMap] = useState(null);
  return (
    <div className="w-full h-full rounded-lg">
      <TrackerMap map={map} setMap={setMap} />
    </div>
  );
}

export default Dashboard;
