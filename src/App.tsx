import React from "react";
import { Route, Routes } from "react-router-dom";
import Loadable from "@/components/loadable";

const MainLayout = Loadable(React.lazy(() => import('@/layouts/mainLayout')))
const IndexPage = Loadable(React.lazy(() => import('@/pages/client/index')))
const Booking = Loadable(React.lazy(() => import('@/pages/client/booking')))

function App() {
  return (
    <Routes>
        <Route element={<MainLayout />} path="/">
            <Route element={<IndexPage />} index />
            <Route element={<Booking />} path="booking" />
        </Route>
    </Routes>
  );
}

export default App;
