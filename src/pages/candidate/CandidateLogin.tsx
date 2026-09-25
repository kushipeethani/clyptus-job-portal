import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ClyptusLogo } from "../../components/ClyptusLogo";
import {
  Mail, Lock, Eye, EyeOff, ArrowLeft, User,
  Briefcase, CheckCircle, Star, TrendingUp, Shield
} from "lucide-react";

const FEATURES = [
  { icon: <Briefcase size={18} />, text: "Exclusive MNC Opportunities" },
  { icon: <Star size={18} />, text: "Precision Role Matching" },
  { icon: <TrendingUp size={18} />, text: "Direct Hiring Manager Access" },
  { icon: <Shield size={18} />, text: "100% Confidential Profiles" },
];

export function CandidateLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only: do nothing on submit as there is no backend
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "'Inter', 'Outfit', sans-serif",
      background: "#F8FAFC",
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.5s ease"
    }}>

      {/* ── LEFT PANEL ── Brand + Features */}
      <div style={{
        flex: "0 0 48%",
        background: "linear-gradient(145deg, #06101E 0%, #0E1F3A 50%, #1C0A00 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 52px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Glowing orbs */}
        <div style={{
          position: "absolute", width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(255,102,0,0.18) 0%, transparent 70%)",
          top: "-100px", right: "-100px", borderRadius: "50%", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", width: "300px", height: "300px",
          background: "radial-gradient(circle, rgba(255,102,0,0.1) 0%, transparent 70%)",
          bottom: "40px", left: "-80px", borderRadius: "50%", pointerEvents: "none"
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "400px", width: "100%" }}>
          {/* Logo */}
          <div style={{ marginBottom: "52px" }}>
            <ClyptusLogo height={52} theme="dark" />
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "2.4rem", fontWeight: 900, color: "#FFFFFF",
            lineHeight: 1.2, marginBottom: "16px", letterSpacing: "-0.5px"
          }}>
            Elevate Your<br />
            <span style={{
              background: "linear-gradient(90deg, #FF6600, #FF9944)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>
              Professional Journey
            </span>
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "1rem", lineHeight: 1.7, marginBottom: "44px" }}>
            Bypass the noise. Connect directly with visionary companies that value your unique expertise.
          </p>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "14px",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateX(0)" : "translateX(-20px)",
                transition: `all 0.5s ease ${0.1 + i * 0.1}s`
              }}>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "10px",
                  background: "rgba(255,102,0,0.15)", border: "1px solid rgba(255,102,0,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#FF6600", flexShrink: 0
                }}>
                  {f.icon}
                </div>
                <span style={{ color: "#CBD5E1", fontSize: "0.92rem", fontWeight: 500 }}>{f.text}</span>
              </div>
            ))}
          </div>


        </div>
      </div>

      {/* ── RIGHT PANEL ── Login Form */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 32px",
        background: "#F8FAFC",
        position: "relative"
      }}>
        {/* Back to Home */}
        <Link to="/" style={{
          position: "absolute", top: "28px", left: "32px",
          display: "inline-flex", alignItems: "center", gap: "6px",
          color: "#64748B", fontSize: "0.85rem", fontWeight: 600,
          textDecoration: "none", transition: "color 0.2s"
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "#FF5500")}
          onMouseLeave={e => (e.currentTarget.style.color = "#64748B")}
        >
          <ArrowLeft size={15} /> Back to Home
        </Link>

        <div style={{
          width: "100%", maxWidth: "420px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.6s ease 0.15s"
        }}>
          {/* Header */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "16px",
              background: "linear-gradient(135deg, #FF5500, #FF7733)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "20px", boxShadow: "0 8px 24px rgba(255,85,0,0.35)"
            }}>
              <User size={26} color="#FFFFFF" />
            </div>
            <h2 style={{
              fontSize: "1.85rem", fontWeight: 900, color: "#0F172A",
              marginBottom: "6px", letterSpacing: "-0.4px"
            }}>
              Candidate Login
            </h2>
            <p style={{ color: "#64748B", fontSize: "0.92rem" }}>
              Welcome back! Sign in to your account.
            </p>
          </div>



          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Email */}
            <div>
              <label style={{
                display: "block", color: "#374151", fontSize: "0.85rem",
                fontWeight: 700, marginBottom: "8px"
              }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={17} color={emailFocused ? "#FF5500" : "#94A3B8"} style={{
                  position: "absolute", left: "15px", top: "50%",
                  transform: "translateY(-50%)", transition: "color 0.2s"
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  required
                  placeholder="you@example.com"
                  style={{
                    width: "100%", padding: "14px 14px 14px 46px",
                    borderRadius: "12px", fontSize: "0.95rem",
                    background: "#FFFFFF", color: "#0F172A",
                    border: emailFocused ? "2px solid #FF5500" : "2px solid #E2E8F0",
                    outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    boxShadow: emailFocused ? "0 0 0 4px rgba(255,85,0,0.08)" : "none"
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ color: "#374151", fontSize: "0.85rem", fontWeight: 700 }}>Password</label>
                <a href="#" style={{ color: "#FF5500", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={17} color={passwordFocused ? "#FF5500" : "#94A3B8"} style={{
                  position: "absolute", left: "15px", top: "50%",
                  transform: "translateY(-50%)", transition: "color 0.2s"
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                  placeholder="Your password"
                  style={{
                    width: "100%", padding: "14px 46px 14px 46px",
                    borderRadius: "12px", fontSize: "0.95rem",
                    background: "#FFFFFF", color: "#0F172A",
                    border: passwordFocused ? "2px solid #FF5500" : "2px solid #E2E8F0",
                    outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    boxShadow: passwordFocused ? "0 0 0 4px rgba(255,85,0,0.08)" : "none"
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: "absolute", right: "14px", top: "50%",
                  transform: "translateY(-50%)", background: "none",
                  border: "none", cursor: "pointer", padding: 0
                }}>
                  {showPassword
                    ? <EyeOff size={17} color="#94A3B8" />
                    : <Eye size={17} color="#94A3B8" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: "15px", borderRadius: "12px",
                fontWeight: 800, fontSize: "1rem", cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.75 : 1,
                background: "linear-gradient(135deg, #FF5500 0%, #FF7733 100%)",
                color: "#FFFFFF", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "8px", marginTop: "4px",
                boxShadow: "0 8px 28px rgba(255,85,0,0.38)",
                transition: "all 0.2s", letterSpacing: "0.3px"
              }}
              onMouseEnter={e => { if (!isLoading) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              {isLoading ? (
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "18px", height: "18px", border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                  Signing in...
                </span>
              ) : (
                <><CheckCircle size={18} /> Sign In to Clyptus</>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "28px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "#E2E8F0" }} />
            <span style={{ color: "#94A3B8", fontSize: "0.8rem", fontWeight: 600 }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "#E2E8F0" }} />
          </div>

          {/* Social Logins */}
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { name: "Google", color: "#EA4335", emoji: "🔍" },
              { name: "LinkedIn", color: "#0A66C2", emoji: "💼" },
              { name: "GitHub", color: "#333333", emoji: "🐙" },
            ].map(s => (
              <button key={s.name} type="button" style={{
                flex: 1, padding: "12px 8px", borderRadius: "12px",
                background: "#FFFFFF", border: "2px solid #E2E8F0",
                cursor: "pointer", fontWeight: 700, fontSize: "0.82rem",
                color: "#374151", display: "flex", alignItems: "center",
                justifyContent: "center", gap: "6px",
                transition: "all 0.2s"
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = s.color;
                  (e.currentTarget as HTMLButtonElement).style.color = s.color;
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E8F0";
                  (e.currentTarget as HTMLButtonElement).style.color = "#374151";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                <span>{s.emoji}</span> {s.name}
              </button>
            ))}
          </div>

          {/* Register Link */}
          <p style={{ color: "#64748B", fontSize: "0.9rem", textAlign: "center", marginTop: "28px" }}>
            New to Clyptus?{" "}
            <Link to="/candidate/register" style={{ color: "#FF5500", fontWeight: 800, textDecoration: "none" }}>
              Create New Account →
            </Link>
          </p>
        </div>
      </div>

      {/* Spinner keyframes */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .left-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
