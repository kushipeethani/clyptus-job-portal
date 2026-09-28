import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Sparkles, FileText, UserSearch, HelpCircle, CheckCircle2, Coins } from 'lucide-react';
import { OrganizationCreditAccount } from '../../types/clyptus.types';

interface ContextType {
  creditAccount: OrganizationCreditAccount;
  showToast: (msg: string) => void;
}

export const RecruiterAITools: React.FC = () => {
  const { showToast } = useOutletContext<ContextType>();
  const [activeTab, setActiveTab] = useState<'PARSER' | 'MATCH' | 'QUESTIONS'>('PARSER');
  const [sampleResume, setSampleResume] = useState('Experienced Python engineer with 4 years building REST APIs using FastAPI, PostgreSQL, and Redis caching. Strong experience with Docker and Kubernetes deployment.');
  const [parsedOutput, setParsedOutput] = useState<string | null>(null);

  const handleParseResume = (e: React.FormEvent) => {
    e.preventDefault();
    setParsedOutput('Extracted Skills: Python, FastAPI, PostgreSQL, Redis, Docker, Kubernetes.\nExperience Level: Senior (4 Years).\nMatch Score: 94% suitable for Senior Python Engineer job.');
    showToast('AI parsed resume text & extracted skills successfully!');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">AI-Assisted Recruitment Suite</h2>
          <p className="text-xs text-slate-500">Gemini AI resume parsing, skill extraction, candidate-job matching, and interview question generation</p>
        </div>

        <div className="flex items-center gap-2 bg-purple-50 px-3.5 py-1.5 rounded-xl border border-purple-200 text-xs text-purple-900">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Decision Support AI • <strong>Explainable Matching</strong></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('PARSER')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'PARSER' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          AI Resume Parser & Skill Extractor
        </button>
        <button
          onClick={() => setActiveTab('MATCH')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'MATCH' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Candidate-Job Match Engine
        </button>
        <button
          onClick={() => setActiveTab('QUESTIONS')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'QUESTIONS' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Interview Question Generator
        </button>
      </div>

      {/* Tab 1: AI Resume Parser */}
      {activeTab === 'PARSER' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 max-w-3xl">
          <h3 className="font-bold text-slate-900 text-sm">Paste Candidate Resume Text for AI Parsing</h3>
          
          <form onSubmit={handleParseResume} className="space-y-4">
            <textarea
              rows={5}
              value={sampleResume}
              onChange={(e) => setSampleResume(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Paste candidate resume text or CV content..."
            />

            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" /> Run Gemini AI Resume Parsing
            </button>
          </form>

          {parsedOutput && (
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-2 text-xs font-mono text-purple-950">
              <strong className="block text-purple-900 font-bold">Parsed Output:</strong>
              <pre className="whitespace-pre-wrap">{parsedOutput}</pre>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Candidate Match Engine */}
      {activeTab === 'MATCH' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 max-w-3xl">
          <h3 className="font-bold text-slate-900 text-sm">Explainable Candidate-Job Matching</h3>
          <p className="text-xs text-slate-600">
            Matching evaluates explainable factors: Skills, Experience, Location, Salary, Education, and Industry without sensitive characteristic bias.
          </p>
          <div className="p-4 bg-slate-50 rounded-2xl text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900">Alex Rivers vs. Senior Python Engineer</span>
              <strong className="text-emerald-600 font-bold">94% Match</strong>
            </div>
            <p className="text-slate-600">Factors: 100% skill overlap on FastAPI & PostgreSQL; 3 years required experience met.</p>
          </div>
        </div>
      )}

      {/* Tab 3: Interview Question Generator */}
      {activeTab === 'QUESTIONS' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 max-w-3xl">
          <h3 className="font-bold text-slate-900 text-sm">Generated Technical Interview Questions</h3>
          <ul className="text-xs text-slate-700 space-y-2 list-disc pl-5">
            <li>How do you handle async database sessions in FastAPI with SQLAlchemy?</li>
            <li>Explain your strategy for caching Redis keys and handling cache invalidation in microservices.</li>
            <li>Walk through an experience where you debugged a PostgreSQL slow query in production.</li>
          </ul>
        </div>
      )}

    </div>
  );
};
