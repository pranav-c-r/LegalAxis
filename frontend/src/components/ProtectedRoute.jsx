import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserAuth } from '../context/UserAuthContext';

const ProtectedRoute = ({ children }) => {
  let auth = useUserAuth();
  if (!auth){
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
