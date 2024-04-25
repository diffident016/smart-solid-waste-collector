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

function Homepage() {
  const [screen, setScreen] = useState(0);

  const screens = [
    {
      label: "Dashboard",
      component: <Dashboard />,
      icon: <HomeIcon />,
      header: "",
    },
    {
      label: "Announcement",
      component: <Announcement />,
      icon: <MegaphoneIcon />,
      header: "",
    },
    {
      label: "Schedule",
      component: <Schedule />,
      icon: <CalendarIcon />,
      header: "",
    },
    {
      label: "Feedback",
      component: <Feedback />,
      icon: <ChatBubbleLeftIcon />,
      header: "",
    },
  ];

  return (
    <div className="w-full h-screen flex flex-row font-inter text-[#F2F2F2] overflow-hidden">
      <Sidebar screens={screens} screen={screen} setScreen={setScreen} />
    </div>
  );
}

export default Homepage;
