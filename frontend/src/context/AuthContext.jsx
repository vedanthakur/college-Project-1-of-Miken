// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Store both user info and token
  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  // login expects an object with at least: token, role, email, name
  const login = (userData) => {
    setAuth(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user: auth,
    token: auth?.token || null,
    login,
    logout,
    isAuthenticated: !!auth,
    userRole: auth ? auth.role : null,
    userEmail: auth ? auth.email : null,
    userName: auth ? auth.name : null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};