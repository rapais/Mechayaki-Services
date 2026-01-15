import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const KEY = "mechayaki_table_session_v1";

function readSession() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(session) {
  localStorage.setItem(KEY, JSON.stringify(session));
}

export default function TableSessionGuard({ children }) {
  const nav = useNavigate();
  const loc = useLocation();

  const [session, setSession] = useState(() => readSession());

  // If session exists, allow access.
  const allowed = useMemo(() => !!session?.active, [session]);

  // If user goes to /tablet directly and session exists, do nothing.
  // If session missing, we show the start screen (no redirect loop).
  useEffect(() => {
    // Optional: if user is NOT under /tablet, don't interfere.
    // (Guard should only be wrapped around /tablet routes anyway.)
    if (!loc.pathname.startsWith("/tablet")) return;
  }, [loc.pathname]);

  const startSession = () => {
    const newSession = {
      active: true,
      startedAt: new Date().toISOString(),
      // Optional demo fields:
      tableNo: "A1",
    };
    writeSession(newSession);
    setSession(newSession);

    // Send them to ordering flow immediately
    nav("/tablet/", { replace: true });
  };

  const clearSession = () => {
    localStorage.removeItem(KEY);
    setSession(null);
    nav("/tablet", { replace: true });
  };

  if (allowed) return children;

  // Start screen UI (simple, no CSS dependency)
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f0f0f0",
        padding: 24,
      }}
    >
      <div
        style={{
          width: 420,
          maxWidth: "100%",
          background: "white",
          border: "1px solid #e6e6e6",
          borderRadius: 12,
          padding: 18,
          display: "grid",
          gap: 12,
        }}
      >
        <h2 style={{ margin: 0 }}>Start Table Session</h2>
        <p style={{ margin: 0, color: "#666", fontWeight: 700 }}>
          For demo purposes, start a session to access the tablet ordering pages.
        </p>

        <button
          onClick={startSession}
          style={{
            border: "none",
            borderRadius: 10,
            padding: "12px 14px",
            fontWeight: 900,
            cursor: "pointer",
            background: "#28a745",
            color: "white",
          }}
        >
          Start Ordering
        </button>

        <button
          onClick={clearSession}
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: "10px 14px",
            fontWeight: 900,
            cursor: "pointer",
            background: "white",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
