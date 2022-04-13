/* eslint-disable */
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api-nodejs-todolist.herokuapp.com",
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

function getToken() {
  if (localStorage["vue-todo-app"]) {
    return JSON.parse(localStorage.getItem("vue-todo-app")).token;
  } else {
    return null;
  }
}

export default axiosClient;
