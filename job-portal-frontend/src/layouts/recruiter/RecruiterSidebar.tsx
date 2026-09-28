import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  PlusCircle,
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
  Bell,
  User
} from 'lucide-react';

export const RecruiterSidebar: React.FC = () => {
  const navSections = [
    {
      title: 'Hiring Execution',
      items: [
        { label: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
        { label: 'My Jobs', path: '/recruiter/jobs', icon: Briefcase, badge: 'Active' },
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
        { label: 'Notifications', path: '/recruiter/notifications', icon: Bell },
        { label: 'Profile & Settings', path: '/recruiter/settings', icon: User },
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
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 font-semibold flex items-center justify-between">
        <span>Recruiter Execution</span>
        <span className="text-indigo-600">v3.0 Spec</span>
      </div>
    </aside>
  );
};
