// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // const isAuthenticated = sessionStorage.getItem("User"); // or localStorage
  const isAuthenticated = sessionStorage.getItem("LoginData"); // or localStorage

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
