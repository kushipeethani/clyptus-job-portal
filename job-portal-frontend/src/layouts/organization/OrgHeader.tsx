import React from 'react';
import { 
  Building2, 
  Coins, 
  PlusCircle, 
  Search, 
  Bell, 
  UserCheck, 
  ChevronDown,
  ShieldAlert,
  Briefcase
} from 'lucide-react';
import { OrgRole } from '../../types/organization.types';

interface OrgHeaderProps {
  currentRole: OrgRole;
  onRoleChange: (role: OrgRole) => void;
  tokensBalance: number;
  onOpenJobModal: () => void;
  onOpenTokenModal: () => void;
}

export const OrgHeader: React.FC<OrgHeaderProps> = ({
  currentRole,
  onRoleChange,
  tokensBalance,
  onOpenJobModal,
  onOpenTokenModal,
}) => {
  const isSuperAdminOrAdmin = currentRole === 'ORG_SUPER_ADMIN' || currentRole === 'ORG_ADMIN';

  const roleLabels: Record<OrgRole, { label: string; badge: string }> = {
    ORG_SUPER_ADMIN: { label: 'Org Super Admin', badge: 'bg-orange-100 text-orange-800 border-orange-200' },
    ORG_ADMIN: { label: 'Org Admin', badge: 'bg-blue-100 text-blue-800 border-blue-200' },
    HR_RECRUITER: { label: 'HR Recruiter', badge: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    HIRING_MANAGER: { label: 'Hiring Manager', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    TECH_RECRUITER: { label: 'Tech Recruiter', badge: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Organization Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-900 text-base tracking-tight">Acme Technologies Inc.</h1>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue-700 border border-blue-200">
                Enterprise Tenant
              </span>
            </div>
            <p className="text-xs text-slate-500">acmetech.io • Organisation Portal</p>
          </div>
        </div>

        {/* Center: Live Role Perspective Switcher (Requested for Org Super Admin, Admin, Recruiter testing) */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 px-2 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-brand-blue-600" />
            Testing Role:
          </span>
          {(['ORG_SUPER_ADMIN', 'ORG_ADMIN', 'HR_RECRUITER', 'TECH_RECRUITER'] as OrgRole[]).map((r) => (
            <button
              key={r}
              onClick={() => onRoleChange(r)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                currentRole === r
                  ? 'bg-brand-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {r === 'ORG_SUPER_ADMIN' ? 'Super Admin' : r === 'ORG_ADMIN' ? 'Admin' : r === 'HR_RECRUITER' ? 'HR Recruiter' : 'Tech Recruiter'}
            </button>
          ))}
        </div>

        {/* Right: Token Counter, Actions & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Token Balance Counter (Vibrant White/Orange UI) */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 px-3.5 py-1.5 rounded-xl border border-orange-200/80 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-brand-orange-500 text-white flex items-center justify-center shadow-xs">
              <Coins className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-orange-700 tracking-wider">Org Tokens</span>
              <span className="text-sm font-extrabold text-slate-900 leading-tight">
                {tokensBalance.toLocaleString()} <span className="text-xs font-normal text-slate-600">pts</span>
              </span>
            </div>

            {isSuperAdminOrAdmin && (
              <button
                onClick={onOpenTokenModal}
                className="ml-1 px-2.5 py-1 text-xs font-bold text-white bg-brand-orange-500 hover:bg-brand-orange-600 rounded-lg shadow-xs transition-colors"
                title="Purchase or Allocate Tokens"
              >
                + Buy
              </button>
            )}
          </div>

          {/* Post Job Quick Action */}
          <button
            onClick={onOpenJobModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Post Job (50 pts)</span>
          </button>

          {/* User Profile Badge */}
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <img
              src={
                currentRole === 'ORG_SUPER_ADMIN' 
                  ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
                  : currentRole === 'ORG_ADMIN'
                  ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
                  : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
              }
              alt="User Avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-brand-blue-500 shadow-xs"
            />
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {currentRole === 'ORG_SUPER_ADMIN' ? 'Sarah Jenkins' : currentRole === 'ORG_ADMIN' ? 'Marcus Vance' : 'Elena Rostova'}
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border w-fit ${roleLabels[currentRole].badge}`}>
                {roleLabels[currentRole].label}
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
