import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    }
    return false;
  });

  useEffect(() => {
    // Set Axios Authorization header if token exists
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Set up axios interceptor for 401 errors
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
          setIsAuthenticated(false);
          window.dispatchEvent(new StorageEvent('storage', { key: 'token', newValue: null }));
        }
        return Promise.reject(error);
      }
    );

    // Listen for storage changes (e.g., login/logout in another tab)
    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        setIsAuthenticated(!!event.newValue);
        if (event.newValue) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${event.newValue}`;
        } else {
          delete axios.defaults.headers.common['Authorization'];
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsAuthenticated(true);
    window.dispatchEvent(new StorageEvent('storage', { key: 'token', newValue: token }));
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    window.dispatchEvent(new StorageEvent('storage', { key: 'token', newValue: null }));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};