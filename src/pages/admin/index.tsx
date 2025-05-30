import SEO from "@/components/helmet";
import React from "react";


const AdminIndexPage = () => {
  return (
    <React.Fragment>
        <SEO title="Admin | Dashboard" description="Admin Dashboard"/>
      <main className="min-h-screen">
        <p>Welcome to the admin index page!</p>
      </main>
    </React.Fragment>
  );
};

export default AdminIndexPage;
