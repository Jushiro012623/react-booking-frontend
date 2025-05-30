import axios, { AxiosInstance } from "axios";
import { ApiRequestBuilder } from "../apiRequestBuilder";
import { config as app } from "@/config/app";

type TToken = string | null | undefined;

interface AxiosRequestInterface {
    apiClient: AxiosInstance;
    getCookie: (name: string) => string | null;
    loginRequest: (data: { username: string; password: string }) => Promise<any>;
}

class AxiosRequest implements AxiosRequestInterface {
  public apiClient: AxiosInstance;

  private axiosDefaults() {
    return new ApiRequestBuilder("")
      .setBaseUrl(app.apiUrl)
      .setTimeout(5000)
      .setHeaders({ Accept: "application/json" });
  }
  constructor() {
    const defaultConfig = this.axiosDefaults().build();

    this.apiClient = axios.create(defaultConfig);
    this.requestInterceptors();
    this.responseInterceptors();
  }


  private requestInterceptors(): void {
    this.apiClient.interceptors.request.use(
      (config) => {
        const token: TToken = this.getCookie("_accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  private responseInterceptors(): void {
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.error("Unauthorized or token expired.");
        }
        return Promise.reject(error);
      },
    );
  }

  public getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }

  public async loginRequest(data: { username: string; password: string }): Promise<any> {

    const loginRequest = this.axiosDefaults()
      .setMethod("POST")
      .setData(data)
      .setUrl("auth/login");
    
      return await this.apiClient(loginRequest.build());
  
  };

  public async fetchUser () {
    const fetchSelf = this.axiosDefaults().setMethod("POST").setUrl("auth/me");
    
    return await this.apiClient(fetchSelf.build());

  };
}
  
export default new AxiosRequest();
