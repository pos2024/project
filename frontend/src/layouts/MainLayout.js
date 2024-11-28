import React from 'react';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import { Outlet, Link } from "react-router-dom";
import Login from '../components/Login'

const MainLayout = () => {
  return (
    <div className='h-screen'>
    <Navbar /> 
      <main><Outlet /></main>
<Login/>
      <Modal/>
    </div>
  );
};

export default MainLayout;
