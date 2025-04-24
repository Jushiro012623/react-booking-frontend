import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/authContextProvider";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { LoaderComponent } from "@/components/loadable"; // Assuming this is the same Loader component

const GuestRoutes = () => {
  const { isLoggedIn, token } = useAuthContext();
  const navigate = useNavigate();
  
  const [loading, setLoading] = React.useState(true);

  const initializeAuthCheck = () => {
    if (isLoggedIn()) {
      try {
        const decodedToken = jwtDecode<{ exp: number; data: { role: string } }>(token!);
        const decodedTokenRole = decodedToken?.data?.role;

        if (decodedTokenRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate('/');
      }
    }
    setLoading(false);
  };

  React.useEffect(() => {
    initializeAuthCheck();
  }, [isLoggedIn, token, navigate]);

  if (loading) return <LoaderComponent />; // Show loader while loading/authenticating

  return <Outlet />;
};

export default GuestRoutes;
