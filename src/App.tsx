import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/client/index";
import MainLayout from "./layouts/mainLayout";
import Booking from "@/pages/client/booking";

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
