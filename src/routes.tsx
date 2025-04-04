import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Loadable from "@/components/loadable";
import Login from "@/pages/auth/login";
import { useAuthContext } from "./context/authContextProvider";
import NotFound from "./pages/notFound";

const MainLayout = Loadable(React.lazy(() => import("@/layouts/mainLayout")));
const IndexPage = Loadable(React.lazy(() => import("@/pages/client/index")));
const Booking = Loadable(React.lazy(() => import("@/pages/client/booking")));
const CompleteBooking = Loadable(
  React.lazy(() => import("@/features/client/booking/completeBooking"))
);

function Routers() {
  return (
    <Routes>
      <Route element={<MainLayout />} path="/">
        <Route element={<IndexPage />} index />
        <Route element={<CompleteBooking />} path="booking/complete" />

        <Route element={<AuthRoutes />}>
          <Route element={<Booking />} path="booking" />
        </Route>

        <Route element={<Booking />} path="booking" />
      </Route>
      <Route element={<GuestRoutes />}>
        <Route element={<Login />} path="/login" />
      </Route>
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}

const AuthRoutes = () => {
  const { isLoggedIn } = useAuthContext();
  if (!isLoggedIn()) return <Navigate to="/login" />;
  return <Outlet />;
};
const GuestRoutes = () => {
  const { isLoggedIn } = useAuthContext();
  if (!isLoggedIn()) return <Outlet />;
  return <Navigate to="/" />;
};

export default Routers;
