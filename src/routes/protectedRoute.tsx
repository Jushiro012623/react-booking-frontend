import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { useAuthContext } from "@/context/authContextProvider";
import { LoaderComponent } from "@/components/loadable";
import { isTokenExpired } from "@/utils/authStorage";
import LogoutModal from "@/components/logoutModal";
export const AuthRoutes = ({isAdmin, isClient}: {isAdmin?: boolean, isClient?: boolean}) => {

    /*
        * REACT USE MEMOS
    */
    const role = React.useMemo(() => {
        return isAdmin ? "admin" : isClient ? "client" : null;
    }, [isAdmin, isClient]);

    /*
        * REACT USE CONTEXT
    */
    const { isLoggedIn, fetchUserData, isValidated, token, logoutUser } = useAuthContext();

    /*
        * REACT USE STATES
    */
    const [loading, setLoading] = React.useState(true);
    const [logoutReason, setLogoutReason] = React.useState<string | null>(null);
    const [redirect, setRedirect] = React.useState<string | null>(null);

    /*
        * FUNCTIONS / HANDLERS 
    */
    const getFallbackUrl = (role: string) => {
        return role === "admin" ? "/admin" : "/";
    };

    const initializeAuthCheck = async () => {
        if (!token) {
            console.log('NO TOKEN');
            setRedirect("/login");
            setLoading(false);
            return;
        }
        /*
            * DECODING TOKEN
        */
        let decodedToken: any = null;
        let decodedTokenRole = null;
        try {
            decodedToken = jwtDecode<{ exp: number }>(token);
            decodedTokenRole = decodedToken?.data?.role;
        } catch (error) {
            logoutUser()
            setLoading(false);
            return;
        }
        if (isTokenExpired(decodedToken.exp)) {
            setLogoutReason("Authorization Expired");
            setLoading(false);
            return;
        }
        if (!decodedTokenRole) {
            logoutUser();
            setLoading(false);
            return;
        }
        if(decodedTokenRole !== role) {
            setRedirect(getFallbackUrl(decodedTokenRole));
            setLoading(false);
            return;
        }
        try {
            const response: any = await fetchUserData();
    
            if (response.status > 400) throw new Error("Response was not ok");   
            
            const responseTokenRole: string = response.data.data.role;
    
            if (role && decodedToken.data.role !== role && responseTokenRole !== role ) {
                setRedirect(getFallbackUrl(responseTokenRole));
                return;
            }
    
        } catch (error: any) {
            if (error.response?.status === 401) {
                setLogoutReason("Unauthenticated");
            }
        } finally {
            setLoading(false);
        }
    }
    /*
        * REACT USE LAYOUTEFFECTS
    */
    React.useLayoutEffect(() => {
        initializeAuthCheck();
    }, []);

    /*
        * LOADER COMPONENT
    */
    if (loading) return <LoaderComponent />;
    if (logoutReason) return <LogoutModal title={logoutReason} />;
    if (redirect) return <Navigate to={redirect} />;
    if (!isLoggedIn() || !isValidated) return <Navigate to="/login" />;

    return <Outlet />;
};

export default AuthRoutes;
