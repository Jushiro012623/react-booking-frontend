import { Api } from "@/service/apiRequest";
import { ApiRequestBuilder } from "@/service/apiRequestBuilder";
import React from "react";
import { useCookies } from "react-cookie";

interface User {
  user: any;
}

interface AuthContextType {
  token: string | undefined;
  user: User;
  login: (response: any) => void;
  logout: () => void;
}
interface AuthContextProps {
  children: React.ReactNode;
}
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["_accessToken"]);

  const [user, setUser] = React.useState<User>({
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null
  });
  const [token, setToken] = React.useState(cookies._accessToken);

  const memoizedToken = React.useMemo(() => token, [token]);

  const login = async (data: any) => {
    try {
        const loginRequest = new ApiRequestBuilder()
        .setUrl("auth/login")
        .setMethod("POST")
        .setData(data);
        const response: any = await Api(loginRequest.build());

        if (response.status >= 400) throw new Error("Network response was not ok");

        setToken(response.data.data.access_token);
        setCookie("_accessToken", response.data.data.access_token, { path: "/" });
        const _user = JSON.stringify(response.data.data.user);
        localStorage.setItem("user", _user);
        setUser({ user: _user });

        return response
    } catch (error) {
        throw error
    }
  };
  const logout = () => {
    removeCookie("_accessToken");
    localStorage.removeItem("user");
    setUser({ user: null });
  };
  return (
    <AuthContext.Provider value={{ token: memoizedToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthProvider must be used within an AuthenticationProvider"
    );
  }
  return context;
};

export default AuthContextProvider;
