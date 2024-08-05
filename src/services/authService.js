import { axiosInstance } from "../utils/axiosInstance";

export const authService = {
  login(payload = {}) {
    return axiosInstance.post(`customer/login`, payload);
  },
  getProfile(query = "") {
    return axiosInstance.get(`customer/profiles${query}`);
  },
  updateProfile(payload = {}) {
    return axiosInstance.put(`customer/profiles`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  register(payload = {}) {
    return axiosInstance.post(`customer/register`, payload);
  },
  refreshToken(payload = {}) {
    return axiosInstance.put(`customer/refresh`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  addWhiteList(payload = {}) {
    return axiosInstance.post(`customer/white-list`, payload);
  },
  deleteWhiteList(payload = {}) {
    return axiosInstance.delete(`customer/white-list`, payload);
  },
};
