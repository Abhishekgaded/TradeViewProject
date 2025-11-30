// src/api/axios.ts
import axios from "axios";
import { getToken, logoutUser } from "../utils/authHelper";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      logoutUser();
    }
    return Promise.reject(error);
  }
);

export default api;
