import { axiosInstance } from "../utils/axiosInstance";

export const reviewService = {
  getReviewById(id = "") {
    return axiosInstance.get(`reviews/product${id}`);
  },
  review(payload = {}) {
    return axiosInstance.post(`reviews`, payload);
  },
};
