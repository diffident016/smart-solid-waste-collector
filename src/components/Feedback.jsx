import React, { useMemo } from "react";
import DataTable from "react-data-table-component";

function Feedback() {
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
      cell: (row) => <p className="text-sm">{row.name}</p>,
      width: "300px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "250px",
    },
    {
      name: "Feedback",
      cell: (row) => <p className="text-sm">{row.feedback}</p>,
      width: "250px",
    },
  ]);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-full bg-[#D9D9D9] rounded-lg">
        <DataTable
          className="font-inter h-full overflow-hidden rounded-lg"
          columns={columns}
          data={[]}
          customStyles={{
            rows: {
              style: {
                color: "#607d8b",
                "font-family": "Lato",
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
          pagination={true}
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
      </div>
    </div>
  );
}

export default Feedback;
