import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name, email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;