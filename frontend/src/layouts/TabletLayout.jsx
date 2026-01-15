import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/vendor/tablet.css";

function SideLink({ to, label }) {
  return (
    <NavLink to={to} end={to === "."} className={({ isActive }) => (isActive ? "active" : "")}>
      {label}
    </NavLink>
  );
}

export default function TabletLayout() {
  const nav = useNavigate();

  return (
    <div className="tabletShell">
      <aside className="tabletSidebar">
        <div className="tabletBrand" onClick={() => nav("/tablet")} role="button" tabIndex={0}>
          <div className="tabletBrandTop">mechayaki</div>
        </div>

        <nav className="tabletNav">
          <SideLink to="." label="Home" />
          <SideLink to="menu" label="Menu" />
          <SideLink to="orders" label="Orders" />
        </nav>

        <div className="tabletSideFooter">
          <span>v1.0</span>
          <button className="tabletSideBtn" onClick={() => nav("/")}>Exit</button>
        </div>
      </aside>

      <main className="tabletMain">
        <Outlet />
      </main>
    </div>
  );
}
