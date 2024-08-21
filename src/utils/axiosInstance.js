import axios from "axios";
import { tokenMethod } from "./tokenMethod";
import { ENV } from "../constants/environments";
import { authService } from "../services/authService";
import { useDispatch } from "react-redux";

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
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !!!originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await authService.refreshToken({
          refreshToken: tokenMethod.get()?.refreshToken,
        });
        const { token: accessToken, refreshToken } = res.data.data || {};
        tokenMethod.set({
          accessToken,
          refreshToken,
        });
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log("error", error);
        tokenMethod.delete();
      }
      return Promise.reject(
        error?.response?.data?.message || "Something went wrong"
      );
    }
    return Promise.reject(error);
  }
);
