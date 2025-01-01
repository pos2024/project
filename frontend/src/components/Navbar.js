import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import Login from './Login';
import { useAuth } from '../context/AuthContext';
import navlogo from '../assets/navlogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal, closeModal } = useModal();
  const { authToken, logout } = useAuth();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openLoginModal = () => {
    openModal(<Login closeModal={closeModal} />);
  };

  const handleLogout = () => {
    logout();
  };

  const isLoggedIn = Boolean(authToken);



  return (
    <nav
    className={`fixed w-full py-2 z-30 transition-all ${
      isLargeScreen
        ? isScrolled
          ? 'bg-white text-black' // Large screen on scroll
          : 'bg-transparent text-black' // Large screen default
        : 'bg-[#ECF2F6] text-black' // Small screen default and on scroll
    }`}
  >
      <div className=" justify-between md:justify-around flex flex-wrap items-center  mx-auto p-4">
        <div className="text-2xl font-bold">
          <Link to="/">
            <img src={navlogo} className="w-[200px] h-[60px]" alt='navlogo' />
          </Link>
        </div>


        {/* Menu */}
        <div className="hidden md:flex justify-around  w-auto space-x-10">
          <Link to="/" className="hover:text-gray-400 text-md font-semibold">Home</Link>
          <Link to="/about" className="hover:text-gray-400 text-md font-semibold">About</Link>
          <Link to="/services" className="hover:text-gray-400 text-md font-semibold">Services</Link>
          <Link to="/contact" className="hover:text-gray-400 text-md font-semibold">Contact</Link>
        </div>



        <div className="hidden md:flex justify-between gap-x-6 " >
          <div>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-blue-600 hover:text-blue-500 text-3xl cursor-pointer"
            />
          </div>

          <div className=''>
            {!isLoggedIn ? (
              <FontAwesomeIcon
                icon={faRightToBracket}
                onClick={openLoginModal}
                className="text-blue-600 hover:text-blue-500 text-3xl cursor-pointer"
              />
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            )}
          </div>

          {/* Cart Icon */}

        </div>



        {/* Mobile Menu Button */}
        <div className="md:hidden bg-white ">
          <button className="text-gray-500 focus:outline-none" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
  <div className="md:hidden absolute top-24 w-full bg-white bg-opacity-95  py-2 rounded-lg shadow-lg">
    <nav className="flex flex-col items-center space-y-3">
      <Link
        to="/"
        className="text-gray-500 text-md font-semibold hover:text-blue-200 transition duration-200"
      >
        Home
      </Link>
      <Link
        to="/about"
        className="text-gray-500  text-md font-semibold hover:text-blue-200 transition duration-200"
      >
        About
      </Link>
      <Link
        to="/services"
        className="text-gray-500  text-md font-semibold hover:text-blue-200 transition duration-200"
      >
        Services
      </Link>
      <Link
        to="/contact"
        className="text-gray-500 text-md font-semibold hover:text-blue-200 transition duration-200"
      >
        Contact
      </Link>
    </nav>
  </div>
)}
  
    </nav>
  );
};

export default Navbar;
