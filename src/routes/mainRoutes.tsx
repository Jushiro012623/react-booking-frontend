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

/*
    * 
    * ADMIN IMPORTS 
    * 
*/
const AdminLayout = Loadable(React.lazy(() => import("@/layouts/adminLayout")));
const AdminIndexPage = Loadable(React.lazy(() => import("@/pages/admin/index")));


function ReactRouters() {
  return (
    <Routes>
        {
            /* 
                * 
                * CLIENT ROUTES
                * 
            */
        }
        <Route element={<MainLayout />} path="/">
            <Route element={<IndexPage />} index />
            {
                /*
                    * 
                    * AUTHENTICATED ROUTES 
                    * 
                */
            }
            <Route element={<AuthRoutes isClient/>}>
                <Route element={<Booking />} path="booking" />
            </Route>

        </Route>

        {
            /*
                * 
                * GUEST ROUTES
                * 
            */
        }
        <Route element={<GuestRoutes />}>
            <Route element={<Login />} path="/login" />
        </Route>


        {
            /* 
                * 
                * ADMIN ROUTES
                * 
            */
        }
        <Route element={<AuthRoutes isAdmin/>}>
            <Route path="/admin" element={<AdminLayout />}>
                <Route element={<AdminIndexPage />} index />
            </Route>
        </Route>
        {
            /*
                * 
                * 404 PAGE
                * 
            */
        }
        <Route element={<NotFound />} path="*" />
    </Routes>
  );
}


export default ReactRouters;
