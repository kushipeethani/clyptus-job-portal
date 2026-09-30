import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  ShieldAlert, 
  Download, 
  Filter, 
  Lock, 
  Search, 
  FileText, 
  Calendar, 
  CheckCircle2,
  ShieldCheck,
  Building2,
  Coins
} from 'lucide-react';
import { AuditLog } from '../../types/clyptus.types';
import { INITIAL_AUDIT_LOGS, getStoreAuditLogs } from '../../store/clyptus.store';

interface ContextType {
  showToast: (msg: string) => void;
}

const DIMENSION_FILTERS = [
  'ALL', 
  'USER', 
  'ROLE', 
  'ACTION', 
  'RESOURCE', 
  'JOB', 
  'CANDIDATE', 
  'APPLICATION', 
  'PAYMENT', 
  'TOKEN', 
  'SECURITY', 
  'ATS', 
  'OFFER', 
  'INTERVIEW'
];

export const OrgSuperAdminAuditLogs: React.FC = () => {
  const { showToast } = useOutletContext<ContextType>();
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(getStoreAuditLogs());
  const [selectedDimension, setSelectedDimension] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  React.useEffect(() => {
    const handleSync = () => {
      setAuditLogs(getStoreAuditLogs());
    };
    window.addEventListener('clyptus_store_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('clyptus_store_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Filtered audit records
  const filteredLogs = auditLogs.filter((log) => {
    if (selectedDimension !== 'ALL' && log.dimension !== selectedDimension) return false;
    if (roleFilter !== 'ALL' && log.role !== roleFilter) return false;
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
    const headers = ['Log ID', 'User Name', 'Role', 'Action', 'Dimension', 'Resource Target', 'Details', 'IP Address', 'Timestamp'];
    const rows = filteredLogs.map((l) => [
      l.id,
      `"${l.userName}"`,
      l.role,
      l.action,
      l.dimension || 'RESOURCE',
      `"${l.resource} (${l.resourceId})"`,
      `"${(l.details || '').replace(/"/g, '""')}"`,
      l.ip,
      l.timestamp
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clyptus_audit_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (showToast) showToast('Exported audit records to CSV!');
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Organization Audit Logs & Security Oversight</h2>
          <p className="text-xs text-slate-500">
            Append-only, immutable audit ledger of privileged administrative actions, role updates, token allocations, and recruitment operations.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold rounded-2xl shadow-xs flex items-center gap-2 w-fit cursor-pointer"
        >
          <Download className="w-4 h-4 text-white" /> Export Audit Records (CSV)
        </button>
      </div>

      {/* Immutable Append-Only Guarantee Banner */}
      <div className="p-4 bg-indigo-50/80 rounded-3xl border border-indigo-200 text-slate-900 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-indigo-900">Append-Only Immutability Enforced</h4>
            <p className="text-xs text-slate-600">
              Audit records are cryptographic and append-only. No user or Organization Super Admin can modify or delete log records.
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-block px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-[10px] font-black uppercase">
          Read-Only Ledger Active
        </span>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {DIMENSION_FILTERS.map((dim) => (
              <button
                key={dim}
                onClick={() => setSelectedDimension(dim)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all border ${
                  selectedDimension === dim
                    ? 'bg-brand-blue-600 text-white border-brand-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {dim}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Roles</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              <option value="ORGANIZATION_ADMIN">ORGANIZATION_ADMIN</option>
              <option value="RECRUITER">RECRUITER</option>
            </select>

            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search action, user, target..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Organization Audit Records ({filteredLogs.length})</h3>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
            Compliance Secured
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Log ID</th>
                <th className="p-4">User & Role</th>
                <th className="p-4">Dimension & Action</th>
                <th className="p-4">Resource Target & Details</th>
                <th className="p-4">IP Address</th>
                <th className="p-4 text-right pr-6">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6 font-mono font-bold text-slate-900">{log.id}</td>

                  <td className="p-4">
                    <div className="font-bold text-slate-900">{log.userName}</div>
                    <span className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[9px] font-black ${
                      log.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-800' :
                      log.role === 'ORGANIZATION_ADMIN' ? 'bg-blue-100 text-blue-800' : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {log.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-900">{log.action}</div>
                    <span className="text-[10px] font-bold text-brand-blue-600 uppercase bg-blue-50 px-1.5 py-0.5 rounded">
                      {log.dimension || 'RESOURCE'}
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

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 text-xs font-medium">
                    No audit records match the selected dimension or search filter.
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
