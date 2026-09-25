import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ClyptusLogo } from "../../components/ClyptusLogo";
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, Zap } from "lucide-react";

export function CandidateRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/candidate/dashboard");
    }, 1200);
  };

  const getBorderStyle = (fieldName: string) => {
    return focusedField === fieldName ? "1px solid rgba(255,85,0,0.8)" : "1px solid rgba(255,255,255,0.1)";
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', 'Outfit', sans-serif",
      backgroundColor: "#030811", // Deep premium dark background
      position: "relative",
      overflow: "hidden",
      padding: "20px"
    }}>
      {/* Dynamic Animated Background Mesh */}
      <div className="mesh-blob blob-orange" />
      <div className="mesh-blob blob-purple" />
      <div className="mesh-blob blob-blue" />
      
      {/* Background Grid Pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        opacity: 0.4,
        pointerEvents: "none"
      }} />

      {/* Main Registration Card */}
      <div style={{
        width: "100%", maxWidth: "460px",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "28px",
        padding: "48px 40px",
        position: "relative",
        zIndex: 10,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)"
      }}>
        
        {/* Back Link */}
        <Link to="/candidate/login" style={{
          position: "absolute", top: "24px", left: "24px",
          display: "inline-flex", alignItems: "center", gap: "6px",
          color: "#94A3B8", fontSize: "0.8rem", fontWeight: 600,
          textDecoration: "none", transition: "color 0.2s"
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "#FF5500")}
          onMouseLeave={e => (e.currentTarget.style.color = "#94A3B8")}
        >
          <ArrowLeft size={14} /> Back
        </Link>

        {/* Logo & Headline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "40px" }}>
          <div style={{ marginBottom: "24px" }}>
            <ClyptusLogo height={44} theme="dark" />
          </div>
          <h2 style={{
            fontSize: "1.75rem", fontWeight: 800, color: "#FFFFFF",
            marginBottom: "8px", letterSpacing: "-0.5px", textAlign: "center"
          }}>
            Join the Elite Network
          </h2>
          <p style={{ color: "#94A3B8", fontSize: "0.95rem", textAlign: "center" }}>
            Create your profile and stand out to top MNCs.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Full Name */}
          <div className="input-group">
            <User size={18} color={focusedField === "name" ? "#FF5500" : "#64748B"} className="input-icon" />
            <input
              type="text" name="name" value={form.name} onChange={handleChange} required
              onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
              placeholder="Full Name"
              style={{ border: getBorderStyle("name") }}
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <Mail size={18} color={focusedField === "email" ? "#FF5500" : "#64748B"} className="input-icon" />
            <input
              type="email" name="email" value={form.email} onChange={handleChange} required
              onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
              placeholder="Email Address"
              style={{ border: getBorderStyle("email") }}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <Lock size={18} color={focusedField === "password" ? "#FF5500" : "#64748B"} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} required
              onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)}
              placeholder="Create Password"
              style={{ border: getBorderStyle("password") }}
            />
            <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} color="#64748B" /> : <Eye size={18} color="#64748B" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <Lock size={18} color={focusedField === "confirmPassword" ? "#FF5500" : "#64748B"} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required
              onFocus={() => setFocusedField("confirmPassword")} onBlur={() => setFocusedField(null)}
              placeholder="Confirm Password"
              style={{ border: getBorderStyle("confirmPassword") }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="register-btn"
          >
            {isLoading ? (
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="spinner" /> Processing...
              </span>
            ) : (
              <><Zap size={18} fill="currentColor" /> Initialize Profile</>
            )}
          </button>
        </form>

        {/* Login Link */}
        <p style={{ color: "#64748B", fontSize: "0.85rem", textAlign: "center", marginTop: "32px" }}>
          Already part of the network?{" "}
          <Link to="/candidate/login" style={{ color: "#FF5500", fontWeight: 700, textDecoration: "none" }}>
            Sign In here
          </Link>
        </p>
      </div>

      {/* Unique UI Styles */}
      <style>{`
        /* Abstract Glowing Blobs */
        .mesh-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.5;
          animation: float 20s infinite ease-in-out alternate;
          pointer-events: none;
        }
        .blob-orange {
          width: 500px; height: 500px;
          background: #FF5500;
          top: -150px; right: -150px;
          animation-delay: 0s;
        }
        .blob-purple {
          width: 400px; height: 400px;
          background: #5B21B6;
          bottom: -100px; left: -100px;
          animation-delay: -5s;
        }
        .blob-blue {
          width: 600px; height: 600px;
          background: #0369A1;
          top: 30%; left: 20%;
          opacity: 0.3;
          animation-delay: -10s;
        }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.1); }
          100% { transform: translate(-30px, 50px) scale(0.9); }
        }

        /* Input Styling */
        .input-group {
          position: relative;
          width: 100%;
        }
        .input-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          transition: color 0.3s ease;
          pointer-events: none;
        }
        .input-group input {
          width: 100%;
          padding: 16px 16px 16px 52px;
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.2);
          color: #FFFFFF;
          font-size: 0.95rem;
          outline: none;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }
        .input-group input::placeholder {
          color: #64748B;
        }
        .input-group input:focus {
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 20px rgba(255,85,0,0.15);
        }
        .eye-btn {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Premium Button */
        .register-btn {
          margin-top: 10px;
          padding: 16px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          background: linear-gradient(135deg, #FF6600, #FF3300);
          color: #FFFFFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 10px 30px rgba(255, 85, 0, 0.4);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }
        .register-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transition: left 0.5s ease;
        }
        .register-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 85, 0, 0.5);
        }
        .register-btn:hover::before {
          left: 100%;
        }
        .register-btn:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px; height: 18px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
