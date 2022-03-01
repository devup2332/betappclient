import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const instance = axios.create({
  baseURL: publicRuntimeConfig.API_URL,
});

instance.interceptors.request.use((conf) => {
  const token = localStorage.getItem("token-api");
  conf.headers = {
    Authorization: `Bearer ${token}`,
  };
  return conf;
});

export default instance;
