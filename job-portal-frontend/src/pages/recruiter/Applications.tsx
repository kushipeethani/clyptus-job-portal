import React, { useState } from 'react';
import { 
  FileCheck, 
  Search, 
  Filter, 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Briefcase, 
  Building, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Tag
} from 'lucide-react';
import { INITIAL_CANDIDATES, INITIAL_APPLICATIONS } from '../../store/clyptus.store';

export const RecruiterApplications: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'table' | 'kanban'>('kanban');

  const stages = [
    { name: 'All', count: 18, color: 'bg-slate-100 text-slate-700' },
    { name: 'New Applications', count: 5, color: 'bg-blue-100 text-blue-800' },
    { name: 'Screening', count: 4, color: 'bg-indigo-100 text-indigo-800' },
    { name: 'Shortlisted', count: 3, color: 'bg-purple-100 text-purple-800' },
    { name: 'Interview', count: 3, color: 'bg-amber-100 text-amber-800' },
    { name: 'Offer', count: 2, color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Hired', count: 1, color: 'bg-teal-100 text-teal-800' }
  ];

  // Extended application view mock data
  const mockApplications = [
    {
      id: 'APP-9021',
      candidateName: 'Dr. Aris Thorne',
      role: 'Principal AI Researcher',
      stage: 'Interview',
      matchScore: 98,
      appliedDate: '2 hours ago',
      experience: '11 Years',
      location: 'Bangalore, India (Hybrid)',
      skills: ['PyTorch', 'Transformer Architecture', 'LLM Fine-Tuning'],
      resumeUrl: '#',
      lastNote: 'Passed technical round 1 with distinction. Scheduled for system design.'
    },
    {
      id: 'APP-9022',
      candidateName: 'Sophia Lin',
      role: 'Staff React Systems Architect',
      stage: 'Screening',
      matchScore: 94,
      appliedDate: '1 day ago',
      experience: '8 Years',
      location: 'Remote',
      skills: ['TypeScript', 'Next.js', 'WebAssembly', 'State Machines'],
      resumeUrl: '#',
      lastNote: 'Screened by AI parser. High compatibility on modular CSS & React performance.'
    },
    {
      id: 'APP-9023',
      candidateName: 'Marcus Vance',
      role: 'Senior DevOps & Cloud Engineer',
      stage: 'Shortlisted',
      matchScore: 89,
      appliedDate: '3 days ago',
      experience: '7 Years',
      location: 'Hyderabad, India',
      skills: ['Kubernetes', 'Terraform', 'AWS', 'Zero-Trust Security'],
      resumeUrl: '#',
      lastNote: 'Shortlisted for interview round scheduling.'
    },
    {
      id: 'APP-9024',
      candidateName: 'Elena Rostova',
      role: 'Lead Product Designer',
      stage: 'Offer',
      matchScore: 96,
      appliedDate: '5 days ago',
      experience: '9 Years',
      location: 'Mumbai, India',
      skills: ['Figma Design Systems', 'UX Research', 'Micro-interactions'],
      resumeUrl: '#',
      lastNote: 'Offer sent ($140,000/yr). Pending candidate signature.'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header & Stage Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
              <FileCheck className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-slate-900">ATS Applications & Pipeline</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Server-side stage validation • Audit history enabled • 100% Recruiter Authorization
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'kanban' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Kanban Board
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'table' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            List View
          </button>
        </div>
      </div>

      {/* Stage Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {stages.map((stage) => (
          <button
            key={stage.name}
            onClick={() => setSelectedStage(stage.name)}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-2 transition-all ${
              selectedStage === stage.name
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>{stage.name}</span>
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${stage.color}`}>
              {stage.count}
            </span>
          </button>
        ))}
      </div>

      {/* Applications List / Kanban View */}
      {activeTab === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Screening', 'Shortlisted', 'Interview', 'Offer'].map((colStage) => (
            <div key={colStage} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-3 min-h-[500px]">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">{colStage}</span>
                <span className="text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  {mockApplications.filter(a => a.stage === colStage).length}
                </span>
              </div>

              {mockApplications.filter(a => colStage === 'All' || a.stage === colStage).map((app) => (
                <div key={app.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-all space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 hover:text-indigo-600 cursor-pointer">{app.candidateName}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{app.role}</p>
                    </div>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                      {app.matchScore}% Match
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {app.skills.map((skill, i) => (
                      <span key={i} className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 italic">
                    "{app.lastNote}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-semibold">
                    <span>{app.appliedDate}</span>
                    <button className="text-indigo-600 hover:underline font-bold flex items-center gap-0.5">
                      Move Stage <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">Candidate</th>
                <th className="p-4">Applied Job</th>
                <th className="p-4">Match Score</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Experience</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockApplications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{app.candidateName}</div>
                    <div className="text-[11px] text-slate-400">{app.location}</div>
                  </td>
                  <td className="p-4 font-medium text-slate-700">{app.role}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {app.matchScore}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-100 text-slate-800">
                      {app.stage}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 font-semibold">{app.experience}</td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs">
                      Review App
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
