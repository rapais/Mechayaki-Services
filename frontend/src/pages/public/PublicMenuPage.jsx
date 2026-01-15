const items = [
  { name: "Akari no Ramen", img: "/images/menu-images/5. Akari no Ramen (Light of Ramen).png", price: "RM 22" },
  { name: "Takoyaki no Takaramono", img: "/images/menu-images/4. Takoyaki no Takaramono (Treasure Takoyaki).png", price: "RM 12" },
  { name: "Karaage Tenshi", img: "/images/menu-images/5. Karaage Tenshi (Golden Fried Chicken Angel).png", price: "RM 18" },
  { name: "Itadakimasu Yakisoba", img: "/images/menu-images/2. Itadakimasu Yakisoba (Grateful Feast Noodles).png", price: "RM 16" },
  { name: "Matcha Kaze", img: "/images/menu-images/1. Matcha Kaze (Green Tea Breeze).png", price: "RM 10" },
  { name: "Tempura no Uta", img: "/images/menu-images/3. Tempura no Uta (Tempura Melody).png", price: "RM 17" },
];

export default function MenuPage() {
  return (
    <section className="section">
      <div className="wrap">
        <h2 className="h2">Menu</h2>
        <p className="p">A curated preview using your AeU assets.</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 14,
          marginTop: 18
        }}>
          {items.map((m) => (
            <div key={m.name} style={{
              border: "1px solid rgba(0,0,0,.08)",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 16px 40px rgba(0,0,0,.08)"
            }}>
              <img src={m.img} alt={m.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
              <div style={{ padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ fontWeight: 950 }}>{m.name}</div>
                  <div style={{ fontWeight: 950 }}>{m.price}</div>
                </div>
                <div style={{ marginTop: 8, color: "rgba(17,17,17,.70)", lineHeight: 1.6 }}>
                  Demo menu card. Admin CRUD is implemented for stalls in the admin area.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
