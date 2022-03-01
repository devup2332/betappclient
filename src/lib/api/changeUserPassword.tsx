import instance from "./instance";

export const changeUserPassword = async (current: string, password: string) => {
  const res = await instance.post("/api/users/changePassword", { current, password });
  return res.data;
};
