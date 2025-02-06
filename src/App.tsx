// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import ProtectedRouter from "./router/ProtectedRouter";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<Home />} />

        {/* Protected route for Search: only accessible to authenticated users */}
        <Route
          path="/search"
          element={
            <ProtectedRouter>
              <SearchPage />
            </ProtectedRouter>
          }
        />

        {/* Public route for Logout */}
        <Route path="/logout" element={<Home />} />

        {/* Fallback route for non-existent paths */}
        <Route path="*" element={<div>404: Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
