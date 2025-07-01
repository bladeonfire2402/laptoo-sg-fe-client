/* eslint-disable @typescript-eslint/no-explicit-any */
// services/productApi.ts
import axiosClient from "@/utils/axiosClient";
import qs from "query-string";

export const productApi = {
  // User APIs
  getProducts(params: any) {
    const query = qs.stringify(params);
    return axiosClient.get(`api/product?${query}`);
  },

  getProductById(id: string) {
    return axiosClient.get(`api/product/${id}`);
  },

  getProductBySlug(slug: string) {
    return axiosClient.get(`api/product/slug/${slug}`);
  },

  getProductDetail(idOrSlug: string) {
  return axiosClient.get(`api/product/slug/${idOrSlug}`);
}
};
