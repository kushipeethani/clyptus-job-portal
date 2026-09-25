import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ClyptusLogo } from "../../components/ClyptusLogo";
import type { Job } from "../../types/job";
import { INITIAL_COMPANIES } from "../../data/mockData";
import { Briefcase, BookmarkCheck, User, LogOut, Star, MapPin, Clock, ChevronRight, TrendingUp } from "lucide-react";

export function CandidateDashboard() {
  const navigate = useNavigate();
  // Mock data for frontend preview
  const user = { name: "John Doe", email: "john@example.com" };
  const [profile, setProfile] = useState<any | null>({
    headline: "Frontend Developer",
    location: "Remote",
    appliedCount: 12,
    savedCount: 5,
    viewsCount: 42
  });
  
  // Create mock jobs based on INITIAL_COMPANIES
  const mockJobs = INITIAL_COMPANIES.slice(0, 3).map(c => ({
    id: c.id,
    title: `Software Engineer at ${c.name}`,
    company: c.name,
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $150k",
    postedAt: "2 days ago",
    logoUrl: c.logoUrl
  }));
  const [jobs, setJobs] = useState<any[]>(mockJobs);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "saved" | "profile">("overview");

  useEffect(() => {
    // Simulate loading for UI
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleLogout = () => { navigate("/"); };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#06101E" }}>
      <div style={{ textAlign: "center", color: "#fff" }}>
        <div style={{ width: "48px", height: "48px", border: "4px solid #FF5500", borderTop: "4px solid transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "#94A3B8" }}>Loading your dashboard...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#06101E", fontFamily: "Inter, sans-serif", color: "#FFFFFF" }}>
      {/* Navbar */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 24px", position: "sticky", top: 0, zIndex: 100, background: "rgba(6,16,30,0.95)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          <Link to="/"><ClyptusLogo height={44} theme="dark" /></Link>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ background: "rgba(255,85,0,0.12)", border: "1px solid rgba(255,85,0,0.25)", borderRadius: "50px", padding: "6px 16px", fontSize: "0.85rem", color: "#FF5500", fontWeight: 600 }}>
              👋 {user?.name}
            </div>
            <button onClick={handleLogout}
              style={{ padding: "8px 18px", borderRadius: "10px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#94A3B8", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Welcome Banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(255,85,0,0.15) 0%, rgba(255,119,51,0.08) 100%)",
          border: "1px solid rgba(255,85,0,0.2)", borderRadius: "20px",
          padding: "28px 32px", marginBottom: "32px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px"
        }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "6px" }}>
              Welcome back, {user?.name}! 👋
            </h1>
            <p style={{ color: "#94A3B8", fontSize: "0.95rem" }}>
              You have <strong style={{ color: "#FF5500" }}>4 recommended jobs</strong> waiting for you today.
            </p>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            {[["0", "Applied"], ["0", "Saved"], ["4", "Matches"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#FF5500" }}>{val}</div>
                <div style={{ color: "#64748B", fontSize: "0.78rem", fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", background: "rgba(255,255,255,0.04)", borderRadius: "14px", padding: "6px", marginBottom: "28px", width: "fit-content" }}>
          {[["overview", "Overview", Briefcase], ["saved", "Saved Jobs", BookmarkCheck], ["profile", "My Profile", User]].map(([key, label, Icon]: any) => (
            <button key={key} onClick={() => setActiveTab(key)}
              style={{
                padding: "10px 20px", borderRadius: "10px", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer",
                background: activeTab === key ? "#FF5500" : "transparent",
                color: activeTab === key ? "#FFFFFF" : "#64748B",
                border: "none", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s"
              }}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "20px", color: "#E2E8F0" }}>
              <TrendingUp size={18} style={{ display: "inline", marginRight: "8px", color: "#FF5500" }} />
              Recommended Jobs for You
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px" }}>
              {jobs.map(job => (
                <div key={job.id} style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px", padding: "20px", cursor: "pointer",
                  transition: "all 0.2s", position: "relative", overflow: "hidden"
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,85,0,0.4)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}>
                  {job.isUrgent && <div style={{ position: "absolute", top: "14px", right: "14px", background: "#FF5500", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "3px 10px", borderRadius: "50px" }}>URGENT</div>}
                  <div style={{ fontSize: "1.6rem", marginBottom: "10px" }}>{job.companyLogo}</div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px", paddingRight: job.isUrgent ? "70px" : "0" }}>{job.title}</h3>
                  <p style={{ color: "#FF5500", fontSize: "0.85rem", fontWeight: 600, marginBottom: "12px" }}>{job.company}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#94A3B8", fontSize: "0.82rem" }}><MapPin size={13} />{job.location}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#94A3B8", fontSize: "0.82rem" }}><Clock size={13} />{job.postedTime}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#94A3B8", fontSize: "0.82rem" }}><Star size={13} color="#FBBF24" />{job.rating}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {job.tags.slice(0, 3).map(t => (
                      <span key={t} style={{ padding: "3px 10px", borderRadius: "50px", background: "rgba(255,85,0,0.1)", color: "#FF8C55", fontSize: "0.76rem", fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ color: "#22C55E", fontSize: "0.9rem", fontWeight: 700 }}>{job.salaryDisplay}</span>
                    <button onClick={() => candidateService.applyToJob(job.id)}
                      style={{ padding: "8px 16px", borderRadius: "10px", background: "linear-gradient(135deg,#FF5500,#FF7733)", color: "#fff", border: "none", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                      Apply <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Saved Jobs Tab */}
        {activeTab === "saved" && (
          <div style={{ textAlign: "center", padding: "64px 0", color: "#64748B" }}>
            <BookmarkCheck size={48} style={{ marginBottom: "16px", color: "#1E3A5F" }} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#94A3B8", marginBottom: "8px" }}>No Saved Jobs Yet</h3>
            <p style={{ fontSize: "0.9rem" }}>Start bookmarking interesting opportunities from the job listings.</p>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && profile && (
          <div style={{ maxWidth: "600px" }}>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg,#FF5500,#FF7733)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", fontWeight: 800 }}>
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>{profile.name}</h2>
                  <p style={{ color: "#94A3B8", fontSize: "0.88rem" }}>{profile.email}</p>
                </div>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#64748B", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Skills</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {profile.skills.map(s => (
                    <span key={s} style={{ padding: "6px 14px", borderRadius: "50px", background: "rgba(255,85,0,0.1)", color: "#FF8C55", fontSize: "0.85rem", fontWeight: 600, border: "1px solid rgba(255,85,0,0.2)" }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

