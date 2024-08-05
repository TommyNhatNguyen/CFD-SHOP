import { axiosInstance } from "../utils/axiosInstance";

export const orderService = {
  getVoucher(code = "") {
    return axiosInstance.get(`orders/voucher${code}`);
  },
  getOrders(query = "") {
    return axiosInstance.get(`orders/me${query}`);
  },
  getOrdersById(id = "") {
    return axiosInstance.get(`orders${id}/me`);
  },
  checkout(payload = {}) {
    return axiosInstance.post(`orders`, payload);
  },
};
