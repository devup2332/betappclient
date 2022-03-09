import React, { useEffect, useRef, useState } from "react";
import readXlsxFile, { Row } from "read-excel-file";
import { SnackBar } from "../components/organism";
import TableData from "../components/organism/tableData";
import { validateExcel } from "../lib/utils/validateExcel";

const events = ["dragleave", "drop", "dragenter", "drag", "dragover"];
let timer: NodeJS.Timer | undefined;

const TablesContainer = () => {
  const [enter, setEnter] = useState(false);
  const [dataTable, setDataTable] = useState<[string[]]>([[]]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const inputFile = useRef<HTMLInputElement>(null);
  const dropzone = useRef<HTMLDivElement>(null);

  const preventsDefault = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const readImage = async (e: DragEvent) => {
    if (timer) clearTimeout(timer);
    const file = e.dataTransfer?.files[0];
    if (!file) return;
    const valid = validateExcel(file);
    if (!valid) {
      setMessage("Solo se aceptan archivos excel");
      setOpenSnackBar(true);
      timer = setTimeout(() => {
        setMessage("");
        setOpenSnackBar(false);
      }, 5000);
    }

    const res = (await readXlsxFile(file)) as [string[]];
    if (!res) return;
    setDataTable(res);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = (await readXlsxFile(file)) as [string[]];
    if (!res) return;
    setDataTable(res);
  };
  useEffect(() => {
    events.forEach((name) => {
      dropzone.current?.addEventListener(name, preventsDefault);
    });

    ["dragenter", "dragover"].forEach((name) => {
      dropzone.current?.addEventListener(name, () => setEnter(true));
    });
    ["dragleave", "drop"].forEach((name) => {
      dropzone.current?.addEventListener(name, () => setEnter(false));
    });

    dropzone.current?.addEventListener("drop", readImage);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);
  return (
    <div className="px-5 pt-5 font-montserrat grid gap-10 lg:px-10 xl:px-40">
      <div
        className="border-2 border-dashed border-black rounded-md cursor-pointer flex justify-center items-center h-72 max-w-md w-full m-auto"
        onClick={() => inputFile.current?.click()}
        ref={dropzone}
        style={{
          border: enter ? "3px dashed #4062BB" : "2px dashed #000000",
        }}
      >
        <input
          type="file"
          hidden
          ref={inputFile}
          onChange={handleFile}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
        <span className="font-bold text-xs lg:text-base">Ingrese su archivo excel aqui</span>
      </div>
      {dataTable.length > 1 && (
        <div className="overflow-auto h-96 scrollbar-styles">
          <TableData data={dataTable} />
        </div>
      )}
      <SnackBar
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message={message}
      />
    </div>
  );
};

export default TablesContainer;
