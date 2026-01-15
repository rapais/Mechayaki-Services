import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TabletHomePage() {
  const nav = useNavigate();
  const [time, setTime] = useState(() => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="tbPage">
      <div className="tbHomeCenter">
        <div className="tbHomeCard">
          <img className="tbHomeLogo" src="/images/logo_black.png" alt="Logo" onError={(e)=>e.currentTarget.style.display="none"} />
          <div className="tbClock">{time}</div>

          <button className="tbAdd" style={{ maxWidth: 220 }} onClick={() => nav("/tablet/orders")}>
            Start Ordering
          </button>
        </div>
      </div>
    </div>
  );
}
