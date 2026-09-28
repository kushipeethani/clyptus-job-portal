import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

export const OrgAdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('marcus.v@abctech.com');
  const [password, setPassword] = useState('••••••••••••');
  const [tenantId, setTenantId] = useState('org_abc_tech');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between font-sans relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="px-8 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg">
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
            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
              Organization Admin Portal
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Organization Admin Login</h2>
            <p className="text-xs text-slate-400">Login with your RBAC-assigned Organization Admin account</p>
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-mono text-white focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              Login to Admin Portal <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-700/60 text-center">
            <button
              onClick={() => {
                setEmail('marcus.v@abctech.com');
                setTenantId('org_abc_tech');
                navigate('/admin/dashboard');
              }}
              className="text-xs font-semibold text-brand-blue-400 hover:underline"
            >
              Demo Quick Login as Marcus Vance (Org Admin)
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-4 text-center text-xs text-slate-500 border-t border-slate-800">
        Clyptus Enterprise Multi-Tenant Job Portal • Organization Admin Authentication
      </footer>

    </div>
  );
};
