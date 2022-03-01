import instance from "./instance";

export const getUsers = async () => {
  const res = await instance.get("/api/users");
  return res.data;
};
