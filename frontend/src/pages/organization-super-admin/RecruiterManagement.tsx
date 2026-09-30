import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  UserPlus, 
  Trash2, 
  Edit, 
  Coins, 
  UserX, 
  UserCheck, 
  ShieldCheck, 
  CheckCircle2, 
  Eye, 
  Lock, 
  Phone, 
  X,
  Star,
  Copy,
  Check
} from 'lucide-react';
import { RecruiterUser, ShortlistedCandidate } from '../../types/clyptus.types';
import { 
  INITIAL_RECRUITERS, 
  getStoreRecruiters, 
  saveStoreRecruiters, 
  allocateCreditsToRecruiter, 
  getStoreShortlistedCandidates, 
  updateRecruiterDetails, 
  logAction, 
  setSingleAdminRecruiter,
  hasRolePermission
} from '../../store/clyptus.store';

interface ContextType {
  showToast: (msg: string) => void;
}

export const RecruiterManagement: React.FC = () => {
  const { showToast } = useOutletContext<ContextType>();
  const [recruiters, setRecruiters] = useState<RecruiterUser[]>(getStoreRecruiters());
  const [canAllocateTokens, setCanAllocateTokens] = useState<boolean>(() => hasRolePermission('superAdmin', 'p7'));
  const [canManageTeam, setCanManageTeam] = useState<boolean>(() => hasRolePermission('superAdmin', 'p6'));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Add Recruiter Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('+91 98765 43210');
  const [formRole, setFormRole] = useState('Tech Recruiter');
  const [formPassword, setFormPassword] = useState('');
  const [formConfirmPassword, setFormConfirmPassword] = useState('');
  const [formCredits, setFormCredits] = useState<number>(0);

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

  // Newly Created Credentials Display State
  const [createdCredentials, setCreatedCredentials] = useState<{
    name: string;
    email: string;
    password: string;
    credits: number;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Allocate Credit Modal State
  const [creditModalUser, setCreditModalUser] = useState<RecruiterUser | null>(null);
  const [additionalCredits, setAdditionalCredits] = useState<number>(0);

  // View Recruiter Profile Modal State
  const [viewProfileRecruiter, setViewProfileRecruiter] = useState<RecruiterUser | null>(null);

  const fetchRecruiters = () => {
    setRecruiters(getStoreRecruiters());
    setCanAllocateTokens(hasRolePermission('superAdmin', 'p7'));
    setCanManageTeam(hasRolePermission('superAdmin', 'p6'));
  };

  useEffect(() => {
    fetchRecruiters();

    const handleSync = () => {
      fetchRecruiters();
    };
    window.addEventListener('clyptus_store_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('clyptus_store_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const handleOpenEdit = (rec: RecruiterUser) => {
    setEditModalUser(rec);
    setEditForm({
      name: rec.name,
      email: rec.email,
      phone: rec.phone || '+91 98765 43210',
      recruiterRole: rec.recruiterRole || 'Tech Recruiter',
      status: (rec.status === 'SUSPENDED' ? 'SUSPENDED' : 'ACTIVE')
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
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
      'Organization Super Admin'
    );

    setRecruiters(updated);
    setEditModalUser(null);
    showToast(`Recruiter ${editForm.name} updated successfully!`);
  };

  const handleDesignateAdmin = (rec: RecruiterUser) => {
    const updated = setSingleAdminRecruiter(rec.id, 'Organization Super Admin');
    setRecruiters(updated);
    showToast(`Designated ${rec.name} as the sole Organization Admin.`);
  };

  const handleAddRecruiter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formPassword !== formConfirmPassword) {
      showToast('Passwords do not match!');
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
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formName)}&background=3B82F6&color=fff`,
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
          password: json.generatedCredentials?.temporaryPassword || formPassword || 'Clyptus@2026',
          credits: formCredits,
        });
      }
    } catch (err) {}

    const updatedList = [newRecruiter, ...getStoreRecruiters()];
    saveStoreRecruiters(updatedList);
    setRecruiters(updatedList);
    setIsAddModalOpen(false);

    if (!createdCredentials) {
      setCreatedCredentials({
        name: formName,
        email: formEmail,
        password: formPassword || 'Clyptus@2026',
        credits: formCredits,
      });
    }

    logAction(
      'Super Admin',
      'SUPER_ADMIN',
      'RECRUITER_CREATED',
      'RecruiterUser',
      newRecruiter.id,
      'USER',
      `Created recruiter account for ${newRecruiter.name} (${newRecruiter.email}) with ${formCredits} initial credits.`
    );

    setFormName('');
    setFormEmail('');
    setFormPassword('');
    setFormConfirmPassword('');
    setFormCredits(0);
    showToast(`Recruiter ${formName} created successfully!`);
  };

  const handleRemoveRecruiter = async (recId: string, recName: string) => {
    if (!window.confirm(`Are you sure you want to delete recruiter ${recName}?`)) return;

    try {
      await fetch(`http://localhost:5000/api/v1/recruiters/${recId}`, {
        method: 'DELETE'
      });
    } catch (err) {}

    const updated = recruiters.filter((r) => r.id !== recId);
    saveStoreRecruiters(updated);
    setRecruiters(updated);

    logAction(
      'Super Admin',
      'SUPER_ADMIN',
      'RECRUITER_DELETED',
      'RecruiterUser',
      recId,
      'USER',
      `Deleted recruiter account ${recName} (${recId}).`
    );

    showToast(`Recruiter ${recName} removed.`);
  };

  const handleToggleStatus = async (rec: RecruiterUser) => {
    const newStatus = rec.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';

    try {
      await fetch(`http://localhost:5000/api/v1/recruiters/${rec.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {}

    const updated = recruiters.map((r) => {
      if (r.id === rec.id) {
        return { ...r, status: newStatus as any };
      }
      return r;
    });

    saveStoreRecruiters(updated);
    setRecruiters(updated);

    logAction(
      'Super Admin',
      'SUPER_ADMIN',
      `RECRUITER_STATUS_${newStatus}`,
      'RecruiterUser',
      rec.id,
      'USER',
      `Changed recruiter status for ${rec.name} to ${newStatus}.`
    );

    showToast(`Recruiter ${rec.name} is now ${newStatus}.`);
  };

  const handleAllocateCredits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditModalUser) return;

    const updated = allocateCreditsToRecruiter(creditModalUser.id, additionalCredits, 'Organization Super Admin');
    setRecruiters(updated);
    setCreditModalUser(null);

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

    showToast(`Allocated ${additionalCredits} credits to recruiter ${creditModalUser.name}!`);
  };

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2500);
    showToast(`Copied ${fieldKey} to clipboard`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Recruiter Governance & Credentials</h2>
          <p className="text-xs text-slate-500">Create recruiter accounts with credentials, remove recruiters, and allocate credit quotas</p>
        </div>

        {canManageTeam && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 w-fit transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Add New Recruiter (Create Credentials)
          </button>
        )}
      </div>

      {/* Generated Credentials Alert Modal (Clean White Card) */}
      {createdCredentials && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Recruiter Credentials Generated</h3>
                <p className="text-xs text-slate-500">Share these login details with {createdCredentials.name}</p>
              </div>
            </div>
            <button
              onClick={() => setCreatedCredentials(null)}
              className="text-slate-500 hover:text-slate-900 text-xs font-bold px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2.5 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-sans font-bold">Portal Login URL:</span>
              <div className="flex items-center gap-2">
                <strong className="text-brand-blue-700 font-mono">http://localhost:3000/login</strong>
                <button
                  onClick={() => copyToClipboard('http://localhost:3000/login', 'Login URL')}
                  className="p-1 hover:bg-slate-200 rounded text-slate-500"
                >
                  {copiedField === 'Login URL' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-sans font-bold">Recruiter Email:</span>
              <div className="flex items-center gap-2">
                <strong className="text-slate-900 font-mono">{createdCredentials.email}</strong>
                <button
                  onClick={() => copyToClipboard(createdCredentials.email, 'Email')}
                  className="p-1 hover:bg-slate-200 rounded text-slate-500"
                >
                  {copiedField === 'Email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-sans font-bold">Generated Password:</span>
              <div className="flex items-center gap-2">
                <strong className="text-slate-900 font-mono">{createdCredentials.password}</strong>
                <button
                  onClick={() => copyToClipboard(createdCredentials.password, 'Password')}
                  className="p-1 hover:bg-slate-200 rounded text-slate-500"
                >
                  {copiedField === 'Password' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-sans font-bold">Initial Credits:</span>
              <strong className="text-slate-900 font-mono">{createdCredentials.credits} credits</strong>
            </div>
          </div>
        </div>
      )}

      {/* Designated Organization Admin Banner (Clean White Theme) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-bold shrink-0">
            <ShieldCheck className="w-5 h-5 text-slate-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                Single Admin Governance
              </span>
              <span className="text-xs text-slate-500 font-medium">(Only 1 recruiter can be designated as Admin)</span>
            </div>
            <div className="text-sm font-extrabold text-slate-900 mt-1">
              Designated Admin: {recruiters.find(r => r.isAdmin)?.name ? (
                <span className="text-slate-900 font-extrabold">{recruiters.find(r => r.isAdmin)?.name} <span className="text-xs text-slate-500 font-normal">({recruiters.find(r => r.isAdmin)?.email})</span></span>
              ) : (
                <span className="text-slate-400 italic">No recruiter designated as admin yet</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Active Recruiters ({recruiters.length})</h3>
          <span className="text-xs font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
            Live Credit Allocation Server Active
          </span>
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
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recruiters.map((rec) => {
                const availableCredits = rec.remainingBalance !== undefined 
                  ? Math.max(0, rec.remainingBalance) 
                  : Math.max(0, (rec.allocatedCredits || 0) - (rec.totalCreditsUsed || 0));

                const isSuspended = rec.status === 'SUSPENDED';

                return (
                  <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 pl-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img 
                          src={rec.avatar} 
                          alt={rec.name} 
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-xs" 
                        />
                        <div>
                          <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                            {rec.name}
                            {rec.isAdmin && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-slate-700" /> Admin
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                            {rec.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 whitespace-nowrap font-bold text-slate-800">
                      <span className="px-2.5 py-1 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-[11px] font-bold">
                        {rec.recruiterRole || 'Tech Recruiter'}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap font-bold">
                      {isSuspended ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1 w-fit">
                          <UserX className="w-3 h-3" /> Suspended
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-fit">
                          <UserCheck className="w-3 h-3" /> Active
                        </span>
                      )}
                    </td>

                    <td className="p-4 whitespace-nowrap font-extrabold text-slate-900">{rec.activeJobsCount || 0} Jobs</td>
                    <td className="p-4 whitespace-nowrap font-bold text-slate-700">{rec.profileViewsCount || 0}V / {rec.resumeDownloadsCount || 0}D</td>

                    <td className="p-4 whitespace-nowrap font-black text-slate-900 text-xs">
                      {availableCredits} credits
                    </td>

                    <td className="p-3 text-right pr-6 whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5 flex-nowrap">
                        
                        {/* Allocate Credits Button */}
                        {canAllocateTokens && (
                          <button
                            onClick={() => setCreditModalUser(rec)}
                            className="h-8 px-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 border border-slate-200 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-2xs whitespace-nowrap cursor-pointer"
                            title="Allocate Credits"
                          >
                            <Coins className="w-3.5 h-3.5 text-slate-500" /> Allocate
                          </button>
                        )}

                        {/* Admin Badge or Make Admin Button */}
                        {canManageTeam && (
                          rec.isAdmin ? (
                            <span className="h-8 px-2.5 text-xs font-bold text-slate-900 bg-slate-100 border border-slate-300 rounded-xl inline-flex items-center gap-1 whitespace-nowrap">
                              <ShieldCheck className="w-3.5 h-3.5 text-slate-700" /> Admin
                            </span>
                          ) : (
                            <button
                              onClick={() => handleDesignateAdmin(rec)}
                              className="h-8 px-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 border border-slate-200 rounded-xl inline-flex items-center gap-1 transition-all shadow-2xs whitespace-nowrap cursor-pointer"
                              title="Designate as sole Organization Admin"
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Make Admin
                            </button>
                          )
                        )}

                        {/* View Profile Button */}
                        <button
                          onClick={() => setViewProfileRecruiter(rec)}
                          className="h-8 w-8 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl inline-flex items-center justify-center transition-all shadow-2xs shrink-0 cursor-pointer"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Edit Button */}
                        {canManageTeam && (
                          <button
                            onClick={() => handleOpenEdit(rec)}
                            className="h-8 w-8 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl inline-flex items-center justify-center transition-all shadow-2xs shrink-0 cursor-pointer"
                            title="Edit Details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}

                        {/* Suspend / Activate Button */}
                        {canManageTeam && (
                          <button
                            onClick={() => handleToggleStatus(rec)}
                            className="h-8 w-8 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl inline-flex items-center justify-center transition-all shadow-2xs shrink-0 cursor-pointer"
                            title={isSuspended ? 'Activate Account' : 'Suspend Account'}
                          >
                            {isSuspended ? <UserCheck className="w-4 h-4 text-emerald-600" /> : <UserX className="w-4 h-4 text-slate-500" />}
                          </button>
                        )}

                        {/* Delete Button */}
                        {canManageTeam && (
                          <button
                            onClick={() => handleRemoveRecruiter(rec.id, rec.name)}
                            className="h-8 w-8 text-slate-400 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl inline-flex items-center justify-center transition-all shadow-2xs shrink-0 cursor-pointer"
                            title="Remove Recruiter"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}

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
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-brand-blue-600" />
                <h3 className="font-extrabold text-base text-slate-900">Add Recruiter & Generate Credentials</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRecruiter} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Roy"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Login Username) *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ananya.r@abctech.com"
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Set Account Password *</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
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

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Create Account & Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Recruiter Modal */}
      {editModalUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-slate-700" />
                <h3 className="font-extrabold text-base text-slate-900">Edit Recruiter Profile</h3>
              </div>
              <button onClick={() => setEditModalUser(null)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100">
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
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
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

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditModalUser(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in duration-150">
            <h3 className="font-extrabold text-slate-900 text-base">Allocate Credits to {creditModalUser.name}</h3>
            <p className="text-xs text-slate-500">Add candidate profile view & resume download credits directly to this recruiter's quota.</p>

            <form onSubmit={handleAllocateCredits} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Credit Amount *</label>
                <input
                  type="number"
                  min="0"
                  value={additionalCredits}
                  onChange={(e) => setAdditionalCredits(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-brand-blue-500 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCreditModalUser(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-150">
            
            {/* Modal Header (Clean White) */}
            <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={viewProfileRecruiter.avatar}
                  alt={viewProfileRecruiter.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-xs"
                />
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    {viewProfileRecruiter.name}
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full uppercase">
                      {viewProfileRecruiter.status}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">{viewProfileRecruiter.email} • ID: {viewProfileRecruiter.id}</p>
                </div>
              </div>
              <button onClick={() => setViewProfileRecruiter(null)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* Recruiter Details & Contact Info */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-0.5">Mobile Phone</span>
                  <strong className="text-slate-900 font-extrabold text-xs flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-600" /> {viewProfileRecruiter.phone || '+91 98765 43210'}
                  </strong>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-0.5">Recruiter Role</span>
                  <strong className="text-slate-800 font-bold text-xs bg-white px-2.5 py-0.5 rounded-lg border border-slate-200 inline-block">
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
                  
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-between">
                      Remaining Credits <Coins className="w-3.5 h-3.5 text-slate-600" />
                    </span>
                    <div className="text-2xl font-black text-slate-900">
                      {Math.max(0, viewProfileRecruiter.remainingBalance !== undefined
                        ? viewProfileRecruiter.remainingBalance
                        : ((viewProfileRecruiter.allocatedCredits || 0) - (viewProfileRecruiter.totalCreditsUsed || 0)))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-between">
                      Credits Used <Lock className="w-3.5 h-3.5 text-slate-600" />
                    </span>
                    <div className="text-2xl font-black text-slate-900">
                      {viewProfileRecruiter.totalCreditsUsed || 0}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-between">
                      Allocated Quota <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
                    </span>
                    <div className="text-2xl font-black text-slate-900">
                      {viewProfileRecruiter.allocatedCredits || 0}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-between">
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
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Shortlisted Candidates by {viewProfileRecruiter.name}
                  </h4>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
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
                        <div key={cand.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
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
                            <span className="px-2.5 py-1 bg-slate-100 text-slate-800 font-bold text-[10px] rounded-full border border-slate-200 flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Shortlisted
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
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setViewProfileRecruiter(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
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
