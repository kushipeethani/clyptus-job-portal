import React, { useState, useEffect } from 'react';
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
  Tag,
  Inbox
} from 'lucide-react';
import { Application } from '../../types/clyptus.types';
import { getStoreApplications } from '../../store/clyptus.store';

export const RecruiterApplications: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'table' | 'kanban'>('kanban');
  const [applications, setApplications] = useState<Application[]>(() => getStoreApplications());

  useEffect(() => {
    const handleSync = () => setApplications(getStoreApplications());
    window.addEventListener('clyptus_store_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('clyptus_store_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const stages = [
    { name: 'All', count: applications.length, color: 'bg-slate-100 text-slate-700' },
    { name: 'APPLIED', count: applications.filter(a => a.status === 'APPLIED').length, color: 'bg-blue-100 text-blue-800' },
    { name: 'SHORTLISTED', count: applications.filter(a => a.status === 'SHORTLISTED').length, color: 'bg-purple-100 text-purple-800' },
    { name: 'INTERVIEW_SCHEDULED', count: applications.filter(a => a.status === 'INTERVIEW_SCHEDULED').length, color: 'bg-amber-100 text-amber-800' },
    { name: 'OFFER_EXTENDED', count: applications.filter(a => a.status === 'OFFER_EXTENDED').length, color: 'bg-emerald-100 text-emerald-800' },
    { name: 'SELECTED', count: applications.filter(a => a.status === 'SELECTED').length, color: 'bg-teal-100 text-teal-800' }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesStage = selectedStage === 'All' || app.status === selectedStage;
    const matchesSearch = !searchTerm || 
      app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStage && matchesSearch;
  });

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
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate or job..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

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
            <span>{stage.name.replace(/_/g, ' ')}</span>
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${stage.color}`}>
              {stage.count}
            </span>
          </button>
        ))}
      </div>

      {/* Applications List / Kanban View */}
      {activeTab === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['APPLIED', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'OFFER_EXTENDED', 'SELECTED'].map((colStage) => {
            const stageApps = filteredApplications.filter(a => a.status === colStage);

            return (
              <div key={colStage} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-3 min-h-[400px]">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">{colStage.replace(/_/g, ' ')}</span>
                  <span className="text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {stageApps.length}
                  </span>
                </div>

                {stageApps.map((app) => (
                  <div key={app.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-all space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 hover:text-indigo-600 cursor-pointer">{app.candidateName}</h4>
                        <p className="text-[11px] text-slate-500 font-medium">{app.jobTitle}</p>
                      </div>
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        {app.matchScore}% Match
                      </span>
                    </div>

                    {app.coverLetter && (
                      <p className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 italic">
                        "{app.coverLetter}"
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-semibold">
                      <span>Applied: {app.appliedDate}</span>
                    </div>
                  </div>
                ))}

                {stageApps.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 rounded-xl">
                    <Inbox className="w-7 h-7 text-slate-300 mb-1" />
                    <p className="text-xs font-bold text-slate-500">No applications</p>
                    <p className="text-[10px] text-slate-400">in {colStage.replace(/_/g, ' ')} stage</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          {filteredApplications.length > 0 ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Applied Job</th>
                  <th className="p-4">Match Score</th>
                  <th className="p-4">Stage</th>
                  <th className="p-4">Applied Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{app.candidateName}</div>
                      <div className="text-[11px] text-slate-400">{app.candidateEmail}</div>
                    </td>
                    <td className="p-4 font-medium text-slate-700">{app.jobTitle}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {app.matchScore}%
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-100 text-slate-800">
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 font-semibold">{app.appliedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center space-y-2">
              <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-bold text-slate-700 text-sm">No applications found in this view</h4>
              <p className="text-xs text-slate-400">As candidates apply to posted jobs, their applications will appear here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
