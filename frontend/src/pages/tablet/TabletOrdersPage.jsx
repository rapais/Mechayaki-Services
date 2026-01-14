import { useNavigate } from "react-router-dom";
import { getTabletSession, clearTabletSession } from "../../tablet/tabletSession";

const CART_KEY = "mechayaki_tablet_cart";
const ORDERS_KEY = "mechayaki_orders_mock";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
}
function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}
function getOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"); } catch { return []; }
}
function setOrders(items) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(items));
}

export default function TabletOrdersPage() {
  const nav = useNavigate();
  const session = getTabletSession();
  const cart = getCart();

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

  const place = () => {
    const orders = getOrders();
    const newOrder = {
      id: crypto.randomUUID(),
      stallId: session.stallId,
      tableNo: session.tableNo,
      items: cart,
      createdAt: new Date().toISOString(),
      status: "PLACED",
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    nav("/tablet/payment");
  };

  const back = () => nav("/tablet/menu");

  return (
    <div style={{ maxWidth: 720, margin: "30px auto", padding: 24, display: "grid", gap: 14 }}>
      <h1>Review Order</h1>
      <p style={{ color: "#666", marginTop: -10 }}>
        Stall <b>#{session.stallId}</b> | Table <b>{session.tableNo}</b>
      </p>

      <section style={{ padding: 16, border: "1px solid #eee", borderRadius: 10 }}>
        {cart.length === 0 ? <p>No items in cart.</p> : (
          <ul>
            {cart.map((i) => <li key={i.id}>{i.name} × {i.qty}</li>)}
          </ul>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button onClick={back} style={btn}>Back</button>
          <button onClick={place} disabled={cart.length === 0} style={{ ...btn, background: "#111", color: "white", border: "none" }}>
            Place Order
          </button>
        </div>
      </section>

      <button
        onClick={() => { clearTabletSession(); nav("/tablet"); }}
        style={{ ...btn, justifySelf: "start" }}
      >
        End Session
      </button>
    </div>
  );
}

const btn = { padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", background: "white", fontWeight: 800, cursor: "pointer" };
