import axios from "axios";
import { ApiRequestBuilder } from "./apiRequestBuilder";
import { config as app } from "@/config/app";
import { TUser } from "@/models/user";
import Cookies from "js-cookie";
type TToken = string | null | undefined;

type TTokenResponse = {
  access_token: string;
  expires_in: number | string;
  token_type: string;
  user: TUser;
};
export type TLoginResponse = {
  message: string;
  data: TTokenResponse;
  status: number;
  success: string;
};
export type TResponse = {
  data: TLoginResponse;
  status: number;
};

export const axiosDefaults = new ApiRequestBuilder()
  .setBaseUrl(app.apiUrl)
  .setTimeout(5000)
  .setHeaders({ Accept: "application/json" });

const Api = axios.create(axiosDefaults.build());

Api.interceptors.request.use(
  async (config: any) => {
    const token: TToken = Cookies.get("_accessToken");
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

const loginApi = async (data: {username: string, password: string}) => {
  const loginRequest = axiosDefaults
    .setMethod("POST")
    .setData(data)
    .setUrl("auth/login");

  const response: TResponse = await Api(loginRequest.build());

  if (response.status !== 200) throw new Error("Response was not ok");

  return response;
};

export { Api, loginApi };
