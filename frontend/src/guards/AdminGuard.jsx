import { Navigate } from "react-router-dom";
import { getUser } from "../../auth/auth.store";

export default function AdminGuard({ children }) {
    const user = getUser();
    if (!user) return <Navigate to="/admin/login" replace />;
    return children;
}