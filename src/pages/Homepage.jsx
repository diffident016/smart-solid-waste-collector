import React, { useEffect, useReducer, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../states/alerts";
import { Alert, Snackbar } from "@mui/material";
import { getAnnouncements, getSchedules, onSnapshot } from "../api/Services";

function Homepage() {
  const [screen, setScreen] = useState(0);

  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert.value);

  const [announcements, setAnnouncements] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      fetchState: 0,
      data: [],
      count: 0,
    }
  );

  const [schedules, setSchedules] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      fetchState: 0,
      data: [],
      count: 0,
      group: [],
    }
  );

  useEffect(() => {
    const query = getSchedules();

    try {
      const unsub = onSnapshot(query, (snapshot) => {
        if (!snapshot) {
          setSchedules({ fetchState: -1 });
          return;
        }

        if (snapshot.empty) {
          setSchedules({ fetchState: 2 });
          return;
        }

        var data = snapshot.docs.map((doc, index) => {
          var temp = doc.data();
          temp["no"] = index + 1;
          temp["id"] = doc.id;
          return temp;
        });

        const group = data.reduce((group, sched) => {
          const { location } = sched;

          group[location] = group[location] ?? [];
          group[location].push(sched);
          return group;
        }, {});

        setSchedules({
          fetchState: 1,
          data: data,
          group: group,
        });
      });

      return () => {
        unsub();
      };
    } catch {
      setSchedules({ fetchState: -1 });
    }
  }, []);

  useEffect(() => {
    const query = getAnnouncements();

    try {
      const unsub = onSnapshot(query, (snapshot) => {
        if (!snapshot) {
          setAnnouncements({ fetchState: -1 });
          return;
        }

        if (snapshot.empty) {
          setAnnouncements({ fetchState: 2 });
          return;
        }

        var data = snapshot.docs.map((doc, index) => {
          var temp = doc.data();
          temp["no"] = index + 1;
          temp["id"] = doc.id;
          return temp;
        });

        setAnnouncements({
          fetchState: 1,
          data: data,
        });
      });

      return () => {
        unsub();
      };
    } catch {
      setAnnouncements({ fetchState: -1 });
    }
  }, []);

  const screens = [
    {
      label: "Dashboard",
      component: <Dashboard />,
      icon: <HomeIcon />,
      header: "Garbage Truck Map Tracker",
    },
    {
      label: "Announcement",
      component: <Announcement announcements={announcements} />,
      icon: <MegaphoneIcon />,
      header: "Announcements",
    },
    {
      label: "Schedule",
      component: <Schedule schedules={schedules} />,
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
      {alert.show && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={alert.show}
          autoHideDuration={alert.duration}
          onClose={() => {
            dispatch(hide());
          }}
        >
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Snackbar>
      )}
    </div>
  );
  s;
}

export default Homepage;
