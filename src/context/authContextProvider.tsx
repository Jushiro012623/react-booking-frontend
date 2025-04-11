import { TUser } from "@/models/user";
import { fetchUser, loginApi, TResponse } from "@/service/apiRequest";
import { getUserFromStorage, removeUserFromStorage, saveUserToStorage } from "@/utils/authStorage";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

/*
    * 
    * TYPES 
    * 
*/
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

/*
    * 
    * REACT CREATE CONTEXT 
    * 
*/

const AuthContext = React.createContext<TAuthContext>({} as TAuthContext);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
    
    /*
        * 
        * REACT USE STATES 
        * 
    */
    const [isReady, setIsReady] = React.useState(false);
    const [isValidated, setIsValidated] = React.useState(false);
    const [token, setToken] = React.useState<string | null>(null);
    const [user, setUser] = React.useState<any>(null);

    /*
        * 
        * LIBRARY HOOKS / REACT ROUTER & REACT COOKIES
        * 
    */
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["_accessToken"]);

    /*
        * 
        * REACT USE EFFECTS 
        * 
    */
    React.useEffect(() => {
        const user = getUserFromStorage();
        const token = cookies._accessToken;

        if (user && token) {
            setUser(user);
            setToken(token);
        }
        setIsReady(true);
    }, []);

    /*
        * 
        * HANDLERS 
        * 
    */
    const loginUser = async (data: { username: string; password: string }) => {
        try {
            const response: TResponse = await loginApi(data);

            if (response.status >= 400)
                throw new Error("Network response was not ok");

            const token: string | null = response.data.data.access_token;
            const user: TUser = response.data.data.user;

            setToken(token);
            setCookie("_accessToken", token);

            setUser(user);
            saveUserToStorage(user)

            return response;
        } catch (error) {
            throw error;
        }
    };

    const isLoggedIn = () => {
        return !!user && !!token;
    };

    const logoutUser = () => {
        removeUserFromStorage()
        setUser(null);
        setToken("");
        removeCookie("_accessToken");
        navigate("/login");
    };

    const fetchUserData = async () => {
        const response = await fetchUser();
        const user: any = response.data.data;
        setUser(user);
        saveUserToStorage(user)
        setIsValidated(true);
        return response;
    };
    
  return (
    <AuthContext.Provider
      value={{ token, user, isLoggedIn, logoutUser, loginUser, fetchUserData, isValidated }}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};


/*
    * 
    * CUSTOM CONTEXT 
    * 
*/

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
