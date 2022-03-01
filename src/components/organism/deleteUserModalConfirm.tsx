import React, { useRef } from "react";

interface DeleteUserModalConfirmProps {
  open: boolean;
  setOpen: Function;
  handleConfirm: Function;
}

const DeleteUserModalConfirm = ({ open, setOpen, handleConfirm }: DeleteUserModalConfirmProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleCloseModal = (e: any) => {
    if (modalRef.current?.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-bgsecondary z-10 flex items-center justify-center transition-all "
      onClick={handleCloseModal}
      style={{
        visibility: open ? "visible" : "hidden",
        opacity: open ? "1" : "0",
      }}
    >
        <div className="rounded-md bg-white w-10/12 p-5 font-montserrat grid gap-5 max-w-modal lg:p-10 lg:gap-10" ref={modalRef}>
            <h1 className="text-center text-3xl font-bold lg:text-5xl">Esta seguro ?</h1>

            <div className="flex justify-center gap-5 text-xs lg:text-base">
          <button className="shadow-button py-2 px-4 rounded-md hover:bg-bgsidenav transition-all ">Cancelar</button>
          <button
            className="shadow-button py-2 px-4 rounded-md bg-primary text-white hover:bg-white transition-all hover:text-black"
            onClick={() => handleConfirm()}
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModalConfirm;
