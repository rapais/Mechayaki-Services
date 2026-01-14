import { Navigate, useLocation } from "react-router-dom";

const KEY = "mechayaki_table_no";

export function getTableNo() {
  return localStorage.getItem(KEY);
}
export function setTableNo(v) {
  localStorage.setItem(KEY, String(v));
}
export function clearTableNo() {
  localStorage.removeItem(KEY);
}

export default function TableSessionGuard({ children }) {
  const loc = useLocation();
  const tableNo = getTableNo();

  // Let /app itself be accessible to select table
  if (!tableNo && loc.pathname !== "/app") {
    return <Navigate to="/app" replace />;
  }
  return children;
}
