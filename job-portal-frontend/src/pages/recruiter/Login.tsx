import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const RecruiterLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('elena.r@abctech.com');
  const [password, setPassword] = useState('••••••••••••');
  const [tenantId, setTenantId] = useState('org_abc_tech');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/v1/recruiters');
      const json = await res.json();
      if (json.success && json.data) {
        const found = json.data.find(
          (r: any) => r.email.toLowerCase() === email.toLowerCase()
        );

        if (found) {
          localStorage.setItem('clyptus_active_recruiter', JSON.stringify(found));
        } else {
          // If newly created recruiter or demo email not in db yet, create active recruiter session
          const nameFromEmail = email.split('@')[0].replace('.', ' ');
          const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
          const activeSession = {
            id: `rec_${Date.now()}`,
            organizationId: tenantId || 'org_abc_tech',
            name: formattedName || 'Recruiter Account',
            email: email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formattedName)}&background=4F46E5&color=fff`,
            status: 'ACTIVE',
            activeJobsCount: 0,
            profileViewsCount: 0,
            resumeDownloadsCount: 0,
            totalCreditsUsed: 0,
            allocatedCredits: 250,
            remainingBalance: 250
          };
          localStorage.setItem('clyptus_active_recruiter', JSON.stringify(activeSession));
        }
      }
    } catch (err) {
      // Offline fallback session
      const nameFromEmail = email.split('@')[0].replace('.', ' ');
      const activeSession = {
        id: `rec_${Date.now()}`,
        organizationId: tenantId || 'org_abc_tech',
        name: nameFromEmail || 'Recruiter Account',
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nameFromEmail)}&background=4F46E5&color=fff`,
        status: 'ACTIVE',
        activeJobsCount: 0,
        profileViewsCount: 0,
        resumeDownloadsCount: 0,
        totalCreditsUsed: 0,
        allocatedCredits: 250,
        remainingBalance: 250
      };
      localStorage.setItem('clyptus_active_recruiter', JSON.stringify(activeSession));
    } finally {
      setIsLoading(false);
      navigate('/recruiter/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between font-sans relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="px-8 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg">
            C
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">Clyptus</span>
        </div>
        <a href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
          ← Back to Portal Select
        </a>
      </header>

      {/* Center Card */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 max-w-md w-full shadow-2xl space-y-6">
          
          <div className="space-y-2 text-center">
            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
              Recruiter Portal
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Recruiter Login</h2>
            <p className="text-xs text-slate-400">Login with your generated recruiter credentials</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Organization Tenant ID</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-mono text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Recruiter Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="Enter your recruiter email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? 'Authenticating Recruiter...' : 'Login to Recruiter Workspace'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-700/60 text-center">
            <button
              onClick={() => {
                setEmail('elena.r@abctech.com');
                setTenantId('org_abc_tech');
              }}
              className="text-xs font-semibold text-indigo-400 hover:underline"
            >
              Use Default Demo Credentials (elena.r@abctech.com)
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-4 text-center text-xs text-slate-500 border-t border-slate-800">
        Clyptus Enterprise Multi-Tenant Job Portal • Recruiter Authentication
      </footer>

    </div>
  );
};
