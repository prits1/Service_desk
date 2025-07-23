import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !phone || !organization) {
      setError("Please fill all fields.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      // Optionally, save phone and organization in Firestore
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
          <h2 style={{ fontWeight: 700, fontSize: 26, marginBottom: 8 }}>Register</h2>
          <p style={{ color: "#555", textAlign: "center", marginBottom: 8 }}>
            Create your account to start raising support tickets and tracking your requests.
          </p>
        </div>
        <form onSubmit={handleRegister}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" style={inputStyle} />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={inputStyle} />
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" style={inputStyle} />
          <input value={organization} onChange={e => setOrganization(e.target.value)} placeholder="Organization" style={inputStyle} />
          <button type="submit" style={{ width: "100%", background: "#3399cc", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, fontSize: 16, cursor: "pointer", marginTop: 8 }}>
            Register
          </button>
        </form>
        {error && <p style={{ color: "#d32f2f", textAlign: "center", marginTop: 8 }}>{error}</p>}
        <hr style={{ margin: "24px 0" }} />
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          Already have an account? <button type="button" onClick={() => navigate("/Login")} style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 500, cursor: "pointer" }}>Login here</button>
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