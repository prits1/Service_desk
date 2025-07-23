import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  // ...existing code...
  // Import auth from firebase
  const { auth } = require("../firebase");

  // Helper to check authentication and redirect if needed
  const handleProtectedNav = (path) => {
    if (auth.currentUser) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={{ background: "#eaf1fb", minHeight: "100vh" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 48px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32, color: "#3399cc" }}>
            <span role="img" aria-label="headset">🎧</span>
          </span>
          <span style={{ fontWeight: 700, fontSize: 24, color: "#222" }}>ServiceDesk Pro</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => navigate("/Login")}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #ccc", borderRadius: 6, padding: "8px 18px", fontWeight: 500, cursor: "pointer" }}>
            <span role="img" aria-label="user">👤</span> User Login
          </button>
          <button onClick={() => navigate("/admin")}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "#e53935", color: "#fff", border: "none", borderRadius: 6, padding: "8px 18px", fontWeight: 500, cursor: "pointer" }}>
            <span role="img" aria-label="admin">🛡️</span> Admin Login
          </button>
        </div>
      </header>
      <main style={{ padding: "48px 0", textAlign: "center" }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: "#222", marginBottom: 16 }}>
          Professional Support Ticket Management
        </h1>
        <p style={{ fontSize: 20, color: "#444", maxWidth: 600, margin: "0 auto 32px" }}>
          Streamline your customer support operations with our comprehensive ticket management system. Track, assign, and resolve issues efficiently with powerful tools and insights.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 40 }}>
          <button onClick={() => handleProtectedNav("/raise-ticket")}
            style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "14px 32px", fontWeight: 600, fontSize: 18, cursor: "pointer" }}>
            Create a Ticket
          </button>
          <button onClick={() => handleProtectedNav("/dashboard")}
            style={{ background: "#fff", color: "#222", border: "1px solid #ccc", borderRadius: 8, padding: "14px 32px", fontWeight: 600, fontSize: 18, cursor: "pointer" }}>
            View Dashboard
          </button>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
          <FeatureCard
            icon={<span role="img" aria-label="ticket" style={{ fontSize: 32, color: "#2563eb" }}>🎟️</span>}
            title="Easy Ticket Creation"
            desc="Submit support requests with detailed descriptions, file attachments, and priority levels."
            bullets={["Multiple categories and priorities", "File upload support", "Real-time status tracking"]}
          />
          <FeatureCard
            icon={<span role="img" aria-label="clock" style={{ fontSize: 32, color: "#22c55e" }}>⏰</span>}
            title="Progress Tracking"
            desc="Monitor ticket progress from submission to resolution with detailed status updates."
            bullets={["Real-time status updates", "Comment and response system", "Email notifications"]}
          />
          <FeatureCard
            icon={<span role="img" aria-label="shield" style={{ fontSize: 32, color: "#e53935" }}>🛡️</span>}
            title="Admin Management"
            desc="Powerful administrative tools for managing tickets, users, and system analytics."
            bullets={["Ticket assignment and routing", "Performance analytics", "User role management"]}
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc, bullets }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", padding: 32, minWidth: 280, maxWidth: 340, flex: 1 }}>
      <div style={{ marginBottom: 12 }}>{icon}</div>
      <h3 style={{ fontSize: 22, fontWeight: 700, color: "#222", marginBottom: 8 }}>{title}</h3>
      <p style={{ color: "#555", marginBottom: 16 }}>{desc}</p>
      <ul style={{ color: "#444", fontSize: 15, textAlign: "left", paddingLeft: 18 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ marginBottom: 4 }}>• {b}</li>
        ))}
      </ul>
    </div>
  );
}
