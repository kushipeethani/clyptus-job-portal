import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Gift, PlusCircle, CheckCircle2, XCircle, Clock, Send, ShieldCheck } from 'lucide-react';
import { Offer, OfferStatus } from '../../types/clyptus.types';
import { INITIAL_OFFERS } from '../../store/clyptus.store';

interface ContextType {
  showToast: (msg: string) => void;
}

const OFFER_STATUSES: OfferStatus[] = ['DRAFT', 'PENDING_APPROVAL', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'WITHDRAWN'];

export const OrgSuperAdminOffers: React.FC = () => {
  const { showToast } = useOutletContext<ContextType>();
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);

  const handleStatusChange = (id: string, newStatus: OfferStatus) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    showToast(`Updated offer status to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Organization Offer Management</h2>
          <p className="text-xs text-slate-500">Review, approve, and track candidate offers across all recruitment teams</p>
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Candidate Offers ({offers.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Candidate & Role</th>
                <th className="p-4">Target Job</th>
                <th className="p-4">Annual CTC</th>
                <th className="p-4">Joining Date</th>
                <th className="p-4">Created By</th>
                <th className="p-4">Offer Status</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6 font-bold text-slate-900">
                    {offer.candidateName}
                    <div className="text-[10px] font-normal text-slate-400">{offer.candidateEmail}</div>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{offer.jobTitle}</td>
                  <td className="p-4 font-extrabold text-brand-orange-600">{offer.annualCTC}</td>
                  <td className="p-4 text-slate-700">{offer.joiningDate}</td>
                  <td className="p-4 text-slate-500">{offer.createdBy}</td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      offer.status === 'SENT' ? 'bg-blue-100 text-blue-800' :
                      offer.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-800' :
                      offer.status === 'PENDING_APPROVAL' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {offer.status}
                    </span>
                  </td>

                  <td className="p-4 text-right pr-6">
                    <select
                      value={offer.status}
                      onChange={(e) => handleStatusChange(offer.id, e.target.value as OfferStatus)}
                      className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      {OFFER_STATUSES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
