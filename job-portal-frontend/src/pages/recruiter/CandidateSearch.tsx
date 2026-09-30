import React, { useState, useEffect } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
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
  Bookmark,
  UserCheck,
  Star
} from 'lucide-react';
import { Candidate, OrganizationCreditAccount, ShortlistedCandidate } from '../../types/clyptus.types';
import { INITIAL_CANDIDATES, consumeCreditsFromRecruiter, getStoreShortlistedCandidates, toggleShortlistCandidate, checkCurrentRolePermission } from '../../store/clyptus.store';

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
  const location = useLocation();

  const canViewCandidates = checkCurrentRolePermission(location.pathname, 'p3');
  const canSearchProfiles = checkCurrentRolePermission(location.pathname, 'p8');
  const canShortlist = checkCurrentRolePermission(location.pathname, 'p9');
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShortlistedOnly, setShowShortlistedOnly] = useState(false);

  const [shortlistedItems, setShortlistedItems] = useState<ShortlistedCandidate[]>(() => getStoreShortlistedCandidates());
  
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

  useEffect(() => {
    const handleSync = () => setShortlistedItems(getStoreShortlistedCandidates());
    window.addEventListener('clyptus_store_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('clyptus_store_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const handleToggleShortlist = (cand: Candidate) => {
    const res = toggleShortlistCandidate(currentRecruiterId, activeRecruiter.name, {
      id: cand.id,
      name: cand.name,
      email: cand.email,
      title: cand.title,
      location: cand.location,
      experience: `${cand.experienceYears} Years`,
      skills: cand.skills
    });
    setShortlistedItems(res.updated);
    if (res.isShortlisted) {
      showToast(`Shortlisted candidate ${cand.name}!`);
    } else {
      showToast(`Removed ${cand.name} from shortlisted list.`);
    }
  };

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

  const handleViewProfile = (candidateId: string, candidateName: string) => {
    const result = consumeCreditsFromRecruiter(currentRecruiterId, 'PROFILE_VIEW', candidateId);
    if (!result.success) {
      alert(result.message || 'Insufficient credits! Contact Organization Super Admin to top up credits.');
      return;
    }

    if (context?.fetchRecruiterBalance) {
      context.fetchRecruiterBalance();
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

  const handleDownloadResume = (candidateId: string, candidateName: string) => {
    const result = consumeCreditsFromRecruiter(currentRecruiterId, 'RESUME_DOWNLOAD', candidateId);
    if (!result.success) {
      alert(result.message || 'Insufficient credits! Contact Organization Super Admin to top up credits.');
      return;
    }

    if (context?.fetchRecruiterBalance) {
      context.fetchRecruiterBalance();
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

  const filteredCandidates = candidates.filter(c => {
    const isShortlisted = shortlistedItems.some(s => s.candidateId === c.id && (s.recruiterId === currentRecruiterId || s.recruiterId === 'rec_1'));
    if (showShortlistedOnly && !isShortlisted) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const myShortlistedCount = shortlistedItems.filter(s => s.recruiterId === currentRecruiterId || s.recruiterId === 'rec_1').length;

  if (!canViewCandidates) {
    return (
      <div className="p-12 bg-white border border-slate-200 rounded-3xl text-center space-y-3 shadow-xs my-6">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-base font-extrabold text-slate-900">View Candidates Restricted</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Viewing and managing candidates has been disabled for your role by the Organization Super Admin in the Roles & Permissions Matrix.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Candidate Search Engine</h2>
          <p className="text-xs text-slate-500">Search verified candidate database, shortlist profiles & consume credits for full details</p>
        </div>

        <div className="flex items-center gap-2 bg-orange-50 px-3.5 py-1.5 rounded-xl border border-orange-200 text-xs text-orange-900">
          <Coins className="w-4 h-4 text-brand-orange-500" />
          <span>Rules: <strong>1 Credit / View Profile</strong> • <strong>1 Credit / Resume Download</strong></span>
        </div>
      </div>

      {/* Search Input & Shortlisted Filter */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            disabled={!canSearchProfiles}
            placeholder={canSearchProfiles ? "Search candidates by title, skills (Python, FastAPI, React, PostgreSQL)..." : "Search candidates disabled by Super Admin..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none ${
              !canSearchProfiles ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''
            }`}
          />
        </div>

        <button
          onClick={() => setShowShortlistedOnly(!showShortlistedOnly)}
          className={`px-4 py-2.5 text-xs font-bold rounded-2xl border flex items-center justify-center gap-1.5 transition-all ${
            showShortlistedOnly
              ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
              : 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
          }`}
        >
          <Star className={`w-4 h-4 ${showShortlistedOnly ? 'fill-white' : 'fill-purple-600 text-purple-600'}`} />
          <span>Shortlisted Candidates ({myShortlistedCount})</span>
        </button>

        <button
          disabled={!canSearchProfiles}
          className={`w-full sm:w-auto px-5 py-2.5 text-white text-xs font-bold rounded-2xl shadow-sm flex items-center justify-center gap-1.5 ${
            canSearchProfiles ? 'bg-brand-blue-600 hover:bg-brand-blue-700 cursor-pointer' : 'bg-slate-300 cursor-not-allowed opacity-60'
          }`}
        >
          <Search className="w-4 h-4" /> Search
        </button>
      </div>

      {/* Candidate Cards List */}
      <div className="space-y-4">
        {filteredCandidates.map((cand) => {
          const isProfileUnlocked = cand.profileUnlockedByRecruiters.includes(currentRecruiterId);
          const isResumeDownloaded = cand.resumeDownloadedByRecruiters.includes(currentRecruiterId);
          const isBookmarked = savedIds.includes(cand.id);
          const isShortlisted = shortlistedItems.some(s => s.candidateId === cand.id && (s.recruiterId === currentRecruiterId || s.recruiterId === 'rec_1'));

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
                      {isShortlisted && (
                        <span className="px-2 py-0.5 text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-purple-600" /> Shortlisted
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {cand.location}</span>
                      <span>• {cand.experienceYears} Years Experience</span>
                      <span>• Expected: <strong>{cand.expectedSalary}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Credit Action Buttons & Bookmark / Shortlist Option */}
                <div className="flex flex-wrap items-center gap-2">

                  {/* Shortlist Candidate Button */}
                  <button
                    disabled={!canShortlist}
                    onClick={() => {
                      if (!canShortlist) {
                        showToast('Permission Restricted: Shortlisting candidates is disabled by Super Admin.');
                        return;
                      }
                      handleToggleShortlist(cand);
                    }}
                    className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-all ${
                      !canShortlist
                        ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                        : isShortlisted
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
                    }`}
                    title={!canShortlist ? 'Permission Disabled by Super Admin' : isShortlisted ? 'Remove candidate from shortlisted pipeline' : 'Shortlist candidate'}
                  >
                    <Star className={`w-4 h-4 ${!canShortlist ? 'text-slate-400' : isShortlisted ? 'fill-white text-white' : 'fill-purple-600 text-purple-600'}`} />
                    <span>{isShortlisted ? 'Shortlisted' : 'Shortlist Candidate'}</span>
                  </button>
                  
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
                    <a
                      href={cand.resumeUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => showToast(`Opening resume download link for ${cand.name}...`)}
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 border border-emerald-600 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" /> Download Resume (Unlocked)
                    </a>
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
