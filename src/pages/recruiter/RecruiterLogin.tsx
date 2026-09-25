import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ClyptusLogo } from "../../components/ClyptusLogo";
import { Mail, Lock, Eye, EyeOff, Building2, Users, BarChart3, CheckCircle2, ArrowLeft } from "lucide-react";

export function RecruiterLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/recruiter/dashboard");
    }, 600);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "'Inter', sans-serif",
      backgroundColor: "#F3F6F9" // Professional corporate light gray
    }}>
      
      {/* ── LEFT PANEL: Corporate Value Proposition ── */}
      <div style={{
        flex: "0 0 45%",
        background: "linear-gradient(135deg, #0A192F 0%, #0F3A68 100%)", // Corporate Navy to Deep Blue
        padding: "60px 48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#FFFFFF",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle geometric background pattern */}
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none"
        }} />
        
        {/* Floating Accent Circle */}
        <div style={{
          position: "absolute", top: "-10%", right: "-10%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 168, 150, 0.15) 0%, transparent 70%)", // Teal accent
          pointerEvents: "none"
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "60px" }}>
            <ClyptusLogo height={48} theme="dark" />
            <div style={{ 
              display: "inline-block", marginTop: "12px", padding: "4px 10px", 
              background: "rgba(0, 168, 150, 0.2)", color: "#00E5C9", 
              borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "1px" 
            }}>
              FOR EMPLOYERS
            </div>
          </div>

          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1.2, marginBottom: "20px" }}>
            Hire the top 1%<br />of global talent.
          </h1>
          <p style={{ color: "#A8B2D1", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "85%", marginBottom: "40px" }}>
            Access our curated database of verified professionals. Reduce time-to-hire by 50% with our AI-driven matching algorithms.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[
              { icon: <Users size={20} color="#00A896" />, title: "3M+ Verified Profiles", desc: "Access active and passive job seekers." },
              { icon: <BarChart3 size={20} color="#00A896" />, title: "Advanced Analytics", desc: "Track hiring pipelines and team performance." },
              { icon: <CheckCircle2 size={20} color="#00A896" />, title: "Instant Smart-Match", desc: "AI ranks candidates by skill relevance instantly." }
            ].map((feature, idx) => (
              <div key={idx} style={{ display: "flex", gap: "16px" }}>
                <div style={{ 
                  width: "40px", height: "40px", borderRadius: "8px", 
                  background: "rgba(255,255,255,0.05)", display: "flex", 
                  alignItems: "center", justifyContent: "center", flexShrink: 0 
                }}>
                  {feature.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#E6F1FF", marginBottom: "4px" }}>{feature.title}</h4>
                  <p style={{ fontSize: "0.85rem", color: "#8892B0" }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, marginTop: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px" }}>
            <div style={{ display: "flex" }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ 
                  width: "32px", height: "32px", borderRadius: "50%", 
                  background: "#CBD5E1", border: "2px solid #0A192F", marginLeft: i > 1 ? "-12px" : "0",
                  backgroundImage: `url(https://i.pravatar.cc/100?img=${i+10})`, backgroundSize: "cover"
                }} />
              ))}
            </div>
            <p style={{ fontSize: "0.85rem", color: "#A8B2D1", fontWeight: 500 }}>
              Trusted by <strong style={{ color: "#FFF" }}>10,000+</strong> HR teams
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Professional Login Form ── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        position: "relative"
      }}>
        {/* Back Navigation */}
        <Link to="/" style={{
          position: "absolute", top: "32px", right: "40px",
          display: "inline-flex", alignItems: "center", gap: "8px",
          color: "#64748B", fontSize: "0.9rem", fontWeight: 600,
          textDecoration: "none", transition: "color 0.2s"
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "#0F3A68")}
          onMouseLeave={e => (e.currentTarget.style.color = "#64748B")}
        >
          <ArrowLeft size={16} /> Back to Clyptus
        </Link>

        <div style={{
          width: "100%", maxWidth: "440px",
          background: "#FFFFFF",
          borderRadius: "16px",
          padding: "48px",
          boxShadow: "0 10px 40px rgba(10, 25, 47, 0.05)",
          border: "1px solid #E2E8F0"
        }}>
          
          <div style={{ marginBottom: "32px" }}>
            <div style={{ 
              width: "48px", height: "48px", background: "#F0F4F8", 
              borderRadius: "12px", display: "flex", alignItems: "center", 
              justifyContent: "center", marginBottom: "20px" 
            }}>
              <Building2 size={24} color="#0F3A68" />
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1E293B", marginBottom: "8px", letterSpacing: "-0.5px" }}>
              Recruiter Login
            </h2>
            <p style={{ color: "#64748B", fontSize: "0.95rem" }}>
              Log in to manage jobs and access the talent pool.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Email Field */}
            <div>
              <label style={{ display: "block", color: "#334155", fontSize: "0.85rem", fontWeight: 600, marginBottom: "8px" }}>
                Work Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={18} color={focusedField === "email" ? "#0F3A68" : "#94A3B8"} style={{
                  position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", transition: "color 0.2s"
                }} />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                  placeholder="name@company.com"
                  style={{
                    width: "100%", padding: "12px 14px 12px 42px",
                    borderRadius: "8px", fontSize: "0.95rem",
                    background: "#FAFAFA", color: "#1E293B",
                    border: focusedField === "email" ? "1.5px solid #0F3A68" : "1.5px solid #E2E8F0",
                    outline: "none", boxSizing: "border-box", transition: "all 0.2s"
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ color: "#334155", fontSize: "0.85rem", fontWeight: 600 }}>Password</label>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={18} color={focusedField === "password" ? "#0F3A68" : "#94A3B8"} style={{
                  position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", transition: "color 0.2s"
                }} />
                <input
                  type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                  onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  style={{
                    width: "100%", padding: "12px 42px 12px 42px",
                    borderRadius: "8px", fontSize: "0.95rem",
                    background: "#FAFAFA", color: "#1E293B",
                    border: focusedField === "password" ? "1.5px solid #0F3A68" : "1.5px solid #E2E8F0",
                    outline: "none", boxSizing: "border-box", transition: "all 0.2s"
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", 
                  background: "none", border: "none", cursor: "pointer", padding: 0
                }}>
                  {showPassword ? <EyeOff size={18} color="#94A3B8" /> : <Eye size={18} color="#94A3B8" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "-4px" }}>
              <input type="checkbox" id="remember" style={{ cursor: "pointer", accentColor: "#0F3A68" }} />
              <label htmlFor="remember" style={{ fontSize: "0.85rem", color: "#64748B", cursor: "pointer" }}>Keep me logged in</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%", padding: "14px", marginTop: "12px",
                backgroundColor: "#0F3A68", color: "#FFFFFF",
                border: "none", borderRadius: "8px",
                fontSize: "0.95rem", fontWeight: 600,
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.9 : 1,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                transition: "background-color 0.2s",
                boxShadow: "0 4px 12px rgba(15, 58, 104, 0.2)"
              }}
              onMouseEnter={e => { if(!isLoading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0A2540" }}
              onMouseLeave={e => { if(!isLoading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0F3A68" }}
            >
              {isLoading ? (
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="spinner" /> Authenticating...
                </span>
              ) : (
                "Log in to Employer Portal"
              )}
            </button>
          </form>
          


        </div>
      </div>

      <style>{`
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        @media (max-width: 900px) {
          .left-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
