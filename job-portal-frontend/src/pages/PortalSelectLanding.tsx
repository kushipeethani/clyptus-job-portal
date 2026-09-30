import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ShieldAlert, ShieldCheck, Users, ArrowRight, Sparkles } from 'lucide-react';

export const PortalSelectLanding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans relative overflow-hidden">
      
      {/* Background Subtle Gradient Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="px-8 py-5 flex items-center justify-between relative z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue-600 text-white flex items-center justify-center font-black text-2xl tracking-tighter shadow-md shadow-blue-500/20">
            C
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight text-slate-900">Clyptus</h1>
            <p className="text-[10px] text-slate-500 font-semibold">Enterprise Multi-Tenant Job Portal Platform</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
          Production V3.0
        </span>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 flex flex-col items-center justify-center relative z-10 space-y-10">
        
        <div className="text-center space-y-3 max-w-2xl">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-orange-100 text-brand-orange-700 border border-orange-200 uppercase tracking-wider flex items-center gap-1.5 w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange-600" /> Dedicated Enterprise Portals
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Select Portal Access Point
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Each role operates within a separate, fully isolated portal authentication & authorization boundary.
          </p>
        </div>

        {/* 3 Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          
          {/* Card 1: Org Super Admin */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-brand-orange-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange-600 border border-orange-200 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-brand-orange-600 tracking-wider">Highest Tenant Privilege</span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">Organization Super Admin Portal</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Manage organization admin accounts, RBAC permission matrixes, recruiter credit allocations, and audit logs.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/organization-super-admin/login')}
              className="w-full py-3 bg-brand-orange-500 hover:bg-brand-orange-600 text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group-hover:translate-x-0.5 cursor-pointer"
            >
              Org Super Admin Login <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Org Admin */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-brand-blue-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue-600 border border-blue-200 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-brand-blue-600 tracking-wider">Configurable RBAC</span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">Organization Admin Portal</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Recruiter management, job approvals, candidate application ATS reviews, and organization reporting.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/admin/login')}
              className="w-full py-3 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group-hover:translate-x-0.5 cursor-pointer"
            >
              Org Admin Login <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Recruiter */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Talent Acquisition</span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">Recruiter Portal</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Post jobs, search candidate database (1 credit/action), download resumes, shortlist applications & schedule interviews.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/recruiter/login')}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group-hover:translate-x-0.5 cursor-pointer"
            >
              Recruiter Login <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="px-8 py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white relative z-10">
        Clyptus Production Multi-Tenant Platform • Strict Portal Isolation & Authentication Boundary
      </footer>

    </div>
  );
};
