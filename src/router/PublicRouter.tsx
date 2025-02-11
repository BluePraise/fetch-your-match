// src/router/PublicRouter.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PublicRouterProps {
  children: React.ReactNode;
}

const PublicRouter: React.FC<PublicRouterProps> = ({ children }) => {
  const { user } = useAuth();

  // If the user is authenticated, redirect to the protected area (e.g., /search)
  if (user) {
    return <Navigate to="/search" replace />;
  }
  else {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the public component (e.g., login)
  return children;
};

export default PublicRouter;