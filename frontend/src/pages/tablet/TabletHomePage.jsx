import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTableNo, setTableNo } from "../../guards/TableSessionGuard";

export default function TabletHomePage() {
  const nav = useNavigate();
  const current = getTableNo() || "";
  const [table, setTable] = useState(current);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <h1>Tablet Home</h1>
      <p style={{ color: "#666" }}>Select table number to start ordering.</p>

      <label style={{ display: "grid", gap: 6 }}>
        Table Number
        <input
          value={table}
          onChange={(e) => setTable(e.target.value)}
          placeholder="e.g., 12"
          style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
        />
      </label>

      <button
        onClick={() => {
          if (!table.trim()) return;
          setTableNo(table.trim());
          nav("/app/menu");
        }}
        style={{ padding: 12, borderRadius: 10, border: "none", background: "#111", color: "white", fontWeight: 800 }}
      >
        Start Order
      </button>
    </div>
  );
}
