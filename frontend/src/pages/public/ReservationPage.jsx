export default function ReservePage() {
  return (
    <section className="section">
      <div className="wrap">
        <h2 className="h2">Reservation</h2>
        <p className="p">UI demo form (can be connected later).</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 18 }}>
          <div style={{ border: "1px solid rgba(0,0,0,.08)", borderRadius: 14, padding: 16 }}>
            <div style={{ fontWeight: 950 }}>Reserve a table</div>
            <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
              <input className="form-control" placeholder="Full Name" />
              <input className="form-control" placeholder="Phone Number" />
              <input className="form-control" type="date" />
              <input className="form-control" type="time" />
              <input className="form-control" type="number" min="1" placeholder="Guests" />
              <button className="btn btn-danger" type="button">Submit (Demo)</button>
            </div>
          </div>

          <div style={{ border: "1px solid rgba(0,0,0,.08)", borderRadius: 14, padding: 16 }}>
            <div style={{ fontWeight: 950 }}>Notes</div>
            <p className="p" style={{ marginTop: 12 }}>
              For interview: focus on Admin CRUD and authentication. Reservation is kept UI-only to keep scope manageable.
            </p>
          </div>
        </div>

        <style>{`@media (max-width: 920px){ .section .wrap > div[style*="grid-template-columns"]{ grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  );
}
