// utils/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PORT, // hoặc process.env.NEXT_PUBLIC_API_URL nếu dùng biến môi trường
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Gắn token tự động nếu có
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // hoặc từ cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
