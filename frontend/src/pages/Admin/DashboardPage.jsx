import { useHealth } from "../../features/health/hook";
import { useStalls } from "../../features/stalls/hook";

export default function DashboardPage() {
    const health = useHealth();
    const stalls = useStalls();

    return (
        <div style={{ display: "grid", gap: 16 }}>
            <h1>Admin Dashboard</h1>

            <section style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
                <h2>System Health</h2>

                {health.isLoading && <p>Loading health...</p>}
                {health.isError && <p style={{ color: "crimson" }}>Health error: {String(health.error)}</p>}
                {health.data && <p>Status: <b>{health.data.status}</b></p>}
            </section>

            <section style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
                <h2>Stalls</h2>

                {stalls.isLoading && <p>Loading stalls...</p>}
                {stalls.isError && <p style={{ color: "crimson" }}>Stalls error: {String(stalls.error)}</p>}

                {stalls.data && (
                    <table cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                        <tr>
                            <th align="left">ID</th>
                            <th align="left">Name</th>
                            <th align="left">Active</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stalls.data.map((s) => (
                            <tr key={s.id} style={{ borderTop: "1px solid #eee" }}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.active ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}