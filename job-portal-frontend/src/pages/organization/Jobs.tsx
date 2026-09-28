import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  Sparkles, 
  Search, 
  PlusCircle, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronRight,
  MapPin,
  Coins,
  FileText,
  UserCheck
} from 'lucide-react';
import { OrgRole, CandidateApplication, ApplicationStage } from '../../types/organization.types';
import { Job } from '../../types/clyptus.types';
import { INITIAL_JOBS, INITIAL_CANDIDATES } from '../../store/organization.store';

interface ContextType {
  currentRole: OrgRole;
  tokensBalance: number;
  jobs?: Job[];
  showToast: (msg: string) => void;
}

const STAGES: { key: ApplicationStage; label: string; color: string }[] = [
  { key: 'APPLIED', label: 'Applied', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { key: 'SCREENING', label: 'Screening', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'SHORTLISTED', label: 'Shortlisted (AI 85%+)', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { key: 'INTERVIEW_SCHEDULED', label: 'Interview Scheduled', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { key: 'OFFER_EXTENDED', label: 'Offer Extended', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { key: 'HIRED', label: 'Hired', color: 'bg-green-100 text-green-800 border-green-300' },
];

export const Jobs: React.FC = () => {
  const context = useOutletContext<ContextType>();
  const showToast = context?.showToast || ((msg: string) => alert(msg));
  
  const [jobsList, setJobsList] = useState<any[]>(INITIAL_JOBS);
  const [candidates, setCandidates] = useState<CandidateApplication[]>(INITIAL_CANDIDATES);
  const [selectedJobId, setSelectedJobId] = useState<string>('job_101');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateApplication | null>(null);

  // Fetch jobs from backend API or context
  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/jobs');
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        setJobsList(json.data);
        if (!json.data.find((j: any) => j.id === selectedJobId)) {
          setSelectedJobId(json.data[0].id);
        }
      } else if (context?.jobs && context.jobs.length > 0) {
        setJobsList(context.jobs);
      }
    } catch (err) {
      if (context?.jobs && context.jobs.length > 0) {
        setJobsList(context.jobs);
      }
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [context?.jobs]);

  const activeJob = jobsList.find((j) => j.id === selectedJobId) || jobsList[0] || INITIAL_JOBS[0];
  const jobCandidates = candidates.filter((c) => c.jobId === selectedJobId);

  const handleStageChange = (candId: string, newStage: ApplicationStage) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candId ? { ...c, stage: newStage } : c))
    );
    showToast(`Updated candidate stage to ${newStage.replace('_', ' ')}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Job Pipeline & Candidate ATS</h2>
          <p className="text-xs text-slate-500">Manage active postings, candidate evaluation stages, and AI resume match scores</p>
        </div>

        {/* Job selector tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {jobsList.map((job) => (
            <button
              key={job.id}
              onClick={() => setSelectedJobId(job.id)}
              className={`px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all border ${
                selectedJobId === job.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {job.title} ({candidates.filter(c => c.jobId === job.id).length})
            </button>
          ))}
        </div>
      </div>

      {/* Selected Job Header Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-brand-blue-700">
              {activeJob.department || 'Engineering'}
            </span>
            <span className="text-xs text-slate-500">• Posted by {activeJob.recruiterName || 'Elena Rostova'}</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">{activeJob.title}</h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-brand-blue-600" /> {activeJob.location}</span>
            <span>• Work Mode: <strong>{activeJob.workMode}</strong></span>
            <span>• Experience: <strong>{activeJob.experience || '1–3 Years'}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
            Edit Job
          </button>
          <button className="px-3.5 py-2 text-xs font-bold text-white bg-brand-orange-500 hover:bg-brand-orange-600 rounded-xl shadow-xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> AI Batch Parse Resumes (5 pts)
          </button>
        </div>
      </div>

      {/* Kanban ATS Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {STAGES.map((stage) => {
          const stageCandidates = jobCandidates.filter((c) => c.stage === stage.key);

          return (
            <div key={stage.key} className="bg-slate-100/70 p-3 rounded-2xl border border-slate-200/80 flex flex-col min-h-[450px]">
              
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full border ${stage.color}`}>
                  {stage.label}
                </span>
                <span className="text-xs font-extrabold text-slate-600">{stageCandidates.length}</span>
              </div>

              {/* Candidate Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {stageCandidates.map((cand) => (
                  <div
                    key={cand.id}
                    onClick={() => setSelectedCandidate(cand)}
                    className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs hover:border-brand-blue-500 hover:shadow-md transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={cand.avatar}
                        alt={cand.candidateName}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-slate-900 truncate group-hover:text-brand-blue-600">
                          {cand.candidateName}
                        </div>
                        <div className="text-[10px] text-slate-500">{cand.experienceYears} yrs exp</div>
                      </div>
                    </div>

                    {/* AI Score Badge */}
                    <div className="flex items-center justify-between bg-orange-50/80 px-2 py-1 rounded-lg border border-orange-100 text-[10px]">
                      <span className="font-bold text-orange-800 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-brand-orange-500" /> Match Score
                      </span>
                      <span className="font-extrabold text-brand-orange-600">{cand.matchScore}%</span>
                    </div>

                    {cand.interviewDate && (
                      <div className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-purple-600" /> {cand.interviewDate}
                      </div>
                    )}

                    {/* Stage transition drop selection */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Move:</span>
                      <select
                        value={cand.stage}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleStageChange(cand.id, e.target.value as ApplicationStage)}
                        className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-bold text-slate-700 text-[10px] focus:outline-none"
                      >
                        {STAGES.map((s) => (
                          <option key={s.key} value={s.key}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {stageCandidates.length === 0 && (
                  <div className="h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-center p-3 text-[11px] text-slate-400">
                    No candidates in this stage
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCandidate.avatar}
                  alt={selectedCandidate.candidateName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-orange-500"
                />
                <div>
                  <h3 className="font-bold text-lg">{selectedCandidate.candidateName}</h3>
                  <p className="text-xs text-slate-300">{selectedCandidate.candidateEmail} • {selectedCandidate.candidatePhone}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-orange-900">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-orange-500" /> Gemini AI Resume Summary
                  </span>
                  <span className="px-2.5 py-0.5 bg-brand-orange-500 text-white rounded-full text-xs">
                    {selectedCandidate.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed pt-1">
                  {selectedCandidate.aiSummary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Technical Skills & Expertise</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-blue-50 text-brand-blue-700 border border-blue-200 rounded-lg text-xs font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Experience</span>
                  <span className="font-extrabold text-slate-900">{selectedCandidate.experienceYears} Years</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Expected Salary</span>
                  <span className="font-extrabold text-slate-900">{selectedCandidate.expectedSalary}</span>
                </div>
              </div>

              {selectedCandidate.recruiterNotes && (
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-500 mb-1">Recruiter Notes</h4>
                  <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-800 font-medium">
                    {selectedCandidate.recruiterNotes}
                  </div>
                </div>
              )}

            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Current Stage: {selectedCandidate.stage}</span>
              <button
                onClick={() => {
                  handleStageChange(selectedCandidate.id, 'INTERVIEW_SCHEDULED');
                  setSelectedCandidate(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" /> Schedule Interview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
