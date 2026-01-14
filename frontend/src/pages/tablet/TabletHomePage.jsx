import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStalls } from "../../features/stalls/useStalls";
import { setTabletSession } from "../../tablet/tabletSession";

export default function TabletHomePage() {
  const nav = useNavigate();
  const stalls = useStalls();

  const [stallId, setStallId] = useState("");
  const [tableNo, setTableNo] = useState("1");

  const start = () => {
    const idNum = Number(stallId);
    const tNum = Number(tableNo);
    if (!idNum || !tNum) return;

    setTabletSession({ stallId: idNum, tableNo: tNum, startedAt: new Date().toISOString() });
    nav("/tablet/menu");
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 24 }}>
      <h1>Tablet Session</h1>
      <p style={{ color: "#666" }}>Select stall and table to start ordering.</p>

      <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
        <label>
          Stall
          <div style={{ marginTop: 6 }}>
            <select
              value={stallId}
              onChange={(e) => setStallId(e.target.value)}
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
            >
              <option value="">-- choose stall --</option>
              {(stalls.data || []).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} {s.active ? "" : "(inactive)"}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label>
          Table No.
          <div style={{ marginTop: 6 }}>
            <input
              value={tableNo}
              onChange={(e) => setTableNo(e.target.value)}
              type="number"
              min="1"
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
            />
          </div>
        </label>

        <button
          onClick={start}
          disabled={!stallId}
          style={{ padding: 12, borderRadius: 10, border: "none", background: "#111", color: "white", fontWeight: 900 }}
        >
          Start Ordering
        </button>
      </div>

      {stalls.isLoading && <p style={{ marginTop: 16 }}>Loading stalls...</p>}
      {stalls.isError && <p style={{ marginTop: 16, color: "crimson" }}>Failed to load stalls.</p>}
    </div>
  );
}
