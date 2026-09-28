import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Coins, PlusCircle, LogOut } from 'lucide-react';

interface HeaderProps {
  creditBalance: number;
  activeRecruiter: {
    name: string;
    email: string;
    avatar: string;
  };
  onOpenCreateJob: () => void;
}

export const RecruiterHeader: React.FC<HeaderProps> = ({ creditBalance, activeRecruiter, onOpenCreateJob }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('clyptus_active_recruiter');
    navigate('/recruiter/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Brand & Dedicated Portal Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl tracking-tighter shadow-md shadow-indigo-500/20">
            C
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-slate-900 text-base">Clyptus</h1>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                Recruiter Portal
              </span>
            </div>
            <p className="text-xs text-slate-500">ABC Recruitment Pvt Ltd • Recruiter Workspace</p>
          </div>
        </div>

        {/* Credit Counter, Post Job & Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 px-3.5 py-1.5 rounded-xl border border-orange-200/80 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-brand-orange-500 text-white flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-orange-800">Recruiter Credit Quota</span>
              <span className="text-sm font-extrabold text-slate-900 leading-tight">
                {creditBalance.toLocaleString()} <span className="text-xs font-normal text-slate-500">credits</span>
              </span>
            </div>
          </div>

          <button
            onClick={onOpenCreateJob}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Post New Job</span>
          </button>

          <div className="flex items-center gap-2.5">
            <img
              src={activeRecruiter.avatar}
              alt={activeRecruiter.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-extrabold text-slate-900">{activeRecruiter.name}</span>
              <span className="text-[10px] font-bold text-indigo-700">{activeRecruiter.email}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            title="Logout from Recruiter Portal"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
