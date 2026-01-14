import { NavLink, Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div>
      <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/reserve">Reserve</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/app">Tablet</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </header>

      <main style={{ padding: 24 }}>
        <Outlet />
      </main>

      <footer style={{ padding: 16, borderTop: "1px solid #eee" }}>
        <small>Mechayaki ©</small>
      </footer>
    </div>
  );
}
