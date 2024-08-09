import axios from "axios";
import { tokenMethod } from "./tokenMethod";
import { ENV } from "../constants/environments";

export const axiosInstance = axios.create({
  baseURL: ENV.BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${tokenMethod?.get()?.accessToken}`;
    return config;
  },
  function (error) {
    console.log("Request error", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.response.status === 403) {
      return Promise.reject(error?.response?.data?.message);
    }
  }
);
