// src/router/PublicRouter.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PublicRouterProps {
  children: JSX.Element;
}

const PublicRouter: React.FC<PublicRouterProps> = ({ children }) => {
  const { user } = useAuth();

  // If the user is authenticated, redirect to the protected area (e.g., /search)
  if (user) {
    return <Navigate to="/search" replace />;
  }

  // Otherwise, render the public component (e.g., login)
  return children;
};

export default PublicRouter;