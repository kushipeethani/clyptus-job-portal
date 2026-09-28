import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  Coins, 
  Settings,
  Briefcase,
  UserSearch,
  FileCheck,
  Calendar,
  Gift,
  Mail,
  ShieldAlert,
  BarChart3,
  CreditCard,
  Building2
} from 'lucide-react';

export const OrgSuperAdminSidebar: React.FC = () => {
  const navSections = [
    {
      title: 'Governance & People',
      items: [
        { label: 'Dashboard', path: '/organization-super-admin/dashboard', icon: LayoutDashboard },
        { label: 'Organization Admins', path: '/organization-super-admin/admins', icon: UserCheck, badge: 'RBAC' },
        { label: 'Recruiters', path: '/organization-super-admin/recruiters', icon: Users, badge: 'Add/Remove' },
        { label: 'Roles & Permissions', path: '/organization-super-admin/roles', icon: ShieldAlert },
        { label: 'Invitations', path: '/organization-super-admin/invitations', icon: Mail },
      ]
    },
    {
      title: 'Recruitment Operations',
      items: [
        { label: 'Jobs Oversight', path: '/organization-super-admin/jobs', icon: Briefcase },
        { label: 'Candidate Search', path: '/organization-super-admin/candidates', icon: UserSearch },
        { label: 'Applications & ATS', path: '/organization-super-admin/applications', icon: FileCheck },
        { label: 'Interviews', path: '/organization-super-admin/interviews', icon: Calendar },
        { label: 'Offers', path: '/organization-super-admin/offers', icon: Gift },
      ]
    },
    {
      title: 'Tokens, Billing & Analytics',
      items: [
        { label: 'Token Wallet & Allocation', path: '/organization-super-admin/tokens', icon: Coins, badge: 'Allocate' },
        { label: 'Billing & Token Purchases', path: '/organization-super-admin/billing', icon: CreditCard, badge: 'Razorpay' },
        { label: 'Recruitment Analytics', path: '/organization-super-admin/analytics', icon: BarChart3 },
        { label: 'Audit Logs', path: '/organization-super-admin/audit', icon: ShieldAlert },
        { label: 'Organization Settings', path: '/organization-super-admin/settings', icon: Settings },
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
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-orange-100 text-brand-orange-700 shrink-0">
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
        <span>Org Super Admin</span>
        <span className="text-brand-blue-600">v3.0 Spec</span>
      </div>
    </aside>
  );
};
