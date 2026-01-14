import { NavLink, Outlet } from "react-router-dom";

export default function TabletLayout() {
  return (
    <div>
      <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <NavLink to="/app">Home</NavLink>
          <NavLink to="/app/menu">Menu</NavLink>
          <NavLink to="/app/orders">Orders</NavLink>
          <NavLink to="/app/payment">Payment</NavLink>
        </nav>
      </header>
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}
