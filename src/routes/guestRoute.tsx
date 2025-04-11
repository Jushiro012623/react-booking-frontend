import { useAuthContext } from "@/context/authContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoutes = () => {
    
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn()) return <Outlet />;

  return <Navigate to="/" />;
};

export default GuestRoutes