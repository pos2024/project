import React from 'react';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import { Outlet} from "react-router-dom";


const MainLayout = () => {
  return (
    <div className='h-screen'>
    <Navbar /> 
      <main><Outlet /></main>

      <Modal/>
    </div>
  );
};

export default MainLayout;
