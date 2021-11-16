import axios from "axios";
import { IRequestParam } from "../models/common";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.PUBLIC_URL_API
      : "http://localhost:5000/api",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params: IRequestParam) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (rConfig: any) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      rConfig.headers["authentication"] = `Bearer ${token}`;
    }
    return rConfig;
  },
  (error) => Promise.reject(error.response || error.message)
);

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    return Promise.reject(error.response.data.error || error.message);
  }
);

export default axiosClient;
