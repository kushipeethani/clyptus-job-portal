import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Coins, LogOut } from 'lucide-react';

interface HeaderProps {
  creditBalance: number;
}

export const OrgAdminHeader: React.FC<HeaderProps> = ({ creditBalance }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Brand & Portal Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue-700 text-white flex items-center justify-center font-black text-xl tracking-tighter shadow-md">
            C
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-slate-900 text-base">Clyptus</h1>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-blue-100 text-brand-blue-800 border border-blue-200">
                Organization Admin Portal
              </span>
            </div>
            <p className="text-xs text-slate-500">ABC Recruitment Pvt Ltd • Permission-Based RBAC</p>
          </div>
        </div>

        {/* Credit Counter & Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3.5 py-1.5 rounded-xl border border-blue-200/80 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-brand-blue-600 text-white flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-blue-800">Org Credit Balance</span>
              <span className="text-sm font-extrabold text-slate-900 leading-tight">
                {creditBalance.toLocaleString()} <span className="text-xs font-normal text-slate-500">credits</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
              alt="Org Admin"
              className="w-9 h-9 rounded-full object-cover border-2 border-brand-blue-600"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-extrabold text-slate-900">Marcus Vance</span>
              <span className="text-[10px] font-bold text-brand-blue-700">Organization Admin</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/login')}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            title="Logout from Admin Portal"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
