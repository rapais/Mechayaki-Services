import { useMemo, useState } from "react";
import { ordersApi } from "../../api/orders.api";
import { allItems } from "../../tablet/tabletMenu.data.js";
import { readCart, addToCart, decFromCart, clearCart } from "../../tablet/tabletCart.js";

export default function TabletOrdersPage() {
  const [cart, setCart] = useState(() => readCart());
  const [payment, setPayment] = useState("Cash");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const items = allItems();

  const selected = useMemo(() => {
    return items
      .map((i) => ({ ...i, qty: cart[i.id] || 0 }))
      .filter((i) => i.qty > 0);
  }, [cart, items]);

  const total = useMemo(() => {
    return selected.reduce((sum, i) => sum + i.qty * i.price, 0);
  }, [selected]);

  const pay = async () => {
    setErr("");
    if (selected.length === 0) {
      setErr("Cart is empty. Add items from Menu first.");
      return;
    }

    setBusy(true);
    try {
      const payload = {
        paymentMethod: payment,
        note: note.trim() || null,
        items: selected.map((i) => ({
          menuId: i.id,
          name: i.name,
          price: i.price,
          qty: i.qty,
        })),
        total,
      };

      await ordersApi.create(payload);

      clearCart();
      setCart({});
      setNote("");
      alert("Order paid and saved. You can view it in Admin > Orders.");
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to create order");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="tbPage">
      <div className="tbTwoCol">
        {/* Left: Selected items only */}
        <div>
          <h2 style={{ margin: 0, fontWeight: 950 }}>Checkout</h2>
          <div style={{ color: "var(--tb-muted)", fontWeight: 800, marginBottom: 12 }}>
            Selected items only. Add more from Menu.
          </div>

          {err && (
            <div style={{ color: "crimson", fontWeight: 900, marginBottom: 10 }}>
              {err}
            </div>
          )}

          {selected.length === 0 ? (
            <div style={{ background: "white", border: "1px solid var(--tb-border)", borderRadius: 10, padding: 14 }}>
              No items selected.
            </div>
          ) : (
            <div style={{ background: "white", border: "1px solid var(--tb-border)", borderRadius: 10, padding: 12 }}>
              {selected.map((i) => (
                <div className="tbCartItem" key={i.id}>
                  <img className="tbThumb" src={i.img} alt={i.name} />
                  <div>
                    <div className="tbCartName">{i.name}</div>
                    <div className="tbCartPrice">RM {i.price}</div>
                  </div>
                  <div className="tbQtyCtrl">
                    <button className="tbQtyBtn" onClick={() => setCart(decFromCart(i.id))}>-</button>
                    <div className="tbQtyNum">{i.qty}</div>
                    <button className="tbQtyBtn" onClick={() => setCart(addToCart(i.id))}>+</button>
                  </div>
                </div>
              ))}

              <div className="tbCartTotal" style={{ marginTop: 12 }}>
                <span>Total</span>
                <span>RM {total}</span>
              </div>
            </div>
          )}

          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            <div style={{ display: "grid", gap: 6 }}>
              <div style={{ fontWeight: 950 }}>Payment Method</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Cash", "E-wallet", "Card"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPayment(m)}
                    style={{
                      borderRadius: 10,
                      padding: "10px 12px",
                      fontWeight: 950,
                      cursor: "pointer",
                      border: "1px solid var(--tb-border)",
                      background: payment === m ? "var(--tb-side)" : "white",
                      color: payment === m ? "white" : "var(--tb-text)",
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <div style={{ fontWeight: 950 }}>Note (optional)</div>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Example: less spicy, no ice, etc."
                style={{
                  padding: 12,
                  borderRadius: 10,
                  border: "1px solid var(--tb-border)",
                  fontWeight: 800,
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: Summary + Pay */}
        <aside className="tbCartPanel">
          <h3 className="tbCartTitle">Order Summary</h3>
          <div style={{ color: "var(--tb-muted)", fontWeight: 800 }}>
            Items: <b>{selected.reduce((s, i) => s + i.qty, 0)}</b>
          </div>
          <div style={{ color: "var(--tb-muted)", fontWeight: 800, marginTop: 6 }}>
            Payment: <b>{payment}</b>
          </div>

          <div className="tbCartTotal" style={{ marginTop: 12 }}>
            <span>Total</span>
            <span>RM {total}</span>
          </div>

          <button className="tbCta" disabled={busy} onClick={pay}>
            {busy ? "Processing..." : "Pay & Send Order"}
          </button>
        </aside>
      </div>
    </div>
  );
}
