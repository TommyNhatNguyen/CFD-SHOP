import { axiosInstance } from "../utils/axiosInstance";

export const districtService = {
  getDistricts(query = "") {
    return axiosInstance.get(`districts?province=${query}`);
  },
  getDistrictsById(id = "") {
    return axiosInstance.get(`districts${id}`);
  },
};
