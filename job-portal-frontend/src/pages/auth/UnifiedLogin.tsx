import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Users, CheckCircle2 } from 'lucide-react';
import { getStoreRecruiters, getStoreAdmins } from '../../store/clyptus.store';

export const UnifiedLogin: React.FC = () => {
  const navigate = useNavigate();
  const [recruiters, setRecruiters] = useState(getStoreRecruiters());

  const adminRecruiter = recruiters.find((r) => r.isAdmin);
  const regularRecruiter = recruiters.find((r) => !r.isAdmin);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const syncRecruiters = () => {
    const list = getStoreRecruiters();
    setRecruiters(list);
    const admin = list.find((r) => r.isAdmin);
    if (admin && (!email || email === '')) {
      setEmail(admin.email);
      setPassword(admin.password || 'Clyptus@2026');
    }
  };

  useEffect(() => {
    syncRecruiters();
    const handleSync = () => syncRecruiters();
    window.addEventListener('clyptus_store_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('clyptus_store_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const inputEmail = email.trim().toLowerCase();

    // 1. Search in recruiters list
    const recruiters = getStoreRecruiters();
    const matchingRecruiter = recruiters.find(
      (r) => r.email.trim().toLowerCase() === inputEmail
    );

    if (matchingRecruiter) {
      // Check suspension
      if (matchingRecruiter.status === 'SUSPENDED' || matchingRecruiter.status === 'INACTIVE') {
        setErrorMsg('Your account has been suspended by Super Admin. Access denied.');
        setIsLoading(false);
        return;
      }

      // Check password
      const expectedPassword = matchingRecruiter.password || 'Clyptus@2026';
      if (password !== expectedPassword) {
        setErrorMsg('Invalid password entered. Access denied.');
        setIsLoading(false);
        return;
      }

      // Check if this recruiter is designated as Admin
      if (matchingRecruiter.isAdmin) {
        const activeAdminSession = {
          id: matchingRecruiter.id,
          name: matchingRecruiter.name,
          email: matchingRecruiter.email,
          avatar: matchingRecruiter.avatar,
          role: 'ORGANIZATION_ADMIN',
          status: matchingRecruiter.status,
          isAdmin: true
        };
        localStorage.setItem('clyptus_active_admin', JSON.stringify(activeAdminSession));
        window.dispatchEvent(new CustomEvent('clyptus_store_updated', { detail: { type: 'ADMIN_LOGIN' } }));
        setIsLoading(false);
        navigate('/admin/dashboard');
        return;
      } else {
        // Standard Recruiter Login
        const activeRecruiterSession = {
          ...matchingRecruiter,
          remainingBalance: matchingRecruiter.remainingBalance !== undefined
            ? matchingRecruiter.remainingBalance
            : ((matchingRecruiter.allocatedCredits || 50) - (matchingRecruiter.totalCreditsUsed || 0))
        };
        localStorage.setItem('clyptus_active_recruiter', JSON.stringify(activeRecruiterSession));
        window.dispatchEvent(new CustomEvent('clyptus_store_updated', { detail: { type: 'RECRUITER_LOGIN' } }));
        setIsLoading(false);
        navigate('/recruiter/dashboard');
        return;
      }
    }

    // 2. Fallback check in legacy admins list
    const admins = getStoreAdmins();
    const matchingAdmin = admins.find((a) => a.email.trim().toLowerCase() === inputEmail);

    if (matchingAdmin) {
      if (matchingAdmin.status === 'SUSPENDED' || matchingAdmin.status === 'INACTIVE') {
        setErrorMsg('Your Organization Admin account has been suspended by Super Admin. Access denied.');
        setIsLoading(false);
        return;
      }

      const expectedPass = matchingAdmin.password || 'Admin@2026';
      if (password !== expectedPass) {
        setErrorMsg('Invalid password entered. Access denied.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('clyptus_active_admin', JSON.stringify(matchingAdmin));
      window.dispatchEvent(new CustomEvent('clyptus_store_updated', { detail: { type: 'ADMIN_LOGIN' } }));
      setIsLoading(false);
      navigate('/admin/dashboard');
      return;
    }

    // Not found
    setErrorMsg('No account found with this email. Please check your credentials or contact Super Admin.');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans relative overflow-hidden">
      
      {/* Top Header */}
      <header className="px-8 py-5 flex items-center justify-between relative z-10 bg-white border-b border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md">
            C
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">Clyptus</span>
        </div>
        <a href="/" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
          ← Back to Portal Select
        </a>
      </header>

      {/* Center Card */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 max-w-md w-full shadow-xl space-y-6">
          
          <div className="space-y-2 text-center">
            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-blue-50 text-brand-blue-700 border border-blue-200 uppercase tracking-wider">
              Organization Portal Login
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Team Login</h2>
            <p className="text-xs text-slate-500">
              Sign in with your credentials. You will be automatically routed to your Admin or Recruiter workspace.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{errorMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="Enter your registered email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-blue-600 hover:bg-brand-blue-700 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Fill Buttons */}
          <div className="space-y-2 pt-2">
            {adminRecruiter && (
              <button
                type="button"
                onClick={() => {
                  setEmail(adminRecruiter.email);
                  setPassword(adminRecruiter.password || 'Clyptus@2026');
                }}
                className="w-full text-center text-xs font-semibold text-purple-700 hover:underline cursor-pointer bg-purple-50 hover:bg-purple-100 py-1.5 px-3 rounded-xl border border-purple-200 transition-colors flex items-center justify-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                Quick Fill: {adminRecruiter.name} (Designated Admin)
              </button>
            )}

            {regularRecruiter && (
              <button
                type="button"
                onClick={() => {
                  setEmail(regularRecruiter.email);
                  setPassword(regularRecruiter.password || 'Clyptus@2026');
                }}
                className="w-full text-center text-xs font-semibold text-brand-blue-700 hover:underline cursor-pointer bg-blue-50 hover:bg-blue-100 py-1.5 px-3 rounded-xl border border-blue-200 transition-colors flex items-center justify-center gap-1"
              >
                <Users className="w-3.5 h-3.5 text-brand-blue-600" />
                Quick Fill: {regularRecruiter.name} (Recruiter)
              </button>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-500 space-y-1">
            <p className="flex items-center justify-center gap-1 font-semibold text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Role-Based Auto-Routing
            </p>
            <p>Designated Admins enter the Admin Portal; Recruiters enter the Recruiter ATS.</p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        © 2026 Clyptus Multi-Tenant Recruitment Platform • Unified Team Authentication
      </footer>
    </div>
  );
};
