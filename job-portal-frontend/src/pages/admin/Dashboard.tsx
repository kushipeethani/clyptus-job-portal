import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Users, Briefcase, FileCheck, Coins, ShieldCheck, ChevronRight } from 'lucide-react';
import { OrganizationCreditAccount } from '../../types/clyptus.types';
import { INITIAL_RECRUITERS, INITIAL_JOBS, INITIAL_APPLICATIONS } from '../../store/clyptus.store';

interface ContextType {
  creditAccount: OrganizationCreditAccount;
}

export const OrgAdminDashboard: React.FC = () => {
  const { creditAccount } = useOutletContext<ContextType>();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-blue-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-500 text-white uppercase tracking-wider">
          Organization Admin Portal
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight mt-1">Admin Operations Center</h2>
        <p className="text-xs text-slate-300">
          Permission-based RBAC dashboard to manage recruiters, approve jobs, review applications, and view reports.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Recruiters</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{INITIAL_RECRUITERS.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Active Accounts</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Active Jobs</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{INITIAL_JOBS.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Published Openings</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Applications</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{INITIAL_APPLICATIONS.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Candidates Applied</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Available Credits</span>
          <div className="text-2xl font-extrabold text-brand-orange-600 mt-2">{creditAccount.balance}</div>
          <div className="text-[11px] text-slate-500 mt-1">Org Credit Balance</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Recent Recruiter Activity</h3>
        <div className="space-y-2">
          {INITIAL_RECRUITERS.map((r) => (
            <div key={r.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">{r.name}</span>
                <span className="text-slate-400 text-[10px] block">{r.email}</span>
              </div>
              <span className="font-semibold text-slate-700">{r.activeJobsCount} Active Jobs • {r.totalCreditsUsed} Credits Consumed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
