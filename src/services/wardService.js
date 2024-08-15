import { axiosInstance } from "../utils/axiosInstance";

export const wardService = {
  getWard(query = "") {
    return axiosInstance.get(`wards?district=${query}`);
  },
  getWardById(id = "") {
    return axiosInstance.get(`wards${id}`);
  },
};
