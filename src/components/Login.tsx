import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface LoginProps {
  onClose?: () => void; // close the modal if success
}


const Login: React.FC<LoginProps> = ({onClose}) => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(name, email);
    setLoading(true);
    setError(null);

    try {
      await login(name, email);
      // close the modal on successful login:
      if (onClose) onClose();
    } catch (err) {
      setError(`Failed to login: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center shadow-sm flex flex-col items-center w-2xl my-8 p-8">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <h2 className="text-2xl my-8">Login to start</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                type="submit"
                disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    </div>
  );
};

export default Login;