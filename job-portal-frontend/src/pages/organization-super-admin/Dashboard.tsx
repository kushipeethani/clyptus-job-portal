import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Coins, 
  ShieldCheck, 
  ChevronRight,
  UserCheck,
  CreditCard,
  Building2
} from 'lucide-react';
import { OrganizationCreditAccount } from '../../types/clyptus.types';
import { INITIAL_ADMINS, INITIAL_RECRUITERS, getStoreCreditAccount, getStoreRecruiters } from '../../store/clyptus.store';

interface ContextType {
  creditAccount: OrganizationCreditAccount;
  fetchCreditAccount?: () => void;
}

export const OrgSuperAdminDashboard: React.FC = () => {
  const context = useOutletContext<ContextType>();
  const navigate = useNavigate();

  const [liveAccount, setLiveAccount] = useState<OrganizationCreditAccount>(getStoreCreditAccount());
  const [adminsCount, setAdminsCount] = useState<number>(INITIAL_ADMINS.length);
  const [recruitersCount, setRecruitersCount] = useState<number>(getStoreRecruiters().length);
  const [recruitersList, setRecruitersList] = useState<any[]>(getStoreRecruiters());

  const fetchDashboardData = () => {
    setLiveAccount(getStoreCreditAccount());
    const recs = getStoreRecruiters();
    setRecruitersCount(recs.length);
    setRecruitersList(recs);
  };

  useEffect(() => {
    fetchDashboardData();
    const handleSync = () => fetchDashboardData();
    window.addEventListener('clyptus_store_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('clyptus_store_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  return (
    <div className="space-y-6">
      
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
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{recruitersCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Manage Credentials & Quotas</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Credits Consumed</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue-600 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{liveAccount.totalConsumed}</div>
          <div className="text-[11px] text-brand-blue-600 font-semibold mt-1">Profile Views & Resumes</div>
        </div>

      </div>

      {/* Recruiter Credit Usage Breakdown Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Recruiter Credit Allocation & Usage</h3>
            <p className="text-xs text-slate-500 mt-0.5">Recruiter-wise breakdown of credit consumption and available quotas</p>
          </div>
          <button 
            onClick={() => navigate('/organization-super-admin/tokens')}
            className="text-xs font-bold text-brand-blue-600 hover:text-brand-blue-800 flex items-center gap-1 cursor-pointer"
          >
            Allocate Credits & View Ledger <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recruitersList.map((rec) => {
            const avail = rec.remainingBalance !== undefined 
              ? rec.remainingBalance 
              : ((rec.allocatedCredits || 50) - (rec.totalCreditsUsed || 0));

            return (
              <div key={rec.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900">{rec.name}</span>
                  <span className="font-black px-2 py-0.5 rounded bg-blue-100 text-brand-blue-700">{avail} credits</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>{rec.activeJobsCount || 0} Active Jobs • {rec.profileViewsCount || 0} views • {rec.resumeDownloadsCount || 0} downloads</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
