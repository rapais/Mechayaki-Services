import { useHealth } from "../../features/health/useHealth";
import { useStalls } from "../../features/stalls/useStalls";

export default function AdminDashboardPage() {
  const health = useHealth();
  const stalls = useStalls();

  return (
    <div className="adminGrid">
      <div className="adminStats">
        <div className="adminStat">
          <div className="adminStatLabel">System Health</div>
          <div className="adminStatValue">{health.data?.status?.toUpperCase?.() || "—"}</div>
          <span className={`adminBadge ${health.data ? "ok" : "neutral"}`}>
            {health.data ? "Online" : "Loading"}
          </span>
        </div>

        <div className="adminStat">
          <div className="adminStatLabel">Total Stalls</div>
          <div className="adminStatValue">{stalls.data?.length ?? "—"}</div>
          <span className="adminBadge demo">CRUD Enabled</span>
        </div>

        <div className="adminStat">
          <div className="adminStatLabel">Orders</div>
          <div className="adminStatValue">0</div>
          <span className="adminBadge neutral">Demo</span>
        </div>

        <div className="adminStat">
          <div className="adminStatLabel">Users</div>
          <div className="adminStatValue">—</div>
          <span className="adminBadge neutral">Admin</span>
        </div>
      </div>

      <div className="adminCard">
        <h2 style={{ margin: 0, fontWeight: 1000 }}>Live Data</h2>
        <p style={{ marginTop: 8, color: "var(--muted)", fontWeight: 800 }}>
          Quick snapshot from REST API.
        </p>

        {stalls.data && (
          <table className="adminTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {stalls.data.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.active ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

