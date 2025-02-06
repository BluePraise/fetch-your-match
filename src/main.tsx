import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./context/AuthContext";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
