import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  ShieldAlert,
  BarChart3,
  CreditCard,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export const OrgSuperAdminSidebar: React.FC = () => {
  const location = useLocation();

  const navSections = [
    {
      title: 'Governance & People',
      items: [
        { label: 'Dashboard', path: '/organization-super-admin/dashboard', icon: LayoutDashboard },
        { label: 'Organization Admins', path: '/organization-super-admin/admins', icon: UserCheck, badge: 'RBAC' },
        { label: 'Recruiters', path: '/organization-super-admin/recruiters', icon: Users, badge: 'Add/Remove' },
        { label: 'Roles & Permissions', path: '/organization-super-admin/roles', icon: ShieldAlert },
      ]
    },
    /*
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
    */
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

  // Collapsed by default until user clicks header or visits a page inside that section
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // Auto-expand only the section that contains the current active route
  useEffect(() => {
    navSections.forEach((section) => {
      const hasActiveChild = section.items.some((item) => location.pathname === item.path || location.pathname.startsWith(item.path + '/'));
      if (hasActiveChild) {
        setOpenSections((prev) => ({ ...prev, [section.title]: true }));
      }
    });
  }, [location.pathname]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-61px)] overflow-y-auto">
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
                className={`w-full px-2.5 py-1.5 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer select-none ${
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
                <nav className="mt-1 space-y-0.5 pl-1 transition-all duration-200">
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
