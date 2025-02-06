import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="background-primary text-fuchsia-950 flex justify-between items-center">
        <div className="">
            <Link to="/">Fetch Home</Link>
        </div>
        {user ? (
            <>
                <span>Hello, {user.name}</span>
                <Link to="/search-dog">Find your friend</Link>
                <button onClick={logout}>Logout</button>
            </>
        ) : (
            <Link to="/login" className="text-fuchsia-500">Login</Link>
        )}
    </nav>
  );
};

export default Navbar;