import React from 'react';
import { Navigate } from 'react-router-dom';

import { useUserAuth } from '../context/UserAuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUserAuth();
  
  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-[#010101] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#f3cf1a] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Render children if user is authenticated
  return children;
};

export default ProtectedRoute;
