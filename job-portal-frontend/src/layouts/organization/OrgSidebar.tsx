import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  UserSearch, 
  Coins, 
  CreditCard, 
  Settings, 
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { OrgRole } from '../../types/organization.types';

interface OrgSidebarProps {
  currentRole: OrgRole;
}

export const OrgSidebar: React.FC<OrgSidebarProps> = ({ currentRole }) => {
  const isSuperAdminOrAdmin = currentRole === 'ORG_SUPER_ADMIN' || currentRole === 'ORG_ADMIN';

  const navItems = [
    {
      label: 'Dashboard',
      path: '/org/dashboard',
      icon: LayoutDashboard,
      roles: ['ORG_SUPER_ADMIN', 'ORG_ADMIN', 'HR_RECRUITER', 'TECH_RECRUITER', 'HIRING_MANAGER'],
    },
    {
      label: 'Jobs & Pipeline',
      path: '/org/jobs',
      icon: Briefcase,
      roles: ['ORG_SUPER_ADMIN', 'ORG_ADMIN', 'HR_RECRUITER', 'TECH_RECRUITER', 'HIRING_MANAGER'],
      badge: '4 Active',
    },
    {
      label: 'Candidate Search',
      path: '/org/candidates',
      icon: UserSearch,
      roles: ['ORG_SUPER_ADMIN', 'ORG_ADMIN', 'HR_RECRUITER', 'TECH_RECRUITER', 'HIRING_MANAGER'],
      badge: 'AI Powered',
      badgeColor: 'bg-orange-100 text-orange-700 border-orange-200',
    },
    {
      label: 'Members & Roles',
      path: '/org/members',
      icon: Users,
      roles: ['ORG_SUPER_ADMIN', 'ORG_ADMIN'],
      restrictedLabel: 'Super Admin / Admin Only',
    },
    {
      label: 'Tokens & Billing',
      path: '/org/billing',
      icon: CreditCard,
      roles: ['ORG_SUPER_ADMIN', 'ORG_ADMIN'],
      restrictedLabel: 'Super Admin / Admin Only',
    },
    {
      label: 'Company Settings',
      path: '/org/settings',
      icon: Settings,
      roles: ['ORG_SUPER_ADMIN', 'ORG_ADMIN'],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-61px)]">
      
      <div className="p-4 space-y-6">
        
        {/* Navigation Section */}
        <div>
          <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Organisation Workspace
          </span>

          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const isAllowed = item.roles.includes(currentRole);
              const Icon = item.icon;

              if (!isAllowed) {
                return (
                  <div
                    key={item.path}
                    className="px-3 py-2.5 rounded-xl flex items-center justify-between text-slate-400 bg-slate-50/60 cursor-not-allowed opacity-60 text-xs font-medium"
                    title={`Restricted feature: ${item.restrictedLabel}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">
                      Locked
                    </span>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-brand-blue-50 text-brand-blue-700 border border-blue-200 shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-brand-blue-600 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Recruiter / Admin Context Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-blue-800">
            <Sparkles className="w-4 h-4 text-brand-orange-500" />
            <span>AI Token Economy</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {isSuperAdminOrAdmin 
              ? 'You have full permission to allocate tokens to recruiters and purchase enterprise packs.'
              : 'You are using recruiter quota tokens allocated by your Org Administrator.'}
          </p>
        </div>

      </div>

      {/* Footer info */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Tenant ID: acme_prod_01</span>
          <span className="font-bold text-brand-blue-600">v2.4 Live</span>
        </div>
      </div>

    </aside>
  );
};
