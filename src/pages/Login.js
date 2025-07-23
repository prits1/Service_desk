import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleManualLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ background: "#eaf1fb", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 400, width: "100%", background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: 32, margin: "32px 0" }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "#3399cc", fontWeight: 500, marginBottom: 16, cursor: "pointer", fontSize: 16 }}>
          ← Back to Home
        </button>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          <div style={{ background: "#eaf1fb", borderRadius: "50%", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <span role="img" aria-label="user" style={{ fontSize: 36, color: "#3399cc" }}>👤</span>
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 26, marginBottom: 8 }}>User Login</h2>
          <p style={{ color: "#555", textAlign: "center", marginBottom: 8 }}>
            Access your support tickets and submit new requests<br />
            Sign in with your Google account or manually to continue
          </p>
        </div>
        <button onClick={handleGoogleLogin} style={{ width: "100%", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "14px 0", fontWeight: 600, fontSize: 18, cursor: "pointer", marginBottom: 16 }}>
          <span style={{ marginRight: 8, fontSize: 20 }}>🔒</span> Sign In with Google
        </button>
        <div style={{ margin: "16px 0" }}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={inputStyle} />
          <button onClick={handleManualLogin} style={{ width: "100%", background: "#3399cc", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, fontSize: 16, cursor: "pointer", marginTop: 8 }}>
            Sign In Manually
          </button>
        </div>
        {error && <p style={{ color: "#d32f2f", textAlign: "center", marginTop: 8 }}>{error}</p>}
        <hr style={{ margin: "24px 0" }} />
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          Don't have an account? <button onClick={() => navigate("/register")} style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 500, cursor: "pointer" }}>Register here</button>
        </div>
        <div style={{ background: "#f6f8fa", borderRadius: 8, padding: 16, color: "#333" }}>
          <strong>What you can do:</strong>
          <ul style={{ margin: "12px 0 0 0", paddingLeft: 18, fontSize: 15 }}>
            <li>Create and track support tickets</li>
            <li>Upload attachments to your tickets</li>
            <li>View ticket status and responses</li>
            <li>Access your ticket history</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  margin: "8px 0",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 16,
};
