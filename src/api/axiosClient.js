/* eslint-disable */
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api-nodejs-todolist.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
