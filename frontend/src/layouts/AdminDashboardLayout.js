import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { Outlet, Link } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AdminNavbar />
      <div className="flex-grow p-4">
       <Outlet/>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
