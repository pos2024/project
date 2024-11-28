import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext'; 
import Login from './Login';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal, closeModal } = useModal(); // Import closeModal
  const { authToken, logout } = useAuth(); // Access authToken and logout method from context

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const openLoginModal = () => {
    openModal(<Login closeModal={closeModal} />); // Pass closeModal to Login component
  };

  const handleLogout = () => {
    logout();  // Call the logout function from AuthContext
  };

  // Check if the user is logged in by checking the authToken
  const isLoggedIn = Boolean(authToken);

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">Logo</Link>
        </div>

        {/* Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/about" className="hover:text-gray-400">About</Link>
          <Link to="/services" className="hover:text-gray-400">Services</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        </div>

        <div>
          {/* Conditionally render Login or Logout button */}
          {!isLoggedIn ? (
            <button
              onClick={openLoginModal}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <Link to="/" className="block text-gray-200 hover:text-gray-400">Home</Link>
          <Link to="/about" className="block text-gray-200 hover:text-gray-400">About</Link>
          <Link to="/services" className="block text-gray-200 hover:text-gray-400">Services</Link>
          <Link to="/contact" className="block text-gray-200 hover:text-gray-400">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;