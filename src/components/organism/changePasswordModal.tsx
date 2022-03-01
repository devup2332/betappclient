import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { SnackBar } from ".";
import { changeUserPassword } from "../../lib/api/changeUserPassword";
import { CloseEyeIcon, EyeIcon, IconClose, IconSave, LoadingIcon } from "../atoms/icons";

interface ChangePasswordModalProps {
  open: boolean;
  setOpen: Function;
}

let timer: NodeJS.Timer | undefined;

const ChangePasswordModal = ({ open, setOpen }: ChangePasswordModalProps) => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const containerModalRef = useRef<HTMLDivElement>(null);
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const changePassword = async (data: any) => {
    if (timer) clearTimeout(timer);
    const current = data.currentPassword;
    setLoading(true);
    const res = await changeUserPassword(current, data.password);

    setLoading(false);
    if (res.status === 0) {
      setMessage(res.message);
      setOpenSnackBar(true);
      return (timer = setTimeout(() => {
        setOpenSnackBar(false);
      }, 5000));
    }

    setMessage(res.message);
    setOpenSnackBar(true);
    reset();
    return (timer = setTimeout(() => {
      setOpenSnackBar(false);
    }, 5000));
  };
  const closeModal = (e: any) => {
    if (!containerModalRef.current?.contains(e.target)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    return () => {
      if (timer) return clearTimeout(timer);
    };
  }, []);
  return (
    <div
      className="fixed z-10  top-0 left-0 transition-all font-montserrat w-full h-full bg-bgsecondary flex justify-center items-center -"
      style={{
        opacity: open ? "1" : "0",
        visibility: open ? "visible" : "hidden",
      }}
      onClick={closeModal}
    >
      <div ref={containerModalRef} className="w-10/12 bg-white rounded-md p-5 grid gap-5 max-w-modal lg:p-10 lg:gap-10">
        <div className="text-black flex justify-between">
          <h1 className="text-2xl font-bold lg:text-4xl">Cambiar Contrasena</h1>
          <button className="cursor-pointer" onClick={() => setOpen(false)}>
            <IconClose className="w-5 fill-current " />
          </button>
        </div>
        <form onSubmit={handleSubmit(changePassword)} className="grid gap-5 lg:gap-10">
          <div>
            <div className="flex justify-between border-2 border-black rounded-md py-2 gap-3 px-5">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Contrasena Actual"
                autoComplete="off"
                className="outline-none text-sm md:text-base w-full"
                {...register("currentPassword", {
                  required: {
                    value: true,
                    message: "Ingrese la contrasena actual",
                  },
                })}
              />
              {showPass ? (
                <CloseEyeIcon
                  className="text-black stroke-current w-5 cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                />
              ) : (
                <EyeIcon
                  className="text-black stroke-current w-5 cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                />
              )}
            </div>
            {errors.currentPassword && (
              <p className="text-danger text-sm font-bold mt-1 lg:text-base">{errors.currentPassword?.message}</p>
            )}
          </div>
          <div>
            <div className="flex justify-between border-2 border-black rounded-md py-2 gap-3 px-5">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Nueva Contrasena"
                autoComplete="off"
                className="outline-none text-sm md:text-base w-full"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Ingrese la nueva contrasena",
                  },
                  validate: {
                    sameCurrentPassword: (pass) => {
                      if (watch("currentPassword") === pass) {
                        return "La contrasena es la misma a la actual";
                      }
                      return true;
                    },
                  },
                })}
              />
              {showPass ? (
                <CloseEyeIcon
                  className="text-black stroke-current w-5 cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                />
              ) : (
                <EyeIcon
                  className="text-black stroke-current w-5 cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-danger text-sm font-bold mt-1 lg:text-base">{errors.password?.message}</p>
            )}
          </div>
          <div>
            <div className="flex justify-between border-2 border-black rounded-md py-2 gap-3 px-5">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Verifique contrasena"
                autoComplete="off"
                className="outline-none text-sm md:text-base w-full"
                {...register("password_2", {
                  required: {
                    value: true,
                    message: "Verifique su contrasena",
                  },
                  validate: {
                    samePassword: (pass) => {
                      return watch("password") === pass || "Las contrasenas no son iguales";
                    },
                  },
                })}
              />
            </div>
            {errors.password_2 && (
              <p className="text-danger text-sm font-bold mt-1 lg:text-base">{errors.password_2?.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="flex gap-5 text-sm bg-primary py-2 items-center justify-center rounded-md text-white font-bold hover:bg-white shadow-button transition-all hover:text-black lg:text-base lg:col-start-1 lg:col-end-3 xl:col-start-1 xl:col-end-1"
          >
            {loading ? (
              <LoadingIcon className="w-7 fill-current loading-animation" />
            ) : (
              <IconSave className="w-5 fill-current" />
            )}
            <span>Guardar</span>
          </button>
        </form>
      </div>
      <SnackBar message={message} open={openSnackBar} setOpen={setOpenSnackBar} />
    </div>
  );
};

export default ChangePasswordModal;
