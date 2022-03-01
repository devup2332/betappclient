import instance from "./instance";

export const createUser = async (data: any) => {
  const res = await instance.post("/api/users", data);
  return res.data;
};
