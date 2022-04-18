/* eslint-disable */
import getToken from "@/utils/getToken";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosClient;
