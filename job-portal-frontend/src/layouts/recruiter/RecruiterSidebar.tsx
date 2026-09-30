import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  UserSearch, 
  Bookmark,
  FileCheck, 
  Layers,
  Calendar, 
  Gift,
  MessageSquare,
  CheckSquare,
  Sparkles,
  Coins,
  BarChart3,
  ShieldCheck,
  Bell,
  User,
  Star,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export const RecruiterSidebar: React.FC = () => {
  const location = useLocation();

  const navSections = [
    {
      title: 'Hiring Execution',
      items: [
        { label: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
        { label: 'My Jobs', path: '/recruiter/jobs', icon: Briefcase, badge: 'Active' },
        { label: 'Shortlisted Candidates', path: '/recruiter/shortlisted', icon: Star, badge: 'Log', badgeColor: 'bg-purple-100 text-purple-800' },
        { label: 'Candidate Search', path: '/recruiter/candidates', icon: UserSearch, badge: '1 Cr/Action', badgeColor: 'bg-orange-100 text-orange-800' },
        { label: 'Saved Candidates', path: '/recruiter/saved-candidates', icon: Bookmark },
      ]
    },
    {
      title: 'ATS & Candidate Pipeline',
      items: [
        { label: 'Applications', path: '/recruiter/applications', icon: FileCheck },
        { label: 'ATS Pipeline', path: '/recruiter/ats', icon: Layers },
        { label: 'Interviews', path: '/recruiter/interviews', icon: Calendar },
        { label: 'Offers', path: '/recruiter/offers', icon: Gift },
        { label: 'Candidate Messages', path: '/recruiter/messages', icon: MessageSquare },
        { label: 'Recruiter Tasks', path: '/recruiter/tasks', icon: CheckSquare },
      ]
    },
    {
      title: 'AI, Tokens & Performance',
      items: [
        { label: 'AI Recruitment Tools', path: '/recruiter/ai-tools', icon: Sparkles, badge: 'Gemini' },
        { label: 'Token Usage', path: '/recruiter/tokens', icon: Coins },
        { label: 'Recruiter Analytics', path: '/recruiter/analytics', icon: BarChart3 },
        { label: 'Activity Audit Logs', path: '/recruiter/audit', icon: ShieldCheck, badge: 'Server Audit' },
        { label: 'Notifications', path: '/recruiter/notifications', icon: Bell },
        { label: 'Profile & Settings', path: '/recruiter/settings', icon: User },
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
                    ? 'text-indigo-700 bg-indigo-50/60 font-black'
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
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-indigo-600 shrink-0" />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded shrink-0 ${item.badgeColor || 'bg-indigo-100 text-indigo-800'}`}>
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
        <span>Recruiter Workspace</span>
        <span className="text-indigo-600">v3.0 Spec</span>
      </div>
    </aside>
  );
};
