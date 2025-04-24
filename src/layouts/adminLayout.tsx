import AdminNavbar from "@/components/adminNavbar";
import SideBar from "@/components/sideBar";
import { Spacer } from "@heroui/spacer";
import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <React.Fragment>
      <main className="min-h-screen">
        <AdminNavbar />
        <Spacer y={20}/>
        <div className="flex mx-[8%] ">
            <SideBar />
            <Spacer x={32}/>
            <Outlet />
        </div>
      </main>
    </React.Fragment>
  );
};

export default AdminLayout;
