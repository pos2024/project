import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Fix import, ensure proper usage without curly braces

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole'));
  const [loading, setLoading] = useState(true); // Add a loading state to handle initialization

  // Effect to sync state with localStorage and handle token validation
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Check if token is expired (optional, depends on your JWT structure)
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.warn('Token has expired. Logging out...');
          logout();
        } else {
          setAuthToken(token);
          setUserRole(role || decodedToken.role); // Fallback to decoding if role isn't in localStorage
        }
      } catch (error) {
        console.error('Invalid token found during initialization:', error);
        logout(); // Clear invalid token
      }
    }
    setLoading(false); // Finish initialization
  }, []);

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      setAuthToken(token);
      setUserRole(role);

      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);

      console.log('Login successful. Token and role stored.');
    } catch (error) {
      console.error('Error decoding token during login:', error);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUserRole(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    console.log('User logged out. Token and role cleared.');
  };

  return (
    <AuthContext.Provider value={{ authToken, userRole, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
