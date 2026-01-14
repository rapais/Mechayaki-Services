import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearUser, getUser } from "../../auth/auth.store";

export default function AdminLayout() {
  const navigate = useNavigate();
  const user = getUser();

  function handleLogout() {
    clearUser();
    navigate("/admin/login");
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
      <aside style={{ padding: 16, borderRight: "1px solid #eee" }}>
        <h3>Admin</h3>
        <nav style={{ display: "grid", gap: 8 }}>
          <NavLink to="/admin">Dashboard</NavLink>
          <NavLink to="/admin/menu">Menu</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <button 
            onClick={handleLogout}
            style={{
              marginTop: 12,
              padding: 8,
              border: "1px solid #ccc",
              background: "#f5f5f5",
              cursor: "pointer",
            }}
          >
            Logout {user?.email ? user.email : ""}</button>
        </nav>
      </aside>
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}


