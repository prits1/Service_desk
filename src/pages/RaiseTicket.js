import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function RaiseTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title || !description || !category || !priority) {
      setError("Please fill all required fields.");
      return;
    }
    try {
      await addDoc(collection(db, "tickets"), {
        userId: auth.currentUser.uid,
        title,
        description,
        category,
        priority,
        status: "Open",
        createdAt: new Date()
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create ticket. Try again.");
    }
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
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <button onClick={() => navigate("/dashboard")}
            style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "10px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
            <span role="img" aria-label="dashboard" style={{ marginRight: 8 }}>🏠</span> Dashboard
          </button>
          <button onClick={() => navigate("/raise-ticket")}
            style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "10px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
            <span role="img" aria-label="plus" style={{ marginRight: 8 }}>➕</span> New Ticket
          </button>
        </div>
      </header>
      <main style={{ padding: "48px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ maxWidth: 700, width: "100%", background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: 40, margin: "32px 0" }}>
          <button onClick={() => navigate("/dashboard")} style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 500, marginBottom: 16, cursor: "pointer", fontSize: 16 }}>
            ← Back to Dashboard
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span role="img" aria-label="ticket" style={{ fontSize: 32, color: "#2563eb" }}>🎟️</span>
            <h2 style={{ fontWeight: 700, fontSize: 28, margin: 0 }}>Create Support Ticket</h2>
          </div>
          <div style={{ color: "#555", marginBottom: 24 }}>Describe your issue and we'll help you resolve it as quickly as possible.</div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Title *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Brief description of your issue" style={inputStyle} />
              <div style={{ color: "#888", fontSize: 14, marginTop: 4 }}>Provide a clear, concise title for your support request</div>
            </div>
            <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Category *</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                  <option value="">Select a category</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Network">Network</option>
                  <option value="Other">Other</option>
                </select>
                <div style={{ color: "#888", fontSize: 14, marginTop: 4 }}>Choose the category that best describes your issue</div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Priority *</label>
                <select value={priority} onChange={e => setPriority(e.target.value)} style={inputStyle}>
                  <option value="Low">Low - Minor issue</option>
                  <option value="Medium">Medium - Standard support request</option>
                  <option value="High">High - Urgent issue</option>
                </select>
                <div style={{ color: "#888", fontSize: 14, marginTop: 4 }}>How urgent is this issue for your work?</div>
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Description *</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Please provide detailed information about your issue, including any error messages, steps you've taken, and what you expected to happen..." style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} />
              <div style={{ color: "#888", fontSize: 14, marginTop: 4 }}>The more detail you provide, the faster we can help you resolve the issue</div>
            </div>
            {error && <div style={{ color: "#e53935", marginBottom: 12 }}>{error}</div>}
            <button type="submit" style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "14px 0", fontWeight: 600, fontSize: 18, cursor: "pointer", width: "100%", marginTop: 8 }}>
              Submit Ticket
            </button>
          </form>
          <div style={{ background: "#eaf1fb", borderRadius: 8, padding: 20, marginTop: 32 }}>
            <strong style={{ color: "#2563eb" }}>Tips for faster resolution:</strong>
            <ul style={{ color: "#222", fontSize: 15, marginTop: 10 }}>
              <li>Include any error messages or codes you're seeing</li>
              <li>Describe the steps that led to the problem</li>
              <li>Mention what you expected to happen vs. what actually happened</li>
              <li>Include your operating system and browser if relevant</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 16,
  marginTop: 6,
};

const labelStyle = {
  fontWeight: 600,
  fontSize: 16,
  marginBottom: 4,
  display: "block",
};