import { axiosInstance } from "../utils/axiosInstance";

export const provinceService = {
  getProvinces(query = "") {
    return axiosInstance.get(`provinces${query}`);
  },
  getProvincesById(id = "") {
    return axiosInstance.get(`provinces${id}`);
  },
};
