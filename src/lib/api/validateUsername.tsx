import instance from "./instance";

export const validateUsername = async (username: string) => {
  const res = await instance.post("/api/users/validateUsername", { username });
  return res.data;
};
