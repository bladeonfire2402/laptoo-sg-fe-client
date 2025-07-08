/* eslint-disable @typescript-eslint/no-explicit-any */
// services/productApi.ts
import axiosClient from "@/utils/axiosClient";
import qs from "query-string";


export const orderApi = {
  // User APIs
  createOrder(data: any) {
    return axiosClient.post(`api/order/`,data);
  },

  getOrders(params: any) {
    const query = qs.stringify(params);
    return axiosClient.get(`api/order?${query}`);
  },

  getOrderById(id: string){
    return axiosClient.get(`api/order/${id}`);
  }
};
