import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAuthUser, getAuthUser } from "../auth/auth.store";
import "../styles/vendor/admin_style.css";

function SideLink({ to, label }) {
  return (
    <NavLink to={to} end={to === "/admin"} className={({ isActive }) => (isActive ? "active" : "")}>
      {label}
    </NavLink>
  );
}

export default function AdminLayout() {
  const nav = useNavigate();
  const user = getAuthUser?.() || null;

  const onLogout = () => {
    clearAuthUser?.();
    nav("/admin/login");
  };

  return (
    <div className="adminShell">
      <aside className="adminSidebar">
        <div className="adminBrand">
          <img
            src="/images/logo_white.png"
            alt="Mechayaki"
            className="adminBrandLogo"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div className="adminBrandText">
            <b>Mechayaki Admin</b>
            <span>{user?.email || "admin session"}</span>
          </div>
        </div>

        <nav className="adminNav">
          <SideLink to="/admin" label="Dashboard" />
          <SideLink to="/admin/menu" label="Menu" />
          <SideLink to="/admin/orders" label="Orders" />
          <SideLink to="/admin/users" label="User Management" />
        </nav>

        <div className="adminSidebarFooter">
          <span>v1.0</span>
          <button className="adminBtn adminBtnDanger" onClick={onLogout} type="button">
            Logout
          </button>
        </div>
      </aside>

      <section className="adminMain">
        <div className="adminTopbar">
          <h1>Admin Panel</h1>
          <div className="adminTopbarRight">
            <span className="adminPill">{user?.role || "ADMIN"}</span>
            <span className="adminPill">Connected</span>
          </div>
        </div>

        <div className="adminContent">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
