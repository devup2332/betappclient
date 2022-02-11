import axios from "axios";
import getConfig from "next/config";

interface Credetentials {
  username: string;
  password: string;
}

const { publicRuntimeConfig } = getConfig();

export const loginUser = async (credentials: Credetentials) => {
  const res = await axios.post(`${publicRuntimeConfig.API_URL}/api/auth/login`, credentials);
  return res.data;
};
