import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { OrgHeader } from './OrgHeader';
import { OrgSidebar } from './OrgSidebar';
import { OrgRole } from '../../types/organization.types';
import { MOCK_ORG } from '../../store/organization.store';
import { X, Coins, PlusCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface OrgLayoutProps {
  currentRole: OrgRole;
  onRoleChange: (role: OrgRole) => void;
}

export const OrgLayout: React.FC<OrgLayoutProps> = ({ currentRole, onRoleChange }) => {
  const [tokensBalance, setTokensBalance] = useState<number>(MOCK_ORG.totalTokensBalance);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New Job Form State
  const [jobForm, setJobForm] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote',
    workMode: 'REMOTE' as const,
    skills: 'React, Node.js, TypeScript',
  });

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokensBalance < 50) {
      alert('Insufficient tokens! Super Admin / Admin must purchase more tokens.');
      return;
    }
    setTokensBalance((prev) => prev - 50);
    setIsJobModalOpen(false);
    showToast(`Job "${jobForm.title}" published successfully! 50 tokens deducted.`);
    setJobForm({ title: '', department: 'Engineering', location: 'Remote', workMode: 'REMOTE', skills: 'React, Node.js' });
  };

  const handlePurchaseTokens = (amount: number, packName: string) => {
    setTokensBalance((prev) => prev + amount);
    setIsTokenModalOpen(false);
    showToast(`Purchased ${amount} Tokens (${packName})! Balance updated.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-brand-orange-500" />
          <span className="text-xs font-semibold">{notification}</span>
        </div>
      )}

      {/* Header */}
      <OrgHeader
        currentRole={currentRole}
        onRoleChange={onRoleChange}
        tokensBalance={tokensBalance}
        onOpenJobModal={() => setIsJobModalOpen(true)}
        onOpenTokenModal={() => setIsTokenModalOpen(true)}
      />

      {/* Main Body Layout */}
      <div className="flex flex-1 overflow-hidden">
        <OrgSidebar currentRole={currentRole} />

        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
          <Outlet context={{ currentRole, tokensBalance, setTokensBalance, showToast }} />
        </main>
      </div>

      {/* Post Job Modal */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
            
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-orange-500 text-white flex items-center justify-center">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Create & Publish Job Posting</h3>
                  <p className="text-xs text-slate-400">Consumes 50 Org Tokens per job</p>
                </div>
              </div>
              <button 
                onClick={() => setIsJobModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostJobSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Architect (React + TS)"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="Data & AI">Data & AI</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Mode</label>
                  <select
                    value={jobForm.workMode}
                    onChange={(e) => setJobForm({ ...jobForm, workMode: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none bg-white"
                  >
                    <option value="REMOTE">Remote</option>
                    <option value="HYBRID">Hybrid</option>
                    <option value="ON_SITE">On Site</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. San Francisco, CA / Remote"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  placeholder="React, TypeScript, Tailwind CSS, Node.js"
                  value={jobForm.skills}
                  onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-between text-xs text-orange-900">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Coins className="w-4 h-4 text-brand-orange-500" />
                  Token Cost: <strong>50 Tokens</strong>
                </span>
                <span>Remaining: <strong>{tokensBalance} pts</strong></span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-sm"
                >
                  Publish & Deduct 50 Tokens
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Buy Tokens Modal (Super Admin / Admin Feature) */}
      {isTokenModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden">
            
            <div className="p-6 bg-gradient-to-r from-slate-900 to-brand-blue-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-orange-500 text-white flex items-center justify-center">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Purchase Platform Tokens</h3>
                  <p className="text-xs text-slate-300">Managed by Platform Super Admin & Org Admin</p>
                </div>
              </div>
              <button 
                onClick={() => setIsTokenModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Tokens are consumed for publishing jobs, AI resume parsing, candidate matching, and recruiter search. Select a token package to refill your organisation balance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-brand-blue-500 transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-500">Starter Pack</span>
                    <div className="text-xl font-extrabold text-slate-900 mt-1">1,000 pts</div>
                    <div className="text-xs text-brand-orange-600 font-bold">$199 / one-time</div>
                  </div>
                  <button
                    onClick={() => handlePurchaseTokens(1000, 'Starter Pack')}
                    className="mt-4 w-full py-1.5 text-xs font-bold text-brand-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200"
                  >
                    Buy 1,000 Pts
                  </button>
                </div>

                <div className="p-4 rounded-2xl border-2 border-brand-orange-500 bg-orange-50/30 relative flex flex-col justify-between">
                  <span className="absolute -top-2.5 right-3 bg-brand-orange-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    Most Popular
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase text-orange-800">Growth Bundle</span>
                    <div className="text-xl font-extrabold text-slate-900 mt-1">5,000 pts</div>
                    <div className="text-xs text-brand-orange-600 font-bold">$799 / one-time</div>
                  </div>
                  <button
                    onClick={() => handlePurchaseTokens(5000, 'Growth Bundle')}
                    className="mt-4 w-full py-1.5 text-xs font-bold text-white bg-brand-orange-500 hover:bg-brand-orange-600 rounded-xl shadow-xs"
                  >
                    Buy 5,000 Pts
                  </button>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-brand-blue-500 transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-500">Enterprise Pack</span>
                    <div className="text-xl font-extrabold text-slate-900 mt-1">15,000 pts</div>
                    <div className="text-xs text-brand-orange-600 font-bold">$1,999 / one-time</div>
                  </div>
                  <button
                    onClick={() => handlePurchaseTokens(15000, 'Enterprise Pack')}
                    className="mt-4 w-full py-1.5 text-xs font-bold text-brand-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200"
                  >
                    Buy 15,000 Pts
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
