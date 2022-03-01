import React, { useRef, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { validateEmailMethod } from "../../lib/api/validateEmail";
import { emailPattern } from "../../lib/utils/patterns";
import { roles } from "../../lib/utils/roles";
import { CloseEyeIcon, EyeIcon, IconArrowDown, IconSave, LoadingIcon } from "../atoms/icons";
interface FormCreateUsersProps {
    register: UseFormRegister<FieldValues>;
    errors: {
        [x: string]: any;
    };
    handleSubmit: Function;
    saveUser: Function;
    handleError: Function;
    validateUsername: Function;
    watch: Function;
    selectOptionRole: Function;
    loading: boolean;
}
const FormCreateUsers = ({
    register,
    errors,
    handleSubmit,
    saveUser,
    handleError,
    validateUsername,
    watch,
    selectOptionRole,
    loading,
}: FormCreateUsersProps) => {
    const [showPass, setShowPass] = useState(false);
    const [openSelectInputRole, setOpenSelectInputRole] = useState(false);
    const selectRoleInputRef = useRef<HTMLDivElement>(null);
    return (
        <form
            className="grid gap-5 lg:grid-cols-2 lg:gap-10 xl:grid-cols-1 h-fit"
            onSubmit={handleSubmit(saveUser, handleError)}
        >
            <div>
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
                        validate: {
                            validateEmailUse: async (email) => {
                                const isUse = await validateEmailMethod(email);

                                if (isUse) return "El email ya esta en uso";
                                return true;
                            },
                        },
                    })}
                />
                {errors.email && (
                    <p className="text-danger font-bold text-sm mt-1 lg:text-base">{errors.email.message}</p>
                )}
            </div>
            <div>
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
                                const { status } = await validateUsername(username);
                                if (status === 1) return true;
                                return "El usuario ya esta en uso";
                            },
                        },
                    })}
                />
                {errors.username && (
                    <p className="text-danger font-bold text-sm mt-1 lg:text-base">{errors.username.message}</p>
                )}
            </div>
            <div>
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
                    <p className="text-danger font-bold text-sm mt-1 lg:text-base">{errors.phone.message}</p>
                )}
            </div>
            <div>
                <div className="flex justify-between border-2 border-black rounded-md py-2 gap-3 px-5">
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder="Contraseña"
                        autoComplete="off"
                        className="outline-none text-sm md:text-base w-full"
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
                    <p className="text-danger text-sm font-bold mt-1 lg:text-base">{errors.password?.message}</p>
                )}
            </div>
            <div>
                <div className="flex justify-between border-2 border-black rounded-md py-2 gap-3 px-5">
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder="Contraseña"
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
            <div>
                <div
                    className="border-2 border-black rounded-md py-2 px-5 flex gap-5 relative"
                    ref={selectRoleInputRef}
                    onClick={() => setOpenSelectInputRole(!openSelectInputRole)}
                >
                    <input
                        type="text"
                        className="w-full outline-none font-montserrat  text-sm lg:text-base"
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
                            transform: openSelectInputRole ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                    />
                    <ul
                        className="rounded-md shadow-card absolute top-0 bg-white left-0 w-full font-montserrat text-sm invisible transition-all lg:text-base"
                        style={{
                            visibility: openSelectInputRole ? "visible" : "hidden",
                            opacity: openSelectInputRole ? "1" : "0",
                            transform: openSelectInputRole ? "translateY(40px)" : "translateY(0px)",
                        }}
                    >
                        {roles.map((opt, index) => (
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
                    <p className="text-danger font-bold text-sm mt-1 lg:text-base">{errors.role.message}</p>
                )}
            </div>
            <button
                type="submit"
                className="flex h-fit gap-5 text-sm bg-primary py-2 items-center justify-center rounded-md text-white font-bold hover:bg-white shadow-button transition-all hover:text-black lg:text-base lg:col-start-1 lg:col-end-3 xl:col-start-1 xl:col-end-1"
            >
                {loading ? <LoadingIcon className="w-7 fill-current" /> : <IconSave className="w-5 fill-current" />}

                <span>Crear</span>
            </button>
        </form>
    );
};

export default FormCreateUsers;
