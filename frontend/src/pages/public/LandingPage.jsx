import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

export default function LandingPage() {
  // If you don’t have slider-image1/2/3 yet, temporarily point these to an existing image:
  // e.g. "/images/menu-images/Header and Hero Section (6).png"
  const slides = useMemo(() => ([
    { src: "/images/slider-image1.jpg", kicker: "WELCOME TO MECHAYAKI", title: "Japanese street food, modern ordering." },
    { src: "/images/slider-image2.jpg", kicker: "FULL-STACK DEMO", title: "Admin manages stalls with real CRUD." },
    { src: "/images/slider-image3.jpg", kicker: "FAST • CLEAN • RESTFUL", title: "Spring Boot API + PostgreSQL + React." },
  ]), []);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <>
      {/* HERO */}
      <section className="hero" aria-label="Hero slider">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`heroSlide ${i === idx ? "active" : ""}`}
            style={{ backgroundImage: `url('${s.src}')` }}
          />
        ))}
        <div className="heroOverlay" />

        <div className="heroInner">
          <div>
            <div className="heroKicker">{slides[idx].kicker}</div>
            <h1 className="heroTitle">{slides[idx].title}</h1>
            <p className="heroDesc">
              Interview demo: register/login, view admin dashboard, and perform stalls CRUD (create/edit/toggle/delete)
              persisted in PostgreSQL.
            </p>

            <div className="heroCtas">
              <Link to="/menu" className="heroBtn heroBtnPrimary">Browse Menu</Link>
              <Link to="/reserve" className="heroBtn">Reservation</Link>
              <Link to="/admin/login" className="heroBtn">Admin</Link>
              <Link to="/tablet" className="heroBtn">Tablet</Link>
            </div>
          </div>
        </div>

        <div className="heroDots" aria-label="Slide controls">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`heroDot ${i === idx ? "active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 className="h2">Where Delicacies and Passion meet</h2>
              <p className="p">
                Mechayaki demonstrates a clean full-stack architecture: separated frontend, RESTful backend,
                PostgreSQL persistence, and real CRUD operations.
              </p>
              <p className="p">
                The core interview demo is admin login/register plus managing stalls with full CRUD.
              </p>
            </div>

            <div>
              <img
                src="/images/menu-images/Untitled design (23).png"
                alt="About"
                className="cardImg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MOSAIC */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="mosaic">
            <img src="/images/gallery/image1.jpg" alt="Gallery 1" />
            <img src="/images/gallery/image2.jpg" alt="Gallery 2" />
            <img src="/images/gallery/image3.jpg" alt="Gallery 3" />
            <img src="/images/gallery/image4.jpg" alt="Gallery 4" />
            <img src="/images/gallery/image5.jpg" alt="Gallery 5" />
            <img src="/images/gallery/image6.jpg" alt="Gallery 6" />
          </div>
        </div>
      </section>
    </>
  );
}
