import { axiosInstance } from "../utils/axiosInstance";

export const districtService = {
  getDistricts(query = "") {
    return axiosInstance.get(`districts${query}`);
  },
  getDistrictsById(id = "") {
    return axiosInstance.get(`districts${id}`);
  },
};
