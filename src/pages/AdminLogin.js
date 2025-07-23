import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Check if the user is an admin (for demo, check email)
      const email = result.user.email;
      if (email === "admin@admin.com") {
        navigate("/admin");
      } else {
        alert("Access denied: You must have admin privileges.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ background: "#fff6f3", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 400, width: "100%", background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: 32, margin: "32px 0" }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "#e53935", fontWeight: 500, marginBottom: 16, cursor: "pointer", fontSize: 16 }}>
          ← Back to Home
        </button>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          <div style={{ background: "#fff6f3", borderRadius: "50%", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <span role="img" aria-label="admin" style={{ fontSize: 36, color: "#e53935" }}>🛡️</span>
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 26, marginBottom: 8 }}>Admin Login</h2>
          <p style={{ color: "#555", textAlign: "center", marginBottom: 8 }}>
            Access the administrative dashboard and manage tickets
          </p>
          <div style={{ background: "#fffbe6", border: "1px solid #ffe58f", borderRadius: 8, padding: 12, color: "#ad6800", marginBottom: 16, width: "100%", textAlign: "left" }}>
            <span style={{ fontWeight: 600, marginRight: 6 }}>🛡️ Restricted Access</span><br />
            This area is for authorized administrators only. You must have admin privileges to access the management panel.
          </div>
        </div>
        <button onClick={handleAdminLogin} style={{ width: "100%", background: "#e53935", color: "#fff", border: "none", borderRadius: 8, padding: "14px 0", fontWeight: 600, fontSize: 18, cursor: "pointer", marginBottom: 24 }}>
          <span style={{ marginRight: 8, fontSize: 20 }}>🔒</span> Sign In as Administrator
        </button>
        <hr style={{ margin: "24px 0" }} />
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          Need user access instead? <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 500, cursor: "pointer" }}>Go to User Login</button>
        </div>
        <div style={{ background: "#f6f8fa", borderRadius: 8, padding: 16, color: "#333" }}>
          <strong>Admin capabilities:</strong>
          <ul style={{ margin: "12px 0 0 0", paddingLeft: 18, fontSize: 15 }}>
            <li>View and manage all support tickets</li>
            <li>Assign tickets to team members</li>
            <li>Update ticket statuses and priorities</li>
            <li>Access system analytics and reports</li>
            <li>Manage user accounts and permissions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
