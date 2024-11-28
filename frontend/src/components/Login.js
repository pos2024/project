import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg'; // Ensure the path is correct

const AuthForm = ({ closeModal }) => {
  const { login } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setError('');
    setIsRegistering((prev) => !prev);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        await axios.post('http://localhost:5000/api/users/register', { name, email, password });
        toggleForm();
        setError('Registration successful! You can now log in.');
      } else {
        const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
        const token = response.data.token;
        login(token);

        const localRole = localStorage.getItem('userRole');
        if (localRole === 'Admin') navigate('/dashboard');
        else if (localRole === 'Moderator') navigate('/moderator-dashboard');
        else {
          closeModal();
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex h-1/2 w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
        {/* Left side with background image */}
        <div className="w-1/2 relative">
          <img
            src={logo}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side form container */}
        <div className="flex-1 p-8 bg-white">
          <h2 className="text-2xl font-bold text-center mb-4">
            {isRegistering ? 'Register' : 'Login'}
          </h2>
          <form onSubmit={handleAuth} className="space-y-4">
            {isRegistering && (
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? (isRegistering ? 'Registering...' : 'Logging in...') : isRegistering ? 'Register' : 'Login'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <span
              className="text-sm text-blue-500 cursor-pointer"
              onClick={toggleForm}
            >
              {isRegistering ? 'Already have an account? Login here!' : "Don't have an account? Register here!"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
