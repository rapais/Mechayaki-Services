export default function ContactPage() {
  return (
    <section style={{ padding: "90px 0 70px", background: "#fff" }}>
      <div className="container">
        <h2 style={{ fontWeight: 900, marginTop: 0 }}>Contact</h2>
        <p style={{ opacity: 0.75 }}>Send us a message (UI demo).</p>

        <div className="row" style={{ marginTop: 10 }}>
          <div className="col-md-6 col-sm-12">
            <div style={{ border: "1px solid #eee", borderRadius: 10, padding: 18 }}>
              <h4 style={{ marginTop: 0, fontWeight: 900 }}>Message</h4>
              <div style={{ display: "grid", gap: 10 }}>
                <input className="form-control" placeholder="Your Name" />
                <input className="form-control" placeholder="Email" />
                <textarea className="form-control" rows="5" placeholder="Your message..." />
                <button className="btn btn-danger" type="button">Send (Demo)</button>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div style={{ border: "1px solid #eee", borderRadius: 10, padding: 18 }}>
              <h4 style={{ marginTop: 0, fontWeight: 900 }}>Location</h4>
              <p style={{ opacity: 0.75, lineHeight: 1.7 }}>
                Demo-only address. Replace with real location if needed.
              </p>
              <ul style={{ opacity: 0.8 }}>
                <li>Jakarta / Bandung (Demo)</li>
                <li>Open Daily: 10:00 – 22:00</li>
                <li>Phone: +62 xxx-xxxx-xxxx</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
