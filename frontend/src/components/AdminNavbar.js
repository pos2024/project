import React from 'react';
import { useAuth } from '../context/AuthContext'; 

const AdminNavbar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }
  return (
    <div className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
 
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
