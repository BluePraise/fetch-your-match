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
    <div className="text-center shadow-sm flex flex-col items-center w-2xl my-8 p-8">
        <h1 className="text-2xl my-8">Login to start</h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <input
                className="mb-4 border border-gray-400 p-2"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)} required />
            <input
                className="mb-4 border border-gray-400 p-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit">Login
            </button>
        </form>
    </div>
  );
};

export default Login;