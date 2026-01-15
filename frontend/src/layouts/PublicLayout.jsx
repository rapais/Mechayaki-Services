import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <>
      <header className="pubHeader">
        <div className="pubHeaderInner">
          <NavLink to="/" className="pubBrand" aria-label="Mechayaki Home">
            <img
              src="/images/logo_white.png"
              alt="Mechayaki"
              className="pubLogo"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="pubBrandText">Mechayaki Services</span>
          </NavLink>

          <nav className="pubNavDesktop" aria-label="Primary navigation">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
            <NavLink to="/menu" className={({ isActive }) => (isActive ? "active" : "")}>Menu</NavLink>
            <NavLink to="/reserve" className={({ isActive }) => (isActive ? "active" : "")}>Reservation</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => (isActive ? "active" : "")}>Gallery</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink>
          </nav>

          <div className="pubActions">
            <NavLink to="/admin/login" className="pubBtn pubBtnPrimary">Admin</NavLink>
            <NavLink to="/tablet" className="pubBtn pubBtnGhost">Tablet</NavLink>

            <button className="pubBurger" onClick={() => setOpen(true)} aria-label="Open menu">
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`pubOverlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} />

      <aside className={`pubDrawer ${open ? "open" : ""}`}>
        <div className="pubDrawerTop">
          <div className="pubDrawerTitle">Navigation</div>
          <button className="pubClose" onClick={() => setOpen(false)} aria-label="Close menu">×</button>
        </div>

        <div className="pubDrawerLinks">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/reserve">Reservation</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <hr />
          <NavLink to="/admin/login">Admin</NavLink>
          <NavLink to="/tablet">Tablet</NavLink>
        </div>
      </aside>

      <main className="pubMain">
        <Outlet />
      </main>

      <footer className="pubFooter">
        <div className="pubFooterInner">
          <div className="pubFooterBrand">
            <img
              src="/images/logo_white.png"
              alt="Mechayaki"
              className="pubFooterLogo"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div>
              <div className="pubFooterTitle">Mechayaki Services</div>
              <div className="pubFooterSub">Spring Boot • PostgreSQL • React • REST API</div>
            </div>
          </div>

          <div className="pubFooterLinks">
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/reserve">Reservation</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/admin/login">Admin</NavLink>
          </div>

          <div className="pubFooterCopy">
            © {new Date().getFullYear()} Mechayaki. Demo build for interview.
          </div>
        </div>
      </footer>
    </>
  );
}
