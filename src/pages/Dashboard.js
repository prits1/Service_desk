import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(auth.currentUser);
    const fetchTickets = async () => {
      if (!auth.currentUser) return;
      const q = query(collection(db, "tickets"), where("userId", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);
      setTickets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTickets();
  }, []);

  // Ticket stats
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === "Open").length;
  const inProgressTickets = tickets.filter(t => t.status === "In Progress").length;
  const resolvedTickets = tickets.filter(t => t.status === "Resolved").length;

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 48px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32, color: "#3399cc" }}>
            <span role="img" aria-label="headset">🎧</span>
          </span>
          <span style={{ fontWeight: 700, fontSize: 24, color: "#222" }}>ServiceDesk Pro</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, position: "relative" }}>
          <button onClick={() => navigate("/dashboard")}
            style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "10px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
            <span role="img" aria-label="dashboard" style={{ marginRight: 8 }}>🏠</span> Dashboard
          </button>
          <button onClick={() => navigate("/raise-ticket")}
            style={{ background: "#fff", color: "#222", border: "1px solid #ccc", borderRadius: 8, padding: "10px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
            <span role="img" aria-label="plus" style={{ marginRight: 8 }}>➕</span> New Ticket
          </button>
          {user && (
            <div style={{ position: "relative" }}>
              <div
                style={{ background: "#eaf1fb", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#222", cursor: "pointer" }}
                onClick={() => setShowMenu((v) => !v)}
                title={user.displayName || "User"}
              >
                {user.displayName ? user.displayName.split(" ").map(n => n[0]).join("") : "U"}
              </div>
              {showMenu && (
                <div style={{ position: "absolute", top: 44, right: 0, background: "#fff", borderRadius: 10, boxShadow: "0 4px 24px rgba(0,0,0,0.10)", minWidth: 220, zIndex: 10, padding: "16px 0" }}>
                  <div style={{ padding: "0 20px 12px 20px", borderBottom: "1px solid #eee" }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{user.displayName || "User"}</div>
                    <div style={{ color: "#888", fontSize: 14 }}>{user.email}</div>
                  </div>
                  <button onClick={() => { setShowMenu(false); navigate("/dashboard"); }} style={menuBtnStyle}>
                    <span role="img" aria-label="dashboard" style={{ marginRight: 8 }}>🏠</span> Dashboard
                  </button>
                  <button onClick={() => { setShowMenu(false); navigate("/raise-ticket"); }} style={menuBtnStyle}>
                    <span role="img" aria-label="plus" style={{ marginRight: 8 }}>➕</span> Create Ticket
                  </button>
                  <button onClick={handleLogout} style={{ ...menuBtnStyle, color: "#e53935" }}>
                    <span role="img" aria-label="logout" style={{ marginRight: 8 }}>↩️</span> Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <main style={{ padding: "48px 0", maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#222", marginBottom: 8 }}>Dashboard</h1>
        <div style={{ fontSize: 18, color: "#444", marginBottom: 32 }}>
          Welcome back, {user?.displayName?.split(" ")[0] || "User"}!
        </div>
        <div style={{ display: "flex", gap: 24, marginBottom: 40, flexWrap: "wrap" }}>
          <StatCard title="Total Tickets" value={totalTickets} icon={<span role="img" aria-label="ticket">🎟️</span>} desc="All your tickets" />
          <StatCard title="Open Tickets" value={openTickets} icon={<span role="img" aria-label="open">🕒</span>} desc="Awaiting response" />
          <StatCard title="In Progress" value={inProgressTickets} icon={<span role="img" aria-label="progress">⚠️</span>} desc="Being worked on" />
          <StatCard title="Resolved" value={resolvedTickets} icon={<span role="img" aria-label="resolved">✅</span>} desc="Successfully completed" />
        </div>
        <section style={{ background: "#fafbfc", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#222", marginBottom: 8 }}>Recent Tickets</h2>
          <div style={{ color: "#888", marginBottom: 24 }}>Your latest support requests</div>
          {tickets.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <span role="img" aria-label="ticket" style={{ fontSize: 40, color: "#bdbdbd" }}>🎟️</span>
              <div style={{ fontWeight: 600, fontSize: 18, margin: "16px 0" }}>No tickets yet</div>
              <div style={{ color: "#888", marginBottom: 16 }}>Create your first support ticket to get started.</div>
              <button onClick={() => navigate("/raise-ticket")}
                style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
                <span style={{ marginRight: 8 }}>➕</span> Create Your Ticket
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {tickets.slice(0, 5).map(ticket => (
                <div key={ticket.id} style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 17 }}>{ticket.description}</div>
                    <div style={{ color: "#888", fontSize: 14 }}>{ticket.status} • {ticket.category}</div>
                  </div>
                  <button onClick={() => navigate(`/ticket/${ticket.id}`)} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "8px 18px", fontWeight: 500, fontSize: 15, cursor: "pointer" }}>
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, desc }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", padding: 32, minWidth: 220, flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <span style={{ fontWeight: 700, fontSize: 18 }}>{title}</span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: "#2563eb", marginBottom: 4 }}>{value}</div>
      <div style={{ color: "#888", fontSize: 15 }}>{desc}</div>
    </div>
  );
}

const menuBtnStyle = {
  width: "100%",
  background: "none",
  border: "none",
  textAlign: "left",
  padding: "12px 20px",
  fontSize: 15,
  fontWeight: 500,
  color: "#222",
  cursor: "pointer",
};