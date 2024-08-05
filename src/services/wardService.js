import { axiosInstance } from "../utils/axiosInstance";

export const WardService = {
  getWard(query = "") {
    return axiosInstance.get(`wards${query}`);
  },
  getWardById(id = "") {
    return axiosInstance.get(`wards${id}`);
  },
};
