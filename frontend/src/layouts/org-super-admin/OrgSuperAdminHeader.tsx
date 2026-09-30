import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Coins, LogOut } from 'lucide-react';

interface HeaderProps {
  creditBalance: number;
}

export const OrgSuperAdminHeader: React.FC<HeaderProps> = ({ creditBalance }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Brand & Dedicated Portal Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue-600 text-white flex items-center justify-center font-black text-xl tracking-tighter shadow-md shadow-blue-600/20">
            C
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base">Clyptus</h1>
          </div>
        </div>

        {/* Credit Balance & Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-brand-blue-600 text-white flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-slate-700">Org Credit Balance</span>
              <span className="text-sm font-extrabold text-slate-900 leading-tight">
                {creditBalance.toLocaleString()} <span className="text-xs font-normal text-slate-500">credits</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
              alt="Org Super Admin"
              className="w-9 h-9 rounded-full object-cover border-2 border-brand-blue-600"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-extrabold text-slate-900">Sarah Jenkins</span>
              <span className="text-[10px] font-bold text-brand-blue-600">Org Super Admin</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/organization-super-admin/login')}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            title="Logout from Org Super Admin Portal"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
