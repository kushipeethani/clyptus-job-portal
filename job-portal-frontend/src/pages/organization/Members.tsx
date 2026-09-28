import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Lock 
} from 'lucide-react';
import { OrgRole, OrgUser } from '../../types/organization.types';
import { INITIAL_MEMBERS } from '../../store/organization.store';

interface ContextType {
  currentRole: OrgRole;
  tokensBalance: number;
  showToast: (msg: string) => void;
}

export const Members: React.FC = () => {
  const { currentRole, showToast } = useOutletContext<ContextType>();
  const [members, setMembers] = useState<OrgUser[]>(INITIAL_MEMBERS);
  const isSuperAdminOrAdmin = currentRole === 'ORG_SUPER_ADMIN' || currentRole === 'ORG_ADMIN';

  const [editModalUser, setEditModalUser] = useState<OrgUser | null>(null);
  const [newQuota, setNewQuota] = useState<number>(500);

  const handleUpdateQuota = (userId: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === userId ? { ...m, allocatedTokens: newQuota } : m))
    );
    showToast(`Updated token quota for ${editModalUser?.name} to ${newQuota} pts.`);
    setEditModalUser(null);
  };

  if (!isSuperAdminOrAdmin) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-xl mx-auto my-12">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Restricted Access</h3>
        <p className="text-xs text-slate-500">
          Member & Role Management is restricted to Organisation Super Admin and Organisation Admin roles only. Use the role switcher in the header to switch roles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Members & Recruiter Governance</h2>
          <p className="text-xs text-slate-500">Manage team roles, assign permissions, and allocate candidate search token quotas</p>
        </div>

        <button className="px-4 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold rounded-2xl shadow-sm flex items-center gap-1.5 w-fit">
          <UserPlus className="w-4 h-4" /> Invite Team Member
        </button>
      </div>

      {/* Member Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Active Members ({members.length})</h3>
          <span className="text-xs text-slate-500 font-semibold">Total Quota Allocated: 4,850 pts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Member</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Active Jobs</th>
                <th className="p-4">Token Quota (Used / Limit)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{m.name}</div>
                        <div className="text-[10px] text-slate-400">{m.email} • {m.title}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border ${
                      m.role === 'ORG_SUPER_ADMIN'
                        ? 'bg-orange-100 text-orange-800 border-orange-200'
                        : m.role === 'ORG_ADMIN'
                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                        : 'bg-indigo-100 text-indigo-800 border-indigo-200'
                    }`}>
                      {m.role.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="p-4 font-bold text-slate-800">{m.activeJobsCount} Jobs</td>

                  <td className="p-4">
                    <div className="space-y-1 max-w-[140px]">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span>{m.usedTokens} pts</span>
                        <span className="text-slate-400">/ {m.allocatedTokens} pts</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-orange-500 h-full rounded-full"
                          style={{ width: `${Math.min(100, (m.usedTokens / m.allocatedTokens) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                      {m.status}
                    </span>
                  </td>

                  <td className="p-4 text-right pr-6">
                    <button
                      onClick={() => {
                        setEditModalUser(m);
                        setNewQuota(m.allocatedTokens);
                      }}
                      className="px-3 py-1 text-xs font-bold text-brand-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg"
                    >
                      Allocate Tokens
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Quota Modal */}
      {editModalUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Allocate Token Quota for {editModalUser.name}</h3>
            <p className="text-xs text-slate-500">Set the maximum token limit this recruiter can spend on job posts & resume parsing.</p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">New Token Limit (Pts)</label>
              <input
                type="number"
                value={newQuota}
                onChange={(e) => setNewQuota(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditModalUser(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateQuota(editModalUser.id)}
                className="px-5 py-2 text-xs font-bold text-white bg-brand-orange-500 hover:bg-brand-orange-600 rounded-xl shadow-xs"
              >
                Save Quota
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
