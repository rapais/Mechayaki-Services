import { useNavigate } from "react-router-dom";

export default function TabletPaymentPage() {
  const nav = useNavigate();

  return (
    <div style={{ maxWidth: 640, margin: "30px auto", padding: 24 }}>
      <h1>Payment</h1>
      <p style={{ color: "#666" }}>
        Demo-only: payment is not integrated. Order is stored locally as “PLACED”.
      </p>

      <button
        onClick={() => nav("/tablet/menu")}
        style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", background: "white", fontWeight: 800 }}
      >
        Back to Menu
      </button>
    </div>
  );
}
