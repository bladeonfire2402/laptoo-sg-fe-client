/* eslint-disable @typescript-eslint/no-explicit-any */
// services/productApi.ts
import axiosClient from "@/utils/axiosClient";
import qs from "query-string";

export const userApi = {
  // User APIs
  getProducts(params: any) {
    const query = qs.stringify(params);
    return axiosClient.get(`api/product?${query}`);
  },

 updateUser(data: any){
    return axiosClient.put('/api/user')
 }
};
