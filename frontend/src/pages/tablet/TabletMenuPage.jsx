import { useEffect, useState } from "react";
import { CATEGORIES, allItems } from "../../tablet/tabletMenu.data";
import { addToCart, decFromCart, readCart } from "../../tablet/tabletCart.js";

export default function TabletMenuPage() {
  const [cart, setCart] = useState(() => readCart());
  const items = allItems();

  useEffect(() => {
    const onStorage = () => setCart(readCart());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const getQty = (id) => cart[id] || 0;

  return (
    <div className="tbPage">
      <div className="tbTwoCol">
        <div>
          {CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <h3 className="tbSectionTitle">{cat.title}</h3>
              <div className="tbGrid">
                {cat.items.map((m) => (
                  <div className="tbCard" key={m.id}>
                    <img className="tbImg" src={m.img} alt={m.name} />
                    <div className="tbName">{m.name}</div>
                    <div className="tbMeta">Price: RM {m.price}</div>

                    <button className="tbAdd" onClick={() => setCart(addToCart(m.id))}>
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Current Order */}
        <aside className="tbCartPanel">
          <h3 className="tbCartTitle">Your Current Order</h3>

          {items.filter((i) => getQty(i.id) > 0).length === 0 && (
            <div style={{ color: "var(--tb-muted)", fontWeight: 800 }}>No items yet.</div>
          )}

          {items.filter((i) => getQty(i.id) > 0).map((i) => (
            <div className="tbCartItem" key={i.id}>
              <img className="tbThumb" src={i.img} alt={i.name} />
              <div>
                <div className="tbCartName">{i.name}</div>
                <div className="tbCartPrice">RM {i.price}</div>
              </div>
              <div className="tbQtyCtrl">
                <button className="tbQtyBtn" onClick={() => setCart(decFromCart(i.id))}>-</button>
                <div className="tbQtyNum">{getQty(i.id)}</div>
                <button className="tbQtyBtn" onClick={() => setCart(addToCart(i.id))}>+</button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="tbCartTotal">
            <span>Total:</span>
            <span>
              RM{" "}
              {items.reduce((sum, it) => sum + (cart[it.id] || 0) * it.price, 0)}
            </span>
          </div>

          <button className="tbCta" onClick={() => (window.location.href = "/tablet/orders")}>
            Send Order
          </button>
        </aside>
      </div>
    </div>
  );
}
