import React, { useState } from "react";
import { CloseIcon } from "../atoms/icons";

interface SnackBarProps {
  message: string;
  open: boolean;
  setOpen: Function;
}

const SnackBar = ({ message, open, setOpen }: SnackBarProps) => {
  const closeSnackBar = () => {
    setOpen(false);
  };
  return (
    <div
    className="bg-white transition-all fixed -bottom-20 left-0 right-0 m-auto w-4/5 max-w-sm md:max-w-xs shadow-card rounded-md py-3 px-5 flex justify-between items-center"
      style={{ transform: open ? "translateY(-120px)" : "translateY(0px)" }}
    >
      <span className="text-sm md:text-base">{message}</span>

      <button type="button" className="cursor-pointer" onClick={closeSnackBar}>
        <CloseIcon className="w-4 text-danger fill-current md:w-5" />
      </button>
    </div>
  );
};

export default SnackBar;
