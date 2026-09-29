import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  ShieldCheck, 
  Download, 
  Search, 
  Lock, 
  Briefcase, 
  FileCheck, 
  UserCheck, 
  Calendar, 
  Gift, 
  KeyRound 
} from 'lucide-react';
import { AuditLog } from '../../types/clyptus.types';
import { INITIAL_AUDIT_LOGS } from '../../store/clyptus.store';

interface ContextType {
  showToast?: (msg: string) => void;
}

const RECRUITER_DIMENSION_FILTERS = [
  'ALL', 
  'JOB', 
  'APPLICATION', 
  'CANDIDATE', 
  'INTERVIEW', 
  'OFFER', 
  'PRIVILEGED'
];

export const RecruiterAuditLogs: React.FC = () => {
  const context = useOutletContext<ContextType>();
  const showToast = context?.showToast;
  const [auditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [selectedDimension, setSelectedDimension] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter logs related to recruiter's own actions & assigned recruitment work
  const recruiterLogs = auditLogs.filter((log) => {
    // Show actions by recruiters or relevant hiring pipeline events
    if (log.role !== 'RECRUITER' && log.role !== 'ORGANIZATION_ADMIN' && log.role !== 'SUPER_ADMIN') {
      return false;
    }

    if (selectedDimension !== 'ALL') {
      if (selectedDimension === 'JOB' && log.dimension !== 'JOB') return false;
      if (selectedDimension === 'APPLICATION' && log.dimension !== 'APPLICATION' && log.dimension !== 'ATS') return false;
      if (selectedDimension === 'CANDIDATE' && log.dimension !== 'CANDIDATE') return false;
      if (selectedDimension === 'INTERVIEW' && log.dimension !== 'INTERVIEW') return false;
      if (selectedDimension === 'OFFER' && log.dimension !== 'OFFER') return false;
      if (selectedDimension === 'PRIVILEGED' && log.dimension !== 'SECURITY' && log.dimension !== 'PERMISSION') return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        log.id.toLowerCase().includes(q) ||
        log.userName.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.resource.toLowerCase().includes(q) ||
        (log.details && log.details.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleExportCSV = () => {
    const headers = ['Log ID', 'User', 'Role', 'Action', 'Target Resource', 'Details', 'Timestamp'];
    const rows = recruiterLogs.map((l) => [
      l.id,
      `"${l.userName}"`,
      l.role,
      l.action,
      `"${l.resource} (${l.resourceId})"`,
      `"${(l.details || '').replace(/"/g, '""')}"`,
      l.timestamp
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `recruiter_activity_audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (showToast) showToast('Exported recruiter activity & audit history to CSV!');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Recruiter Activity & Server-Side Audit History</h2>
          <p className="text-xs text-slate-500">
            View permitted activity history covering job changes, application transitions, candidate actions, interviews, and offer operations.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl shadow-xs flex items-center gap-2 w-fit transition-all"
        >
          <Download className="w-4 h-4 text-indigo-200" /> Export My Audit Records (CSV)
        </button>
      </div>

      {/* Append-Only Non-Editable Guarantee Banner */}
      <div className="p-4 bg-slate-900 rounded-3xl border border-slate-700 text-white flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-100">Server-Side Append-Only Audit Trail</h4>
            <p className="text-xs text-slate-400">
              Audit history is strictly non-editable and non-deletable by recruiters to ensure compliance and traceability.
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full text-[10px] font-black uppercase">
          Read Only
        </span>
      </div>

      {/* Dimension Filters */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {RECRUITER_DIMENSION_FILTERS.map((dim) => (
            <button
              key={dim}
              onClick={() => setSelectedDimension(dim)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all border ${
                selectedDimension === dim
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {dim}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search action or resource..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Permitted Activity Log ({recruiterLogs.length})</h3>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
            Automated Audit Stream
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Log ID</th>
                <th className="p-4">User & Role</th>
                <th className="p-4">Action Type</th>
                <th className="p-4">Target Resource & Operational Details</th>
                <th className="p-4">IP Address</th>
                <th className="p-4 text-right pr-6">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recruiterLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6 font-mono font-bold text-slate-900">{log.id}</td>

                  <td className="p-4">
                    <div className="font-bold text-slate-900">{log.userName}</div>
                    <span className="text-[10px] text-slate-400 font-semibold">{log.role}</span>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-indigo-700">{log.action}</div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      {log.dimension || 'ACTION'}
                    </span>
                  </td>

                  <td className="p-4 max-w-xs">
                    <div className="font-mono text-[11px] text-slate-800 font-bold">
                      {log.resource} ({log.resourceId})
                    </div>
                    {log.details && (
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 italic">
                        "{log.details}"
                      </p>
                    )}
                  </td>

                  <td className="p-4 font-mono text-slate-500">{log.ip}</td>

                  <td className="p-4 text-right pr-6 font-semibold text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                </tr>
              ))}

              {recruiterLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 text-xs font-medium">
                    No activity logs found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
