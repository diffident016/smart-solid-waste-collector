import React, { useState } from "react";
import { ListItemIcon, Menu, MenuItem, MenuList } from "@mui/material";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function ScheduleBox({ location }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const headers = [
    {
      name: "Area",
      width: 100,
    },
    {
      name: "Day",
      width: 50,
    },
    {
      name: "Time",
      width: 50,
    },
  ];

  return (
    <div className="w-full h-[400px] flex flex-col py-2 gap-1">
      <div className="w-full h-12 bg-[#287A2C] flex items-center justify-between pl-4 pr-2">
        <h1 className="font-inter-bold text-lg italic">{location}</h1>
        <EllipsisVerticalIcon
          onClick={handleClick}
          className="w-8 cursor-pointer select-none"
        />
      </div>
      <div className="w-full h-8 bg-[#376B39] flex flex-row items-center px-4">
        {headers.map((item, index) => {
          return (
            <p
              className={`${
                index == 0 ? "w-1/2" : "w-1/4"
              } text-sm uppercase font-inter`}
            >
              {item.name}
            </p>
          );
        })}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        dense={true}
        onClose={() => {
          setAnchorEl(null);
        }}
        className="p-0"
      >
        <MenuList className="focus:outline-none p-0 ">
          <MenuItem
            onClick={() => {
              // signout();
            }}
          >
            <ListItemIcon>
              <PlusIcon className="w-4" />
            </ListItemIcon>
            <p className="text-sm">Add</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              // signout();
            }}
          >
            <ListItemIcon>
              <PencilSquareIcon className="w-4" />
            </ListItemIcon>
            <p className="text-sm">Update</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              // signout();
            }}
          >
            <ListItemIcon>
              <TrashIcon className="w-4" />
            </ListItemIcon>
            <p className="text-sm">Delete</p>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default ScheduleBox;
