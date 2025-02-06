import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: {
        name: string;
        email: string
    } | null;
  login: (
        name: string,
        email: string
    ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const login = async (name: string, email: string) => {
    try {
        // Make sure to include credentials so that the cookie is stored.
        const response = await axios.post(
          'https://frontend-take-home-service.fetch.com/auth/login',
          { name, email },
          { withCredentials: true }
        );

        if (response.status === 200) {
          // Optionally, you might parse more information from the response.
          setUser({ name, email });
        }
      } catch (error) {
        console.error('Login failed', error);
        throw error;
      }
  };

  const logout = async () => {
    try {
      await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};