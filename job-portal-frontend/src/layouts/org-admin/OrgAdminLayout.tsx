import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { OrgAdminHeader } from './OrgAdminHeader';
import { OrgAdminSidebar } from './OrgAdminSidebar';
import { INITIAL_CREDIT_ACCOUNT, getStoreCreditAccount } from '../../store/clyptus.store';
import { CheckCircle2 } from 'lucide-react';

export const OrgAdminLayout: React.FC = () => {
  const [creditAccount, setCreditAccount] = useState(getStoreCreditAccount());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    const handleSync = () => {
      setCreditAccount(getStoreCreditAccount());
    };
    window.addEventListener('clyptus_store_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('clyptus_store_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
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

      <OrgAdminHeader creditBalance={creditAccount.balance} />

      <div className="flex flex-1 overflow-hidden">
        <OrgAdminSidebar />
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
          <Outlet context={{ creditAccount, setCreditAccount, showToast }} />
        </main>
      </div>

    </div>
  );
};
