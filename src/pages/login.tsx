import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CloseEyeIcon,
  EyeIcon,
  LoadingIcon,
  UserIcon,
} from "../components/atoms/icons";
import { SnackBar } from "../components/organism";
import withOutAuth from "../hoocs/withOutAuth";
import { loginUser } from "../lib/api/login";
import { useUserLogged } from "../providers/userLoggedProvider";

let timer: NodeJS.Timer | undefined;
const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitLogin = async (data: any) => {
    setLoading(true);
    const { message: res_message, token } = await loginUser(data);
    if (token) {
      setLoading(false);
      localStorage.setItem("token-api", token);
      return router.push("/dashboard");
    }
    setMessage(res_message);
    setLoading(false);
    if (timer) clearTimeout(timer);
    setOpen(true);
    timer = setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  const handleError = (err: any) => {
    console.log(err);
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800&family=Roboto:wght@100;300;400;500;700;900&display=swap"
        />
        <title>Login - BetApp</title>
      </Head>
      <div className="relative h-screen bg-primary flex justify-center items-center font-roboto">
        <div className="grid gap-10 w-4/5 bg-white max-w-sm md:rounded-xl md:shadow-card md:p-10">
          <h1 className="text-4xl font-bold text-center ">BIENVENIDO</h1>
          <form>
            <div>
              <div className="flex justify-between border-2 border-black rounded-md py-2 gap-3 px-3">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Contraseña"
                  autoComplete="off"
                  className="outline-none placeholder:text-black text-sm md:text-base w-full"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Ingrese la contrasena",
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
                <p className="text-danger text-sm font-bold mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="group bg-primary text-white flex justify-center items-center rounded-md py-2 px-3 gap-3 shadow-button cursor-pointer hover:bg-white hover:text-black transition-all"
            >
              {loading && (
                <LoadingIcon className="group-hover:text-black text-white loading-animation fill-current w-7" />
              )}
              <span className="text-sm font-bold md:text-base">Ingresar</span>
            </button>
          </form>
        </div>
        <SnackBar message={message} open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default withOutAuth(LoginPage);
