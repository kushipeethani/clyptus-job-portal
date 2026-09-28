import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Building2, Save, Key, Globe, ShieldCheck } from 'lucide-react';
import { OrgRole } from '../../types/organization.types';
import { MOCK_ORG } from '../../store/organization.store';

interface ContextType {
  currentRole: OrgRole;
  showToast: (msg: string) => void;
}

export const Settings: React.FC = () => {
  const { showToast } = useOutletContext<ContextType>();
  const [profile, setProfile] = useState(MOCK_ORG);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Company profile settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Organisation Settings</h2>
        <p className="text-xs text-slate-500">Manage company profile, portal branding, and API key integrations</p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <img src={profile.logo} alt="Company Logo" className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 shadow-sm" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm">{profile.name}</h3>
            <p className="text-xs text-slate-500">{profile.domain} • {profile.industry}</p>
            <button type="button" className="mt-2 text-xs font-bold text-brand-blue-600 hover:underline">
              Change Logo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Domain</label>
            <input
              type="text"
              value={profile.domain}
              onChange={(e) => setProfile({ ...profile, domain: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Industry</label>
            <input
              type="text"
              value={profile.industry}
              onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Company Size</label>
            <input
              type="text"
              value={profile.size}
              onChange={(e) => setProfile({ ...profile, size: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>

      </form>
    </div>
  );
};
