import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  Coins, 
  Settings,
  ShieldAlert,
  BarChart3,
  CreditCard,
  ChevronDown,
  ChevronRight,
  UserPlus
} from 'lucide-react';

export const OrgSuperAdminSidebar: React.FC = () => {
  const location = useLocation();

  const navSections = [
    {
      title: 'Governance & People',
      items: [
        { label: 'Dashboard', path: '/organization-super-admin/dashboard', icon: LayoutDashboard },
        { label: 'Invitations', path: '/organization-super-admin/invitations', icon: UserPlus },
        { label: 'Recruiters', path: '/organization-super-admin/recruiters', icon: Users },
        { label: 'Roles & Permissions', path: '/organization-super-admin/roles', icon: ShieldAlert },
      ]
    },
    {
      title: 'Tokens, Billing & Analytics',
      items: [
        { label: 'Credits Allocation', path: '/organization-super-admin/tokens', icon: Coins },
        { label: 'Billing & Token Purchases', path: '/organization-super-admin/billing', icon: CreditCard },
        { label: 'Recruitment Analytics', path: '/organization-super-admin/analytics', icon: BarChart3 },
        { label: 'Audit Logs', path: '/organization-super-admin/audit', icon: ShieldAlert },
        { label: 'Organization Settings', path: '/organization-super-admin/settings', icon: Settings },
      ]
    }
  ];

  // Open by default, frozen in place with steady dropdown accordions
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Governance & People': true,
    'Tokens, Billing & Analytics': true,
  });

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        {navSections.map((section, idx) => {
          const isOpen = !!openSections[section.title];
          const hasActiveChild = section.items.some((item) => location.pathname === item.path || location.pathname.startsWith(item.path + '/'));

          return (
            <div key={idx} className="space-y-1">
              {/* Dropdown Header Button */}
              <button
                type="button"
                onClick={() => toggleSection(section.title)}
                className={`w-full px-2.5 py-1.5 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider rounded-xl transition-colors cursor-pointer select-none ${
                  hasActiveChild
                    ? 'text-brand-blue-700 bg-blue-50/60 font-black'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span>{section.title}</span>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0" />
                )}
              </button>

              {/* Sub-items nav dropdown */}
              {isOpen && (
                <nav className="mt-1 space-y-0.5 pl-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `px-3 py-2 rounded-xl flex items-center justify-between text-xs font-bold transition-colors ${
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
                      </NavLink>
                    );
                  })}
                </nav>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 font-semibold flex items-center justify-between">
        <span>Org Super Admin</span>
        <span className="text-brand-blue-600">v3.0 Spec</span>
      </div>
    </aside>
  );
};
