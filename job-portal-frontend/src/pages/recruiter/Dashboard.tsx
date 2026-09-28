import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  Coins, 
  Calendar, 
  Gift, 
  CheckSquare, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  FileCheck,
  UserCheck
} from 'lucide-react';
import { OrganizationCreditAccount } from '../../types/clyptus.types';
import { INITIAL_JOBS, INITIAL_CANDIDATES, INITIAL_APPLICATIONS, INITIAL_INTERVIEWS, INITIAL_OFFERS } from '../../store/clyptus.store';

interface ContextType {
  creditAccount: OrganizationCreditAccount;
}

export const RecruiterDashboard: React.FC = () => {
  const { creditAccount } = useOutletContext<ContextType>();
  const navigate = useNavigate();

  const myJobs = INITIAL_JOBS.filter((j) => j.recruiterId === 'rec_1');

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-brand-orange-500 text-white uppercase tracking-wider">
              Recruiter Execution Workspace
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight">Elena Rostova 👋</h2>
            <p className="text-xs text-slate-300">
              Senior Technical Recruiter • ABC Recruitment Pvt Ltd
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
            <div className="w-10 h-10 rounded-xl bg-brand-orange-500 text-white flex items-center justify-center shadow-lg">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-300 uppercase">Allocated Tokens</div>
              <div className="text-xl font-extrabold text-white">
                {creditAccount.balance} <span className="text-xs font-normal text-slate-300">credits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Funnel Overview (Section 2 Specification: Applications → Screening → Shortlisted → Interview → Offer → Hired) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Recruiter Hiring Funnel Progress</h3>
          <span className="text-xs text-slate-500 font-semibold">Active Pipeline Metrics</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-500">1. Applications</span>
            <div className="text-xl font-black text-slate-900">56</div>
          </div>
          <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-200 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-blue-700">2. Screening</span>
            <div className="text-xl font-black text-blue-800">28</div>
          </div>
          <div className="p-3 bg-orange-50/80 rounded-2xl border border-orange-200 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-orange-700">3. Shortlisted</span>
            <div className="text-xl font-black text-orange-800">12</div>
          </div>
          <div className="p-3 bg-purple-50/80 rounded-2xl border border-purple-200 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-purple-700">4. Interview</span>
            <div className="text-xl font-black text-purple-800">6</div>
          </div>
          <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-amber-800">5. Offer</span>
            <div className="text-xl font-black text-amber-900">2</div>
          </div>
          <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-emerald-800">6. Hired</span>
            <div className="text-xl font-black text-emerald-900">4</div>
          </div>
        </div>
      </div>

      {/* Assigned Jobs & Recruiter Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Assigned Job Postings ({myJobs.length})</h3>
            <button 
              onClick={() => navigate('/recruiter/jobs')}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Manage All Jobs →
            </button>
          </div>

          <div className="space-y-3">
            {myJobs.map((job) => (
              <div key={job.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{job.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{job.department} • {job.location} • {job.salary}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-indigo-600">{job.applicationsCount} Applications</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">{job.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recruiter Tasks Panel (Section 18 Specification) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Tasks Requiring Attention</h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-red-100 text-red-700">2 Overdue</span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 bg-red-50/60 rounded-xl border border-red-200/80 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-red-900">
                  <span>Interview Feedback Pending</span>
                  <span className="text-[10px]">Today</span>
                </div>
                <p className="text-[11px] text-slate-600">Submit technical feedback for Alex Rivers (Python Engineer)</p>
              </div>

              <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-200/80 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-orange-900">
                  <span>Review Candidate Resume</span>
                  <span className="text-[10px]">Tomorrow</span>
                </div>
                <p className="text-[11px] text-slate-600">Screen candidate resume for Full Stack React opening</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/recruiter/tasks')}
            className="w-full py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition-colors mt-2"
          >
            View All Recruiter Tasks
          </button>
        </div>

      </div>

    </div>
  );
};
