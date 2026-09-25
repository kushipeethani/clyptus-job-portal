import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ClyptusLogo } from "../../components/ClyptusLogo";
import { recruiterService, type RecruiterProfile } from "../../services/recruiterService";
import { Briefcase, Plus, Users, LogOut, Building2, TrendingUp, CheckCircle, Clock, Eye } from "lucide-react";

export function RecruiterDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<RecruiterProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"jobs" | "analytics">("jobs");
  const [showPostForm, setShowPostForm] = useState(false);
  const [newJob, setNewJob] = useState({ title: "", location: "", jobType: "Full Time", description: "" });

  useEffect(() => {
    if (!isAuthenticated) { navigate("/recruiter/login"); return; }
    recruiterService.getProfile(user!.id).then(p => { setProfile(p); setLoading(false); });
  }, [isAuthenticated, user, navigate]);

  const handleLogout = () => { logout(); navigate("/"); };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    const posted = await recruiterService.postJob({ ...newJob, company: profile.companyName });
    setProfile(prev => prev ? { ...prev, postedJobs: [posted, ...prev.postedJobs] } : prev);
    setShowPostForm(false);
    setNewJob({ title: "", location: "", jobType: "Full Time", description: "" });
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#06101E" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "48px", height: "48px", border: "4px solid #FF5500", borderTop: "4px solid transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "#94A3B8" }}>Loading dashboard...</p>
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
              <Building2 size={14} style={{ display: "inline", marginRight: "6px" }} />{profile?.companyName}
            </div>
            <button onClick={handleLogout}
              style={{ padding: "8px 18px", borderRadius: "10px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#94A3B8", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Stats Banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(255,85,0,0.12) 0%, rgba(255,119,51,0.06) 100%)",
          border: "1px solid rgba(255,85,0,0.18)", borderRadius: "20px", padding: "28px 32px", marginBottom: "32px"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <h1 style={{ fontSize: "1.65rem", fontWeight: 800, marginBottom: "4px" }}>Recruiter Dashboard</h1>
              <p style={{ color: "#94A3B8" }}>{profile?.companyName} · {profile?.designation}</p>
            </div>
            <div style={{ display: "flex", gap: "24px" }}>
              {[
                [String(profile?.postedJobs.length ?? 0), "Active Jobs", Briefcase],
                [String(profile?.postedJobs.reduce((a, j) => a + j.applicantsCount, 0)), "Total Applicants", Users],
              ].map(([val, label]: any) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#FF5500" }}>{val}</div>
                  <div style={{ color: "#64748B", fontSize: "0.78rem", fontWeight: 600 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Post Job CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "4px", background: "rgba(255,255,255,0.04)", borderRadius: "14px", padding: "6px" }}>
            {[["jobs", "Posted Jobs"], ["analytics", "Analytics"]].map(([key, label]) => (
              <button key={key} onClick={() => setActiveTab(key as any)}
                style={{ padding: "10px 20px", borderRadius: "10px", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", background: activeTab === key ? "#FF5500" : "transparent", color: activeTab === key ? "#FFFFFF" : "#64748B", border: "none", transition: "all 0.2s" }}>
                {label}
              </button>
            ))}
          </div>
          <button onClick={() => setShowPostForm(!showPostForm)}
            style={{ marginLeft: "auto", padding: "10px 20px", borderRadius: "12px", background: "linear-gradient(135deg,#FF5500,#FF7733)", color: "#fff", border: "none", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", boxShadow: "0 6px 16px rgba(255,85,0,0.3)" }}>
            <Plus size={16} /> Post a Job
          </button>
        </div>

        {/* Post Job Form */}
        {showPostForm && (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,85,0,0.2)", borderRadius: "20px", padding: "28px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "20px" }}>Post a New Job</h3>
            <form onSubmit={handlePostJob} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[["title", "Job Title", "text", "e.g. Senior React Engineer"],
                ["location", "Location", "text", "e.g. Bengaluru / Remote"]].map(([name, label, type, ph]) => (
                <div key={name}>
                  <label style={{ display: "block", color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 600, marginBottom: "6px" }}>{label}</label>
                  <input name={name} type={type} value={(newJob as any)[name]} onChange={e => setNewJob(p => ({ ...p, [e.target.name]: e.target.value }))} required placeholder={ph}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 600, marginBottom: "6px" }}>Job Description</label>
                <textarea value={newJob.description} onChange={e => setNewJob(p => ({ ...p, description: e.target.value }))} rows={3} placeholder="Describe the role..."
                  style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "0.9rem", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setShowPostForm(false)} style={{ padding: "10px 20px", borderRadius: "10px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#94A3B8", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: "10px 24px", borderRadius: "10px", background: "linear-gradient(135deg,#FF5500,#FF7733)", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}>Publish Job</button>
              </div>
            </form>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {profile?.postedJobs.map(job => (
              <div key={job.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>{job.title}</h3>
                    <span style={{ padding: "3px 10px", borderRadius: "50px", background: "rgba(34,197,94,0.12)", color: "#22C55E", fontSize: "0.72rem", fontWeight: 700 }}>
                      {job.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "16px", color: "#94A3B8", fontSize: "0.85rem" }}>
                    <span><Clock size={13} style={{ display: "inline", marginRight: "4px" }} />{job.postedDate}</span>
                    <span><Users size={13} style={{ display: "inline", marginRight: "4px" }} />{job.applicantsCount} Applicants</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button style={{ padding: "8px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                    <Eye size={14} /> View
                  </button>
                  <button onClick={() => recruiterService.closeJob(job.id)}
                    style={{ padding: "8px 16px", borderRadius: "10px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#FCA5A5", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
                    Close
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
            {[
              ["Total Job Posts", profile?.postedJobs.length ?? 0, TrendingUp, "#FF5500"],
              ["Total Applicants", profile?.postedJobs.reduce((a, j) => a + j.applicantsCount, 0) ?? 0, Users, "#22C55E"],
              ["Active Jobs", profile?.postedJobs.filter(j => j.status === "active").length ?? 0, CheckCircle, "#3B82F6"],
            ].map(([label, val, Icon, color]: any) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} color={color} />
                  </div>
                  <span style={{ color: "#94A3B8", fontSize: "0.88rem", fontWeight: 600 }}>{label}</span>
                </div>
                <div style={{ fontSize: "2.2rem", fontWeight: 800, color }}>{val}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
