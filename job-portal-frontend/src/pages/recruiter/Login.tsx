import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { getStoreRecruiters } from '../../store/clyptus.store';

export const RecruiterLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('kushi.peethani222@gmail.com');
  const [password, setPassword] = useState('Clyptus@2026');
  const [tenantId, setTenantId] = useState('org_abc_tech');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const inputEmail = email.trim().toLowerCase();
    let foundRecruiter: any = null;

    // 1. First check in local reactive store
    const storeRecruiters = getStoreRecruiters();
    foundRecruiter = storeRecruiters.find((r) => r.email.trim().toLowerCase() === inputEmail);

    // 2. Fallback to API check only if store hasn't been initialized in localStorage
    if (!foundRecruiter && !localStorage.getItem('clyptus_recruiters')) {
      try {
        const res = await fetch('http://localhost:5000/api/v1/recruiters');
        const json = await res.json();
        if (json.success && json.data) {
          foundRecruiter = json.data.find((r: any) => r.email.trim().toLowerCase() === inputEmail);
        }
      } catch (err) {}
    }

    // 3. Strict verification: Account must exist and not be deleted
    if (!foundRecruiter) {
      setErrorMsg('Recruiter account does not exist or has been deleted by Admin. Access denied.');
      setIsLoading(false);
      return;
    }

    // 4. Verify Account Status
    if (foundRecruiter.status === 'SUSPENDED' || foundRecruiter.status === 'INACTIVE') {
      setErrorMsg('Your recruiter account is currently suspended by Admin. Access denied.');
      setIsLoading(false);
      return;
    }

    // 5. Strict Password Verification
    const expectedPassword = foundRecruiter.password || 'Clyptus@2026';
    if (password !== expectedPassword) {
      setErrorMsg('Invalid password entered. Access denied.');
      setIsLoading(false);
      return;
    }

    // Success: save active session and navigate to recruiter portal
    const activeSession = {
      ...foundRecruiter,
      remainingBalance: foundRecruiter.remainingBalance !== undefined 
        ? foundRecruiter.remainingBalance 
        : ((foundRecruiter.allocatedCredits || 50) - (foundRecruiter.totalCreditsUsed || 0))
    };

    localStorage.setItem('clyptus_active_recruiter', JSON.stringify(activeSession));
    setIsLoading(false);
    navigate('/recruiter/dashboard');
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
            <p className="text-xs text-slate-400">Login with credentials created by Admin or Super Admin</p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{errorMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Recruiter Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="Enter admin-created recruiter email..."
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
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Recruiter Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-700/60 text-center text-[11px] text-slate-400 space-y-1">
            <p className="flex items-center justify-center gap-1 font-semibold text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Admin Authorized Access Only
            </p>
            <p>Don't have credentials? Request your Admin or Super Admin to create a recruiter account.</p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-4 text-center text-xs text-slate-500 relative z-10">
        © 2026 Clyptus Multi-Tenant Recruitment Platform. All rights reserved.
      </footer>
    </div>
  );
};
