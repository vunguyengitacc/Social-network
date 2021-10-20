import axios from "axios";
import { IRequestParam } from "../models/common";
import queryString from "query-string";

const axiosFileSender = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.PUBLIC_URL_API
      : "http://localhost:5000/api",
  headers: {
    "content-type": "multipart/form-data",
  },
  paramsSerializer: (params: IRequestParam) => queryString.stringify(params),
});

axiosFileSender.interceptors.request.use(
  (rConfig: any) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      rConfig.headers["authentication"] = `Bearer ${token}`;
    }
    return rConfig;
  },
  (err) => Promise.reject(err.response || err.message)
);

axiosFileSender.interceptors.response.use(
  (response: any) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => Promise.reject(err.response || err.message)
);

export default axiosFileSender;
