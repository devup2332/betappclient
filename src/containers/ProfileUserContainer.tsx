import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IconArrowDown,
  IconCamera,
  IconSave,
  LoadingIcon,
} from "../components/atoms/icons";
import { SnackBar } from "../components/organism";
import ChangePasswordModal from "../components/organism/changePasswordModal";
import { getUser } from "../lib/api/getUser";
import { updateProfile } from "../lib/api/updateProfile";
import { validateUsername } from "../lib/api/validateUsername";
import { IUser } from "../lib/models/user";
import { useUserLogged } from "../providers/userLoggedProvider";

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const options = ["Admin", "Superadmin", "User"];
let timer: NodeJS.Timer | undefined;
const ProfileUserContainer = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user: userLogged, setUserLogged } = useUserLogged();
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const selectRoleInputRef = useRef<HTMLDivElement>(null);
  const [openSelectInputRole, setOpenSelectInputRole] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const saveProfile = async (data: any) => {
    try {
      setLoading(true);
      const form = { ...data, role: data.role.toLowerCase() };
      const res = await updateProfile(form);
      setLoading(false);
      if (timer) clearTimeout(timer);
      setMessage(res.message);
      setOpen(true);
      timer = setTimeout(() => {
        setOpen(false);
      }, 5000);
    } catch (err: any) {
      setLoading(false);
      if (timer) clearTimeout(timer);
      setMessage("Fallo del Servidor");
      setOpen(true);
      timer = setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
  };
  const handleGeneralClick = (e: any) => {
    if (!selectRoleInputRef.current?.contains(e.target)) {
      if (openSelectInputRole) setOpenSelectInputRole(false);
    }
  };

  const selectOptionRole = (option: string) => {
    reset({
      role: option,
    });
  };

  const goToCreateUserPage = () => {
    router.push("/dashboard/createusers");
  };

  const getProfile = async () => {
    const res = await getUser();
    setUserLogged(res.user);
    const first = res.user.role.charAt(0).toUpperCase();
    const slice = res.user.role.slice(1);
    const role = first + slice;
    setUser({ ...res.user, role });
    reset({
      email: res.user.email,
      username: res.user.username,
      phone: res.user.phone,
      role: role,
    });
  };

  useEffect(() => {
    getProfile();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);
  return (
    <div
      className="w-full pt-5 px-5 max-w-sm m-auto lg:max-w-none lg:pt-10 lg:px-10 xl:px-40"
      onClick={handleGeneralClick}
    >
      <div className="flex justify-between lg:justify-start lg:gap-10 font-montserrat xl:justify-start">
        {userLogged?.role === "superadmin" && (
          <button
            onClick={goToCreateUserPage}
            className="rounded-md bg-primary text-white py-2 px-5 text-sm hover:bg-white hover:text-black transition-all shadow-button lg:text-base"
          >
            Crear Usuario
          </button>
        )}
        <button
          onClick={() => setOpenChangePasswordModal(true)}
          className="rounded-md bg-primary text-white py-2 px-5 text-sm hover:bg-white hover:text-black transition-all shadow-button lg:text-base"
        >
          Cambiar Contrasena
        </button>
      </div>
      <div className="mt-10 grid gap-12 ">
        <div
          className="rounded-xl overflow-hidden w-48 h-48 m-auto relative lg:w-72 lg:h-72 lg:m-0 "
          onClick={() => inputFileRef.current?.click()}
        >
          <img
            src="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1930&q=80"
            alt=""
            className="object-cover h-full"
          />
          <input
            type="file"
            accept="image/png, image/jpeg,image/jpg"
            hidden
            ref={inputFileRef}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-bgsecondary flex items-center justify-center text-white flex-col gap-2 opacity-0 transition-all hover:opacity-100 duration-300 cursor-pointer lg:text-xl">
            <IconCamera className="w-16 fill-current lg:w-24" />
            <span className="font-bold">Suba su foto</span>
          </div>
        </div>
        <form
          className="grid gap-5 lg:grid-cols-2 lg:gap-10 xl:grid-cols-1 xl:max-w-modal"
          onSubmit={handleSubmit(saveProfile)}
        >
          <div className="grid gap-2">
            <label className="font-montserrat text-sm font-bold">Correo</label>
            <input
              className="w-full border-2 border-black rounded-md outline-none font-montserrat py-2 px-5 text-sm lg:text-base"
              type="text"
              placeholder="Correo"
              autoComplete="off"
              {...register("email", {
                required: {
                  value: true,
                  message: "El correo es nesesario",
                },
                pattern: {
                  value: emailPattern,
                  message: "Ingrese un correo valido porfavor",
                },
              })}
            />
            {errors.email && (
              <p className="text-danger font-bold text-sm mt-1 lg:text-base">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="font-montserrat text-sm font-bold">Usuario</label>
            <input
              type="text"
              className="w-full border-2 border-black rounded-md outline-none font-montserrat py-2 px-5 text-sm lg:text-base"
              autoComplete="off"
              placeholder="Usuario"
              {...register("username", {
                required: {
                  value: true,
                  message: "El usuario es nesesario",
                },
                validate: {
                  validateUsername: async (username) => {
                    if (username === user?.username) {
                      return true;
                    }
                    const { status } = await validateUsername(username);
                    if (status === 1) return true;
                    return "El usuario ya esta en uso";
                  },
                },
              })}
            />
            {errors.username && (
              <p className="text-danger font-bold text-sm mt-1 lg:text-base">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="font-montserrat text-sm font-bold">
              Telefono
            </label>
            <input
              type="text"
              className="w-full border-2 border-black rounded-md outline-none font-montserrat py-2 px-5 text-sm lg:text-base"
              autoComplete="off"
              placeholder="Telefono"
              {...register("phone", {
                required: {
                  value: true,
                  message: "El telefono es nesesario",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Solo se aceptan numeros",
                },
                maxLength: {
                  value: 30,
                  message: "El telefono es demasiado largo",
                },
              })}
            />
            {errors.phone && (
              <p className="text-danger font-bold text-sm mt-1 lg:text-base">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="font-montserrat text-sm font-bold">Role</label>
            <div
              className="border-2 border-black rounded-md py-2 px-5 flex gap-5 relative"
              ref={selectRoleInputRef}
            >
              <input
                type="text"
                className="w-full outline-none font-montserrat  text-sm lg:text-base"
                style={{
                  color: "rgba(0,0,0,0.6)",
                }}
                placeholder="Rol"
                autoComplete="off"
                disabled
                {...register("role", {
                  required: {
                    value: true,
                    message: "El rol es nesesario",
                  },
                })}
              />
              <IconArrowDown
                className="w-5 text-black fill-current cursor-pointer"
                style={{
                  transform: openSelectInputRole
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              />
              <ul
                className="rounded-md shadow-card absolute top-0 bg-white left-0 w-full font-montserrat text-sm invisible transition-all lg:text-base"
                style={{
                  visibility: openSelectInputRole ? "visible" : "hidden",
                  opacity: openSelectInputRole ? "1" : "0",
                  transform: openSelectInputRole
                    ? "translateY(40px)"
                    : "translateY(0px)",
                }}
              >
                {options.map((opt, index) => (
                  <li
                    className="py-2 px-5 cursor-pointer hover:bg-bgsidenav transition-all lg:py-4"
                    onClick={() => selectOptionRole(opt)}
                    key={index}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
            {errors.role && (
              <p className="text-danger font-bold text-sm mt-1 lg:text-base">
                {errors.role.message}
              </p>
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
      <SnackBar message={message} open={open} setOpen={setOpen} />
      <ChangePasswordModal
        open={openChangePasswordModal}
        setOpen={setOpenChangePasswordModal}
      />
    </div>
  );
};

export default ProfileUserContainer;
