import React, { useState, useEffect } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { Coins, Eye, Download, PlusCircle, CheckCircle2, Users, Lock, AlertCircle } from 'lucide-react';
import { OrganizationCreditAccount, CreditTransaction, RecruiterUser } from '../../types/clyptus.types';
import { getStoreCreditAccount, getStoreRecruiters, getStoreCreditTransactions, allocateCreditsToRecruiter, checkCurrentRolePermission, hasRolePermission } from '../../store/clyptus.store';

interface ContextType {
  creditAccount: OrganizationCreditAccount;
  fetchCreditAccount?: () => void;
  showToast: (msg: string) => void;
}

export const CreditReports: React.FC = () => {
  const { creditAccount: parentAccount, fetchCreditAccount: parentFetchAccount, showToast } = useOutletContext<ContextType>();
  const location = useLocation();

  const [canAllocateTokens, setCanAllocateTokens] = useState<boolean>(() => hasRolePermission('superAdmin', 'p7'));

  const [creditAccount, setCreditAccount] = useState<OrganizationCreditAccount>(getStoreCreditAccount());
  const [recruiters, setRecruiters] = useState<RecruiterUser[]>(getStoreRecruiters());
  const [transactions, setTransactions] = useState<CreditTransaction[]>(getStoreCreditTransactions());

  const [selectedTarget, setSelectedTarget] = useState<string>(recruiters.length > 0 ? recruiters[0].id : '');
  const [allocationAmount, setAllocationAmount] = useState<number>(0);

  const fetchCreditData = () => {
    const acc = getStoreCreditAccount();
    const recs = getStoreRecruiters();
    const txs = getStoreCreditTransactions();
    setCreditAccount(acc);
    setRecruiters(recs);
    setTransactions(txs);
    setCanAllocateTokens(hasRolePermission('superAdmin', 'p7'));
    if (!selectedTarget && recs.length > 0) {
      setSelectedTarget(recs[0].id);
    }
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

    if (!selectedTarget) {
      showToast('Please select a target recruiter.');
      return;
    }

    if (allocationAmount <= 0) {
      showToast('Allocation amount must be greater than 0.');
      return;
    }

    if (allocationAmount > creditAccount.balance) {
      showToast(`Cannot allocate ${allocationAmount} credits. Only ${creditAccount.balance} credits available in organization pool.`);
      return;
    }

    const targetRecruiter = recruiters.find((r) => r.id === selectedTarget);
    if (!targetRecruiter) {
      showToast('Target recruiter not found.');
      return;
    }

    allocateCreditsToRecruiter(targetRecruiter.id, allocationAmount, 'Organization Super Admin');
    fetchCreditData();
    if (parentFetchAccount) parentFetchAccount();
    showToast(`Allocated +${allocationAmount} credits to ${targetRecruiter.name}! (Remaining Org Balance: ${Math.max(0, creditAccount.balance - allocationAmount)})`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Recruiter Credit Allocation & Ledger</h2>
          <p className="text-xs text-slate-500">Allocate search & download credit quotas to individual recruiters with strict non-negative balance protection</p>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Non-Negative Ledger Enforcement
        </span>
      </div>

      {/* Credit Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Available Org Pool Balance</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {Math.max(0, creditAccount.balance).toLocaleString()} <span className="text-xs font-normal text-slate-500">credits</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Cannot drop below 0</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Allocated to Recruiters</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">
            {Math.max(0, creditAccount.totalAllocated).toLocaleString()} <span className="text-xs font-normal text-slate-500">credits</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Active recruiter quotas</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Consumed by Team</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {Math.max(0, creditAccount.totalConsumed).toLocaleString()} <span className="text-xs font-normal text-slate-500">credits</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Resume unlocks & views</div>
        </div>

      </div>

      {/* Recruiter Credit Allocation Action Panel - Visible only if Allocate tokens permission is enabled */}
      {canAllocateTokens && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 text-slate-900 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-brand-blue-600" />
            <h3 className="font-extrabold text-base">Allocate Credits to Recruiter</h3>
          </div>
          <p className="text-xs text-slate-500">Select an individual recruiter to allocate candidate search and resume download credits from the organizational pool.</p>

          <form onSubmit={handleAllocateCredits} className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Target Recruiter *</label>
              <select
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
              >
                {recruiters.length === 0 ? (
                  <option value="">No recruiters available</option>
                ) : (
                  recruiters.map((r) => {
                    const currentBalance = r.remainingBalance !== undefined ? r.remainingBalance : Math.max(0, (r.allocatedCredits || 0) - (r.totalCreditsUsed || 0));
                    return (
                      <option key={r.id} value={r.id}>
                        {r.name} ({currentBalance} current credits)
                      </option>
                    );
                  })
                )}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Credit Amount *</label>
              <input
                type="number"
                min="0"
                max={creditAccount.balance}
                value={allocationAmount}
                onChange={(e) => setAllocationAmount(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-brand-blue-500 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={recruiters.length === 0 || creditAccount.balance < 1}
                className="w-full py-2.5 px-4 text-xs font-extrabold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Allocate +{allocationAmount} Credits
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Recruiter-wise Credit Usage Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Recruiter Credit Quotas & Consumption</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Recruiter</th>
                <th className="p-4">Allocated Quota</th>
                <th className="p-4">Profile Views (-1 Cr)</th>
                <th className="p-4">Resume Downloads (-1 Cr)</th>
                <th className="p-4">Remaining Available Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recruiters.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400">No recruiters found</td>
                </tr>
              ) : (
                recruiters.map((rec) => {
                  const rem = rec.remainingBalance !== undefined ? rec.remainingBalance : Math.max(0, (rec.allocatedCredits || 0) - (rec.totalCreditsUsed || 0));
                  return (
                    <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 pl-6 font-bold text-slate-900">
                        {rec.name}
                        <div className="text-[10px] font-normal text-slate-400">{rec.email}</div>
                      </td>
                      <td className="p-4 font-bold text-slate-800">
                        {rec.allocatedCredits || 0} credits
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-slate-800">{rec.profileViewsCount || 0}</span> views
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-slate-800">{rec.resumeDownloadsCount || 0}</span> downloads
                      </td>
                      <td className="p-4 font-extrabold text-brand-blue-700">
                        <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                          {Math.max(0, rem)} credits
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
