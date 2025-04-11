import React from "react";
import { Route, Routes } from "react-router-dom";
import Loadable from "@/components/loadable";
import Login from "@/pages/auth/login";
import NotFound from "@/pages/notFound";
import AuthRoutes from "@/routes/protectedRoute";
import GuestRoutes from "@/routes/guestRoute";

const MainLayout = Loadable(React.lazy(() => import("@/layouts/mainLayout")));
const IndexPage = Loadable(React.lazy(() => import("@/pages/client/index")));
const Booking = Loadable(React.lazy(() => import("@/pages/client/booking")));


function ReactRouters() {
  return (
    <Routes>
      <Route element={<MainLayout />} path="/">
        <Route element={<IndexPage />} index />

        <Route element={<AuthRoutes />}>
          <Route element={<Booking />} path="booking" />
        </Route>
      </Route>

      <Route element={<GuestRoutes />}>
        <Route element={<Login />} path="/login" />
      </Route>

      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}


export default ReactRouters;
