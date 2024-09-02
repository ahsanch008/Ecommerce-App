// src/components/PrivateRoute.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, onUnauthorized }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loading component
  }

  if (!user) {
    onUnauthorized();
    return null;
  }

  return children;
};

export default PrivateRoute;
