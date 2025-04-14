import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { useAuthContext } from "@/context/authContextProvider";
import { LoaderComponent } from "@/components/loadable";
import { isTokenExpired } from "@/utils/authStorage";
import LogoutModal from "@/components/logoutModal";
export const AuthRoutes = ({isAdmin, isClient}: {isAdmin?: boolean, isClient?: boolean}) => {

    const role: "admin" | "client" | null = isAdmin ? "admin" : isClient ? "client" : null;
  /*
   *
   * REACT USE CONTEXT
   *
   */
  const { isLoggedIn, fetchUserData, isValidated, token } = useAuthContext();

  /*
   *
   * REACT USE STATES
   *
   */

  const [loading, setLoading] = React.useState(true);
  const [logoutReason, setLogoutReason] = React.useState<string | null>(null);

    /*
        *
        * REACT USE EFFECTS
        *
    */

  React.useEffect(() => {
    const init = async () => {
      if (!token) {
        setLogoutReason("Unauthenticated");

        return;
      }
      /*
       * DECODING TOKEN
       */
      const decodedToken: any = jwtDecode<{ exp: number }>(token);

      if (isTokenExpired(decodedToken.exp)) {
        setLogoutReason("Authorization Expired");

        return;
      }

      try {
        const response: any = await fetchUserData();

        if (response.status > 400) {
          throw new Error("Response was not ok");
        }   
        
        if (role && decodedToken.data.role !== role && response.data.data.role !== role ) {
            setLogoutReason("Unauthorize");
            return;
        }

      } catch (error: any) {
        if (error.response?.status === 401) {
          return <LogoutModal title="Unauthenticated" />;
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  /*
   *
   * MODAL
   *
   */
  if (logoutReason) return <LogoutModal title={logoutReason} />;

  /*
   *
   * LOADER
   *
   */
  if (loading) return <LoaderComponent />;

  /*
   *
   * REDIRECT TO LOGIN IF NOT AUTHENTICATED
   *
   */
  if (!isLoggedIn() || !isValidated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthRoutes;
