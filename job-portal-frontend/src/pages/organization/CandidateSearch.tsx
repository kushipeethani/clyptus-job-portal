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
  Briefcase 
} from 'lucide-react';
import { OrgRole } from '../../types/organization.types';
import { logAction } from '../../store/clyptus.store';

interface ContextType {
  currentRole: OrgRole;
  tokensBalance: number;
  setTokensBalance: React.Dispatch<React.SetStateAction<number>>;
  showToast: (msg: string) => void;
}

const SEARCH_CANDIDATES = [
  {
    id: 'db_cand_1',
    name: 'David K. Miller',
    headline: 'Senior Backend Architect (Node.js, NestJS, Redis, PostgreSQL)',
    location: 'San Francisco, CA',
    experienceYears: 8,
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker'],
    unlocked: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    summary: '8+ years architecting high-concurrency microservices and real-time backend queues. Expert in NestJS modular monolith design.'
  },
  {
    id: 'db_cand_2',
    name: 'Jessica Zhang',
    headline: 'Frontend Engineer (React 18, TypeScript, Tailwind CSS)',
    location: 'Remote / New York',
    experienceYears: 5,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'TanStack Query', 'Zustand'],
    unlocked: false,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    summary: 'Specialized in ultra-responsive UI component libraries, glassmorphism design, and state architecture.'
  },
  {
    id: 'db_cand_3',
    name: 'Michael O\'Connor',
    headline: 'AI / Machine Learning Engineer (Gemini API, Python, PyTorch)',
    location: 'Austin, TX',
    experienceYears: 6,
    skills: ['Python', 'Gemini API', 'PyTorch', 'OpenSearch', 'Vector Indexing'],
    unlocked: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    summary: 'Focuses on integrating large language models into enterprise SaaS products for automated parsing.'
  }
];

export const CandidateSearch: React.FC = () => {
  const { currentRole, tokensBalance, setTokensBalance, showToast } = useOutletContext<ContextType>();
  const [candidatesList, setCandidatesList] = useState(SEARCH_CANDIDATES);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUnlockProfile = (id: string, name: string) => {
    if (tokensBalance < 10) {
      alert('Insufficient tokens! Super Admin / Admin must allocate or purchase more tokens.');
      return;
    }
    setTokensBalance((prev) => prev - 10);
    setCandidatesList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unlocked: true } : c))
    );

    logAction(
      (currentRole as string) === 'SUPER_ADMIN' || (currentRole as string) === 'OWNER' ? 'Organization Super Admin' : 'Marcus Vance (Organization Admin)',
      (currentRole as string) || 'ORGANIZATION_ADMIN',
      'PROFILE_VIEWED',
      'CandidateProfile',
      id,
      'CANDIDATE',
      `Unlocked full candidate profile & resume for ${name}. Deducted 10 tokens.`
    );

    showToast(`Unlocked full candidate profile for ${name}! 10 tokens deducted.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">AI Candidate Database Search</h2>
          <p className="text-xs text-slate-500">Search 50,000+ verified candidates across tech, product, and AI roles</p>
        </div>

        <div className="flex items-center gap-2 bg-orange-50 px-3.5 py-1.5 rounded-xl border border-orange-200 text-xs text-orange-900">
          <Coins className="w-4 h-4 text-brand-orange-500" />
          <span>Profile Unlock Cost: <strong>10 Tokens</strong></span>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by job title, skills (e.g. React, NestJS, Gemini API)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
          />
        </div>
        <button className="w-full sm:w-auto px-5 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold rounded-2xl shadow-sm flex items-center justify-center gap-1.5">
          <Search className="w-4 h-4" /> Search Database
        </button>
      </div>

      {/* Candidate Cards Grid */}
      <div className="space-y-4">
        {candidatesList.map((cand) => (
          <div key={cand.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
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

              <div>
                {cand.unlocked ? (
                  <button className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> View Full Resume & Contact
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnlockProfile(cand.id, cand.name)}
                    className="px-4 py-2 text-xs font-bold text-white bg-brand-orange-500 hover:bg-brand-orange-600 rounded-xl shadow-xs flex items-center gap-1.5"
                  >
                    <Lock className="w-4 h-4" /> Unlock Profile (10 Tokens)
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
      </div>

    </div>
  );
};
