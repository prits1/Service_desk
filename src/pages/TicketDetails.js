import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      setError("");
      try {
        const docRef = doc(db, "tickets", id);
        const docSnap = await getDoc(docRef);
        setTicket(docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null);
      } catch (err) {
        setError("Failed to load ticket.");
      }
      setLoading(false);
    };
    fetchTicket();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      await deleteDoc(doc(db, "tickets", id));
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to delete ticket.");
    }
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>;
  if (error) return <div style={{ color: "#e53935", textAlign: "center", marginTop: 40 }}>{error}</div>;
  if (!ticket) return <div style={{ textAlign: "center", marginTop: 40 }}>Ticket not found.</div>;

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 48px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32, color: "#3399cc" }}>
            <span role="img" aria-label="headset">🎧</span>
          </span>
          <span style={{ fontWeight: 700, fontSize: 24, color: "#222" }}>ServiceDesk Pro</span>
        </div>
        <button onClick={() => navigate("/dashboard")}
          style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "10px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
          ← Back to Dashboard
        </button>
      </header>
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 0" }}>
        <div style={{ maxWidth: 600, width: "100%", background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: 40, margin: "32px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span role="img" aria-label="ticket" style={{ fontSize: 32, color: "#2563eb" }}>🎟️</span>
            <h2 style={{ fontWeight: 700, fontSize: 28, margin: 0 }}>Ticket Details</h2>
          </div>
          <div style={{ color: "#555", marginBottom: 24 }}>View details and status of your support request.</div>
          <div style={{ marginBottom: 18 }}>
            <strong style={{ fontSize: 18 }}>{ticket.title || "No Title"}</strong>
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={labelStyle}>Category:</span> {ticket.category}
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={labelStyle}>Priority:</span> {ticket.priority}
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={labelStyle}>Status:</span> <span style={{ color: statusColor(ticket.status), fontWeight: 600 }}>{ticket.status}</span>
          </div>
          <div style={{ marginBottom: 18 }}>
            <span style={labelStyle}>Description:</span>
            <div style={{ background: "#f6f8fa", borderRadius: 8, padding: 16, marginTop: 6, color: "#222" }}>{ticket.description}</div>
          </div>
          <button onClick={handleDelete} style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, fontSize: 16, cursor: "pointer", width: "100%", marginTop: 8 }}>
            Delete Ticket
          </button>
        </div>
      </main>
    </div>
  );
}

function statusColor(status) {
  if (status === "Open") return "#2563eb";
  if (status === "In Progress") return "#f59e42";
  if (status === "Resolved") return "#22c55e";
  return "#888";
}

const labelStyle = {
  fontWeight: 600,
  fontSize: 16,
  marginRight: 6,
};