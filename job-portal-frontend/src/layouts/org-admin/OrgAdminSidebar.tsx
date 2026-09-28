import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileCheck, 
  Coins,
  UserSearch,
  Calendar,
  Gift,
  BarChart3,
  ShieldCheck,
  Settings,
  Bell
} from 'lucide-react';

export const OrgAdminSidebar: React.FC = () => {
  const navSections = [
    {
      title: 'Operations',
      items: [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Recruiters', path: '/admin/recruiters', icon: Users, badge: 'Governance' },
        { label: 'Jobs Overview', path: '/admin/jobs', icon: Briefcase },
        { label: 'Candidates', path: '/admin/candidates', icon: UserSearch },
        { label: 'Applications & ATS', path: '/admin/applications', icon: FileCheck },
        { label: 'Interviews', path: '/admin/interviews', icon: Calendar },
        { label: 'Offers', path: '/admin/offers', icon: Gift },
      ]
    },
    {
      title: 'Tokens & Analytics',
      items: [
        { label: 'Token Allocation', path: '/admin/tokens', icon: Coins, badge: 'Allocate' },
        { label: 'Recruitment Analytics', path: '/admin/analytics', icon: BarChart3 },
        { label: 'Audit Logs', path: '/admin/audit', icon: ShieldCheck },
        { label: 'Operational Settings', path: '/admin/settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-61px)] overflow-y-auto">
      <div className="p-4 space-y-5">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {section.title}
            </span>
            <nav className="mt-1 space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-xl flex items-center justify-between text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-brand-blue-50 text-brand-blue-700 border border-blue-200 shadow-xs'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-brand-blue-600 shrink-0" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-blue-100 text-brand-blue-800 shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 font-semibold flex items-center justify-between">
        <span>Organization Admin</span>
        <span className="text-brand-blue-600">v3.0 Spec</span>
      </div>
    </aside>
  );
};
