import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, isAdmin, checkingAuth } = useAuth();

  if (checkingAuth) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-ink/50 font-body">
        Loading…
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}
