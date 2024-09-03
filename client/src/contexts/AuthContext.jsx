// src/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "../components/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/profile", {
        withCredentials: true,
      });
      setUser(response.data);
      setLoading(false);
      console.log('User state after setting:', user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/users/logout");
      setUser(null); 
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    setUser,
    loginWithGoogle,
    logout,
    loading,
    fetchUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
