import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../page/Authentication/Login/authSlice';


const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;