import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react';

export const OrgSuperAdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('sarah.j@abctech.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/organization-super-admin/dashboard');
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
            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-blue-100 text-brand-blue-700 border border-blue-200 uppercase tracking-wider">
              Tenant Super Admin Portal
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Organization Super Admin Login</h2>
            <p className="text-xs text-slate-500">Enter your credentials to access Organization Super Admin controls</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Super Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              Login to Org Super Admin Portal <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <button
              onClick={() => {
                setEmail('sarah.j@abctech.com');
                navigate('/organization-super-admin/dashboard');
              }}
              className="text-xs font-semibold text-brand-blue-600 hover:underline cursor-pointer"
            >
              Demo Quick Login as Sarah Jenkins (Org Super Admin)
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        Clyptus Enterprise Multi-Tenant Job Portal • Organization Super Admin Authentication
      </footer>

    </div>
  );
};
