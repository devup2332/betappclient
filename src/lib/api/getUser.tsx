import getConfig from "next/config";
import instance from "./instance";

const { publicRuntimeConfig } = getConfig();

export const getUser = async () => {
  const res = await instance.get(`${publicRuntimeConfig.API_URL}/api/users/profile`);
  return res.data;
};
