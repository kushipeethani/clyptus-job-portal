import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ClyptusLogo } from "../../components/ClyptusLogo";
import { Mail, Lock, Eye, EyeOff, User, Phone, UserPlus, ArrowLeft } from "lucide-react";

export function CandidateRegister() {
  const { registerCandidate, isLoading, error, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/candidate/dashboard");
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await registerCandidate(form);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 14px 13px 44px", borderRadius: "12px",
    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
    color: "#FFFFFF", fontSize: "0.95rem", outline: "none", boxSizing: "border-box"
  };
  const labelStyle: React.CSSProperties = {
    display: "block", color: "#CBD5E1", fontSize: "0.85rem", fontWeight: 600, marginBottom: "8px"
  };
  const iconStyle: React.CSSProperties = {
    position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)"
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #06101E 0%, #0E1F3A 60%, #1A1034 100%)",
      padding: "24px", fontFamily: "Inter, sans-serif"
    }}>
      <div style={{
        width: "100%", maxWidth: "480px",
        background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: "28px",
        padding: "40px 36px", boxShadow: "0 40px 80px rgba(0,0,0,0.5)"
      }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#94A3B8", fontSize: "0.85rem", textDecoration: "none", marginBottom: "28px" }}>
          <ArrowLeft size={15} /> Back to Home
        </Link>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
          <ClyptusLogo height={54} theme="dark" />
        </div>

        <h1 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#FFFFFF", textAlign: "center", marginBottom: "6px" }}>
          Create Candidate Account
        </h1>
        <p style={{ color: "#94A3B8", fontSize: "0.88rem", textAlign: "center", marginBottom: "28px" }}>
          Join thousands of professionals on Clyptus
        </p>

        {error && (
          <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "12px 16px", color: "#FCA5A5", fontSize: "0.88rem", marginBottom: "16px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <div style={{ position: "relative" }}>
              <User size={17} color="#64748B" style={iconStyle} />
              <input name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Your full name" style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={17} color="#64748B" style={iconStyle} />
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Phone Number (Optional)</label>
            <div style={{ position: "relative" }}>
              <Phone size={17} color="#64748B" style={iconStyle} />
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={17} color="#64748B" style={iconStyle} />
              <input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} required placeholder="Min 8 characters" style={{ ...inputStyle, paddingRight: "44px" }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                {showPassword ? <EyeOff size={17} color="#64748B" /> : <Eye size={17} color="#64748B" />}
              </button>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Confirm Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={17} color="#64748B" style={iconStyle} />
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required placeholder="Re-enter your password" style={inputStyle} />
            </div>
          </div>

          <button type="submit" disabled={isLoading}
            style={{
              padding: "14px", borderRadius: "12px", fontWeight: 700, fontSize: "1rem",
              cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1,
              background: "linear-gradient(135deg, #FF5500, #FF7733)", color: "#FFFFFF",
              border: "none", display: "flex", alignItems: "center", justifyContent: "center",
              gap: "8px", marginTop: "6px", boxShadow: "0 8px 24px rgba(255,85,0,0.35)"
            }}
          >
            {isLoading ? "Creating Account..." : <><UserPlus size={18} /> Create Account</>}
          </button>
        </form>

        <p style={{ color: "#64748B", fontSize: "0.88rem", textAlign: "center", marginTop: "24px" }}>
          Already have an account?{" "}
          <Link to="/candidate/login" style={{ color: "#FF5500", fontWeight: 700, textDecoration: "none" }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
