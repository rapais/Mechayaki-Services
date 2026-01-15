import { useEffect, useMemo, useState } from "react";
import { ordersApi } from "../../api/orders.api";

function fmtMoney(v) {
  const n = Number(v || 0);
  return `RM ${n.toFixed(0)}`;
}

function Badge({ tone = "neutral", children }) {
  const style = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 10px",
    borderRadius: 999,
    fontWeight: 950,
    fontSize: 12,
    border: "1px solid rgba(0,0,0,.10)",
    background: "rgba(255,255,255,.75)",
    color: "rgba(43,43,43,.85)",
  };

  if (tone === "paid") {
    style.borderColor = "rgba(46,125,50,.25)";
    style.background = "rgba(46,125,50,.08)";
    style.color = "#2e7d32";
  }
  if (tone === "pending") {
    style.borderColor = "rgba(237,108,2,.25)";
    style.background = "rgba(237,108,2,.08)";
    style.color = "#ed6c02";
  }

  return <span style={style}>{children}</span>;
}

export default function AdminOrdersPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const refresh = async () => {
    setErr("");
    setLoading(true);
    try {
      const data = await ordersApi.list();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => (b.id || 0) - (a.id || 0));
  }, [rows]);

  return (
    <div className="adminGrid">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0 }}>Orders</h1>
          <p style={{ margin: "6px 0 0", color: "var(--muted)", fontWeight: 800 }}>
            Recent customer payments from tablet checkout.
          </p>
        </div>

        <button className="adminBtn adminBtnPrimary" onClick={refresh} type="button">
          Refresh
        </button>
      </div>

      {err && <div style={{ color: "#b02a37", fontWeight: 900 }}>{err}</div>}

      {loading && <div className="adminCard">Loading orders…</div>}

      {!loading && sorted.length === 0 && (
        <div className="adminCard">
          <b>No orders yet.</b>
          <div style={{ marginTop: 6, color: "var(--muted)", fontWeight: 800 }}>
            Place an order from tablet, then refresh.
          </div>
        </div>
      )}

      {!loading &&
        sorted.map((o) => (
          <div key={o.id} className="adminCard" style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "start" }}>
              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ fontWeight: 1000, fontSize: 16 }}>
                  Order #{o.id}{" "}
                  <span style={{ color: "rgba(43,43,43,.55)", fontWeight: 900, fontSize: 13 }}>
                    • {new Date(o.createdAt || o.created_at || Date.now()).toLocaleString()}
                  </span>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Badge>{String(o.paymentMethod || o.payment || "CASH").toUpperCase()}</Badge>
                  <Badge tone={(o.status || "PAID").toUpperCase() === "PAID" ? "paid" : "pending"}>
                    {(o.status || "PAID").toUpperCase()}
                  </Badge>
                  <Badge>{fmtMoney(o.total)}</Badge>
                  {o.tableNo && <Badge>Table {o.tableNo}</Badge>}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 1000, fontSize: 18 }}>{fmtMoney(o.total)}</div>
                <div style={{ color: "var(--muted)", fontWeight: 800, fontSize: 12 }}>
                  {Array.isArray(o.items) ? `${o.items.length} item(s)` : "—"}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 12, borderTop: "1px solid rgba(0,0,0,.06)", paddingTop: 12 }}>
              <div style={{ fontWeight: 1000, marginBottom: 8 }}>Items</div>

              {Array.isArray(o.items) && o.items.length > 0 ? (
                <div style={{ display: "grid", gap: 10 }}>
                  {o.items.map((it, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 10,
                        padding: 10,
                        borderRadius: 14,
                        background: "rgba(217,184,140,.14)",
                        border: "1px solid rgba(217,184,140,.30)",
                        fontWeight: 900,
                      }}
                    >
                      <div style={{ display: "grid" }}>
                        <span>{it.name || it.menuName || "Item"}</span>
                        <span style={{ fontSize: 12, color: "rgba(43,43,43,.65)" }}>
                          ID: {it.menuId || it.id || "-"}
                        </span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div>
                          x{it.qty || it.quantity || 1} • {fmtMoney(it.price)}
                        </div>
                        <div style={{ fontSize: 12, color: "rgba(43,43,43,.65)" }}>
                          Subtotal: {fmtMoney((it.price || 0) * (it.qty || it.quantity || 1))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: "var(--muted)", fontWeight: 800 }}>No items</div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
