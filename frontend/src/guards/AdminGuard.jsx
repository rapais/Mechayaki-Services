import { Navigate } from "react-router-dom";
import { getAuthUser } from "../auth/auth.store";

export default function AdminGuard({ children }) {
  const user = getAuthUser();
  if (!user) return <Navigate to="/admin/login" replace />;

  // optional: enforce only ADMIN role
  if (user.role && user.role !== "ADMIN") return <Navigate to="/" replace />;

  return children;
}
