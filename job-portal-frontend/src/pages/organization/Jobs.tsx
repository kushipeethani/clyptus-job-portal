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
  UserCheck,
  Edit3,
  X,
  Building2
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

  // Edit Job State for Super Admin
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    department: 'Engineering',
    location: 'Hyderabad',
    experience: '1–3 Years',
    salary: '₹6–10 LPA',
    workMode: 'HYBRID' as const,
    status: 'PUBLISHED' as const,
    description: '',
    skills: '',
  });

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

  const handleOpenEdit = (job: Job) => {
    setEditingJob(job);
    setEditForm({
      title: job.title,
      department: job.department || 'Engineering',
      location: job.location || 'Hyderabad',
      experience: job.experience || '1–3 Years',
      salary: job.salary || '₹6–10 LPA',
      workMode: (job.workMode as any) || 'HYBRID',
      status: (job.status as any) || 'PUBLISHED',
      description: job.description || '',
      skills: Array.isArray(job.skills) ? job.skills.join(', ') : 'Python, FastAPI, React',
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    const updatedJob: Job = {
      ...editingJob,
      title: editForm.title,
      department: editForm.department,
      location: editForm.location,
      experience: editForm.experience,
      salary: editForm.salary,
      workMode: editForm.workMode as any,
      status: editForm.status as any,
      description: editForm.description,
      skills: editForm.skills.split(',').map((s) => s.trim()),
    };

    try {
      const res = await fetch(`http://localhost:5000/api/v1/jobs/${editingJob.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJob),
      });
      const json = await res.json();
      if (json.success) {
        fetchJobs();
      } else {
        setJobsList((prev) => prev.map((j) => (j.id === editingJob.id ? updatedJob : j)));
      }
    } catch (err) {
      setJobsList((prev) => prev.map((j) => (j.id === editingJob.id ? updatedJob : j)));
    }

    setEditingJob(null);
    showToast(`Successfully updated job posting: "${editForm.title}"!`);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Posted Jobs & Recruiter Oversight</h2>
          <p className="text-xs text-slate-500">
            All posted jobs across the organization with recruiter attribution, feature cards, and Super Admin edit capabilities.
          </p>
        </div>
      </div>

      {/* Feature Cards Section: Posted Jobs Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-brand-blue-600" /> Organization Posted Jobs ({jobsList.length})
          </h3>
          <span className="text-xs font-semibold text-slate-500">Super Admin Edit Enabled</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobsList.map((job) => {
            const isSelected = selectedJobId === job.id;
            const count = candidates.filter((c) => c.jobId === job.id).length;
            const recruiterName = job.recruiterName || 'Elena Rostova';

            return (
              <div 
                key={job.id}
                className={`bg-white rounded-3xl p-5 border shadow-xs transition-all flex flex-col justify-between space-y-4 hover:shadow-md ${
                  isSelected ? 'border-brand-blue-500 ring-2 ring-brand-blue-500/10' : 'border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Bar: Department + Posted By + Status */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(recruiterName)}&background=4F46E5&color=fff`} 
                        alt={recruiterName} 
                        className="w-5 h-5 rounded-full object-cover border border-slate-200" 
                      />
                      <span className="text-[11px] font-semibold text-slate-600">
                        Posted by <strong className="text-slate-900">{recruiterName}</strong>
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-indigo-700 border border-indigo-100">
                      {job.department || 'Engineering'}
                    </span>
                  </div>

                  {/* Job Title */}
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base leading-tight hover:text-brand-blue-600 transition-colors">
                      {job.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {job.description || 'Fast-paced tech opening for ambitious candidates.'}
                    </p>
                  </div>

                  {/* Meta Specs */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100 font-medium text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-blue-600 shrink-0" />
                      <span className="truncate">{job.location || 'Hyderabad'}</span>
                    </div>
                    <div>Mode: <strong className="text-slate-900">{job.workMode || 'HYBRID'}</strong></div>
                    <div>Exp: <strong className="text-slate-900">{job.experience || '1–3 Years'}</strong></div>
                    <div>Salary: <strong className="text-slate-900">{job.salary || '₹6–10 LPA'}</strong></div>
                  </div>

                  {/* Skill Pills */}
                  {job.skills && Array.isArray(job.skills) && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.skills.slice(0, 4).map((skill: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(job)}
                    className="flex-1 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-500" /> Edit Job
                  </button>

                  <button
                    onClick={() => setSelectedJobId(job.id)}
                    className={`flex-1 px-3 py-2 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 ${
                      isSelected 
                        ? 'bg-brand-blue-600 text-white shadow-xs' 
                        : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                    }`}
                  >
                    ATS Pipeline ({count})
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Job Header & ATS Pipeline */}
      <div className="pt-4 border-t border-slate-200 space-y-4">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                Active ATS Inspection
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
            <button 
              onClick={() => handleOpenEdit(activeJob)}
              className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4 text-slate-500" /> Edit Post
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
      </div>

      {/* Super Admin Edit Job Modal */}
      {editingJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-brand-blue-400" />
                <h3 className="font-bold text-base">Super Admin Edit Job Posting</h3>
              </div>
              <button onClick={() => setEditingJob(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Mode</label>
                  <select
                    value={editForm.workMode}
                    onChange={(e) => setEditForm({ ...editForm, workMode: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none bg-white font-semibold"
                  >
                    <option value="REMOTE">Remote</option>
                    <option value="HYBRID">Hybrid</option>
                    <option value="WORK_FROM_OFFICE">Work From Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none bg-white font-semibold"
                  >
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={editForm.experience}
                    onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={editForm.salary}
                    onChange={(e) => setEditForm({ ...editForm, salary: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={editForm.skills}
                  onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                  <span className="text-xs font-extrabold text-brand-orange-600">{selectedCandidate.matchScore}% Match</span>
                </div>
                <p className="text-xs text-slate-700">{selectedCandidate.aiSummary}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs mb-1">Key Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.skills.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
