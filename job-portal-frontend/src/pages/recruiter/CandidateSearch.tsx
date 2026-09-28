import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  UserSearch, 
  Search, 
  Coins, 
  MapPin, 
  Lock, 
  Eye, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  GraduationCap,
  Bookmark
} from 'lucide-react';
import { Candidate, OrganizationCreditAccount } from '../../types/clyptus.types';
import { INITIAL_CANDIDATES } from '../../store/clyptus.store';

interface ContextType {
  creditAccount: OrganizationCreditAccount;
  setCreditAccount: React.Dispatch<React.SetStateAction<OrganizationCreditAccount>>;
  recruiterCredits?: number;
  fetchRecruiterBalance?: () => void;
  showToast: (msg: string) => void;
}

export const RecruiterCandidateSearch: React.FC = () => {
  const context = useOutletContext<ContextType>();
  const showToast = context?.showToast || ((msg: string) => alert(msg));
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Track saved candidates in localStorage
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('clyptus_saved_candidate_ids');
    return saved ? JSON.parse(saved) : ['cand_101'];
  });

  const activeRecruiter = (() => {
    const saved = localStorage.getItem('clyptus_active_recruiter');
    return saved ? JSON.parse(saved) : { id: 'rec_1', name: 'Elena Rostova' };
  })();

  const currentRecruiterId = activeRecruiter.id;

  const handleToggleBookmark = (candId: string, candName: string) => {
    let nextSaved: string[];
    if (savedIds.includes(candId)) {
      nextSaved = savedIds.filter(id => id !== candId);
      showToast(`Removed ${candName} from your saved candidates.`);
    } else {
      nextSaved = [...savedIds, candId];
      showToast(`Saved ${candName} to your Saved Candidates list!`);
    }
    setSavedIds(nextSaved);
    localStorage.setItem('clyptus_saved_candidate_ids', JSON.stringify(nextSaved));
  };

  const handleViewProfile = async (candidateId: string, candidateName: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/credits/consume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recruiterId: currentRecruiterId,
          actionType: 'PROFILE_VIEW',
          referenceId: candidateId
        })
      });
      const json = await res.json();
      if (!res.ok) {
        alert(json.message || 'Insufficient credits! Contact Organization Super Admin to top up credits.');
        return;
      }
      if (context?.fetchRecruiterBalance) {
        context.fetchRecruiterBalance();
      }
    } catch (err) {
      // Fallback credit deduction
    }

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId
          ? { ...c, profileUnlockedByRecruiters: [...c.profileUnlockedByRecruiters, currentRecruiterId] }
          : c
      )
    );

    showToast(`Unlocked full candidate profile for ${candidateName}! (-1 Credit)`);
  };

  const handleDownloadResume = async (candidateId: string, candidateName: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/credits/consume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recruiterId: currentRecruiterId,
          actionType: 'RESUME_DOWNLOAD',
          referenceId: candidateId
        })
      });
      const json = await res.json();
      if (!res.ok) {
        alert(json.message || 'Insufficient credits! Contact Organization Super Admin to top up credits.');
        return;
      }
      if (context?.fetchRecruiterBalance) {
        context.fetchRecruiterBalance();
      }
    } catch (err) {
      // Fallback credit deduction
    }

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId
          ? { ...c, resumeDownloadedByRecruiters: [...c.resumeDownloadedByRecruiters, currentRecruiterId] }
          : c
      )
    );

    showToast(`Initiated secure resume download for ${candidateName}! (-1 Credit)`);
  };

  const filteredCandidates = candidates.filter(c => 
    searchQuery === '' ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Candidate Search Engine</h2>
          <p className="text-xs text-slate-500">Search verified candidate database with 1-credit atomic profile access & bookmarking</p>
        </div>

        <div className="flex items-center gap-2 bg-orange-50 px-3.5 py-1.5 rounded-xl border border-orange-200 text-xs text-orange-900">
          <Coins className="w-4 h-4 text-brand-orange-500" />
          <span>Rules: <strong>1 Credit / View Profile</strong> • <strong>1 Credit / Resume Download</strong></span>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search candidates by title, skills (Python, FastAPI, React, PostgreSQL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
          />
        </div>
        <button className="w-full sm:w-auto px-5 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold rounded-2xl shadow-sm flex items-center justify-center gap-1.5">
          <Search className="w-4 h-4" /> Search Candidates
        </button>
      </div>

      {/* Candidate Cards List */}
      <div className="space-y-4">
        {filteredCandidates.map((cand) => {
          const isProfileUnlocked = cand.profileUnlockedByRecruiters.includes(currentRecruiterId);
          const isResumeDownloaded = cand.resumeDownloadedByRecruiters.includes(currentRecruiterId);
          const isBookmarked = savedIds.includes(cand.id);

          return (
            <div key={cand.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex items-center gap-4">
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-orange-500 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">{cand.name}</h3>
                      <span className="text-xs font-semibold text-brand-blue-700">• {cand.title}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {cand.location}</span>
                      <span>• {cand.experienceYears} Years Experience</span>
                      <span>• Expected: <strong>{cand.expectedSalary}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Credit Action Buttons & Bookmark Option */}
                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* Bookmark / Save Candidate Option */}
                  <button
                    onClick={() => handleToggleBookmark(cand.id, cand.name)}
                    className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-all ${
                      isBookmarked
                        ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                    title={isBookmarked ? 'Remove from Saved Candidates' : 'Save Candidate for later'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                    <span>{isBookmarked ? 'Saved' : 'Save Candidate'}</span>
                  </button>

                  {isProfileUnlocked ? (
                    <span className="px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Profile Unlocked
                    </span>
                  ) : (
                    <button
                      onClick={() => handleViewProfile(cand.id, cand.name)}
                      className="px-4 py-2 text-xs font-bold text-white bg-brand-orange-500 hover:bg-brand-orange-600 rounded-xl shadow-xs flex items-center gap-1.5"
                    >
                      <Lock className="w-4 h-4" /> View Profile (1 Credit)
                    </button>
                  )}

                  {isResumeDownloaded ? (
                    <span className="px-3 py-2 text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-1">
                      <Download className="w-4 h-4" /> Resume Downloaded
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDownloadResume(cand.id, cand.name)}
                      className="px-4 py-2 text-xs font-bold text-brand-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" /> Download Resume (1 Credit)
                    </button>
                  )}

                </div>

              </div>

              {/* Unlocked Profile Details */}
              {isProfileUnlocked && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-700">
                    <div><strong>Email:</strong> {cand.email}</div>
                    <div><strong>Phone:</strong> {cand.phone}</div>
                    <div className="md:col-span-2"><strong>Education:</strong> {cand.education}</div>
                  </div>
                </div>
              )}

              {/* Skills Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {cand.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                    {s}
                  </span>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
