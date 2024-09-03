import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  if (!user || user.role !== 'admin') {
    console.log('Access denied. User:', user);
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminRoute;