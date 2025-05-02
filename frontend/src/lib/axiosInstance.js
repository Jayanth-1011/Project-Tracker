// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // change to your actual backend URL
  withCredentials: true, // send cookies (important for auth)
});

// Optional: Interceptors for error handling or token updates
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error?.response || error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
