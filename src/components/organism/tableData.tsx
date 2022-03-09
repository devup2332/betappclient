import React from "react";

interface TableDataProps {
  data: [string[]];
}

const TableData = ({ data }: TableDataProps) => {
  const handleClick = (item: string[]) => {
    let date = new Date(item[0]);
    const [team1, _, team2] = item[1].split(" ");
    console.log(team1, team2,_);
  };
  return (
    <table className="w-table-2">
      <thead>
        <tr className="bg-bgsidenav grid grid-cols-14 py-5 rounded-md gap-3">
          {data.length > 1 &&
            data[0].map((value: string, index: number) => {
              return (
                <th key={index} className="text-white text-xs overflow-x-auto">
                  {value}
                </th>
              );
            })}
        </tr>
      </thead>
      <tbody>
        {data.map((row: string[], index: number) => {
          if (index === 0) return;
          const par = index % 2 === 0;
          return (
            <tr
              key={index}
              className="bg-bgsidenav grid grid-cols-14 py-5 rounded-md gap-3"
              onClick={() => handleClick(row)}
              style={{
                background: !par ? "#ffffff" : "#F2F2F2",
              }}
            >
              {row.map((item, ind) => {
                return (
                  <th key={ind} className="text-xs overflow-x-auto">
                    {item}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableData;
