import React from "react";
import { IUser } from "../../lib/models/user";
import { fieldsTable } from "../../lib/utils/fieldsTableUsers";
import { useUserLogged } from "../../providers/userLoggedProvider";
import { IconTrash } from "../atoms/icons";
interface TableDataUsersProps {
    users: IUser[];
    setUserToDelete: Function;
    setOpenDeleteUserModalConfirm: Function;
}
const TableDataUsers = ({ users, setUserToDelete, setOpenDeleteUserModalConfirm }: TableDataUsersProps) => {
    const { user: userLogged } = useUserLogged();
    return (
        <table className="font-montserrat text-sm lg:text-base w-table">
            <thead className="bg-bgsidenav block rounded-md py-3">
                <tr className="grid grid-cols-5">
                    {fieldsTable.map((field, index) => {
                        return <th key={index}>{field.label}</th>;
                    })}
                </tr>
            </thead>
            <tbody className="block">
                {users.map((user, index) => {
                    if (user.id === userLogged.id) return null;
                    const par = index % 2;
                    return (
                        <tr
                            className="grid grid-cols-5 text-center items-center py-3"
                            style={{
                                background: par === 1 ? "#F2F2F2" : "#FFFFFF",
                            }}
                            key={index}
                        >
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td className="flex justify-center">
                                <button
                                    className="outline-none bg-primary text-white rounded-md p-1 hover:bg-white hover:text-black shadow-button transition-all"
                                    onClick={() => {
                                        setUserToDelete(user);
                                        setOpenDeleteUserModalConfirm(true);
                                    }}
                                >
                                    <IconTrash className="w-7  fill-current" />
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableDataUsers;
