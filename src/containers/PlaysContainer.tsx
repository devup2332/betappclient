import React, { useEffect, useState } from "react";
import { ItemDataExcel } from "../lib/models/itemDataExcel";
import usePlays from "../lib/utils/filterDataTable1";
import headerFields from "../lib/utils/headerPlays1";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const PlaysContainer = () => {
  const [data, setData] = useState<any[]>([]);
  const { table1 } = usePlays(data);

  useEffect(() => {
    const dataLocalStorage = JSON.parse(
      localStorage.getItem("data_table_1") as string
    ) as ItemDataExcel[];
    setData(dataLocalStorage);
  }, []);
  return (
    <div className="px-5 pt-5 font-montserrat grid gap-10 lg:px-10 xl:px-40 pt-20">
      <div className="grid gap-3">
        <label className="font-bold">Factor</label>
        <input
          placeholder="Factor"
          type="text"
          className="px-4 border-2 border-black h-10"
        />
      </div>
      <div className="overflow-x-auto scrollbar-styles overflow-y-auto h-700">
        <table className="w-table-3 relative">
          <thead>
            <tr className="bg-bgsidenav grid grid-cols-9 py-5 rounded-md gap-3">
              {headerFields.map((field, ind) => {
                return (
                  <th
                    key={ind}
                    className="text-white text-xs overflow-x-auto lg:text-base"
                  >
                    {field}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {table1.map((row, index) => {
              const par = index % 2 === 0;
              return (
                <tr
                  key={index}
                  className="bg-bgsidenav grid grid-cols-9 py-5 rounded-md gap-3 text-xs lg:text-base"
                  style={{
                    background: !par ? "#ffffff" : "#F2F2F2",
                  }}
                >
                  <th className="overflow-x-auto">
                    {`${(row.date as Date).getDate()} de ${
                      months[(row.date as Date).getMonth()]
                    } del ${(row.date as Date).getFullYear()}`}
                  </th>
                  <th className="overflow-x-auto">{row.game}</th>
                  <th className="overflow-x-auto">{`${
                    (row.date as Date).getHours() < 10
                      ? `0${(row.date as Date).getHours()}`
                      : (row.date as Date).getHours()
                  }:${
                    (row.date as Date).getMinutes() < 10
                      ? `0${(row.date as Date).getMinutes()}`
                      : (row.date as Date).getMinutes()
                  }`}</th>
                  <th>{row.combination}</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <div className="form-check">
                      <input type="checkbox"></input>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaysContainer;
