// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import SearchPage from "./pages/SearchPage";
import PrivateRouter from "./router/ProtectedRouter";
import PublicRouter from "./router/PublicRouter";
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
