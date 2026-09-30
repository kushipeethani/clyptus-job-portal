import React, { useState, useEffect } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { Coins, Eye, Download, PlusCircle, CheckCircle2, Users, Lock } from 'lucide-react';
import { OrganizationCreditAccount, CreditTransaction, RecruiterUser } from '../../types/clyptus.types';
import { getStoreCreditAccount, getStoreRecruiters, getStoreCreditTransactions, allocateCreditsToRecruiter, checkCurrentRolePermission } from '../../store/clyptus.store';

interface ContextType {
  creditAccount: OrganizationCreditAccount;
  setCreditAccount: React.Dispatch<React.SetStateAction<OrganizationCreditAccount>>;
  showToast: (msg: string) => void;
}

export const CreditReports: React.FC = () => {
  const { creditAccount, setCreditAccount, showToast } = useOutletContext<ContextType>();
  const location = useLocation();
  const canAllocateTokens = checkCurrentRolePermission(location.pathname, 'p7');
  const [recruiters, setRecruiters] = useState<RecruiterUser[]>(getStoreRecruiters());
  const [transactions, setTransactions] = useState<CreditTransaction[]>(getStoreCreditTransactions());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Credit Allocation State
  const [selectedTarget, setSelectedTarget] = useState<string>('ALL');
  const [allocationAmount, setAllocationAmount] = useState<number>(200);

  const fetchCreditData = () => {
    setCreditAccount(getStoreCreditAccount());
    setRecruiters(getStoreRecruiters());
    setTransactions(getStoreCreditTransactions());
  };

  useEffect(() => {
    fetchCreditData();
    const handleSync = () => fetchCreditData();
    window.addEventListener('clyptus_store_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('clyptus_store_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const handleAllocateCredits = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedTarget === 'ALL') {
      recruiters.forEach(rec => {
        allocateCreditsToRecruiter(rec.id, allocationAmount, 'Organization Admin');
      });
      fetchCreditData();
      showToast(`Batch allocated +${allocationAmount} credits to ALL recruiters (${recruiters.length} recruiters)!`);
    } else {
      const targetRecruiter = recruiters.find((r) => r.id === selectedTarget);
      if (!targetRecruiter) return;

      allocateCreditsToRecruiter(targetRecruiter.id, allocationAmount, 'Organization Admin');
      fetchCreditData();
      showToast(`Allocated +${allocationAmount} credits to ${targetRecruiter.name}!`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Recruiter Credit Allocation Governance</h2>
          <p className="text-xs text-slate-500">Allocate search & download credits to individual recruiters or batch allocate to ALL recruiters</p>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          REST API Live Balance Sync
        </span>
      </div>

      {/* Credit Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Available Org Balance</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {creditAccount.balance.toLocaleString()} <span className="text-xs font-normal text-slate-500">credits</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Allocated</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">
            +{creditAccount.totalAllocated.toLocaleString()} <span className="text-xs font-normal text-slate-500">credits</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Consumed</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            -{creditAccount.totalConsumed.toLocaleString()} <span className="text-xs font-normal text-slate-500">credits</span>
          </div>
        </div>

      </div>

      {/* Recruiter Credit Allocation Action Panel */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 text-slate-900 shadow-md space-y-4">
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-brand-blue-600" />
          <h3 className="font-extrabold text-base">Allocate Credits to Recruiters</h3>
        </div>
        <p className="text-xs text-slate-500">Top up candidate search & resume download credits for a specific recruiter or batch allocate to ALL recruiters simultaneously.</p>

        <form onSubmit={handleAllocateCredits} className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Target Recruiter</label>
            <select
              value={selectedTarget}
              onChange={(e) => setSelectedTarget(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
            >
              <option value="ALL">✨ ALL Recruiters (Batch Allocation)</option>
              {recruiters.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Credits Amount per Recruiter</label>
            <input
              type="number"
              min="1"
              required
              value={allocationAmount}
              onChange={(e) => setAllocationAmount(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={!canAllocateTokens}
              title={!canAllocateTokens ? 'Permission Disabled by Super Admin' : ''}
              className={`w-full py-2.5 px-4 text-xs font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 ${
                canAllocateTokens 
                  ? 'bg-brand-blue-600 hover:bg-brand-blue-700 text-white cursor-pointer' 
                  : 'bg-slate-700 text-slate-400 border border-slate-600 cursor-not-allowed opacity-60'
              }`}
            >
              <PlusCircle className="w-4 h-4" /> {selectedTarget === 'ALL' ? `Allocate +${allocationAmount} to ALL` : `Allocate +${allocationAmount} Credits`}
            </button>
          </div>
        </form>
      </div>

      {/* Recruiter-wise Credit Usage Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Recruiter-Wise Credit Consumption Report</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Recruiter</th>
                <th className="p-4">Profile Views (-1 Cr)</th>
                <th className="p-4">Resume Downloads (-1 Cr)</th>
                <th className="p-4">Total Credits Used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recruiters.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6 font-bold text-slate-900">
                    {rec.name}
                    <div className="text-[10px] font-normal text-slate-400">{rec.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-800">{rec.profileViewsCount}</span> views
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-800">{rec.resumeDownloadsCount}</span> downloads
                  </td>
                  <td className="p-4 font-extrabold text-brand-blue-600">
                    {rec.totalCreditsUsed} credits
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Immutable Credit Transaction Ledger Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Immutable Credit Transaction Ledger</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Tx ID</th>
                <th className="p-4">Action</th>
                <th className="p-4">Recruiter / User</th>
                <th className="p-4">Credits</th>
                <th className="p-4">Balance Before ➔ After</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6 font-mono font-bold text-slate-900">{tx.id}</td>
                  <td className="p-4 font-bold">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      tx.credits > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {tx.action}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{tx.recruiterName}</td>
                  <td className="p-4 font-extrabold">
                    <span className={tx.credits > 0 ? 'text-emerald-600' : 'text-slate-900'}>
                      {tx.credits > 0 ? `+${tx.credits}` : tx.credits}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 font-mono">
                    {tx.balanceBefore} ➔ <strong className="text-slate-900">{tx.balanceAfter}</strong>
                  </td>
                  <td className="p-4 text-slate-400">{tx.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
