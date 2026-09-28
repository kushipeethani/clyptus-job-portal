import React from 'react';
import { ShieldAlert, Download, Filter } from 'lucide-react';
import { INITIAL_AUDIT_LOGS } from '../../store/clyptus.store';

export const OrgSuperAdminAuditLogs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Organization Audit Logs</h2>
        <p className="text-xs text-slate-500">Append-only audit records of privileged administrative actions, logins, and token operations</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Audit Records ({INITIAL_AUDIT_LOGS.length})</h3>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
            Append-Only Log System
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Log ID</th>
                <th className="p-4">User & Role</th>
                <th className="p-4">Action</th>
                <th className="p-4">Resource Target</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {INITIAL_AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6 font-mono font-bold text-slate-900">{log.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{log.userName}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{log.role}</div>
                  </td>
                  <td className="p-4 font-bold text-brand-blue-700">{log.action}</td>
                  <td className="p-4 font-mono text-[11px] text-slate-600">
                    {log.resource} ({log.resourceId})
                  </td>
                  <td className="p-4 font-mono text-slate-500">{log.ip}</td>
                  <td className="p-4 text-slate-400">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
