import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Mail, 
  Calendar, 
  Trash2, 
  Lock, 
  Download, 
  CheckCircle2, 
  UserCheck, 
  Briefcase,
  Search,
  Sparkles
} from 'lucide-react';
import { ShortlistedCandidate, Candidate, OrganizationCreditAccount } from '../../types/clyptus.types';
import { getStoreShortlistedCandidates, toggleShortlistCandidate, INITIAL_CANDIDATES, consumeCreditsFromRecruiter } from '../../store/clyptus.store';

interface ContextType {
  creditAccount: OrganizationCreditAccount;
  setCreditAccount: React.Dispatch<React.SetStateAction<OrganizationCreditAccount>>;
  recruiterCredits?: number;
  fetchRecruiterBalance?: () => void;
  showToast: (msg: string) => void;
}

export const RecruiterShortlistedCandidates: React.FC = () => {
  const context = useOutletContext<ContextType>();
  const showToast = context?.showToast || ((msg: string) => alert(msg));
  const navigate = useNavigate();

  const [shortlistedItems, setShortlistedItems] = useState<ShortlistedCandidate[]>(() => getStoreShortlistedCandidates());
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [searchQuery, setSearchQuery] = useState('');

  const activeRecruiter = (() => {
    const saved = localStorage.getItem('clyptus_active_recruiter');
    return saved ? JSON.parse(saved) : { id: 'rec_1', name: 'Elena Rostova' };
  })();

  const currentRecruiterId = activeRecruiter.id;

  const fetchShortlisted = () => {
    setShortlistedItems(getStoreShortlistedCandidates());
  };

  useEffect(() => {
    fetchShortlisted();
    const handleSync = () => fetchShortlisted();
    window.addEventListener('clyptus_store_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('clyptus_store_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const handleRemoveShortlist = (cand: { id: string; name: string; email: string; title: string }) => {
    const res = toggleShortlistCandidate(currentRecruiterId, activeRecruiter.name, cand);
    setShortlistedItems(res.updated);
    showToast(`Removed ${cand.name} from shortlisted list.`);
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

  const myShortlisted = shortlistedItems.filter(
    s => s.recruiterId === currentRecruiterId || s.recruiterId === 'rec_1'
  );

  const filteredShortlisted = myShortlisted.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.candidateName.toLowerCase().includes(q) ||
      item.candidateEmail.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      (item.skills && item.skills.some(s => s.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-600 fill-purple-600" /> Shortlisted Candidates Log
          </h2>
          <p className="text-xs text-slate-500">View and manage all candidates shortlisted by {activeRecruiter.name} for active recruitment roles</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-purple-100 text-purple-900 border border-purple-200 text-xs font-extrabold rounded-2xl flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-purple-600" /> Total Shortlisted: {myShortlisted.length}
          </span>
          <button
            onClick={() => navigate('/recruiter/candidates')}
            className="px-4 py-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold rounded-2xl shadow-xs flex items-center gap-1.5"
          >
            + Shortlist More Candidates
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-7 top-7" />
        <input
          type="text"
          placeholder="Filter shortlisted candidates by name, title, or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      {/* Shortlisted Candidates List */}
      <div className="space-y-4">
        {filteredShortlisted.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <Star className="w-6 h-6 fill-purple-500" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-base">No Shortlisted Candidates Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Shortlist candidates directly from Candidate Search or Applications to view them here.
            </p>
            <button
              onClick={() => navigate('/recruiter/candidates')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Browse Candidate Database
            </button>
          </div>
        ) : (
          filteredShortlisted.map((item) => {
            const cand = candidates.find(c => c.id === item.candidateId) || {
              id: item.candidateId,
              name: item.candidateName,
              email: item.candidateEmail,
              title: item.title,
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.candidateName)}&background=7C3AED&color=fff`,
              location: item.location || 'Remote',
              experienceYears: 4,
              expectedSalary: '₹12,00,000 INR',
              skills: item.skills || ['Python', 'FastAPI'],
              profileUnlockedByRecruiters: ['rec_1'],
              resumeDownloadedByRecruiters: [] as string[],
              resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
            };

            const isProfileUnlocked = (cand.profileUnlockedByRecruiters || []).includes(currentRecruiterId);
            const isResumeDownloaded = ((cand as any).resumeDownloadedByRecruiters || []).includes(currentRecruiterId);

            return (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-purple-300 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={cand.avatar}
                      alt={item.candidateName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base">{item.candidateName}</h3>
                        <span className="text-xs font-semibold text-brand-blue-700">• {item.title}</span>
                        <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-purple-600" /> Shortlisted
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location || 'Remote'}</span>
                        <span>• Experience: {item.experience || '3+ Years'}</span>
                        <span>• Shortlisted: <strong className="text-purple-700">{item.shortlistedAt}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {isProfileUnlocked ? (
                      <span className="px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Profile Unlocked
                      </span>
                    ) : (
                      <button
                        onClick={() => handleViewProfile(item.candidateId, item.candidateName)}
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
                        onClick={() => showToast(`Opening resume download link for ${item.candidateName}...`)}
                        className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" /> Download Resume (Unlocked)
                      </a>
                    ) : (
                      <button
                        onClick={() => handleDownloadResume(item.candidateId, item.candidateName)}
                        className="px-4 py-2 text-xs font-bold text-brand-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl flex items-center gap-1.5"
                      >
                        <Download className="w-4 h-4" /> Download Resume (1 Credit)
                      </button>
                    )}

                    <button
                      onClick={() => navigate('/recruiter/interviews')}
                      className="px-3.5 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Schedule Interview
                    </button>

                    <button
                      onClick={() => handleRemoveShortlist({ id: item.candidateId, name: item.candidateName, email: item.candidateEmail, title: item.title })}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="Remove candidate from shortlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Skills */}
                {item.skills && item.skills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {item.skills.map((s) => (
                      <span key={s} className="px-2.5 py-1 bg-purple-50 text-purple-900 border border-purple-200/60 rounded-lg text-xs font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
