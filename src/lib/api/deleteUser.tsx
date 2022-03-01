import { IUser } from "../models/user";
import instance from "./instance";

export const deleteUserMethod = async (user: IUser) => {
  const res = await instance.delete(`/api/users/${user.id}`);
  return res.data;
};
