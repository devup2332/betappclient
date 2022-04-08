import React, { useEffect, useRef, useState } from "react";
import readXlsxFile, { Row } from "read-excel-file";
import { schema } from "../lib/utils/schemaExcel";
import TableData from "../components/organism/tableData";
import { validateExcel } from "../lib/utils/validateExcel";
import { ItemDataExcel } from "../lib/models/itemDataExcel";
import { useSnackbar } from "../providers/snackbarProvider";
import { useRouter } from "next/router";

const events = ["dragleave", "drop", "dragenter", "drag", "dragover"];
let timer: NodeJS.Timer | undefined;

const TablesContainer = () => {
  const [enter, setEnter] = useState(false);
  const { openSnack, configMessage } = useSnackbar();
  const [dataTable, setDataTable] = useState<ItemDataExcel[]>([]);
  const [headerTable, setHeaderTable] = useState<Row>([]);
  const inputFile = useRef<HTMLInputElement>(null);
  const dropzone = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const preventsDefault = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const goToPlayPage = () => {
    localStorage.setItem("data_table_1", JSON.stringify(dataTable));
    router.push("/dashboard/plays");
  };

  const readFile = async (e: DragEvent) => {
    if (timer) clearTimeout(timer);
    const file = e.dataTransfer?.files[0];
    if (!file) return;
    const valid = validateExcel(file);
    if (!valid) {
      configMessage("Solo se aceptan archivos excel");
      openSnack(true);
      timer = setTimeout(() => {
        configMessage("");
        openSnack(false);
      }, 5000);
      return;
    }
    const res = await readXlsxFile<ItemDataExcel>(file, { sheet: 2, schema });
    const [header] = await readXlsxFile(file, { sheet: 2 });
    if (!res) return;
    setHeaderTable(header);
    setDataTable(res.rows);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await readXlsxFile<ItemDataExcel>(file, { sheet: 2, schema });
    const [header] = await readXlsxFile(file, { sheet: 2 });
    if (!res) return;
    setHeaderTable(header);
    setDataTable(res.rows);
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

    dropzone.current?.addEventListener("drop", readFile);
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
        <span className="font-bold text-xs lg:text-base">
          Ingrese su archivo excel aqui
        </span>
      </div>
      {dataTable.length > 1 && (
        <div className="overflow-auto h-96 scrollbar-styles">
          <TableData header={headerTable} data={dataTable} />
        </div>
      )}
      {dataTable.length > 1 && (
        <button
          onClick={goToPlayPage}
          className="bg-primary outline-none text-white font-montserrat py-3 rounded-md font-bold hover:bg-white transition-all hover:text-black shadow-button "
        >
          Generar Jugadas
        </button>
      )}
    </div>
  );
};

export default TablesContainer;
