import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  CreditCard, 
  Coins, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Receipt, 
  Download,
  Lock
} from 'lucide-react';
import { OrgRole } from '../../types/organization.types';
import { INITIAL_TRANSACTIONS, MOCK_ORG } from '../../store/organization.store';

interface ContextType {
  currentRole: OrgRole;
  tokensBalance: number;
}

export const Billing: React.FC = () => {
  const { currentRole, tokensBalance } = useOutletContext<ContextType>();
  const isSuperAdminOrAdmin = currentRole === 'ORG_SUPER_ADMIN' || currentRole === 'ORG_ADMIN';

  if (!isSuperAdminOrAdmin) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-xl mx-auto my-12">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Restricted Access</h3>
        <p className="text-xs text-slate-500">
          Billing & Token Purchase History is restricted to Organisation Super Admin and Organisation Admin roles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Token Economy & Billing Ledger</h2>
          <p className="text-xs text-slate-500">Razorpay subscription receipts, token purchases, and allocation history</p>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-gradient-to-br from-brand-blue-900 to-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-orange-500 text-white uppercase tracking-wider">
              Active Subscription
            </span>
            <h3 className="text-xl font-extrabold">Enterprise Pro Plan</h3>
            <p className="text-xs text-slate-300">Includes 5,000 monthly token refill, unlimited recruiter seats, and priority Gemini AI parsing.</p>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-300">Renews: <strong>Oct 01, 2026</strong></span>
            <span className="font-bold text-brand-orange-400">$799 / month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-slate-500">Token Pool Status</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">
              {tokensBalance.toLocaleString()} <span className="text-xs font-normal text-slate-500">pts remaining</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Total Purchased:</span>
              <strong className="text-slate-900">10,000 pts</strong>
            </div>
            <div className="flex justify-between">
              <span>Total Allocated to Recruiters:</span>
              <strong className="text-slate-900">4,850 pts</strong>
            </div>
            <div className="flex justify-between">
              <span>Total Consumed (Jobs/Resumes):</span>
              <strong className="text-brand-orange-600">1,250 pts</strong>
            </div>
          </div>
        </div>

        <div className="bg-orange-50/60 p-6 rounded-3xl border border-orange-200 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-orange-800">Token Rates</span>
            <h4 className="text-sm font-extrabold text-slate-900">Platform Token Usage Costs</h4>
          </div>

          <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
            <li className="flex items-center justify-between">
              <span>• Job Posting</span>
              <strong className="text-orange-900">50 pts / post</strong>
            </li>
            <li className="flex items-center justify-between">
              <span>• AI Resume Parsing & Match</span>
              <strong className="text-orange-900">5 pts / candidate</strong>
            </li>
            <li className="flex items-center justify-between">
              <span>• Candidate Search Unlock</span>
              <strong className="text-orange-900">10 pts / profile</strong>
            </li>
          </ul>
        </div>

      </div>

      {/* Transaction Ledger Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Token Transaction & Audit Ledger</h3>
          <button className="text-xs font-bold text-brand-blue-600 hover:text-brand-blue-800 flex items-center gap-1">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Transaction ID</th>
                <th className="p-4">Type</th>
                <th className="p-4">Description</th>
                <th className="p-4">Performed By</th>
                <th className="p-4">Amount (Pts)</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {INITIAL_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6 font-mono text-[11px] font-bold text-slate-900">{tx.id}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      tx.type === 'PURCHASE' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{tx.description}</td>
                  <td className="p-4 text-slate-600">{tx.performedBy}</td>
                  <td className="p-4 font-extrabold">
                    <span className={tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}>
                      {tx.amount > 0 ? `+${tx.amount}` : tx.amount} pts
                    </span>
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
