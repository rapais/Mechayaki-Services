import { NavLink, Outlet } from "react-router-dom";
import { getTableNo, clearTableNo } from "../guards/TableSessionGuard";

function Tab({ to, label }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        padding: "10px 12px",
        borderRadius: 10,
        textDecoration: "none",
        background: isActive ? "#111" : "#f3f3f3",
        color: isActive ? "white" : "#333",
        fontWeight: 700,
      })}
    >
      {label}
    </NavLink>
  );
}

export default function TabletLayout() {
  const tableNo = getTableNo();

  return (
    <div>
      <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "grid", gap: 2 }}>
            <strong>Tablet App</strong>
            <small style={{ color: "#666" }}>Table: {tableNo || "-"}</small>
          </div>

          <button
            onClick={() => clearTableNo()}
            style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd", background: "white" }}
          >
            Change Table
          </button>
        </div>

        <nav style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <Tab to="/app" label="Home" />
          <Tab to="/app/menu" label="Menu" />
          <Tab to="/app/orders" label="Orders" />
          <Tab to="/app/payment" label="Payment" />
        </nav>
      </header>

      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}
