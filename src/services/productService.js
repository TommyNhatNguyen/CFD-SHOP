import { axiosInstance } from "../utils/axiosInstance";

export const productService = {
  getProduct(query = "") {
    return axiosInstance.get(`products${query}`);
  },
  getProductBySlug(slug = "") {
    return axiosInstance.get(`products${slug}`);
  },
  getProductCategories(query = "") {
    return axiosInstance.get(`product-categories${query}`);
  },
  getProductCategoriesBySlug(slug = "") {
    return axiosInstance.get(`product-categories${slug}`);
  },
};
