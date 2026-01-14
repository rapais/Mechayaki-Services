import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTabletSession } from "../../tablet/tabletSession";
import { useStalls } from "../../features/stalls/useStalls";

const CART_KEY = "mechayaki_tablet_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export default function TabletMenuPage() {
  const nav = useNavigate();
  const session = getTabletSession();
  const stalls = useStalls();
  const [cart, setCartState] = useState(getCart());

  const stall = useMemo(() => {
    if (!session) return null;
    return (stalls.data || []).find((s) => s.id === session.stallId) || null;
  }, [session, stalls.data]);

  if (!session) {
    return (
      <div style={{ padding: 24 }}>
        <h1>No tablet session</h1>
        <button onClick={() => nav("/tablet")} style={{ padding: 10, borderRadius: 10 }}>
          Go to Tablet Home
        </button>
      </div>
    );
  }

  const addMockItem = (label) => {
    const next = [...cart, { id: crypto.randomUUID(), name: label, qty: 1 }];
    setCart(next);
    setCartState(next);
  };

  const goCheckout = () => nav("/tablet/orders");

  return (
    <div style={{ maxWidth: 720, margin: "30px auto", padding: 24, display: "grid", gap: 14 }}>
      <h1>Tablet Menu</h1>
      <p style={{ color: "#666", marginTop: -10 }}>
        Stall: <b>{stall ? stall.name : `#${session.stallId}`}</b> | Table: <b>{session.tableNo}</b>
      </p>

      <section style={{ padding: 16, border: "1px solid #eee", borderRadius: 10 }}>
        <h2 style={{ marginTop: 0 }}>Mock Menu Items (fast demo)</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => addMockItem("Chicken Katsu")} style={btn}>Add Chicken Katsu</button>
          <button onClick={() => addMockItem("Takoyaki")} style={btn}>Add Takoyaki</button>
          <button onClick={() => addMockItem("Ocha")} style={btn}>Add Ocha</button>
        </div>
      </section>

      <section style={{ padding: 16, border: "1px solid #eee", borderRadius: 10 }}>
        <h2 style={{ marginTop: 0 }}>Cart</h2>
        {cart.length === 0 ? <p>No items yet.</p> : (
          <ul>
            {cart.map((i) => <li key={i.id}>{i.name} × {i.qty}</li>)}
          </ul>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button onClick={goCheckout} disabled={cart.length === 0} style={{ ...btn, background: "#111", color: "white", border: "none" }}>
            Proceed
          </button>
          <button
            onClick={() => { setCart([]); setCartState([]); }}
            style={btn}
          >
            Clear
          </button>
        </div>
      </section>
    </div>
  );
}

const btn = { padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", background: "white", fontWeight: 800, cursor: "pointer" };
