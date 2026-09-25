import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ClyptusLogo } from "../../components/ClyptusLogo";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft, Building2 } from "lucide-react";

export function RecruiterLogin() {
  const { loginRecruiter, isLoading, error, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/recruiter/dashboard");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await loginRecruiter({ email, password });
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #06101E 0%, #0E1F3A 60%, #0A1628 100%)",
      padding: "24px", fontFamily: "Inter, sans-serif"
    }}>
      <div style={{
        width: "100%", maxWidth: "440px",
        background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: "28px",
        padding: "40px 36px", boxShadow: "0 40px 80px rgba(0,0,0,0.5)"
      }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#94A3B8", fontSize: "0.85rem", textDecoration: "none", marginBottom: "28px" }}>
          <ArrowLeft size={15} /> Back to Home
        </Link>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <ClyptusLogo height={54} theme="dark" />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
          <Building2 size={20} color="#FF5500" />
          <h1 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#FFFFFF" }}>Recruiter Login</h1>
        </div>
        <p style={{ color: "#94A3B8", fontSize: "0.9rem", textAlign: "center", marginBottom: "32px" }}>
          Hire top talent from Clyptus
        </p>

        {error && (
          <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "12px 16px", color: "#FCA5A5", fontSize: "0.88rem", marginBottom: "20px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={{ display: "block", color: "#CBD5E1", fontSize: "0.85rem", fontWeight: 600, marginBottom: "8px" }}>Work Email</label>
            <div style={{ position: "relative" }}>
              <Mail size={17} color="#64748B" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="recruiter@company.com"
                style={{ width: "100%", padding: "13px 14px 13px 44px", borderRadius: "12px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#FFFFFF", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
            </div>
          </div>
          <div>
            <label style={{ display: "block", color: "#CBD5E1", fontSize: "0.85rem", fontWeight: 600, marginBottom: "8px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={17} color="#64748B" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Your password"
                style={{ width: "100%", padding: "13px 44px 13px 44px", borderRadius: "12px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#FFFFFF", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                {showPassword ? <EyeOff size={17} color="#64748B" /> : <Eye size={17} color="#64748B" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={isLoading}
            style={{
              padding: "14px", borderRadius: "12px", fontWeight: 700, fontSize: "1rem",
              cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1,
              background: "linear-gradient(135deg, #FF5500, #FF7733)", color: "#FFFFFF",
              border: "none", display: "flex", alignItems: "center", justifyContent: "center",
              gap: "8px", marginTop: "8px", boxShadow: "0 8px 24px rgba(255,85,0,0.35)"
            }}>
            {isLoading ? "Signing in..." : <><LogIn size={18} /> Sign In as Recruiter</>}
          </button>
        </form>

        <p style={{ color: "#64748B", fontSize: "0.88rem", textAlign: "center", marginTop: "24px" }}>
          Looking for jobs?{" "}
          <Link to="/candidate/login" style={{ color: "#FF5500", fontWeight: 700, textDecoration: "none" }}>
            Candidate Login →
          </Link>
        </p>
      </div>
    </div>
  );
}
