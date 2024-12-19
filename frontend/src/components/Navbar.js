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
  const [isScrolled, setIsScrolled] = useState(false); // To track scroll position

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const openLoginModal = () => {
    openModal(<Login closeModal={closeModal} />); 
  };

  const handleLogout = () => {
    logout();  
  };

  const isLoggedIn = Boolean(authToken);

  // Track scroll position and update isScrolled state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Change to solid background after 50px scroll
      } else {
        setIsScrolled(false); // Transparent background when at the top
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full py-3 z-30 transition-all ${isScrolled ? 'bg-white text-black' : 'bg-transparent text-black'}`}
    >
      <div className="w-full mx-auto px-6 flex justify-around items-center">
      <div className="text-2xl font-bold">
  <Link to="/">
    <img src={navlogo} className="w-[200px] h-[60px]" alt='navlogo'/>
  </Link>
</div>


        {/* Menu */}
        <div className="hidden md:flex justify-around  w-auto space-x-10">
          <Link to="/" className="hover:text-gray-400 text-md font-semibold">Home</Link>
          <Link to="/about" className="hover:text-gray-400 text-md font-semibold">About</Link>
          <Link to="/services" className="hover:text-gray-400 text-md font-semibold">Services</Link>
          <Link to="/contact" className="hover:text-gray-400 text-md font-semibold">Contact</Link>
        </div>



        <div className="flex justify-between gap-x-6 " >
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
