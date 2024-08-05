import { axiosInstance } from "../utils/axiosInstance";

export const subscribeService = {
  subscribe(payload = {}) {
    return axiosInstance.post(`subscribes`, payload);
  },
  subscribeDeals(payload = {}) {
    return axiosInstance.post(`subscribes/deals`, payload);
  },
};
