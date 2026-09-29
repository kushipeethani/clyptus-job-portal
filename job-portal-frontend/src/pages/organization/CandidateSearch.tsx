import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  UserSearch, 
  Sparkles, 
  Search, 
  Filter, 
  Coins, 
  MapPin, 
  CheckCircle2, 
  Lock, 
  Eye, 
  Download,
  Briefcase 
} from 'lucide-react';
import { OrgRole } from '../../types/organization.types';
import { logAction, getStoreCreditAccount, saveStoreCreditAccount, getStoreCreditTransactions, saveStoreCreditTransactions } from '../../store/clyptus.store';

interface ContextType {
  currentRole: OrgRole;
  tokensBalance: number;
  setTokensBalance: React.Dispatch<React.SetStateAction<number>>;
  showToast: (msg: string) => void;
}

const SEARCH_CANDIDATES = [
  {
    id: 'cand_101',
    name: 'Aarav Sharma',
    headline: 'Senior Python & FastAPI Engineer',
    location: 'Hyderabad',
    experienceYears: 4,
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Redis'],
    unlocked: false,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
    summary: '4+ years building high-performance REST microservices with FastAPI, PostgreSQL, and Redis.'
  },
  {
    id: 'cand_102',
    name: 'Ananya Patel',
    headline: 'Full Stack React & Node.js Specialist',
    location: 'Bengaluru',
    experienceYears: 3,
    skills: ['React', 'TypeScript', 'Vite', 'Node.js', 'Tailwind CSS'],
    unlocked: false,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    summary: 'Specialized in building responsive React & TypeScript frontend applications and state management.'
  },
  {
    id: 'cand_103',
    name: 'Vikramaditya Rao',
    headline: 'Backend Python & Cloud Engineer',
    location: 'Mumbai',
    experienceYears: 5,
    skills: ['Python', 'Django', 'FastAPI', 'AWS', 'PostgreSQL', 'Redis'],
    unlocked: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    summary: '5+ years architecting scalable cloud backends, AWS deployment pipelines, and database optimization.'
  }
];

export const CandidateSearch: React.FC = () => {
  const { currentRole, tokensBalance, setTokensBalance, showToast } = useOutletContext<ContextType>();
  const [candidatesList, setCandidatesList] = useState(SEARCH_CANDIDATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [expFilter, setExpFilter] = useState<'ALL' | '3+' | '5+' | '8+'>('ALL');
  const [unlockFilter, setUnlockFilter] = useState<'ALL' | 'UNLOCKED' | 'LOCKED'>('ALL');

  const [downloadedResumeIds, setDownloadedResumeIds] = useState<string[]>([]);

  // Filter candidates dynamically based on search query, experience, and unlock state
  const filteredCandidates = candidatesList.filter((cand) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      cand.name.toLowerCase().includes(query) ||
      cand.headline.toLowerCase().includes(query) ||
      cand.location.toLowerCase().includes(query) ||
      cand.skills.some(s => s.toLowerCase().includes(query)) ||
      cand.summary.toLowerCase().includes(query);

    const matchesExp = expFilter === 'ALL' || 
      (expFilter === '3+' && cand.experienceYears >= 3) ||
      (expFilter === '5+' && cand.experienceYears >= 5) ||
      (expFilter === '8+' && cand.experienceYears >= 8);

    const matchesUnlocked = unlockFilter === 'ALL' || 
      (unlockFilter === 'UNLOCKED' && cand.unlocked) ||
      (unlockFilter === 'LOCKED' && !cand.unlocked);

    return matchesQuery && matchesExp && matchesUnlocked;
  });

  const handleUnlockProfile = (id: string, name: string) => {
    const acc = getStoreCreditAccount();
    if (acc.balance < 1) {
      alert('Insufficient credits! Super Admin / Admin must allocate or purchase more credits.');
      return;
    }

    const newAcc = { ...acc, balance: acc.balance - 1, totalConsumed: (acc.totalConsumed || 0) + 1 };
    saveStoreCreditAccount(newAcc);
    setTokensBalance(newAcc.balance);

    setCandidatesList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unlocked: true } : c))
    );

    logAction(
      (currentRole as string) === 'SUPER_ADMIN' || (currentRole as string) === 'OWNER' ? 'Organization Super Admin' : 'Marcus Vance (Organization Admin)',
      (currentRole as string) || 'ORGANIZATION_ADMIN',
      'PROFILE_VIEWED',
      'CandidateProfile',
      id,
      'TOKEN',
      `Viewed full candidate profile for ${name}. Deducted 1 credit. Remaining org balance: ${newAcc.balance} credits.`
    );

    showToast(`Unlocked full candidate profile for ${name}! (-1 Credit)`);
  };

  const handleDownloadResume = (id: string, name: string) => {
    const acc = getStoreCreditAccount();
    if (acc.balance < 1) {
      alert('Insufficient credits! Super Admin / Admin must allocate or purchase more credits.');
      return;
    }

    const newAcc = { ...acc, balance: acc.balance - 1, totalConsumed: (acc.totalConsumed || 0) + 1 };
    saveStoreCreditAccount(newAcc);
    setTokensBalance(newAcc.balance);

    setDownloadedResumeIds((prev) => [...prev, id]);

    logAction(
      (currentRole as string) === 'SUPER_ADMIN' || (currentRole as string) === 'OWNER' ? 'Organization Super Admin' : 'Marcus Vance (Organization Admin)',
      (currentRole as string) || 'ORGANIZATION_ADMIN',
      'RESUME_DOWNLOADED',
      'ResumeFile',
      id,
      'TOKEN',
      `Downloaded candidate resume for ${name}. Deducted 1 credit. Remaining org balance: ${newAcc.balance} credits.`
    );

    showToast(`Downloaded candidate resume for ${name}! (-1 Credit)`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">AI Candidate Search</h2>
          <p className="text-xs text-slate-500">Search verified candidate profiles, filter by experience & skills, unlock profiles, and download resumes</p>
        </div>

        <div className="flex items-center gap-2 bg-orange-50 px-3.5 py-1.5 rounded-xl border border-orange-200 text-xs text-orange-900">
          <Coins className="w-4 h-4 text-brand-orange-500" />
          <span>Quota Rules: <strong>1 Credit / View Profile</strong> • <strong>1 Credit / Resume Download</strong></span>
        </div>
      </div>

      {/* Search Bar & Filter Controls */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search candidate name, job title, skills (React, Node.js, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
            />
          </div>
          
          <button 
            onClick={() => setSearchQuery(searchQuery)}
            className="w-full sm:w-auto px-5 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold rounded-2xl shadow-sm flex items-center justify-center gap-1.5 shrink-0"
          >
            <Search className="w-4 h-4" /> Search Candidates
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-brand-blue-600" /> Filters:
            </span>

            {/* Experience Filter */}
            <select
              value={expFilter}
              onChange={(e) => setExpFilter(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Experience Levels</option>
              <option value="3+">3+ Years Exp</option>
              <option value="5+">5+ Years Exp</option>
              <option value="8+">8+ Years Exp</option>
            </select>

            {/* Profile State Filter */}
            <select
              value={unlockFilter}
              onChange={(e) => setUnlockFilter(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Profiles</option>
              <option value="UNLOCKED">Unlocked Profiles</option>
              <option value="LOCKED">Locked Profiles</option>
            </select>
          </div>

          <span className="text-xs font-extrabold text-slate-600">
            Showing <strong className="text-brand-blue-700">{filteredCandidates.length}</strong> of {candidatesList.length} candidates
          </span>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="space-y-4">
        {filteredCandidates.map((cand) => (
          <div key={cand.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-brand-blue-300 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex items-center gap-4">
                <img
                  src={cand.avatar}
                  alt={cand.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-blue-500 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{cand.name}</h3>
                    {cand.unlocked && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Unlocked
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-brand-blue-700">{cand.headline}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {cand.location} • {cand.experienceYears} Years Experience
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {cand.unlocked ? (
                  <span className="px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Profile Unlocked
                  </span>
                ) : (
                  <button
                    onClick={() => handleUnlockProfile(cand.id, cand.name)}
                    className="px-4 py-2 text-xs font-bold text-white bg-brand-orange-500 hover:bg-brand-orange-600 rounded-xl shadow-xs flex items-center gap-1.5"
                  >
                    <Lock className="w-4 h-4" /> View Profile (1 Credit)
                  </button>
                )}

                {downloadedResumeIds.includes(cand.id) ? (
                  <a
                    href="https://clyptus-resumes-s3.bucket/sample_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => showToast(`Opening downloaded resume for ${cand.name}...`)}
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

            {/* AI Summary */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-brand-orange-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">AI Resume Parser Summary:</strong> {cand.summary}
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {cand.skills.map((s) => (
                <span key={s} className="px-2.5 py-1 bg-blue-50 text-brand-blue-700 border border-blue-200 rounded-lg text-xs font-bold">
                  {s}
                </span>
              ))}
            </div>

          </div>
        ))}

        {filteredCandidates.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-300 space-y-2">
            <UserSearch className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="font-bold text-slate-800 text-sm">No candidates match your search filter</h4>
            <p className="text-xs text-slate-500">Try adjusting your search terms or experience filters.</p>
          </div>
        )}
      </div>

    </div>
  );
};
