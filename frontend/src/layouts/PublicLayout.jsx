import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>PublicLayout is rendering</h1>
      <Outlet />
    </div>
  );
}
