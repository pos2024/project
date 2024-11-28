
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router';

const ModeratorDashboardLayout = ({ children }) => {
  return (
    <div className="flex">
     
     <main><Outlet/></main>
    </div>
  );
};

export default ModeratorDashboardLayout;
