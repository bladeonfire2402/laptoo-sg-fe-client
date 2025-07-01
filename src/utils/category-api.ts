/* eslint-disable @typescript-eslint/no-explicit-any */
// services/productApi.ts
import axiosClient from "@/utils/axiosClient";
import qs from "query-string";

export const categoryApi = {
  // User APIs
  getCategories(params: any) {
    return axiosClient.get(`api/category`);
  },
};
