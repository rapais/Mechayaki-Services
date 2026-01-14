import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAuthUser, getAuthUser } from "../auth/auth.store";

function SideLink({ to, label }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "#111" : "#555",
        fontWeight: isActive ? 800 : 650,
        padding: "10px 12px",
        borderRadius: 10,
        background: isActive ? "#f2f2f2" : "transparent",
      })}
    >
      {label}
    </NavLink>
  );
}

export default function AdminLayout() {
  const nav = useNavigate();
  const user = getAuthUser();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
      <aside style={{ padding: 16, borderRight: "1px solid #eee" }}>
        <div style={{ display: "grid", gap: 6 }}>
          <h2 style={{ margin: 0 }}>Admin</h2>
          <small style={{ color: "#666" }}>{user ? `${user.name} (${user.role})` : "Not signed in"}</small>
        </div>

        <nav style={{ display: "grid", gap: 8, marginTop: 16 }}>
          <SideLink to="/admin" label="Dashboard" />
          <SideLink to="/admin/menu" label="Menu" />
          <SideLink to="/admin/orders" label="Orders" />
          <SideLink to="/admin/users" label="Users" />
        </nav>

        <button
          onClick={() => {
            clearAuthUser();
            nav("/admin/login", { replace: true });
          }}
          style={{
            marginTop: 20,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: "white",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Logout
        </button>
      </aside>

      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}
