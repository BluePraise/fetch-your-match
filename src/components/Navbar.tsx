import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const Navigate = useNavigate();
  const handleLogout = () => {
        logout();
        Navigate('/');
    };


  return (
    <nav className="p-8 bg-white flex justify-between items-center">
        <div className="">
            <Link to="/">Fetch Home</Link>
        </div>
        {user ? (
            <>
                <Link to="/"><span>Hello, {user.name}</span></Link>
                <button className="btn btn__primary btn--deep-purple" onClick={handleLogout}>Logout</button>
            </>
        ) : (
            <>
            </>
        )}
    </nav>
  );
};

export default Navbar;