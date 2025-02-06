// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import SearchPage from "./pages/SearchPage";
import PrivateRouter from "./router/ProtectedRouter";
import PublicRouter from "./router/PublicRouter";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route for Login */}
        <Route
          path="/login"
          element={
            <PublicRouter>
              <Login />
            </PublicRouter>
          }
        />

        {/* Private route for Search Page */}
        <Route
          path="/search"
          element={
            <PrivateRouter>
              <SearchPage />
            </PrivateRouter>
          }
        />

        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to="/search" replace />}
        />

        {/* Catch-all for 404 */}
        <Route
          path="*"
          element={<div>404: Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
