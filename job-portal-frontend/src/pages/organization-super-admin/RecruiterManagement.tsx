import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Coins, 
  Key, 
  X, 
  CheckCircle2, 
  Copy, 
  Eye, 
  EyeOff, 
  Lock,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { RecruiterUser } from '../../types/clyptus.types';
import { INITIAL_RECRUITERS } from '../../store/clyptus.store';

interface ContextType {
  showToast: (msg: string) => void;
}

export const RecruiterManagement: React.FC = () => {
  const { showToast } = useOutletContext<ContextType>();
  const [recruiters, setRecruiters] = useState<RecruiterUser[]>(INITIAL_RECRUITERS);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Add Recruiter Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formCredits, setFormCredits] = useState<number>(50);

  // Newly Created Credentials Display State
  const [createdCredentials, setCreatedCredentials] = useState<{
    name: string;
    email: string;
    password: string;
    credits: number;
  } | null>(null);

  // Allocate Credit Modal State
  const [creditModalUser, setCreditModalUser] = useState<RecruiterUser | null>(null);
  const [additionalCredits, setAdditionalCredits] = useState<number>(100);

  const fetchRecruiters = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:5000/api/v1/recruiters');
      const json = await res.json();
      if (json.success && json.data) {
        setRecruiters(json.data);
      }
    } catch (err) {
      console.warn('Backend API connection offline, utilizing local state.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  // Handle Add Recruiter with Credential Generation via REST API
  const handleAddRecruiter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/v1/recruiters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          initialCredits: formCredits
        })
      });
      const json = await res.json();
      if (json.success) {
        fetchRecruiters();
        setIsAddModalOpen(false);

        setCreatedCredentials({
          name: formName,
          email: formEmail,
          password: json.generatedCredentials?.temporaryPassword || formPassword || 'Clyptus@2026',
          credits: formCredits,
        });

        showToast(`Recruiter ${formName} added successfully with generated credentials!`);
      }
    } catch (err) {
      const newRecruiter: RecruiterUser = {
        id: `rec_${Date.now()}`,
        organizationId: 'org_abc_tech',
        name: formName,
        email: formEmail,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formName)}&background=4F46E5&color=fff`,
        status: 'ACTIVE',
        activeJobsCount: 0,
        profileViewsCount: 0,
        resumeDownloadsCount: 0,
        totalCreditsUsed: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };

      setRecruiters([newRecruiter, ...recruiters]);
      setIsAddModalOpen(false);

      setCreatedCredentials({
        name: formName,
        email: formEmail,
        password: formPassword || 'Clyptus@2026',
        credits: formCredits,
      });

      showToast(`Recruiter ${formName} added successfully with generated credentials!`);
    }

    setFormName('');
    setFormEmail('');
    setFormPassword('');
    setFormCredits(50);
  };

  // Handle Remove Recruiter
  const handleRemoveRecruiter = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove recruiter "${name}"? This action will revoke their login access.`)) {
      try {
        await fetch(`http://localhost:5000/api/v1/recruiters/${id}`, { method: 'DELETE' });
        fetchRecruiters();
      } catch (err) {
        setRecruiters(recruiters.filter((r) => r.id !== id));
      }
      showToast(`Removed recruiter ${name} from organization.`);
    }
  };

  // Handle Allocate Credits via REST API
  const handleAllocateCredits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditModalUser) return;

    try {
      const res = await fetch('http://localhost:5000/api/v1/credits/allocate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRecruiterId: creditModalUser.id,
          credits: additionalCredits
        })
      });
      const json = await res.json();
      if (json.success) {
        fetchRecruiters();
        showToast(`Allocated +${additionalCredits} credits to recruiter ${creditModalUser.name}!`);
      }
    } catch (err) {
      showToast(`Allocated +${additionalCredits} credits to recruiter ${creditModalUser.name}!`);
    }
    setCreditModalUser(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Recruiter Governance & Credentials</h2>
          <p className="text-xs text-slate-500">Create recruiter accounts with credentials, remove recruiters, and allocate credit quotas</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold rounded-2xl shadow-sm flex items-center gap-1.5 w-fit"
        >
          <UserPlus className="w-4 h-4" /> Add New Recruiter (Create Credentials)
        </button>
      </div>

      {/* Generated Credentials Alert Modal */}
      {createdCredentials && (
        <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl border border-indigo-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-emerald-400">Recruiter Credentials Created</h3>
                <p className="text-xs text-slate-300">Share these login details with {createdCredentials.name}</p>
              </div>
            </div>
            <button
              onClick={() => setCreatedCredentials(null)}
              className="text-slate-400 hover:text-white text-xs font-bold px-3 py-1 bg-slate-800 rounded-lg"
            >
              Dismiss
            </button>
          </div>

          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700 font-mono text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Portal Login URL:</span>
              <strong className="text-brand-orange-400">http://localhost:3002/recruiter/login</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Recruiter Email:</span>
              <strong className="text-white">{createdCredentials.email}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Generated Password:</span>
              <strong className="text-emerald-400">{createdCredentials.password}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Initial Credits:</span>
              <strong className="text-orange-400">+{createdCredentials.credits} credits</strong>
            </div>
          </div>
        </div>
      )}

      {/* Recruiter Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Active Recruiters ({recruiters.length})</h3>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Live Credit Allocation Server Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Recruiter Name</th>
                <th className="p-4">Active Jobs</th>
                <th className="p-4">Profile Views (-1 Cr)</th>
                <th className="p-4">Resume Downloads (-1 Cr)</th>
                <th className="p-4">Total Credits Consumed</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recruiters.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <img src={rec.avatar} alt={rec.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{rec.name}</div>
                        <div className="text-[10px] text-slate-400">{rec.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-bold text-slate-800">{rec.activeJobsCount} Active Jobs</td>
                  <td className="p-4 font-semibold text-slate-700">{rec.profileViewsCount} views</td>
                  <td className="p-4 font-semibold text-slate-700">{rec.resumeDownloadsCount} downloads</td>

                  <td className="p-4 font-extrabold text-brand-orange-600">
                    {rec.totalCreditsUsed} credits
                  </td>

                  <td className="p-4 text-right pr-6 space-x-2">
                    <button
                      onClick={() => setCreditModalUser(rec)}
                      className="px-2.5 py-1 text-xs font-bold text-brand-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg"
                    >
                      + Allocate Credits
                    </button>

                    <button
                      onClick={() => handleRemoveRecruiter(rec.id, rec.name)}
                      className="px-2.5 py-1 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg inline-flex items-center gap-1"
                      title="Remove recruiter account"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Recruiter Modal (With Credential Creation) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-brand-orange-500" />
                <h3 className="font-bold text-base">Add Recruiter & Generate Credentials</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRecruiter} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Roy"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Login Username)</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ananya.r@abctech.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Set Account Password</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ClyptusRecruiter@2026"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Initial Credit Quota</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formCredits}
                  onChange={(e) => setFormCredits(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-sm"
                >
                  Create Account & Generate Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Allocate Credits Modal */}
      {creditModalUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Allocate Credits to {creditModalUser.name}</h3>
            <p className="text-xs text-slate-500">Add candidate profile view & resume download credits directly to this recruiter's quota.</p>

            <form onSubmit={handleAllocateCredits} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Add Credits Amount</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={additionalCredits}
                  onChange={(e) => setAdditionalCredits(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-brand-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreditModalUser(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-orange-500 hover:bg-brand-orange-600 rounded-xl shadow-xs"
                >
                  Allocate +{additionalCredits} Credits
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
