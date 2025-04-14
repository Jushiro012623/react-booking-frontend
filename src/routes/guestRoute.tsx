import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "@/context/authContextProvider";

const GuestRoutes = ({isAdmin}: {isAdmin?: boolean}) => {

  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn()) return <Outlet />;
    
  return isAdmin ? <Navigate to="/admin" /> : <Navigate to="/" />;
  
};

export default GuestRoutes;
