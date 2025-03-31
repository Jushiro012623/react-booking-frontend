import axios from "axios";
import { ApiRequestBuilder } from "./apiRequestBuilder";
import { config as app } from '@/config/app'

export const axiosDefaults = new ApiRequestBuilder()
  .setBaseUrl(app.apiUrl)
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
