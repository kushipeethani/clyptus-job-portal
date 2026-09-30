import React, { useState, useEffect } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Coins, 
  X, 
  CheckCircle2, 
  ShieldCheck,
  Key,
  Eye,
  Star,
  Lock,
  Edit,
  Phone,
  UserX,
  UserCheck
} from 'lucide-react';
import { RecruiterUser, ShortlistedCandidate } from '../../types/clyptus.types';
import { INITIAL_RECRUITERS, getStoreRecruiters, saveStoreRecruiters, allocateCreditsToRecruiter, getStoreShortlistedCandidates, updateRecruiterDetails, logAction, checkCurrentRolePermission } from '../../store/clyptus.store';

interface ContextType {
  showToast: (msg: string) => void;
}

export const AdminRecruiterManagement: React.FC = () => {
  const { showToast } = useOutletContext<ContextType>();
  const location = useLocation();
  const canManageTeam = checkCurrentRolePermission(location.pathname, 'p6');
  const [recruiters, setRecruiters] = useState<RecruiterUser[]>(getStoreRecruiters());

  // Add Recruiter Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('+91 98765 43210');
  const [formRole, setFormRole] = useState('Tech Recruiter');
  const [formPassword, setFormPassword] = useState('');
  const [formConfirmPassword, setFormConfirmPassword] = useState('');
  const [formCredits, setFormCredits] = useState<number>(50);

  // Edit Recruiter Modal State
  const [editModalUser, setEditModalUser] = useState<RecruiterUser | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    email: string;
    phone: string;
    recruiterRole: string;
    status: 'ACTIVE' | 'SUSPENDED';
  }>({
    name: '',
    email: '',
    phone: '',
    recruiterRole: 'Tech Recruiter',
    status: 'ACTIVE'
  });

  // Generated Credentials Alert State
  const [createdCredentials, setCreatedCredentials] = useState<{
    name: string;
    email: string;
    password: string;
    credits: number;
  } | null>(null);

  // Allocate Credit Modal State
  const [creditModalUser, setCreditModalUser] = useState<RecruiterUser | null>(null);
  const [additionalCredits, setAdditionalCredits] = useState<number>(100);

  // View Recruiter Profile Modal State
  const [viewProfileRecruiter, setViewProfileRecruiter] = useState<RecruiterUser | null>(null);

  // Live REST API & Reactive Store Sync with Super Admin
  const fetchRecruiters = () => {
    setRecruiters(getStoreRecruiters());
  };

  useEffect(() => {
    fetchRecruiters();

    const handleSync = () => {
      setRecruiters(getStoreRecruiters());
    };
    window.addEventListener('clyptus_store_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('clyptus_store_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Open Edit Modal
  const handleOpenEdit = (rec: RecruiterUser) => {
    setEditModalUser(rec);
    setEditForm({
      name: rec.name,
      email: rec.email,
      phone: rec.phone || '+91 98765 43210',
      recruiterRole: rec.recruiterRole || 'Tech Recruiter',
      status: rec.status === 'SUSPENDED' ? 'SUSPENDED' : 'ACTIVE'
    });
  };

  // Submit Recruiter Edits
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalUser) return;

    const updated = updateRecruiterDetails(
      editModalUser.id,
      {
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        recruiterRole: editForm.recruiterRole,
        status: editForm.status
      },
      'Marcus Vance (Organization Admin)'
    );

    setRecruiters(updated);
    setEditModalUser(null);
    showToast(`Updated recruiter profile for ${editForm.name}!`);
  };

  // Toggle Suspend / Active status
  const handleToggleStatus = (rec: RecruiterUser) => {
    const nextStatus = rec.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    const updated = updateRecruiterDetails(
      rec.id,
      { status: nextStatus },
      'Marcus Vance (Organization Admin)'
    );
    setRecruiters(updated);
    showToast(`Recruiter ${rec.name} account status changed to ${nextStatus}!`);
  };

  const handleAddRecruiter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formPassword && formConfirmPassword && formPassword !== formConfirmPassword) {
      showToast('Passwords do not match! Please confirm your password.');
      return;
    }

    const newRecruiter: RecruiterUser = {
      id: `rec_${Date.now()}`,
      organizationId: 'org_abc_tech',
      name: formName,
      email: formEmail,
      password: formPassword || 'Clyptus@2026',
      phone: formPhone,
      recruiterRole: formRole,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formName)}&background=4F46E5&color=fff`,
      status: 'ACTIVE',
      activeJobsCount: 0,
      profileViewsCount: 0,
      resumeDownloadsCount: 0,
      totalCreditsUsed: 0,
      allocatedCredits: formCredits,
      remainingBalance: formCredits,
      createdAt: new Date().toISOString().split('T')[0],
    };

    try {
      const res = await fetch('http://localhost:5000/api/v1/recruiters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone,
          recruiterRole: formRole,
          initialCredits: formCredits
        })
      });
      const json = await res.json();
      if (json.success) {
        setCreatedCredentials({
          name: formName,
          email: formEmail,
          password: json.generatedCredentials?.temporaryPassword || formPassword || 'ClyptusRecruiter@2026',
          credits: formCredits,
        });
      }
    } catch (err) {}

    const updated = [newRecruiter, ...getStoreRecruiters()];
    saveStoreRecruiters(updated);
    setRecruiters(updated);
    setIsAddModalOpen(false);

    if (!createdCredentials) {
      setCreatedCredentials({
        name: formName,
        email: formEmail,
        password: formPassword || 'ClyptusRecruiter@2026',
        credits: formCredits,
      });
    }

    logAction(
      'Marcus Vance',
      'ORGANIZATION_ADMIN',
      'RECRUITER_ADDED',
      'RecruiterUser',
      newRecruiter.id,
      'USER',
      `Admin created recruiter account for ${formName} (${formEmail}) with ${formCredits} initial credits.`
    );

    showToast(`Admin created recruiter ${formName} with generated credentials!`);

    setFormName('');
    setFormEmail('');
    setFormPassword('');
    setFormCredits(50);
  };

  const handleRemoveRecruiter = async (id: string, name: string) => {
    if (confirm(`Admin Action: Are you sure you want to remove recruiter "${name}"?`)) {
      try {
        await fetch(`http://localhost:5000/api/v1/recruiters/${id}`, { method: 'DELETE' });
      } catch (err) {}

      const updated = getStoreRecruiters().filter((r) => r.id !== id);
      saveStoreRecruiters(updated);
      setRecruiters(updated);

      logAction(
        'Marcus Vance',
        'ORGANIZATION_ADMIN',
        'RECRUITER_REMOVED',
        'RecruiterUser',
        id,
        'USER',
        `Admin removed recruiter ${name} (${id}) from organization.`
      );

      showToast(`Removed recruiter ${name}.`);
    }
  };

  const handleAllocateCredits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditModalUser) return;

    // 1. Update store and log audit event reactively
    const updated = allocateCreditsToRecruiter(creditModalUser.id, additionalCredits, 'Marcus Vance (Organization Admin)');
    setRecruiters(updated);

    // 2. Call API if available
    try {
      await fetch('http://localhost:5000/api/v1/credits/allocate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRecruiterId: creditModalUser.id,
          credits: additionalCredits
        })
      });
    } catch (err) {}

    showToast(`Allocated +${additionalCredits} credits to recruiter ${creditModalUser.name}!`);
    setCreditModalUser(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Admin Recruiter Governance</h2>
          <p className="text-xs text-slate-500">Create recruiter accounts with generated credentials, manage roles, and allocate credits</p>
        </div>

        <button
          disabled={!canManageTeam}
          onClick={() => {
            if (!canManageTeam) {
              showToast('Permission Restricted: Managing team member access has been disabled by Super Admin.');
              return;
            }
            setIsAddModalOpen(true);
          }}
          title={!canManageTeam ? 'Permission Disabled by Super Admin' : 'Add new recruiter'}
          className={`px-4 py-2.5 text-xs font-bold rounded-2xl shadow-sm flex items-center gap-1.5 w-fit ${
            canManageTeam 
              ? 'bg-brand-blue-600 hover:bg-brand-blue-700 text-white cursor-pointer' 
              : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed opacity-60'
          }`}
        >
          <UserPlus className="w-4 h-4" /> Add Recruiter (Create Credentials)
        </button>
      </div>

      {/* Generated Credentials Banner */}
      {createdCredentials && (
        <div className="p-6 bg-slate-900 text-white rounded-3xl border border-blue-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-emerald-400">Recruiter Credentials Created by Admin</h3>
                <p className="text-xs text-slate-300">Share these login details with {createdCredentials.name}</p>
              </div>
            </div>
            <button
              onClick={() => setCreatedCredentials(null)}
              className="text-slate-400 hover:text-white text-xs font-bold px-3 py-1 bg-slate-800 rounded-lg"
            >
              Dismiss
            </button>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Recruiter Login URL:</span>
              <strong className="text-brand-blue-400">http://localhost:3000/recruiter/login</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Recruiter Email:</span>
              <strong className="text-white">{createdCredentials.email}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Generated Password:</span>
              <strong className="text-emerald-400">{createdCredentials.password}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Initial Credits:</span>
              <strong className="text-orange-400">+{createdCredentials.credits} credits</strong>
            </div>
          </div>
        </div>
      )}

      {/* Recruiter Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Active Recruiters ({recruiters.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Recruiter Details</th>
                <th className="p-4">Recruiter Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Active Jobs</th>
                <th className="p-4">Views / Downloads</th>
                <th className="p-4">Remaining Quota</th>
                <th className="p-4 text-right pr-6">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recruiters.map((rec) => {
                const availableCredits = rec.remainingBalance !== undefined 
                  ? rec.remainingBalance 
                  : ((rec.allocatedCredits || 50) - (rec.totalCreditsUsed || 0));

                const isSuspended = rec.status === 'SUSPENDED';

                return (
                  <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 pl-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img src={rec.avatar} alt={rec.name} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100 shadow-xs" />
                        <div>
                          <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                            {rec.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                            {rec.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 whitespace-nowrap font-bold text-slate-800">
                      <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/80 rounded-xl text-[10px] font-extrabold tracking-wide">
                        {rec.recruiterRole || 'Tech Recruiter'}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap font-bold">
                      {isSuspended ? (
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-red-100 text-red-800 border border-red-200 flex items-center gap-1 w-fit">
                          <UserX className="w-3 h-3" /> Suspended
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1 w-fit">
                          <UserCheck className="w-3 h-3" /> Active
                        </span>
                      )}
                    </td>

                    <td className="p-4 whitespace-nowrap font-extrabold text-slate-900">{rec.activeJobsCount || 0} Jobs</td>
                    <td className="p-4 whitespace-nowrap font-bold text-slate-700">{rec.profileViewsCount || 0}V / {rec.resumeDownloadsCount || 0}D</td>

                    <td className="p-4 whitespace-nowrap font-black text-brand-orange-600 text-xs">
                      {availableCredits} credits
                    </td>

                    <td className="p-4 text-right pr-6 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewProfileRecruiter(rec)}
                          className="px-2.5 py-1 text-xs font-bold text-brand-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg inline-flex items-center gap-1 transition-colors"
                          title="View Recruiter Profile, Credits & Shortlisted Candidates"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Profile
                        </button>

                        <button
                          onClick={() => handleOpenEdit(rec)}
                          className="px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg inline-flex items-center gap-1 transition-colors"
                          title="Edit Recruiter Details & Role"
                        >
                          <Edit className="w-3.5 h-3.5 text-slate-500" /> Edit
                        </button>

                        <button
                          onClick={() => handleToggleStatus(rec)}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg inline-flex items-center gap-1 border transition-colors ${
                            isSuspended
                              ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
                              : 'text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200'
                          }`}
                          title={isSuspended ? 'Activate Recruiter Account' : 'Suspend Recruiter Account'}
                        >
                          {isSuspended ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                          {isSuspended ? 'Activate' : 'Suspend'}
                        </button>

                        <button
                          onClick={() => setCreditModalUser(rec)}
                          className="px-2.5 py-1 text-xs font-bold text-brand-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors"
                          title="Allocate extra candidate search credits"
                        >
                          + Allocate
                        </button>

                        <button
                          onClick={() => handleRemoveRecruiter(rec.id, rec.name)}
                          className="px-2 py-1 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg inline-flex items-center gap-1 transition-colors"
                          title="Remove recruiter account"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Recruiter Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-brand-blue-400" />
                <h3 className="font-bold text-base">Add Recruiter (Admin)</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRecruiter} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Sen"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Login Username)</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vikram.s@abctech.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Recruiter Role</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  >
                    <option value="Tech Recruiter">Tech Recruiter</option>
                    <option value="HR Recruiter">HR Recruiter</option>
                    <option value="Senior Tech Recruiter">Senior Tech Recruiter</option>
                    <option value="Talent Acquisition Lead">Talent Acquisition Lead</option>
                    <option value="HR Lead">HR Lead</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Set Account Password</label>
                  <input
                    type="password"
                    required
                    placeholder="e.g. ClyptusRecruiter@2026"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Account Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm password..."
                    value={formConfirmPassword}
                    onChange={(e) => setFormConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-sm"
                >
                  Create Account & Generate Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Recruiter Modal */}
      {editModalUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-brand-blue-400" />
                <h3 className="font-bold text-base">Edit Recruiter Profile & Role</h3>
              </div>
              <button onClick={() => setEditModalUser(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone Number</label>
                  <input
                    type="text"
                    required
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Recruiter Role</label>
                  <select
                    value={editForm.recruiterRole}
                    onChange={(e) => setEditForm({ ...editForm, recruiterRole: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  >
                    <option value="Tech Recruiter">Tech Recruiter</option>
                    <option value="HR Recruiter">HR Recruiter</option>
                    <option value="Senior Tech Recruiter">Senior Tech Recruiter</option>
                    <option value="Talent Acquisition Lead">Talent Acquisition Lead</option>
                    <option value="HR Lead">HR Lead</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Account Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as 'ACTIVE' | 'SUSPENDED' })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                >
                  <option value="ACTIVE">ACTIVE (Granted Login Access)</option>
                  <option value="SUSPENDED">SUSPENDED (Access Blocked)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditModalUser(null)}
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

      {/* Allocate Credits Modal */}
      {creditModalUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Allocate Credits to {creditModalUser.name}</h3>
            <p className="text-xs text-slate-500">Add candidate search & resume download credits directly to this recruiter.</p>

            <form onSubmit={handleAllocateCredits} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Add Credits Amount</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={additionalCredits}
                  onChange={(e) => setAdditionalCredits(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-brand-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreditModalUser(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-orange-500 hover:bg-brand-orange-600 rounded-xl shadow-xs"
                >
                  Allocate +{additionalCredits} Credits
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Recruiter Profile Modal */}
      {viewProfileRecruiter && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={viewProfileRecruiter.avatar}
                  alt={viewProfileRecruiter.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-brand-orange-500 shadow-xs"
                />
                <div>
                  <h3 className="font-extrabold text-base flex items-center gap-2">
                    {viewProfileRecruiter.name}
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-500 text-white rounded-full uppercase">
                      {viewProfileRecruiter.status}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">{viewProfileRecruiter.email} • Recruiter ID: {viewProfileRecruiter.id}</p>
                </div>
              </div>
              <button onClick={() => setViewProfileRecruiter(null)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* Recruiter Details & Contact Info */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-0.5">Mobile Phone Number</span>
                  <strong className="text-slate-900 font-extrabold text-sm flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-blue-600" /> {viewProfileRecruiter.phone || '+91 98765 43210'}
                  </strong>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-0.5">Recruiter Role</span>
                  <strong className="text-indigo-700 font-bold text-xs bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200 inline-block">
                    {viewProfileRecruiter.recruiterRole || 'Tech Recruiter'}
                  </strong>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-0.5">Email Address</span>
                  <strong className="text-slate-900 font-semibold">{viewProfileRecruiter.email}</strong>
                </div>
              </div>

              {/* Recruiter Credit & Usage Metrics */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">Recruiter Quota & Usage Overview</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  
                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-1">
                    <span className="text-[10px] font-bold text-blue-700 uppercase flex items-center justify-between">
                      Remaining Credits <Coins className="w-3.5 h-3.5 text-blue-600" />
                    </span>
                    <div className="text-2xl font-black text-blue-900">
                      {viewProfileRecruiter.remainingBalance !== undefined
                        ? viewProfileRecruiter.remainingBalance
                        : ((viewProfileRecruiter.allocatedCredits || 50) - (viewProfileRecruiter.totalCreditsUsed || 0))}
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 space-y-1">
                    <span className="text-[10px] font-bold text-orange-700 uppercase flex items-center justify-between">
                      Credits Used <Lock className="w-3.5 h-3.5 text-orange-600" />
                    </span>
                    <div className="text-2xl font-black text-orange-900">
                      {viewProfileRecruiter.totalCreditsUsed || 0}
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-1">
                    <span className="text-[10px] font-bold text-purple-700 uppercase flex items-center justify-between">
                      Allocated Quota <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    </span>
                    <div className="text-2xl font-black text-purple-900">
                      {viewProfileRecruiter.allocatedCredits || 50}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center justify-between">
                      Views / Downloads <Eye className="w-3.5 h-3.5 text-slate-500" />
                    </span>
                    <div className="text-lg font-black text-slate-800">
                      {viewProfileRecruiter.profileViewsCount || 0}V / {viewProfileRecruiter.resumeDownloadsCount || 0}D
                    </div>
                  </div>

                </div>
              </div>

              {/* Shortlisted Candidates by Recruiter */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-purple-600 fill-purple-600" /> Shortlisted Candidates by {viewProfileRecruiter.name}
                  </h4>
                  <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
                    {getStoreShortlistedCandidates().filter(s => s.recruiterId === viewProfileRecruiter.id || s.recruiterId === 'rec_1').length} Candidates
                  </span>
                </div>

                {(() => {
                  const recruiterShortlisted = getStoreShortlistedCandidates().filter(
                    s => s.recruiterId === viewProfileRecruiter.id || s.recruiterId === 'rec_1'
                  );

                  if (recruiterShortlisted.length === 0) {
                    return (
                      <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
                        No candidates shortlisted by this recruiter yet.
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-2.5">
                      {recruiterShortlisted.map((cand) => (
                        <div key={cand.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div>
                            <div className="flex items-center gap-2">
                              <strong className="text-slate-900 font-extrabold text-sm">{cand.candidateName}</strong>
                              <span className="text-brand-blue-700 font-semibold">• {cand.title}</span>
                            </div>
                            <div className="text-slate-500 text-[11px] mt-0.5 flex flex-wrap items-center gap-3">
                              <span>Email: {cand.candidateEmail}</span>
                              <span>• Location: {cand.location || 'Remote'}</span>
                              <span>• Experience: {cand.experience || '3+ Years'}</span>
                            </div>
                          </div>

                          <div className="text-right flex sm:flex-col justify-between items-end gap-1">
                            <span className="px-2.5 py-1 bg-purple-100 text-purple-800 font-extrabold text-[10px] rounded-full border border-purple-200 flex items-center gap-1">
                              <Star className="w-3 h-3 fill-purple-600" /> Shortlisted
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">Added: {cand.shortlistedAt}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setViewProfileRecruiter(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

