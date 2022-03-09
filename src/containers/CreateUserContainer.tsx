import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import FormCreateUsers from "../components/moleculas/formCreateUsers";
import TableDataUsers from "../components/moleculas/tableDataUsers";
import { SnackBar } from "../components/organism";
import DeleteUserModalConfirm from "../components/organism/deleteUserModalConfirm";
import { createUser } from "../lib/api/createUser";
import { deleteUserMethod } from "../lib/api/deleteUser";
import { getUsers } from "../lib/api/getUsers";
import { validateUsername } from "../lib/api/validateUsername";
import { IUser } from "../lib/models/user";
import { useUserLogged } from "../providers/userLoggedProvider";

let timer: NodeJS.Timer | undefined;

const CreateUserContainer = () => {
    const [openDeleteUserModalConfirm, setOpenDeleteUserModalConfirm] = useState(false);
    const { user: userLogged } = useUserLogged();
    const [users, setUsers] = useState<IUser[]>([]);
    const [userToDelete, setUserToDelete] = useState<IUser | {}>({});
    const [openSelectInputRole, setOpenSelectInputRole] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const selectRoleInputRef = useRef<HTMLDivElement>(null);
    const {
        handleSubmit,
        formState: { errors },
        reset,
        register,
        watch,
    } = useForm();
    const saveUser = async (data: any) => {
        delete data.password_2;
        setLoading(true);
        const form = { ...data, role: data.role.toLowerCase() };
        const res = await createUser(form);
        reset();
        reset({ role: "" });
        setLoading(false);
        getTableData();
        if (timer) clearTimeout(timer);
        setMessage(res.message);
        setOpen(true);
        timer = setTimeout(() => {
            setOpen(false);
        }, 5000);
    };

    const selectOptionRole = (opt: string) => {
        reset({ role: opt });
    };
    const handleGeneralClick = (e: any) => {
        if (!selectRoleInputRef.current?.contains(e.target)) {
            if (openSelectInputRole) setOpenSelectInputRole(false);
        }
    };

    const deleteUser = async () => {
        await deleteUserMethod(userToDelete as IUser);
        await getTableData();
    };

    const handleError = (err: any) => {
        console.log(err);
    };

    const getTableData = async () => {
        const res = await getUsers();
        const tableData = [...res.users] as IUser[];
        const index = tableData.findIndex((usr) => {
            return usr.id === userLogged?.id;
        });
        if (index >= 0) {
            tableData.splice(index, 1);
        }
        setUsers(tableData);
    };

    useEffect(() => {
        getTableData();
    }, [userLogged]);

    return (
        <div
            className="p-5 grid gap-5 max-w-sm m-auto  lg:max-w-none lg:px-10 lg:gap-16 lg:mt-12 xl:gap-32 xl:px-40 2xl:grid-cols-2"
            onClick={handleGeneralClick}
        >
            <FormCreateUsers
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
                saveUser={saveUser}
                handleError={handleError}
                validateUsername={validateUsername}
                watch={watch}
                selectOptionRole={selectOptionRole}
                loading={loading}
            />
            <div className="overflow-x-auto h-fit grid gap-5">
                <h1 className="text-3xl font-bold">Lista de Usuarios</h1>
                {users.length > 0 ? (
                    <TableDataUsers
                        users={users}
                        setOpenDeleteUserModalConfirm={setOpenDeleteUserModalConfirm}
                        setUserToDelete={setUserToDelete}
                    />
                ) : (
                    <h1 className="font-bold text-xs lg:text-base">No hay usuarios creados</h1>
                )}
            </div>
            <SnackBar open={open} setOpen={setOpen} message={message} />
            <DeleteUserModalConfirm
                open={openDeleteUserModalConfirm}
                setOpen={setOpenDeleteUserModalConfirm}
                handleConfirm={deleteUser}
            />
        </div>
    );
};

export default CreateUserContainer;
