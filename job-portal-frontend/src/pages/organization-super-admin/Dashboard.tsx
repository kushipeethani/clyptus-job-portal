import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Coins, 
  ShieldCheck, 
  ChevronRight,
  UserCheck,
  CreditCard
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { OrganizationCreditAccount } from '../../types/clyptus.types';
import { INITIAL_ADMINS, INITIAL_RECRUITERS } from '../../store/clyptus.store';

interface ContextType {
  creditAccount: OrganizationCreditAccount;
  fetchCreditAccount?: () => void;
}

const analyticsData = [
  { day: 'Mon', creditsConsumed: 12, candidateViews: 8, downloads: 4 },
  { day: 'Tue', creditsConsumed: 18, candidateViews: 12, downloads: 6 },
  { day: 'Wed', creditsConsumed: 25, candidateViews: 17, downloads: 8 },
  { day: 'Thu', creditsConsumed: 21, candidateViews: 14, downloads: 7 },
  { day: 'Fri', creditsConsumed: 31, candidateViews: 20, downloads: 11 },
  { day: 'Sat', creditsConsumed: 9, candidateViews: 6, downloads: 3 },
  { day: 'Sun', creditsConsumed: 5, candidateViews: 3, downloads: 2 },
];

export const OrgSuperAdminDashboard: React.FC = () => {
  const context = useOutletContext<ContextType>();
  const navigate = useNavigate();

  const [liveAccount, setLiveAccount] = useState<OrganizationCreditAccount>(context?.creditAccount || {
    organizationId: 'org_abc_tech',
    organizationName: 'ABC Recruitment Pvt Ltd',
    balance: 1000,
    totalAllocated: 2500,
    totalConsumed: 1500,
  });

  const [adminsCount, setAdminsCount] = useState<number>(INITIAL_ADMINS.length);
  const [recruitersCount, setRecruitersCount] = useState<number>(INITIAL_RECRUITERS.length);
  const [recruitersList, setRecruitersList] = useState<any[]>(INITIAL_RECRUITERS);

  const fetchDashboardData = async () => {
    try {
      const [accRes, admRes, recRes] = await Promise.all([
        fetch('http://localhost:5000/api/v1/credits/account'),
        fetch('http://localhost:5000/api/v1/admins'),
        fetch('http://localhost:5000/api/v1/recruiters')
      ]);

      const accJson = await accRes.json();
      const admJson = await admRes.json();
      const recJson = await recRes.json();

      if (accJson.success && accJson.data?.account) {
        setLiveAccount(accJson.data.account);
      }
      if (admJson.success && admJson.data) {
        setAdminsCount(admJson.data.length);
      }
      if (recJson.success && recJson.data) {
        setRecruitersCount(recJson.data.length);
        setRecruitersList(recJson.data);
      }
    } catch (err) {
      console.warn('Backend REST API offline, utilizing state.');
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-blue-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-brand-orange-500 text-white uppercase tracking-wider">
              Organization Super Admin Portal
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight">ABC Recruitment Pvt Ltd</h2>
            <p className="text-xs text-slate-300">
              Manage organization admins, recruiters with credentials, credit quotas, and audit logs.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
            <div className="w-10 h-10 rounded-xl bg-brand-orange-500 text-white flex items-center justify-center shadow-lg">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-300 uppercase">Available Credits</div>
              <div className="text-xl font-extrabold text-white">
                {liveAccount.balance.toLocaleString()} <span className="text-xs font-normal text-slate-300">credits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Organization Admins</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{adminsCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Configurable RBAC Permissions</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Active Recruiters</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{recruitersCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Manage Credentials & Quotas</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Credits Consumed</span>
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-orange-600 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{liveAccount.totalConsumed}</div>
          <div className="text-[11px] text-orange-600 font-semibold mt-1">Profile Views & Resumes</div>
        </div>

      </div>

      {/* Credit Usage Analytics Chart & Recruiter Usage Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Credit Consumption Analytics</h3>
              <p className="text-xs text-slate-500">Weekly profile views (-1 credit) & resume downloads (-1 credit)</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="creditsConsumed" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorCredits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recruiter-wise Credit Usage Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Recruiter Credit Usage</h3>
            <p className="text-xs text-slate-500 mt-0.5">Recruiter-wise breakdown of credit consumption</p>

            <div className="mt-4 space-y-3">
              {recruitersList.map((rec) => {
                const avail = rec.remainingBalance !== undefined 
                  ? rec.remainingBalance 
                  : ((rec.allocatedCredits || 50) - (rec.totalCreditsUsed || 0));

                return (
                  <div key={rec.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{rec.name}</span>
                      <span className="font-extrabold text-brand-orange-600">{avail} credits</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>{rec.activeJobsCount || 0} Active Jobs • {rec.profileViewsCount || 0} views • {rec.resumeDownloadsCount || 0} downloads</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button 
              onClick={() => navigate('/organization-super-admin/tokens')}
              className="w-full text-xs font-bold text-brand-blue-600 hover:text-brand-blue-800 flex items-center justify-center gap-1"
            >
              Allocate Credits & View Ledger <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
