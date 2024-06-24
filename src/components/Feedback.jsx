import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Backdrop } from "@mui/material";
import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import FeedbackPreview from "./FeedbackPreview";

function Feedback({ feedbacks }) {
  const [preview, setPreview] = useState(null);
  const columns = useMemo(() => [
    {
      name: "#",
      cell: (row, index) => {
        return <p className="text-sm">{row.no}</p>;
      },
      width: "80px",
    },
    {
      name: "Name",
      cell: (row) => <p className="text-sm">{row.Name}</p>,
      width: "250px",
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      width: "250px",
    },
    {
      name: "Feedback",
      cell: (row) => <p className="text-sm">{row.Feedback}</p>,
      width: "350px",
    },
    {
      name: "",
      cell: (row) => (
        <p
          onClick={() => {
            setPreview(row);
          }}
          className="text-xs underline cursor-pointer hover:text-blue-800"
        >
          View
        </p>
      ),
      width: "60px",
    },
  ]);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-full bg-[#D9D9D9] rounded-lg">
        <DataTable
          className="font-inter h-full overflow-hidden rounded-lg text-[#2f2f2f]"
          columns={columns}
          data={feedbacks["data"]}
          customStyles={{
            rows: {
              style: {
                color: "#607d8b",
                "font-family": "Inter",
                "font-size": "14px",
              },
            },
            headRow: {
              style: {
                "font-family": "Inter Bold",
                backgroundColor: "#3CA040",
              },
            },
            headCells: {
              style: {
                color: "#F2F2F2",
                "font-size": "16px",
                "font-weight": "bold",
              },
            },
          }}
          persistTableHead
          pagination
          fixedHeader
          allowOverflow
          noDataComponent={
            <div className="h-[400px] w-full flex items-center justify-center bg-[#D9D9D9]">
              <p className="bg-transparent text-[#2f2f2f] font-inter text-sm">
                No feedback yet.
              </p>
            </div>
          }
        />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!!preview}
        >
          {!!preview && (
            <FeedbackPreview
              feedback={preview}
              close={() => {
                setPreview(null);
              }}
            />
          )}
        </Backdrop>
      </div>
    </div>
  );
}

export default Feedback;
