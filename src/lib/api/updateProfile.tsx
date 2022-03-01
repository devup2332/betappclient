import instance from "./instance";

export const updateProfile = async (data: any) => {
  const res = await instance.put("/api/users/profile", data);
  return res.data;
};
