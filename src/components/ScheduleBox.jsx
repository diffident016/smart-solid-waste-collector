import React, { useEffect, useReducer, useState } from "react";
import { ListItemIcon, Menu, MenuItem, MenuList } from "@mui/material";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { addSchedule, deleteSchedule } from "../api/Services";
import { show } from "../states/alerts";
import { useDispatch } from "react-redux";
import { format } from "date-fns-tz";

function ScheduleBox({ location, schedules }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [onAdd, setAdd] = useState(false);
  const [onDelete, setDelete] = useState(false);
  const [selected, setSelected] = useState([]);
  const [scheds, setScheds] = useState([]);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const [form, updateForm] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      area: "",
      day: "",
      timeF: "",
      timeT: "",
      location: location,
    }
  );

  useEffect(() => {
    if (schedules) {
      var temp = schedules.map((s) => {
        var t = s;
        t["selected"] = false;

        return t;
      });

      setScheds(temp);
    }
  }, [schedules]);

  useEffect(() => {
    var temp = [];
    scheds.map((item) => {
      if (item.selected) {
        temp.push(item.id);
      }
    });

    setSelected(temp);
  }, [scheds]);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var newForm = form;
    newForm["day"] = e.target[1].value;

    await addSchedule(newForm)
      .then((_) => {
        dispatch(
          show({
            type: "success",
            message: "Schedule has been added successfully.",
            duration: 3000,
            show: true,
          })
        );
        handleReset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async () => {
    await deleteSchedule(selected)
      .then((_) => {
        setSelected([]);
        setDelete(false);
        dispatch(
          show({
            type: "success",
            message: "Schedule has been deleted successfully.",
            duration: 3000,
            show: true,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReset = () => {
    Object.keys(form).forEach((inputKey) => {
      if (inputKey != "location") {
        updateForm({
          [inputKey]: "",
        });
      }
    });
  };

  return (
    <div className="w-full h-[400px] flex flex-col py-2 gap-1 overflow-hidden">
      <div className="w-full min-h-12 h-12 bg-[#287A2C] flex items-center justify-between pl-4 pr-2">
        <h1 className="font-inter-bold text-lg italic">{location}</h1>
        <EllipsisVerticalIcon
          onClick={handleClick}
          className="w-8 cursor-pointer select-none"
        />
      </div>
      <div className="w-full min-h-8 h-8 bg-[#376B39] flex flex-row items-center px-4">
        {headers.map((item, index) => {
          return (
            <p
              key={index}
              className={`${
                index == 0 ? "w-1/2" : "w-1/4"
              } text-sm uppercase font-inter`}
            >
              {item.name}
            </p>
          );
        })}
      </div>
      <div className="flex flex-col w-full h-full p-2  gap-1 overflow-auto flex-1">
        {scheds.map((item, index) => {
          return (
            <div
              key={item.id}
              className="flex flex-row text-sm font-inter-light"
            >
              <p className="w-1/2 uppercase">{item.area}</p>
              <p className="w-1/4 uppercase">{item.day}</p>
              <p className="w-1/4 flex flex-row justify-between items-center">
                {`${format(
                  `Tue Aug 03 2021 ${item.timeF}:00 UTC+8`,
                  "ha"
                )} - ${format(`Tue Aug 03 2021 ${item.timeT}:00 UTC+8`, "ha")}`}
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
        })}

        {onAdd && (
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="bg-[#287A2C] w-full rounded-md flex flex-col py-2 px-1 my-2"
          >
            <div className="flex flex-row gap-1 text-black text-sm w-full">
              <input
                required
                placeholder="Input area..."
                value={form.area}
                onChange={(e) => {
                  updateForm({ area: e.target.value });
                }}
                className="bg-[#D9D9D9] px-1 h-8 w-1/2 rounded-sm focus:outline-none"
              />
              <select
                required
                value={form.day}
                onChange={(e) => {
                  updateForm({ day: e.target.value });
                }}
                className="w-1/4 h-8 rounded-sm bg-[#D9D9D9] focus:outline-none"
              >
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((item) => {
                  return (
                    <option key={item} value={item} className="uppercase">
                      {item}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-col w-1/4 gap-1">
                <input
                  required
                  type="time"
                  value={form.timeF}
                  className="bg-[#D9D9D9] h-8 rounded-sm"
                  onChange={(e) => {
                    console.log(e.target.value);
                    updateForm({ timeF: e.target.value });
                  }}
                />
                <input
                  required
                  type="time"
                  value={form.timeT}
                  className="bg-[#D9D9D9] h-8 rounded-sm"
                  onChange={(e) => {
                    updateForm({ timeT: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row w-full justify-end h-14 items-end pb-2 px-2 gap-2 text-sm">
              <button
                type="submit"
                className="bg-[#19AF0C] w-[100px] h-8 rounded-md"
              >
                Add
              </button>
              <button
                type="reset"
                onClick={() => {
                  setAdd(false);
                }}
                className="bg-red-800 w-[100px] h-8 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      {selected.length > 0 && (
        <div className="flex flex-row text-sm h-12 items-center justify-between mx-2 rounded-md px-2 bg-[#287A2C]">
          <p>Delete {selected.length} items?</p>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => {
                setDelete(false);
                setSelected([]);
              }}
              className="bg-[#19AF0C] w-[100px] h-8 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete();
              }}
              className="bg-red-800 w-[100px] h-8 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      )}
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
              setAnchorEl(null);
              setAdd(true);
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
              setAnchorEl(null);
              setDelete(true);
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
