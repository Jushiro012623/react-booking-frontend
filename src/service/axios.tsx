import axios from "axios";
import { ApiRequestBuilder } from "./apiRequestBuilder";
const BASE_URL =
  import.meta.env.VITE_API_DEV_URL || "http://127.0.0.1:8000/api/v1";

export const axiosDefaults = new ApiRequestBuilder()
  .setBaseUrl(BASE_URL)
  .setTimeout(5000)
  .setHeaders({ Accept: "application/json" })

const Api = axios.create(axiosDefaults
    .build());

Api.interceptors.request.use(
    
  async (config: any) => {
  
    const token = localStorage.getItem("_accessToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
        
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export { Api };
