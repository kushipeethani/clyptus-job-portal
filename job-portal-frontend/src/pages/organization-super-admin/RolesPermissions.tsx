import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Check, Lock, Save, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ContextType {
  showToast?: (msg: string) => void;
}

interface PermissionRow {
  id: string;
  label: string;
  superAdmin: boolean;
  admin: boolean;
  recruiter: boolean;
  disabled?: boolean;
  adminOnlyNote?: string;
}

export const RolesPermissions: React.FC = () => {
  const context = useOutletContext<ContextType>();
  const showToast = context?.showToast || ((msg: string) => alert(msg));

  const [permissions, setPermissions] = useState<PermissionRow[]>([
    {
      id: 'p1',
      label: 'View organisation jobs',
      superAdmin: true,
      admin: true,
      recruiter: true,
    },
    {
      id: 'p2',
      label: 'Create and edit assigned jobs',
      superAdmin: true,
      admin: true,
      recruiter: true,
    },
    {
      id: 'p3',
      label: 'View and manage candidates',
      superAdmin: true,
      admin: true,
      recruiter: true,
    },
    {
      id: 'p4',
      label: 'Schedule interviews and manage offers',
      superAdmin: true,
      admin: true,
      recruiter: true,
    },
    {
      id: 'p5',
      label: 'View organisation analytics',
      superAdmin: true,
      admin: true,
      recruiter: false,
    },
    {
      id: 'p6',
      label: 'Manage team member access',
      superAdmin: true,
      admin: true,
      recruiter: false,
    },
    {
      id: 'p7',
      label: 'Allocate tokens to recruiters',
      superAdmin: true,
      admin: true,
      recruiter: false,
    },
    {
      id: 'p8',
      label: 'Search candidate profiles',
      superAdmin: true,
      admin: true,
      recruiter: true,
    },
    {
      id: 'p9',
      label: 'Shortlist candidates',
      superAdmin: true,
      admin: true,
      recruiter: true,
    },
    {
      id: 'p10',
      label: 'Create and send offers',
      superAdmin: true,
      admin: true,
      recruiter: true,
    },
  ]);

  const togglePermission = (id: string, roleKey: 'superAdmin' | 'admin' | 'recruiter') => {
    setPermissions((prev) =>
      prev.map((row) => {
        if (row.id === id && !row.disabled) {
          return { ...row, [roleKey]: !row[roleKey] };
        }
        return row;
      })
    );
  };

  const handleSaveChanges = () => {
    showToast('Updated role permission matrix for Super Admin, Admin & Recruiter!');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans">
      
      {/* Top Bar Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-orange-600 block mb-1">
            ACCESS CONTROL
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Assign organization roles
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review and update permissions for Super Admin, Admin, and Recruiter roles.
          </p>
        </div>

        <button
          onClick={handleSaveChanges}
          className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-orange-600/20 transition-all flex items-center gap-1.5 w-fit"
        >
          <span>Save changes</span>
        </button>
      </div>

      {/* Main Permissions Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        
        {/* Card Header Subtitle */}
        <div className="border-b border-slate-100 pb-5">
          <h3 className="text-base font-bold text-slate-900">Organization role permissions</h3>
          <p className="text-xs text-slate-400 mt-1">
            Configure authorization boundaries across Super Admin, Admin, and Recruiter tiers.
          </p>
        </div>

        {/* Permissions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 w-1/2">PERMISSION</th>
                <th className="py-3 px-4 text-center">SUPER ADMIN</th>
                <th className="py-3 px-4 text-center">ADMIN</th>
                <th className="py-3 px-4 text-center">RECRUITER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {permissions.map((row) => (
                <tr 
                  key={row.id} 
                  className={`hover:bg-slate-50/70 transition-colors ${
                    row.disabled ? 'opacity-70 bg-slate-50/40' : ''
                  }`}
                >
                  {/* Permission Label */}
                  <td className="py-4 px-4 font-semibold text-xs text-slate-900">
                    <div className="flex items-center gap-2">
                      <span>{row.label}</span>
                      {row.disabled && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 flex items-center gap-1">
                          <Lock className="w-3 h-3 text-slate-400" /> {row.adminOnlyNote}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Super Admin Checkbox */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        disabled={row.disabled}
                        onClick={() => togglePermission(row.id, 'superAdmin')}
                        className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                          row.superAdmin
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'border-2 border-slate-300 bg-white hover:border-slate-400'
                        } ${row.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                      >
                        {row.superAdmin && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    </div>
                  </td>

                  {/* Admin Checkbox */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        disabled={row.disabled}
                        onClick={() => togglePermission(row.id, 'admin')}
                        className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                          row.admin
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'border-2 border-slate-300 bg-white hover:border-slate-400'
                        } ${row.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                      >
                        {row.admin && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    </div>
                  </td>

                  {/* Recruiter Checkbox */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        disabled={row.disabled}
                        onClick={() => togglePermission(row.id, 'recruiter')}
                        className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                          row.recruiter
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'border-2 border-slate-300 bg-white hover:border-slate-400'
                        } ${row.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                      >
                        {row.recruiter && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
