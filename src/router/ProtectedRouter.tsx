// src/router/PrivateRouter.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouterProps {
  children: React.ReactElement;
}

const ProtectedRouter: React.FC<ProtectedRouterProps> = ({ children }) => {
  const { user } = useAuth();

  // If there's no user, redirect to /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRouter;
