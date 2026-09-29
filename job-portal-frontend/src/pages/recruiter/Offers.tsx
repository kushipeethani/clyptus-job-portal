import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Gift, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  Send, 
  History, 
  X, 
  FileText, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { Offer, OfferStatus } from '../../types/clyptus.types';
import { INITIAL_OFFERS, getStoreOffers, logAction } from '../../store/clyptus.store';

interface ContextType {
  showToast: (msg: string) => void;
  activeRecruiter?: {
    name: string;
    email: string;
  };
}

export const RecruiterOffers: React.FC = () => {
  const { showToast, activeRecruiter } = useOutletContext<ContextType>();
  const [offers, setOffers] = useState<Offer[]>(() => getStoreOffers());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [auditModalOffer, setAuditModalOffer] = useState<Offer | null>(null);

  const recruiterName = activeRecruiter?.name || 'Elena Rostova';

  const [createForm, setCreateForm] = useState({
    candidateName: '',
    candidateEmail: '',
    role: 'Senior Python & FastAPI Engineer',
    annualCTC: '₹10,00,000 INR',
    joiningDate: '2026-11-15',
    status: 'PENDING_APPROVAL' as OfferStatus
  });

  const fetchOffers = () => {
    setOffers(getStoreOffers());
  };

  const saveOffers = (updated: Offer[]) => {
    setOffers(updated);
    try {
      localStorage.setItem('clyptus_offers', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('clyptus_store_updated', { detail: { type: 'OFFERS' } }));
    } catch (e) {}
  };

  useEffect(() => {
    fetchOffers();
    const handleSync = () => fetchOffers();
    window.addEventListener('clyptus_store_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('clyptus_store_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      candidateName: createForm.candidateName,
      candidateEmail: createForm.candidateEmail,
      role: createForm.role,
      annualCTC: createForm.annualCTC,
      joiningDate: createForm.joiningDate,
      createdBy: recruiterName,
      status: createForm.status
    };

    try {
      await fetch('http://localhost:5000/api/v1/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {}

    const newOffer: Offer = {
      id: `off_${Date.now()}`,
      organizationId: 'org_abc_tech',
      jobId: 'job_201',
      jobTitle: createForm.role,
      candidateId: `cand_${Date.now()}`,
      candidateName: createForm.candidateName,
      candidateEmail: createForm.candidateEmail,
      role: createForm.role,
      annualCTC: createForm.annualCTC,
      joiningDate: createForm.joiningDate,
      status: createForm.status,
      createdBy: recruiterName,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newOffer, ...offers];
    saveOffers(updated);

    logAction(
      recruiterName,
      'RECRUITER',
      'OFFER_CREATED',
      'OfferLetter',
      newOffer.id,
      'OFFER',
      `Submitted candidate offer for ${createForm.candidateName} (${createForm.candidateEmail}) as ${createForm.role} with CTC ${createForm.annualCTC}.`
    );

    setIsCreateModalOpen(false);
    showToast(`Submitted offer letter for ${createForm.candidateName}!`);
  };

  const getStatusBadge = (st: OfferStatus) => {
    switch (st) {
      case 'DRAFT':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">Draft</span>;
      case 'PENDING_APPROVAL':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200 animate-pulse">Pending Approval</span>;
      case 'SENT':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">Offer Sent</span>;
      case 'ACCEPTED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">Accepted</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-800 border border-red-200">Rejected</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700">{st}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Recruiter Offer Issuance</h2>
          <p className="text-xs text-slate-500">
            Create offer letters, submit for organization admin approval, and track offer progress.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold rounded-2xl shadow-sm flex items-center gap-1.5 w-fit"
        >
          <PlusCircle className="w-4 h-4" /> Create Offer Letter
        </button>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Issued & Pending Offers ({offers.length})</h3>
          <span className="text-xs text-slate-500 font-semibold">Active Recruiter: {recruiterName}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Candidate Details</th>
                <th className="p-4">Offered Role</th>
                <th className="p-4">Annual CTC</th>
                <th className="p-4">Joining Date</th>
                <th className="p-4">Created By</th>
                <th className="p-4">Offer Status</th>
                <th className="p-4 text-right pr-6">History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6 font-bold text-slate-900">
                    {offer.candidateName}
                    <div className="text-[10px] font-normal text-slate-400">{offer.candidateEmail}</div>
                  </td>
                  <td className="p-4 font-bold text-slate-800">{offer.role || offer.jobTitle}</td>
                  <td className="p-4 font-extrabold text-brand-orange-600">{offer.annualCTC}</td>
                  <td className="p-4 text-slate-700 font-medium">{offer.joiningDate}</td>
                  <td className="p-4 text-slate-500">{offer.createdBy}</td>

                  <td className="p-4">
                    {getStatusBadge(offer.status)}
                  </td>

                  <td className="p-4 text-right pr-6">
                    <button
                      onClick={() => setAuditModalOffer(offer)}
                      className="px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 inline-flex items-center gap-1"
                    >
                      <History className="w-3.5 h-3.5" /> History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Offer Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-brand-orange-500" />
                <h3 className="font-bold text-base">Create Offer Letter</h3>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOffer} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Candidate Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivers"
                  value={createForm.candidateName}
                  onChange={(e) => setCreateForm({ ...createForm, candidateName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Candidate Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex.rivers@devmail.com"
                  value={createForm.candidateEmail}
                  onChange={(e) => setCreateForm({ ...createForm, candidateEmail: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Offered Role</label>
                  <input
                    type="text"
                    required
                    value={createForm.role}
                    onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Annual CTC</label>
                  <input
                    type="text"
                    required
                    value={createForm.annualCTC}
                    onChange={(e) => setCreateForm({ ...createForm, annualCTC: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Joining Date</label>
                  <input
                    type="date"
                    required
                    value={createForm.joiningDate}
                    onChange={(e) => setCreateForm({ ...createForm, joiningDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Workflow Status</label>
                  <select
                    value={createForm.status}
                    onChange={(e) => setCreateForm({ ...createForm, status: e.target.value as OfferStatus })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none bg-white font-semibold"
                  >
                    <option value="PENDING_APPROVAL">Submit for Approval</option>
                    <option value="DRAFT">Save as Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-sm"
                >
                  Issue Offer Letter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Audit History Modal */}
      {auditModalOffer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Offer History Log</h3>
              <button onClick={() => setAuditModalOffer(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs max-h-60 overflow-y-auto">
              {auditModalOffer.history && auditModalOffer.history.length > 0 ? (
                auditModalOffer.history.map((h: any, idx: number) => (
                  <div key={h.id || idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between font-bold text-indigo-700">
                      <span>{h.action}</span>
                      <span className="text-[10px] text-slate-400">{h.timestamp ? new Date(h.timestamp).toLocaleTimeString() : ''}</span>
                    </div>
                    <div className="text-[11px] text-slate-600">Actor: <strong>{h.actor}</strong></div>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between font-bold text-indigo-700">
                    <span>OFFER_CREATED</span>
                    <span className="text-[10px] text-slate-400">{auditModalOffer.createdAt}</span>
                  </div>
                  <div className="text-[11px] text-slate-600">Creator: <strong>{auditModalOffer.createdBy}</strong></div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setAuditModalOffer(null)}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
