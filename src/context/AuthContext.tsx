import React, { createContext, useState, useContext, ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    // aqui você faria chamada para API real
    if (username === "admin" && password === "1234") {
      setUser(username);
    } else {
      throw new Error("Credenciais inválidas");
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro do AuthProvider");
  return ctx;
};
