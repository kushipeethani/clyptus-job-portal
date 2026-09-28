import React, { useState, useEffect } from 'react';
import { Bookmark, Trash2, MapPin, Eye, Download } from 'lucide-react';
import { Candidate } from '../../types/clyptus.types';
import { INITIAL_CANDIDATES } from '../../store/clyptus.store';

export const RecruiterSavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedIds: string[] = (() => {
      const saved = localStorage.getItem('clyptus_saved_candidate_ids');
      return saved ? JSON.parse(saved) : ['cand_101'];
    })();

    const filtered = INITIAL_CANDIDATES.filter(c => savedIds.includes(c.id));
    setSavedCandidates(filtered);
  }, []);

  const handleRemove = (id: string) => {
    const updated = savedCandidates.filter((c) => c.id !== id);
    setSavedCandidates(updated);

    const savedIds = updated.map(c => c.id);
    localStorage.setItem('clyptus_saved_candidate_ids', JSON.stringify(savedIds));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Saved Candidates List</h2>
        <p className="text-xs text-slate-500">Bookmark candidates for future recruitment campaigns & team review</p>
      </div>

      <div className="space-y-4">
        {savedCandidates.map((cand) => (
          <div key={cand.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={cand.avatar} alt={cand.name} className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-500" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{cand.name} • {cand.title}</h3>
                <p className="text-xs text-slate-500">{cand.location} • {cand.experienceYears} Yrs Exp • Expected: {cand.expectedSalary}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cand.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRemove(cand.id)}
              className="px-3 py-1.5 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 flex items-center gap-1 w-fit"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove from Saved
            </button>
          </div>
        ))}

        {savedCandidates.length === 0 && (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-xs text-slate-400">
            No saved candidates yet. Bookmark candidates from candidate search.
          </div>
        )}
      </div>
    </div>
  );
};
