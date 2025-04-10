import { TUser } from "@/models/user";
import { fetchUser, loginApi, TResponse } from "@/service/apiRequest";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

type TAuthContext = {
  user: TUser;
  token: string | null;
  loginUser: (data: { username: string; password: string }) => any;
  logoutUser: () => void;
  fetchUserData: () => void;
  isLoggedIn: () => boolean;
  isValidated: boolean;
};

type Props = { children: React.ReactNode };

const AuthContext = React.createContext<TAuthContext>({} as TAuthContext);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["_accessToken"]);
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<any>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [isValidated, setIsValidated] = React.useState(false);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    const token = cookies._accessToken;
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
    setIsReady(true);
  }, []);

  const loginUser = async (data: { username: string; password: string }) => {
    try {
      const response: TResponse = await loginApi(data);

      if (response.status >= 400)
        throw new Error("Network response was not ok");

      const token: string | null = response.data.data.access_token;
      const user: TUser = response.data.data.user;
      const stringifyUser: string = JSON.stringify(user);

      setToken(token);
      setCookie("_accessToken", token);

      setUser(user);
      localStorage.setItem("user", stringifyUser);

      return response;
    } catch (error) {
      throw error;
    }
  };
  const isLoggedIn = () => {
    return !!user && !!token;
  };
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    removeCookie("_accessToken");
    navigate("/login");
  };
  const fetchUserData = async () => {
    try {
      const response = await fetchUser();
      const user: any = response.data.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setIsValidated(true);
      return response;
    } catch (error: any) {
      setIsValidated(false);
      if (error.response?.status === 401) {
        logoutUser();
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{ token, user, isLoggedIn, logoutUser, loginUser, fetchUserData, isValidated }}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): TAuthContext => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthProvider must be used within an AuthenticationProvider"
    );
  }
  return context;
};

export default AuthContextProvider;
