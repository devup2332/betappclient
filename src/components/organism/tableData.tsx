import React from "react";
import { Row } from "read-excel-file";
import { Cell } from "read-excel-file/types";
import { ItemDataExcel } from "../../lib/models/itemDataExcel";

interface TableDataProps {
  data: ItemDataExcel[];
  header: Row;
}

const TableData = ({ data, header }: TableDataProps) => {
  const handleClick = (item: ItemDataExcel) => {
    console.log(item);
  };
  return (
    <table className="w-table-2">
      <thead>
        <tr className="bg-bgsidenav grid grid-cols-17 py-5 rounded-md gap-3">
          {data.length > 1 &&
            header.map((value: Cell, index: number) => {
              return (
                <th key={index} className="text-white text-xs overflow-x-auto">
                  {value}
                </th>
              );
            })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          const par = index % 2 === 0;
          return (
            <tr
              key={index}
              className="bg-bgsidenav grid grid-cols-17 py-5 rounded-md gap-3"
              onClick={() => handleClick(row)}
              style={{
                background: !par ? "#ffffff" : "#F2F2F2",
              }}
            >
              <th className="text-xs overflow-x-auto">
                {row.date.toUTCString()}
              </th>
              <th className="text-xs overflow-x-auto">{row.liga}</th>
              <th className="text-xs overflow-x-auto">{row.game}</th>
              <th className="text-xs overflow-x-auto">{row.coute1}</th>
              <th className="text-xs overflow-x-auto">{row.couteX}</th>
              <th className="text-xs overflow-x-auto">{row.coute2}</th>
              <th className="text-xs overflow-x-auto">{row.time}</th>
              <th className="text-xs overflow-x-auto">{row.draw}</th>
              <th className="text-xs overflow-x-auto">{row.prediction}</th>
              <th className="text-xs overflow-x-auto">{row["over1.5"]}</th>
              <th className="text-xs overflow-x-auto">{row["over2.5"]}</th>
              <th className="text-xs overflow-x-auto">{row.btts}</th>
              <th className="text-xs overflow-x-auto">
                {row["1HalfScorePrediction"]}
              </th>
              <th className="text-xs overflow-x-auto">
                {row["1HalfOver0.5Goals"]}
              </th>
              <th className="text-xs overflow-x-auto">
                {row["1HalfOver1.5Goals"]}
              </th>
              <th className="text-xs overflow-x-auto">
                {row["2HalfOver0.5Goals"]}
              </th>
              <th className="text-xs overflow-x-auto">
                {row["2HalfOver1.5Goals"]}
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableData;
