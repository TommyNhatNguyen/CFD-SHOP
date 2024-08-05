import { axiosInstance } from "../utils/axiosInstance";

export const pageService = {
  getPages(query = "") {
    return axiosInstance.get(`pages${query}`);
  },
  getPagesByName(name = "") {
    return axiosInstance.get(`pages${name}`);
  },
};
