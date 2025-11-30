import axios, { AxiosRequestConfig, AxiosError } from "axios";
import api from "./api"; // base axios with withCredentials:true
import { getAuth, setAuth } from "../utils/authStorage"; // helper to get/set accessToken in localStorage/context

let isRefreshing = false;
let failedQueue: { resolve: (value?: any)=>void, reject: (err?: any)=>void, config: AxiosRequestConfig }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(p => {
    if (error) p.reject(error);
    else {
      if (token && p.config.headers) p.config.headers['Authorization'] = `Bearer ${token}`;
      p.resolve(api(p.config));
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const auth = getAuth(); // read from localStorage or a in-memory accessor
  if (auth?.accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
  }
  return config;
}, (err) => Promise.reject(err));

api.interceptors.response.use((res) => res, async (error: AxiosError) => {
  const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
  if (error.response?.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalRequest });
      });
    }
    originalRequest._retry = true;
    isRefreshing = true;
    try {
      const refreshRes = await axios.post("http://localhost:5000/api/auth/refresh", {}, { withCredentials: true });
      const newAccessToken = refreshRes.data.accessToken;
      // Save new token to storage/context
      setAuth({ ...getAuth(), accessToken: newAccessToken });
      processQueue(null, newAccessToken);
      originalRequest.headers = { ...originalRequest.headers, Authorization: `Bearer ${newAccessToken}` };
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      // optionally: force logout UI
      setAuth(null);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
  return Promise.reject(error);
});

export default api;
