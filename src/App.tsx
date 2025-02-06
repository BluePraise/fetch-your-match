// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import SearchPage from "./pages/SearchPage";
import ProtectedRouter from "./router/ProtectedRouter";
import PublicRouter from "./router/PublicRouter";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<Home />} />

        {/* Public route for Login: redirect authenticated users */}
        <Route
          path="/login"
          element={
            <PublicRouter>
              <Login />
            </PublicRouter>
          }
        />

        {/* Protected route for Search: only accessible to authenticated users */}
        <Route
          path="/search"
          element={
            <ProtectedRouter>
              <SearchPage />
            </ProtectedRouter>
          }
        />

        {/* Fallback route for non-existent paths */}
        <Route path="*" element={<div>404: Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
