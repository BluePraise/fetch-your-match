import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import SearchPage from "./pages/SearchPage";
import './App.css';
import ProtectedRoute from './router/ProtectedRoute';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            user ? <Navigate to="/search" replace /> : <Login />
          }
        />

        {/* Protected Search Route */}
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />

        {/* Default route redirects to the appropriate page */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/search" replace /> : <Navigate to="/login" replace />
          }
        />

        {/* Optionally add a catch-all route for 404 */}
        <Route
          path="*"
          element={<div>404: Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
