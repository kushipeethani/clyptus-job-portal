import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { RecruiterHeader } from './RecruiterHeader';
import { RecruiterSidebar } from './RecruiterSidebar';
import { INITIAL_CREDIT_ACCOUNT, INITIAL_JOBS } from '../../store/clyptus.store';
import { Job } from '../../types/clyptus.types';
import { CheckCircle2, X, PlusCircle } from 'lucide-react';

export const RecruiterLayout: React.FC = () => {
  const [creditAccount, setCreditAccount] = useState(INITIAL_CREDIT_ACCOUNT);
  const [recruiterCredits, setRecruiterCredits] = useState<number>(500);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  // Active Recruiter Session State
  const [activeRecruiter, setActiveRecruiter] = useState<{
    id: string;
    name: string;
    email: string;
    avatar: string;
  }>(() => {
    const saved = localStorage.getItem('clyptus_active_recruiter');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      id: 'rec_1',
      name: 'Elena Rostova',
      email: 'elena.r@abctech.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    };
  });

  // Fetch jobs from backend API
  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/jobs');
      const json = await res.json();
      if (json.success && json.data) {
        setJobs(json.data);
      }
    } catch (err) {
      console.warn('Backend job API offline, utilizing state.');
    }
  };

  // Fetch live recruiter quota from backend API for logged-in recruiter
  const fetchRecruiterBalance = async () => {
    try {
      const saved = localStorage.getItem('clyptus_active_recruiter');
      const currentRec = saved ? JSON.parse(saved) : activeRecruiter;
      
      const res = await fetch('http://localhost:5000/api/v1/recruiters');
      const json = await res.json();
      if (json.success && json.data) {
        const found = json.data.find(
          (r: any) => r.email.toLowerCase() === currentRec.email.toLowerCase() || r.id === currentRec.id
        );
        if (found) {
          const remaining = found.remainingBalance !== undefined ? found.remainingBalance : ((found.allocatedCredits || 50) - (found.totalCreditsUsed || 0));
          setActiveRecruiter({
            id: found.id,
            name: found.name,
            email: found.email,
            avatar: found.avatar || currentRec.avatar
          });
          setRecruiterCredits(remaining);
        } else if (currentRec) {
          const remaining = currentRec.remainingBalance !== undefined ? currentRec.remainingBalance : ((currentRec.allocatedCredits ?? 50) - (currentRec.totalCreditsUsed || 0));
          setRecruiterCredits(remaining);
        }
      }
    } catch (err) {
      if (activeRecruiter) {
        const remaining = (activeRecruiter as any).remainingBalance !== undefined ? (activeRecruiter as any).remainingBalance : 50;
        setRecruiterCredits(remaining);
      }
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchRecruiterBalance();
    const interval = setInterval(fetchRecruiterBalance, 3000);
    return () => clearInterval(interval);
  }, []);

  const [jobForm, setJobForm] = useState({
    title: '',
    department: 'Engineering',
    location: 'Hyderabad',
    experience: '1–3 Years',
    salary: '₹6–10 LPA',
    workMode: 'HYBRID' as const,
    jobType: 'FULL_TIME' as const,
    description: '',
    skills: 'Python, FastAPI, React',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();

    const newJob: Job = {
      id: `job_${Date.now()}`,
      organizationId: 'org_abc_tech',
      recruiterId: activeRecruiter.id,
      recruiterName: activeRecruiter.name,
      title: jobForm.title,
      department: jobForm.department,
      location: jobForm.location,
      experience: jobForm.experience,
      salary: jobForm.salary,
      workMode: jobForm.workMode,
      jobType: jobForm.jobType,
      status: 'PUBLISHED',
      description: jobForm.description || 'Fast-paced tech environment seeking top engineering talent.',
      responsibilities: ['Build high performance modular backend services', 'Collaborate with cross-functional product teams'],
      requirements: ['Proven track record in target technologies', 'Strong problem solving capabilities'],
      skills: jobForm.skills.split(',').map((s) => s.trim()),
      openings: 2,
      deadline: '2026-10-30',
      createdAt: new Date().toISOString().split('T')[0],
      applicationsCount: 0,
      shortlistedCount: 0,
    };

    try {
      const res = await fetch('http://localhost:5000/api/v1/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      });
      const json = await res.json();
      if (json.success) {
        fetchJobs();
      } else {
        setJobs((prev) => [newJob, ...prev]);
      }
    } catch (err) {
      setJobs((prev) => [newJob, ...prev]);
    }

    setIsJobModalOpen(false);
    showToast(`Published new job: "${jobForm.title}"!`);
    setJobForm({
      title: '',
      department: 'Engineering',
      location: 'Hyderabad',
      experience: '1–3 Years',
      salary: '₹6–10 LPA',
      workMode: 'HYBRID',
      jobType: 'FULL_TIME',
      description: '',
      skills: 'Python, FastAPI, React',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-brand-orange-500" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <RecruiterHeader 
        creditBalance={recruiterCredits} 
        activeRecruiter={activeRecruiter}
        onOpenCreateJob={() => setIsJobModalOpen(true)} 
      />

      <div className="flex flex-1 overflow-hidden">
        <RecruiterSidebar />
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
          <Outlet context={{ creditAccount, setCreditAccount, recruiterCredits, setRecruiterCredits, fetchRecruiterBalance, jobs, setJobs, showToast, activeRecruiter }} />
        </main>
      </div>

      {/* Create Job Modal */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-orange-500 text-white flex items-center justify-center">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Create & Publish Job</h3>
                  <p className="text-xs text-slate-400">Add new job posting for candidates</p>
                </div>
              </div>
              <button 
                onClick={() => setIsJobModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Python & FastAPI Architect"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={jobForm.experience}
                    onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Mode</label>
                  <select
                    value={jobForm.workMode}
                    onChange={(e) => setJobForm({ ...jobForm, workMode: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none bg-white"
                  >
                    <option value="REMOTE">Remote</option>
                    <option value="HYBRID">Hybrid</option>
                    <option value="WORK_FROM_OFFICE">Work From Office</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={jobForm.skills}
                  onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-sm"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
