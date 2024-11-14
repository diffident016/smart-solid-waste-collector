import React, { useState } from "react";
import ScheduleBox from "./ScheduleBox";
import {
  Backdrop,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { show } from "../states/alerts";
import { useDispatch } from "react-redux";
import {
  addBrgy,
  addLocation,
  deleteLocation,
  removeBrgy,
  updateBrgy,
  updateLocation,
} from "../api/Services";
import PopupDialog from "./PopupDialog";
import { te } from "date-fns/locale";

function Schedule({ schedules, isAddSched, close, locations }) {
  const [location, setLocation] = useState("");
  const [brgy, setBrgy] = useState("");
  const [isAddBrgy, setAddBrgy] = useState(false);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const [isDeleteBrgy, setDeleteBrgy] = useState(null);
  const [isUpdateBrgy, setUpdateBrgy] = useState(null);
  const [isUpdateLocation, setUpdateLocation] = useState(null);
  const [isDeleteLocation, setDeleteLocation] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleDeleteBrgy = async (del) => {
    removeBrgy(del[0], del[1])
      .then((_) => {
        setDeleteBrgy(null);
        dispatch(
          show({
            type: "success",
            message: "Barangay has been deleted successfully.",
            duration: 3000,
            show: true,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          show({
            type: "error",
            message: "Something went wrong.",
            duration: 3000,
            show: true,
          })
        );
      });
  };

  const handleDeleteLocation = async () => {
    const id = selected["id"];

    if (id == "nVJqlKAUV2vfvdlFNz2Z" || id == "wqjGdPKIHwCkIAihAGRY") {
      setSelected(null);

      dispatch(
        show({
          type: "info",
          message: "Oops, you cannot delete this table.",
          duration: 3000,
          show: true,
        })
      );

      return;
    }

    deleteLocation(selected["id"])
      .then((_) => {
        setSelected(null);
        dispatch(
          show({
            type: "success",
            message: "Table has been deleted successfully.",
            duration: 3000,
            show: true,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          show({
            type: "error",
            message: "Something went wrong.",
            duration: 3000,
            show: true,
          })
        );
      });
  };

  const handleAddBrgy = async (e) => {
    e.preventDefault();

    const allBrgy = locations["data"]
      .map((location) => location.brgy.map((br) => br.name.toLowerCase()))
      .flat();

    if (allBrgy.includes(brgy.trim().toLowerCase())) {
      dispatch(
        show({
          type: "error",
          message: "This barangay was already exists in the schedule.",
          duration: 3000,
          show: true,
        })
      );
      return;
    }

    addBrgy(selected["id"], brgy)
      .then((_) => {
        setBrgy("");
        setSelected(null);
        setAddBrgy(false);
        dispatch(
          show({
            type: "success",
            message: "Barangay has been posted successfully.",
            duration: 3000,
            show: true,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          show({
            type: "error",
            message: "Something went wrong.",
            duration: 3000,
            show: true,
          })
        );
      });
  };

  const handleUpdateTable = async (e) => {
    e.preventDefault();

    updateLocation(selected["id"], location)
      .then((_) => {
        setLocation("");
        setSelected(null);
        setUpdateLocation(false);
        dispatch(
          show({
            type: "success",
            message: "Table has been updated successfully.",
            duration: 3000,
            show: true,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          show({
            type: "error",
            message: "Something went wrong.",
            duration: 3000,
            show: true,
          })
        );
      });
  };

  const handleUpdateBrgy = async (e) => {
    e.preventDefault();

    const index = isUpdateBrgy[2].indexOf(isUpdateBrgy[1]);
    var temp = isUpdateBrgy[2];
    var prev = temp[index];

    temp[index] = {
      "brgy-id": prev["brgy-id"],
      name: brgy,
    };

    updateBrgy(isUpdateBrgy[0], temp)
      .then((_) => {
        setUpdateBrgy(null);
        setBrgy("");
        dispatch(
          show({
            type: "success",
            message: "Barangay has been updated successfully.",
            duration: 3000,
            show: true,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          show({
            type: "error",
            message: "Something went wrong.",
            duration: 3000,
            show: true,
          })
        );
      });
  };

  const handleAddTable = async (e) => {
    e.preventDefault();

    addLocation(location)
      .then((_) => {
        setLocation("");
        close();
        dispatch(
          show({
            type: "success",
            message: "Table has been added successfully.",
            duration: 3000,
            show: true,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          show({
            type: "error",
            message: "Something went wrong.",
            duration: 3000,
            show: true,
          })
        );
      });
  };

  return (
    <div className="w-full  overflow-auto flex flex-col">
      <div className="relative bg-[#D9D9D9] rounded-lg h-max w-full items-center justify-center flex flex-col text-[#2f2f2f] py-2">
        {locations.fetchState == 0 && (
          <div className="w-full h-full absolute bg-white/20 z-10 gap-2 flex flex-col items-center justify-center">
            <CircularProgress color="inherit" size={"32px"} />
            <h1 className="font-arimo font-bold text-sm">
              Loading, please wait...
            </h1>
          </div>
        )}
        {locations.fetchState == 1 && schedules.fetchState == 1 ? (
          <div className=" w-full h-full grid grid-cols-2 p-2 gap-4 text-white">
            {locations["data"].map((item) => {
              let group = [];
              if (!!schedules["group"][item["locId"]]) {
                group = schedules["group"][item["locId"]].reduce(
                  (group, sched) => {
                    const id = sched["brgy-id"];

                    group[id] = group[id] ?? [];
                    group[id].push(sched);
                    return group;
                  },
                  {}
                );
              }

              return (
                <div
                  key={item["id"]}
                  className="w-full h-full flex flex-col bg-[#3CA040]  rounded-md"
                >
                  <div className="relative w-full h-12 bg-[#5B7F5C] rounded-t-md flex items-center justify-center px-4 font-inter-bold text-lg italic">
                    {item["name"]}
                    <EllipsisVerticalIcon
                      onClick={(e) => {
                        setAnchorEl(e.currentTarget);
                        setSelected(item);
                      }}
                      className="w-8 cursor-pointer select-none absolute right-2"
                    />
                  </div>
                  <div className="w-full min-h-[400px]">
                    {item["brgy"].map((key) => {
                      return (
                        <ScheduleBox
                          id={item["id"]}
                          brgys={item["brgy"]}
                          location={item}
                          brgy={key}
                          schedules={group[key["brgy-id"]]}
                          select={(id) => {
                            setSelected(id);
                          }}
                          remove={(id, br) => {
                            setDeleteBrgy([id, br]);
                          }}
                          update={(id, br, brgys) => {
                            setUpdateBrgy([id, br, brgys]);
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>The table is empty.</p>
        )}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isAddSched}
        >
          {isAddSched && (
            <form
              onSubmit={handleAddTable}
              className="w-[350px] h-[200px] bg-[#A5D8B6] rounded-lg flex flex-col p-4 text-[#2f2f2f]"
            >
              <div className="w-full flex flex-row justify-between items-center">
                <h1 className="font-inter-bold text-lg">Add Table</h1>
                <div
                  onClick={() => {
                    close();
                  }}
                  className="p-[2px] bg-red-800 rounded-full cursor-pointer"
                >
                  <XMarkIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex flex-col py-2">
                <label className="font-inter-bold text-sm text-[#2f2f2f]/90">
                  Table name
                </label>
                <input
                  required
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  className="mt-2 bg-[#E9E9E9]/60 rounded-md resize-none focus:outline-none p-2 placeholder:text-[#2f2f2f]/80"
                ></input>
              </div>

              <button
                type="submit"
                className="bg-[#19AF0C] w-[150px] h-9 rounded-lg text-white mt-4 self-center text-sm"
              >
                Add
              </button>
            </form>
          )}
        </Backdrop>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!!isUpdateBrgy}
        >
          {!!isUpdateBrgy && (
            <form
              onSubmit={handleUpdateBrgy}
              className="w-[350px] h-[200px] bg-[#A5D8B6] rounded-lg flex flex-col p-4 text-[#2f2f2f]"
            >
              <div className="w-full flex flex-row justify-between items-center">
                <h1 className="font-inter-bold text-lg">Update Barangay</h1>
                <div
                  onClick={() => {
                    setBrgy("");
                    setUpdateBrgy(null);
                  }}
                  className="p-[2px] bg-red-800 rounded-full cursor-pointer"
                >
                  <XMarkIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex flex-col py-2">
                <label className="font-inter-bold text-sm text-[#2f2f2f]/90">
                  Barangay
                </label>
                <input
                  required
                  value={brgy}
                  onChange={(e) => {
                    setBrgy(e.target.value);
                  }}
                  placeholder={isUpdateBrgy[1]["name"]}
                  className="mt-2 bg-[#E9E9E9]/60 rounded-md resize-none focus:outline-none p-2 placeholder:text-[#2f2f2f]/80"
                ></input>
              </div>

              <button
                type="submit"
                className="bg-[#19AF0C] w-[150px] h-9 rounded-lg text-white mt-4 self-center text-sm"
              >
                Update
              </button>
            </form>
          )}
        </Backdrop>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isAddBrgy}
        >
          {isAddBrgy && (
            <form
              onSubmit={handleAddBrgy}
              className="w-[350px] h-[200px] bg-[#A5D8B6] rounded-lg flex flex-col p-4 text-[#2f2f2f]"
            >
              <div className="w-full flex flex-row justify-between items-center">
                <h1 className="font-inter-bold text-lg">Add Barangay</h1>
                <div
                  onClick={() => {
                    setAddBrgy(false);
                    setBrgy("");
                  }}
                  className="p-[2px] bg-red-800 rounded-full cursor-pointer"
                >
                  <XMarkIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex flex-col py-2">
                <label className="font-inter-bold text-sm text-[#2f2f2f]/90">
                  Barangay name
                </label>
                <input
                  required
                  value={brgy}
                  onChange={(e) => {
                    setBrgy(e.target.value);
                  }}
                  className="mt-2 bg-[#E9E9E9]/60 rounded-md resize-none focus:outline-none p-2 placeholder:text-[#2f2f2f]/80"
                ></input>
              </div>

              <button
                type="submit"
                className="bg-[#19AF0C] w-[150px] h-9 rounded-lg text-white mt-4 self-center text-sm"
              >
                Add
              </button>
            </form>
          )}
        </Backdrop>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isUpdateLocation}
        >
          {isUpdateLocation && (
            <form
              onSubmit={handleUpdateTable}
              className="w-[350px] h-[200px] bg-[#A5D8B6] rounded-lg flex flex-col p-4 text-[#2f2f2f]"
            >
              <div className="w-full flex flex-row justify-between items-center">
                <h1 className="font-inter-bold text-lg">Update Table</h1>
                <div
                  onClick={() => {
                    setUpdateLocation(null);
                  }}
                  className="p-[2px] bg-red-800 rounded-full cursor-pointer"
                >
                  <XMarkIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex flex-col py-2">
                <label className="font-inter-bold text-sm text-[#2f2f2f]/90">
                  Table name
                </label>
                <input
                  required
                  value={location}
                  placeholder={selected["name"]}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  className="mt-2 bg-[#E9E9E9]/60 rounded-md resize-none focus:outline-none p-2 placeholder:text-[#2f2f2f]/80"
                ></input>
              </div>

              <button
                type="submit"
                className="bg-[#19AF0C] w-[150px] h-9 rounded-lg text-white mt-4 self-center text-sm"
              >
                Update
              </button>
            </form>
          )}
        </Backdrop>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          dense="true"
          onClose={() => {
            setAnchorEl(null);
          }}
          className="p-0"
        >
          <MenuList className="focus:outline-none p-0 ">
            <MenuItem
              onClick={() => {
                setAddBrgy(true);
                setAnchorEl(null);
              }}
            >
              <ListItemIcon>
                <PlusIcon className="w-4" />
              </ListItemIcon>
              <p className="text-sm">Add Barangay</p>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setUpdateLocation(true);
                setAnchorEl(null);
              }}
            >
              <ListItemIcon>
                <PencilSquareIcon className="w-4" />
              </ListItemIcon>
              <p className="text-sm">Edit Table</p>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setDeleteLocation(true);
              }}
            >
              <ListItemIcon>
                <TrashIcon className="w-4 text-rose-600" />
              </ListItemIcon>
              <p className="text-sm text-rose-600">Delete Table</p>
            </MenuItem>
          </MenuList>
        </Menu>
        <PopupDialog
          show={!!isDeleteBrgy}
          close={() => {
            setDeleteBrgy(null);
          }}
          title="Delete Barangay"
          content="Are you sure you want to delete this barangay? All the area schedules will be deleted also."
          action1={() => {
            handleDeleteBrgy(isDeleteBrgy);
            setDeleteBrgy(null);
          }}
          action2={() => {
            setDeleteBrgy(null);
          }}
        />

        <PopupDialog
          show={isDeleteLocation}
          close={() => {
            setDeleteLocation(false);
          }}
          title="Delete Table"
          content="Are you sure you want to delete this table? All the barangay and schedules will be deleted also."
          action1={() => {
            handleDeleteLocation();
            setDeleteLocation(false);
          }}
          action2={() => {
            setDeleteLocation(false);
          }}
        />
      </div>
    </div>
  );
}

export default Schedule;
