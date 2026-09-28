import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  Coins, 
  UserCheck, 
  TrendingUp, 
  Sparkles, 
  Calendar, 
  ChevronRight,
  PlusCircle,
  FileSearch,
  CheckCircle2,
  Clock,
  Zap
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { OrgRole } from '../../types/organization.types';
import { MOCK_ORG, INITIAL_JOBS, INITIAL_CANDIDATES, INITIAL_MEMBERS } from '../../store/organization.store';

interface ContextType {
  currentRole: OrgRole;
  tokensBalance: number;
}

const analyticsData = [
  { day: 'Mon', applications: 24, interviews: 4, tokenUsage: 120 },
  { day: 'Tue', applications: 38, interviews: 6, tokenUsage: 180 },
  { day: 'Wed', applications: 45, interviews: 8, tokenUsage: 250 },
  { day: 'Thu', applications: 52, interviews: 9, tokenUsage: 210 },
  { day: 'Fri', applications: 61, interviews: 12, tokenUsage: 310 },
  { day: 'Sat', applications: 29, interviews: 3, tokenUsage: 90 },
  { day: 'Sun', applications: 18, interviews: 2, tokenUsage: 50 },
];

export const Dashboard: React.FC = () => {
  const { currentRole, tokensBalance } = useOutletContext<ContextType>();

  const isSuperAdminOrAdmin = currentRole === 'ORG_SUPER_ADMIN' || currentRole === 'ORG_ADMIN';

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Welcome Context */}
      <div className="bg-gradient-to-r from-brand-blue-900 via-brand-blue-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-64 h-64 bg-brand-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-orange-500 text-white uppercase tracking-wider">
                {currentRole.replace('_', ' ')} VIEW
              </span>
              <span className="text-xs text-slate-300">• Acme Technologies Portal</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Welcome back, {currentRole === 'ORG_SUPER_ADMIN' ? 'Sarah' : currentRole === 'ORG_ADMIN' ? 'Marcus' : 'Elena'} 👋
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              {isSuperAdminOrAdmin 
                ? 'Manage recruiters, allocate candidate search tokens, track hiring analytics across all departments.'
                : 'Manage assigned job postings, screen candidates, review AI resume parser scores, and schedule interviews.'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
            <div className="w-10 h-10 rounded-xl bg-brand-orange-500 text-white flex items-center justify-center shadow-lg">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-300 uppercase">Available Tokens</div>
              <div className="text-xl font-extrabold text-white">
                {tokensBalance.toLocaleString()} <span className="text-xs font-normal text-slate-300">pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-brand-blue-500 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Jobs</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{INITIAL_JOBS.length}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +2 published this week
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-brand-blue-500 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Candidates</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">103</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Across 4 departments
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-brand-blue-500 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shortlisted (AI 85%+)</span>
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-orange-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">19</div>
          <div className="text-[11px] text-orange-600 font-semibold mt-1">
            High AI match score
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-brand-blue-500 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scheduled Interviews</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">6</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Next: Today at 2:00 PM
          </div>
        </div>

      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Application Inflow & Token Consumption</h3>
              <p className="text-xs text-slate-500">Real-time candidate metrics over the past 7 days</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-brand-blue-600">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-blue-600" /> Applications
              </span>
              <span className="flex items-center gap-1.5 text-brand-orange-500">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange-500" /> Tokens Used
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="applications" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                <Area type="monotone" dataKey="tokenUsage" stroke="#F97316" strokeWidth={2} fillOpacity={1} fill="url(#colorTokens)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recruiter Quota Allocation Widget (Super Admin / Admin view) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Recruiter Token Allocations</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-blue-700">
                Quota Overview
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Tokens assigned to team recruiters for resume parsing</p>

            <div className="mt-4 space-y-3">
              {INITIAL_MEMBERS.filter(m => m.role.includes('RECRUITER')).map((rec) => {
                const pct = Math.round((rec.usedTokens / rec.allocatedTokens) * 100);
                return (
                  <div key={rec.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{rec.name}</span>
                      <span className="text-slate-500 font-semibold">{rec.usedTokens} / {rec.allocatedTokens} pts ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${pct > 80 ? 'bg-red-500' : 'bg-brand-orange-500'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {isSuperAdminOrAdmin && (
            <div className="pt-3 border-t border-slate-100">
              <a 
                href="/org/members" 
                className="w-full py-2 px-3 text-xs font-bold text-brand-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Users className="w-4 h-4" /> Manage Member Token Limits
              </a>
            </div>
          )}
        </div>

      </div>

      {/* Active Job Postings Table Overview */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Active Job Postings</h3>
            <p className="text-xs text-slate-500">Live positions managed by your recruitment team</p>
          </div>
          <a href="/org/jobs" className="text-xs font-bold text-brand-blue-600 hover:text-brand-blue-800 flex items-center gap-1">
            View All Jobs ({INITIAL_JOBS.length}) <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Job Title</th>
                <th className="p-4">Department</th>
                <th className="p-4">Work Mode</th>
                <th className="p-4">Assigned Recruiter</th>
                <th className="p-4">Applicants</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {INITIAL_JOBS.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6 font-bold text-slate-900">
                    {job.title}
                    <div className="text-[10px] font-normal text-slate-400">{job.location}</div>
                  </td>
                  <td className="p-4">{job.department}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {job.workMode}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{job.recruiterName}</td>
                  <td className="p-4">
                    <span className="font-bold text-brand-blue-600">{job.applicantsCount}</span> candidates
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      job.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
