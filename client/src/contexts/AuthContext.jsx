// src/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../components/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const logout = async () => {
    try {
       axios.get("http://localhost:3000/user/logout");
      setUser(null); 
      console.log("here")
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
