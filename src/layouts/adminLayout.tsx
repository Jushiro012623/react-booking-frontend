import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <React.Fragment>
      <main className="min-h-screen">
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default AdminLayout;
