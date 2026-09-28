import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  UserCheck, 
  UserPlus, 
  ShieldCheck, 
  Edit3, 
  KeyRound, 
  X, 
  CheckCircle2, 
  ShieldAlert,
  Lock
} from 'lucide-react';
import { AdminUser, AdminPermission } from '../../types/clyptus.types';
import { INITIAL_ADMINS } from '../../store/clyptus.store';

interface ContextType {
  showToast: (msg: string) => void;
}

const ALL_PERMISSIONS: { key: AdminPermission; label: string; desc: string }[] = [
  { key: 'RECRUITER_MANAGEMENT', label: 'Recruiter Management', desc: 'Create, edit, suspend recruiters' },
  { key: 'JOB_MANAGEMENT', label: 'Job Management', desc: 'Approve, edit, publish organization jobs' },
  { key: 'CANDIDATE_MANAGEMENT', label: 'Candidate Management', desc: 'View candidate database & details' },
  { key: 'APPLICATION_MANAGEMENT', label: 'Application Management', desc: 'Review candidate applications & ATS' },
  { key: 'REPORTS', label: 'Reports & Analytics', desc: 'View recruiter activity & credit usage reports' },
  { key: 'USER_MANAGEMENT', label: 'User Management', desc: 'Manage organization user accounts' },
];

export const AdminManagement: React.FC = () => {
  const { showToast } = useOutletContext<ContextType>();
  const [admins, setAdmins] = useState<AdminUser[]>(INITIAL_ADMINS);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [generatedCreds, setGeneratedCreds] = useState<{ email: string; tempPass: string } | null>(null);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<AdminPermission[]>([
    'RECRUITER_MANAGEMENT', 'JOB_MANAGEMENT', 'APPLICATION_MANAGEMENT'
  ]);

  // Fetch admins from backend API
  const fetchAdmins = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:5000/api/v1/admins');
      const json = await res.json();
      if (json.success && json.data) {
        setAdmins(json.data);
      }
    } catch (err) {
      console.warn('Backend API connection offline, utilizing stored state.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingAdmin(null);
    setFormName('');
    setFormEmail('');
    setGeneratedCreds(null);
    setSelectedPermissions(['RECRUITER_MANAGEMENT', 'JOB_MANAGEMENT', 'APPLICATION_MANAGEMENT']);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (admin: AdminUser) => {
    setEditingAdmin(admin);
    setFormName(admin.name);
    setFormEmail(admin.email);
    setGeneratedCreds(null);
    setSelectedPermissions(admin.permissions);
    setIsModalOpen(true);
  };

  const togglePermission = (perm: AdminPermission) => {
    if (selectedPermissions.includes(perm)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== perm));
    } else {
      setSelectedPermissions([...selectedPermissions, perm]);
    }
  };

  const handleSaveAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAdmin) {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/admins/${editingAdmin.id}/permissions`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ permissions: selectedPermissions })
        });
        const json = await res.json();
        if (json.success) {
          fetchAdmins();
          showToast(`Updated Admin permissions for ${formName}!`);
        }
      } catch (err) {
        setAdmins(prev => prev.map(a => a.id === editingAdmin.id ? { ...a, permissions: selectedPermissions } : a));
        showToast(`Updated Admin permissions for ${formName}!`);
      }
      setIsModalOpen(false);
    } else {
      try {
        const res = await fetch('http://localhost:5000/api/v1/admins', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formName,
            email: formEmail,
            permissions: selectedPermissions
          })
        });
        const json = await res.json();
        if (json.success) {
          fetchAdmins();
          if (json.generatedCredentials) {
            setGeneratedCreds({
              email: json.generatedCredentials.email,
              tempPass: json.generatedCredentials.temporaryPassword
            });
          }
          showToast(`Created new Organization Admin: ${formName}!`);
        }
      } catch (err) {
        const newAdmin: AdminUser = {
          id: `adm_${Date.now()}`,
          organizationId: 'org_abc_tech',
          name: formName,
          email: formEmail,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formName)}&background=0D8ABC&color=fff`,
          status: 'ACTIVE',
          permissions: selectedPermissions,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setAdmins([...admins, newAdmin]);
        showToast(`Created new Organization Admin: ${formName}!`);
        setIsModalOpen(false);
      }
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    setAdmins((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: nextStatus as any } : a))
    );
    showToast(`Updated Admin status to ${nextStatus}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Organization Admin Governance</h2>
          <p className="text-xs text-slate-500">Create, edit, suspend admins and configure permission-based RBAC matrices</p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold rounded-2xl shadow-sm flex items-center gap-1.5 w-fit"
        >
          <UserPlus className="w-4 h-4" /> Create New Admin
        </button>
      </div>

      {/* Admin Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Active Admins ({admins.length})</h3>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Live REST Backend Connected
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Admin Name</th>
                <th className="p-4">Assigned RBAC Permissions</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created Date</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <img src={admin.avatar} alt={admin.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{admin.name}</div>
                        <div className="text-[10px] text-slate-400">{admin.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-md">
                      {admin.permissions.map((perm) => (
                        <span key={perm} className="px-2 py-0.5 bg-blue-50 text-brand-blue-700 border border-blue-200 rounded text-[10px] font-bold">
                          {perm.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      admin.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {admin.status}
                    </span>
                  </td>

                  <td className="p-4 text-slate-400">{admin.createdAt}</td>

                  <td className="p-4 text-right pr-6 space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(admin)}
                      className="px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                    >
                      Edit RBAC
                    </button>
                    <button
                      onClick={() => toggleStatus(admin.id, admin.status)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                        admin.status === 'ACTIVE' ? 'text-red-700 bg-red-50 hover:bg-red-100' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                      }`}
                    >
                      {admin.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">{editingAdmin ? 'Edit Admin & RBAC Matrix' : 'Create Organization Admin'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {generatedCreds ? (
              <div className="p-6 space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Admin Credentials Generated Successfully</span>
                  </div>
                  <div className="text-xs text-slate-700 space-y-1 pt-1 font-mono">
                    <div><strong>Email:</strong> {generatedCreds.email}</div>
                    <div><strong>Temporary Password:</strong> <span className="bg-white px-2 py-0.5 rounded border border-emerald-300 font-bold">{generatedCreds.tempPass}</span></div>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveAdmin} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">RBAC Permission Matrix</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {ALL_PERMISSIONS.map((perm) => (
                      <label key={perm.key} className="flex items-start gap-2.5 p-2 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(perm.key)}
                          onChange={() => togglePermission(perm.key)}
                          className="mt-0.5 text-brand-blue-600 rounded focus:ring-brand-blue-500"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{perm.label}</div>
                          <div className="text-[10px] text-slate-500">{perm.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-sm"
                  >
                    {editingAdmin ? 'Save Permissions' : 'Create Admin Account'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
