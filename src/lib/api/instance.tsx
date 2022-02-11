import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const instance = axios.create({
  baseURL: publicRuntimeConfig.API_URL,
});

instance.interceptors.request.use((conf) => {
  const token = "dsadsad";
  conf.headers = {
    Authorization: `Bearer ${token}`,
  };
});
