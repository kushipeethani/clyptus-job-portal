import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { OrgSuperAdminHeader } from './OrgSuperAdminHeader';
import { OrgSuperAdminSidebar } from './OrgSuperAdminSidebar';
import { INITIAL_CREDIT_ACCOUNT } from '../../store/clyptus.store';
import { OrganizationCreditAccount } from '../../types/clyptus.types';
import { CheckCircle2 } from 'lucide-react';

export const OrgSuperAdminLayout: React.FC = () => {
  const [creditAccount, setCreditAccount] = useState<OrganizationCreditAccount>(INITIAL_CREDIT_ACCOUNT);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch live credit account balance from REST API backend
  const fetchCreditAccount = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/credits/account');
      const json = await res.json();
      if (json.success && json.data?.account) {
        setCreditAccount(json.data.account);
      }
    } catch (err) {
      console.warn('Backend REST API connection offline, utilizing local state.');
    }
  };

  useEffect(() => {
    fetchCreditAccount();
    const interval = setInterval(fetchCreditAccount, 3000); // Polling every 3s for live updates
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-brand-orange-500" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <OrgSuperAdminHeader creditBalance={creditAccount.balance} />

      <div className="flex flex-1 overflow-hidden">
        <OrgSuperAdminSidebar />
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
          <Outlet context={{ creditAccount, setCreditAccount, fetchCreditAccount, showToast }} />
        </main>
      </div>

      </div>
  );
};
