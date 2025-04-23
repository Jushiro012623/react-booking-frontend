import React from "react";

import AdminNavbar from "@/components/adminNavbar";

const AdminIndexPage = () => {
  return (
    <React.Fragment>
      <AdminNavbar />
      <main className="min-h-screen">
        <p>Welcome to the admin index page!</p>
      </main>
    </React.Fragment>
  );
};

export default AdminIndexPage;
