import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
} from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // On app load: ask the backend who we are (the cookie is httpOnly)
  useEffect(() => {
    getCurrentUser()
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setCheckingAuth(false));
  }, []);

  // Login returns the user, so no extra get-user call is needed
  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    setUser(res.data.user);
  };

  // Register no longer logs the user in; they must verify their email first
  const register = async (username, email, password) => {
    const res = await registerUser({ username, email, password });
    return res.data;
  };

  const logout = async () => {
    try {
      await logoutUser(); // clears the httpOnly cookie on the server
    } catch {
      // even if the request fails, clear local state
    }
    setUser(null);
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, checkingAuth, login, register, logout, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
