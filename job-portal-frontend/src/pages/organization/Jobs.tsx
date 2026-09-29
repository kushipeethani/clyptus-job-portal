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
  Building2,
  BarChart3,
  PlayCircle,
  StopCircle,
  RefreshCw,
  UserPlus,
  Eye,
  Filter
} from 'lucide-react';
import { OrgRole, CandidateApplication, ApplicationStage } from '../../types/organization.types';
import { Job, RecruiterUser } from '../../types/clyptus.types';
import { INITIAL_JOBS, INITIAL_CANDIDATES } from '../../store/organization.store';
import { getStoreJobs, saveStoreJobs, createJobInStore, updateJobInStore, getStoreRecruiters } from '../../store/clyptus.store';

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

  // Store state
  const [jobsList, setJobsList] = useState<Job[]>(getStoreJobs());
  const [recruiters, setRecruiters] = useState<RecruiterUser[]>(getStoreRecruiters());
  const [candidates, setCandidates] = useState<CandidateApplication[]>(INITIAL_CANDIDATES);
  const [selectedJobId, setSelectedJobId] = useState<string>('job_201');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateApplication | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT' | 'CLOSED'>('ALL');
  const [departmentFilter, setDepartmentFilter] = useState<string>('ALL');

  // Create Job Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    title: '',
    department: 'Engineering',
    location: 'Hyderabad',
    experience: '1–3 Years',
    salary: '₹8–12 LPA',
    workMode: 'HYBRID' as const,
    jobType: 'FULL_TIME' as const,
    status: 'PUBLISHED' as const,
    description: '',
    skills: 'Python, React, FastAPI, PostgreSQL',
    recruiterId: 'rec_1',
    openings: 2,
    deadline: '2026-10-31'
  });

  // Edit Job Modal State
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    department: 'Engineering',
    location: 'Hyderabad',
    experience: '1–3 Years',
    salary: '₹6–10 LPA',
    workMode: 'HYBRID' as const,
    jobType: 'FULL_TIME' as const,
    status: 'PUBLISHED' as const,
    description: '',
    skills: '',
    recruiterId: 'rec_1',
    openings: 2,
    deadline: '2026-10-31'
  });

  // Job Analysis Modal State
  const [analysisJob, setAnalysisJob] = useState<Job | null>(null);

  // Re-sync store jobs
  const syncStore = () => {
    setJobsList(getStoreJobs());
    setRecruiters(getStoreRecruiters());
  };

  useEffect(() => {
    syncStore();

    const handleStoreChange = () => {
      syncStore();
    };
    window.addEventListener('clyptus_store_updated', handleStoreChange);
    window.addEventListener('storage', handleStoreChange);
    return () => {
      window.removeEventListener('clyptus_store_updated', handleStoreChange);
      window.removeEventListener('storage', handleStoreChange);
    };
  }, []);

  // Filtered jobs list
  const filteredJobs = jobsList.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.department || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.recruiterName || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter;
    const matchesDept = departmentFilter === 'ALL' || job.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  const activeJob = jobsList.find((j) => j.id === selectedJobId) || jobsList[0] || INITIAL_JOBS[0];
  const jobCandidates = candidates.filter((c) => c.jobId === selectedJobId);

  const handleStageChange = (candId: string, newStage: ApplicationStage) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candId ? { ...c, stage: newStage } : c))
    );
    showToast(`Updated candidate stage to ${newStage.replace('_', ' ')}`);
  };

  // Open Edit Modal
  const handleOpenEdit = (job: Job) => {
    setEditingJob(job);
    setEditForm({
      title: job.title,
      department: job.department || 'Engineering',
      location: job.location || 'Hyderabad',
      experience: job.experience || '1–3 Years',
      salary: job.salary || '₹6–10 LPA',
      workMode: (job.workMode as any) || 'HYBRID',
      jobType: (job.jobType as any) || 'FULL_TIME',
      status: (job.status as any) || 'PUBLISHED',
      description: job.description || '',
      skills: Array.isArray(job.skills) ? job.skills.join(', ') : 'Python, FastAPI, React',
      recruiterId: job.recruiterId || 'rec_1',
      openings: job.openings || 2,
      deadline: job.deadline || '2026-10-31'
    });
  };

  // Submit Create Job
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedRecruiter = recruiters.find(r => r.id === createForm.recruiterId) || recruiters[0];
    const recName = assignedRecruiter ? assignedRecruiter.name : 'Elena Rostova';

    const newJobs = createJobInStore(
      {
        organizationId: 'org_abc_tech',
        recruiterId: createForm.recruiterId,
        recruiterName: recName,
        title: createForm.title,
        department: createForm.department,
        location: createForm.location,
        experience: createForm.experience,
        salary: createForm.salary,
        workMode: createForm.workMode,
        jobType: createForm.jobType,
        status: createForm.status,
        description: createForm.description,
        responsibilities: ['Develop scalable features', 'Collaborate with engineering lead'],
        requirements: ['3+ years relevant experience', 'Strong problem solving skills'],
        skills: createForm.skills.split(',').map((s) => s.trim()),
        openings: Number(createForm.openings),
        deadline: createForm.deadline
      },
      'Organization Admin'
    );

    setJobsList(newJobs);
    setIsCreateModalOpen(false);
    showToast(`Successfully created and assigned new job posting: "${createForm.title}"!`);

    // Reset Create Form
    setCreateForm({
      title: '',
      department: 'Engineering',
      location: 'Hyderabad',
      experience: '1–3 Years',
      salary: '₹8–12 LPA',
      workMode: 'HYBRID',
      jobType: 'FULL_TIME',
      status: 'PUBLISHED',
      description: '',
      skills: 'Python, React, FastAPI',
      recruiterId: 'rec_1',
      openings: 2,
      deadline: '2026-10-31'
    });
  };

  // Submit Save Edit Job
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    const assignedRecruiter = recruiters.find(r => r.id === editForm.recruiterId) || recruiters[0];
    const recName = assignedRecruiter ? assignedRecruiter.name : editingJob.recruiterName;

    const updated = updateJobInStore(
      editingJob.id,
      {
        title: editForm.title,
        department: editForm.department,
        location: editForm.location,
        experience: editForm.experience,
        salary: editForm.salary,
        workMode: editForm.workMode,
        jobType: editForm.jobType,
        status: editForm.status,
        description: editForm.description,
        skills: editForm.skills.split(',').map((s) => s.trim()),
        recruiterId: editForm.recruiterId,
        recruiterName: recName,
        openings: Number(editForm.openings),
        deadline: editForm.deadline
      },
      'Organization Admin'
    );

    setJobsList(updated);
    setEditingJob(null);
    showToast(`Updated job posting: "${editForm.title}"!`);
  };

  // Quick Action: Publish, Close, Reopen
  const handleQuickStatusChange = (job: Job, newStatus: 'PUBLISHED' | 'CLOSED' | 'DRAFT') => {
    const updated = updateJobInStore(
      job.id,
      { status: newStatus },
      'Organization Admin'
    );
    setJobsList(updated);

    const actionText = newStatus === 'PUBLISHED' ? 'Published/Reopened' : newStatus.toLowerCase();
    showToast(`Job "${job.title}" is now ${actionText}!`);
  };

  // Quick Action: Reassign Recruiter
  const handleQuickAssignRecruiter = (jobId: string, recruiterId: string) => {
    const rec = recruiters.find(r => r.id === recruiterId);
    if (!rec) return;

    const updated = updateJobInStore(
      jobId,
      { recruiterId: rec.id, recruiterName: rec.name },
      'Organization Admin'
    );
    setJobsList(updated);
    showToast(`Reassigned job to recruiter ${rec.name}!`);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Job Oversights & Hiring Execution</h2>
          <p className="text-xs text-slate-500">
            View all organization jobs, create & edit postings, publish or close positions, assign recruiters, and analyze hiring pipelines.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold rounded-2xl shadow-sm flex items-center gap-1.5 w-fit"
        >
          <PlusCircle className="w-4 h-4" /> Create & Post New Job
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search job title, department, or assigned recruiter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {(['ALL', 'PUBLISHED', 'DRAFT', 'CLOSED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === st
                  ? 'bg-white text-brand-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st === 'ALL' ? 'All Jobs' : st}
            </button>
          ))}
        </div>

        {/* Department Select */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Web Engineering">Web Engineering</option>
            <option value="Product & Design">Product & Design</option>
            <option value="Human Resources">Human Resources</option>
          </select>
        </div>

      </div>

      {/* Feature Cards Section: Posted Jobs Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-brand-blue-600" /> Posted Jobs Overview ({filteredJobs.length})
          </h3>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Full Admin & Recruiter Control Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => {
            const isSelected = selectedJobId === job.id;
            const count = candidates.filter((c) => c.jobId === job.id).length;
            const recruiterName = job.recruiterName || 'Elena Rostova';

            const isPublished = job.status === 'PUBLISHED';
            const isClosed = job.status === 'CLOSED';
            const isDraft = job.status === 'DRAFT';

            return (
              <div 
                key={job.id}
                className={`bg-white rounded-3xl p-5 border shadow-xs transition-all flex flex-col justify-between space-y-4 hover:shadow-md ${
                  isSelected ? 'border-brand-blue-500 ring-2 ring-brand-blue-500/10' : 'border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  
                  {/* Top Header Bar: Status Badge + Department */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-indigo-700 border border-indigo-100">
                      {job.department || 'Engineering'}
                    </span>

                    {isPublished && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Published
                      </span>
                    )}

                    {isClosed && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-200 text-slate-700 border border-slate-300 flex items-center gap-1">
                        <XCircle className="w-3 h-3 text-slate-500" /> Closed
                      </span>
                    )}

                    {isDraft && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-600" /> Draft
                      </span>
                    )}
                  </div>

                  {/* Job Title & Summary */}
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base leading-tight hover:text-brand-blue-600 transition-colors">
                      {job.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {job.description || 'High impact vacancy open for qualified talent.'}
                    </p>
                  </div>

                  {/* Recruiter Assignment Row */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-brand-blue-600" /> Assigned Recruiter
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(recruiterName)}&background=4F46E5&color=fff`} 
                          alt={recruiterName} 
                          className="w-6 h-6 rounded-full object-cover border border-slate-300" 
                        />
                        <strong className="text-xs text-slate-900 font-bold">{recruiterName}</strong>
                      </div>

                      {/* Quick Assign Dropdown */}
                      <select
                        value={job.recruiterId || ''}
                        onChange={(e) => handleQuickAssignRecruiter(job.id, e.target.value)}
                        className="text-[10px] font-bold bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none"
                        title="Reassign job to another recruiter"
                      >
                        {recruiters.map((r) => (
                          <option key={r.id} value={r.id}>
                            Reassign to: {r.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Meta Specs */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50/70 p-3 rounded-2xl border border-slate-100 font-medium text-slate-600">
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
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  
                  {/* Status Toggle Controls (Publish, Close, Reopen) & Edit */}
                  <div className="flex items-center gap-2">
                    {isPublished && (
                      <button
                        onClick={() => handleQuickStatusChange(job, 'CLOSED')}
                        className="flex-1 px-3 py-1.5 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                        title="Close this job posting"
                      >
                        <StopCircle className="w-3.5 h-3.5" /> Close Job
                      </button>
                    )}

                    {isClosed && (
                      <button
                        onClick={() => handleQuickStatusChange(job, 'PUBLISHED')}
                        className="flex-1 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                        title="Reopen job posting"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Reopen Job
                      </button>
                    )}

                    {isDraft && (
                      <button
                        onClick={() => handleQuickStatusChange(job, 'PUBLISHED')}
                        className="flex-1 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                        title="Publish job posting live"
                      >
                        <PlayCircle className="w-3.5 h-3.5" /> Publish Live
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenEdit(job)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                      title="Edit job details"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-500" /> Edit
                    </button>
                  </div>

                  {/* Secondary Card Buttons: Job Analysis */}
                  <div>
                    <button
                      onClick={() => setAnalysisJob(job)}
                      className="w-full px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-purple-600" /> Job Analysis & Hiring Diagnostics
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>



      {/* Create Job Posting Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-brand-blue-400" />
                <h3 className="font-bold text-base">Create & Publish New Job Posting</h3>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead React Developer"
                  value={createForm.title}
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={createForm.department}
                    onChange={(e) => setCreateForm({ ...createForm, department: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={createForm.location}
                    onChange={(e) => setCreateForm({ ...createForm, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Assign Recruiter Dropdown */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
                <label className="block text-xs font-extrabold text-blue-900">Assign Job to Recruiter</label>
                <select
                  value={createForm.recruiterId}
                  onChange={(e) => setCreateForm({ ...createForm, recruiterId: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-blue-300 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                >
                  {recruiters.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.recruiterRole || 'Tech Recruiter'}) — {r.email}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Mode</label>
                  <select
                    value={createForm.workMode}
                    onChange={(e) => setCreateForm({ ...createForm, workMode: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:outline-none"
                  >
                    <option value="REMOTE">Remote</option>
                    <option value="HYBRID">Hybrid</option>
                    <option value="WORK_FROM_OFFICE">Work From Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Job Type</label>
                  <select
                    value={createForm.jobType}
                    onChange={(e) => setCreateForm({ ...createForm, jobType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:outline-none"
                  >
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={createForm.status}
                    onChange={(e) => setCreateForm({ ...createForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:outline-none text-emerald-800"
                  >
                    <option value="PUBLISHED">PUBLISHED (Live)</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={createForm.experience}
                    onChange={(e) => setCreateForm({ ...createForm, experience: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Salary Budget</label>
                  <input
                    type="text"
                    value={createForm.salary}
                    onChange={(e) => setCreateForm({ ...createForm, salary: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  required
                  value={createForm.skills}
                  onChange={(e) => setCreateForm({ ...createForm, skills: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide role expectations, responsibilities, and requirements..."
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-sm"
                >
                  Create & Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {editingJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-brand-blue-400" />
                <h3 className="font-bold text-base">Edit Job Posting & Recruiter Assignment</h3>
              </div>
              <button onClick={() => setEditingJob(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none font-semibold"
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
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Assign Recruiter Dropdown */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
                <label className="block text-xs font-extrabold text-blue-900">Assigned Recruiter</label>
                <select
                  value={editForm.recruiterId}
                  onChange={(e) => setEditForm({ ...editForm, recruiterId: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-blue-300 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                >
                  {recruiters.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.recruiterRole || 'Tech Recruiter'}) — {r.email}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Mode</label>
                  <select
                    value={editForm.workMode}
                    onChange={(e) => setEditForm({ ...editForm, workMode: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none bg-white font-semibold"
                  >
                    <option value="REMOTE">Remote</option>
                    <option value="HYBRID">Hybrid</option>
                    <option value="WORK_FROM_OFFICE">Work From Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status (Publish, Close, Draft)</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none bg-white font-bold text-slate-800"
                  >
                    <option value="PUBLISHED">PUBLISHED (Active & Live)</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="CLOSED">CLOSED (Hiring Finished)</option>
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
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={editForm.salary}
                    onChange={(e) => setEditForm({ ...editForm, salary: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={editForm.skills}
                  onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
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

      {/* Job Analysis Modal */}
      {analysisJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">{analysisJob.title} — Hiring Analysis</h3>
                  <p className="text-xs text-slate-300">{analysisJob.department} • Assigned to {analysisJob.recruiterName || 'Elena Rostova'}</p>
                </div>
              </div>
              <button onClick={() => setAnalysisJob(null)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Top Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-1">
                  <span className="text-[10px] font-bold text-blue-700 uppercase">Total Applicants</span>
                  <div className="text-2xl font-black text-blue-900">
                    {candidates.filter(c => c.jobId === analysisJob.id).length || analysisJob.applicationsCount || 24}
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 space-y-1">
                  <span className="text-[10px] font-bold text-orange-700 uppercase">Shortlisted Rate</span>
                  <div className="text-2xl font-black text-orange-900">
                    {analysisJob.shortlistedCount || 6} (25%)
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-1">
                  <span className="text-[10px] font-bold text-purple-700 uppercase">Interviews Conducted</span>
                  <div className="text-2xl font-black text-purple-900">4</div>
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Status & Mode</span>
                  <div className="text-lg font-black text-emerald-900 uppercase">
                    {analysisJob.status} ({analysisJob.workMode})
                  </div>
                </div>
              </div>

              {/* Analysis Insights */}
              <div className="p-5 bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-3xl space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-purple-400" /> AI Hiring Funnel Diagnostics
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Job posting <strong>"{analysisJob.title}"</strong> has strong candidate traction with an average AI match score of <strong>88%</strong>. Assigned recruiter <strong>{analysisJob.recruiterName || 'Elena Rostova'}</strong> has actively screened applicants and scheduled initial technical rounds.
                </p>
              </div>

              {/* Recruiter Attribution Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Recruiter Attribution & Quota</h4>
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-brand-blue-600" /> Assigned Recruiter: <strong>{analysisJob.recruiterName || 'Elena Rostova'}</strong>
                  </span>
                  <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 font-bold rounded-full text-[10px]">
                    ID: {analysisJob.recruiterId || 'rec_1'}
                  </span>
                </div>
              </div>

            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setAnalysisJob(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Close Analysis
              </button>
            </div>

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
