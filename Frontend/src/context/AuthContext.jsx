import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email, password) => {
    // Login response currently has no user data, only a success message
    // and an httpOnly cookie — so after login we call get-user separately
    // to actually populate the user in state.
    await loginUser({ email, password });
    await refreshUser();
  };

  const register = async (username, email, password) => {
    const res = await registerUser({ username, email, password });
    // Register does return the user object, but also refresh from
    // get-user so state always comes from one consistent source.
    await refreshUser();
    return res.data;
  };

  const logout = () => {
    // NOTE: there is no logout endpoint on the backend yet (the auth
    // cookie is httpOnly, so the frontend can't clear it directly).
    // This clears local UI state only — add a POST /api/auth/logout
    // route later that does res.clearCookie("token") for a real logout.
    setUser(null);
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, checkingAuth, login, register, logout, isAdmin, refreshUser }}
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
