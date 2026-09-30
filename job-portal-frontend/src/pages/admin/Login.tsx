import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { getStoreAdmins } from '../../store/clyptus.store';

export const OrgAdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('marcus.v@abctech.com');
  const [password, setPassword] = useState('Admin@2026');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const inputEmail = email.trim().toLowerCase();
    let foundAdmin: any = null;

    // 1. Search in local reactive store
    const storeAdmins = getStoreAdmins();
    foundAdmin = storeAdmins.find((a) => a.email.trim().toLowerCase() === inputEmail);

    // 2. Fallback to API check only if store hasn't been initialized in localStorage
    if (!foundAdmin && !localStorage.getItem('clyptus_admins')) {
      try {
        const res = await fetch('http://localhost:5000/api/v1/admins');
        const json = await res.json();
        if (json.success && json.data) {
          foundAdmin = json.data.find((a: any) => a.email.trim().toLowerCase() === inputEmail);
        }
      } catch (err) {}
    }

    // 3. Strict verification: Account must exist and not be deleted
    if (!foundAdmin) {
      setErrorMsg('Organization Admin account does not exist or has been deleted by Super Admin. Access denied.');
      setIsLoading(false);
      return;
    }

    // 4. Verify Account Status (Suspended by Super Admin)
    if (foundAdmin.status === 'SUSPENDED' || foundAdmin.status === 'INACTIVE') {
      setErrorMsg('Your Organization Admin account has been suspended by Super Admin. Access denied.');
      setIsLoading(false);
      return;
    }

    // 5. Strict Password Verification
    const expectedPassword = foundAdmin.password || 'Admin@2026';
    if (password !== expectedPassword) {
      setErrorMsg('Invalid password entered. Access denied.');
      setIsLoading(false);
      return;
    }

    // Success: save active admin session and navigate
    localStorage.setItem('clyptus_active_admin', JSON.stringify(foundAdmin));
    setIsLoading(false);
    navigate('/admin/dashboard');
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
              Organization Admin Portal
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Organization Admin Login</h2>
            <p className="text-xs text-slate-500">Login with credentials created by Super Admin</p>
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="Enter Super Admin-created Admin email..."
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
                  placeholder="Enter Admin password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-blue-600 hover:bg-brand-blue-700 disabled:opacity-50 text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating Admin...</span>
              ) : (
                <>
                  <span>Login to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-500 space-y-1">
            <p className="flex items-center justify-center gap-1 font-semibold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-blue-600" /> Super Admin Authorized Access Only
            </p>
            <p>Don't have Admin credentials? Request your Super Admin to create an Admin account.</p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        Clyptus Enterprise Multi-Tenant Job Portal • Organization Admin Authentication
      </footer>

    </div>
  );
};
