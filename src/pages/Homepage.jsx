import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Announcement from "../components/Announcement";
import Schedule from "../components/Schedule";
import Feedback from "../components/Feedback";
import {
  CalendarIcon,
  ChatBubbleLeftIcon,
  HomeIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";

function Homepage() {
  const [screen, setScreen] = useState(0);

  const screens = [
    {
      label: "Dashboard",
      component: <Dashboard />,
      icon: <HomeIcon />,
      header: "Garbage Truck Map Tracker",
    },
    {
      label: "Announcement",
      component: <Announcement />,
      icon: <MegaphoneIcon />,
      header: "Announcements",
    },
    {
      label: "Schedule",
      component: <Schedule />,
      icon: <CalendarIcon />,
      header: "Barangay Schedule",
    },
    {
      label: "Feedback",
      component: <Feedback />,
      icon: <ChatBubbleLeftIcon />,
      header: "Residents Feedback",
    },
  ];

  return (
    <div className="w-full h-screen flex flex-row font-inter text-[#F2F2F2] overflow-hidden">
      <Sidebar screens={screens} screen={screen} setScreen={setScreen} />
      <div className="flex-1 h-full flex flex-col p-4 gap-4">
        <Navbar screen={screens[screen]} />
        {screens[screen].component}
      </div>
    </div>
  );
  s;
}

export default Homepage;
