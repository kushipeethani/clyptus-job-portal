import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Hero } from '../../components/Hero';
import { CategoryGrid } from '../../components/CategoryGrid';
import { TopCompanies } from '../../components/TopCompanies';
import { AboutClyptus } from '../../components/AboutClyptus';
import { Footer } from '../../components/Footer';
import { Lock, X } from 'lucide-react';
import { INITIAL_CATEGORIES, INITIAL_COMPANIES } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();
  const [loginAlertOpen, setLoginAlertOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerLoginPrompt = (userRole?: string) => {
    const msg = userRole ? `${userRole} Login: Please login` : 'Please login';
    setToastMessage(msg);
    setLoginAlertOpen(true);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      <Navbar onCandidateLogin={() => navigate('/candidate/login')} />
      <Hero totalJobsCount={INITIAL_COMPANIES.reduce((acc, c) => acc + c.openings, 0)} />

      <CategoryGrid
        categories={INITIAL_CATEGORIES}
        selectedCategory=""
        onSelectCategory={() => {
          const section = document.getElementById('companies-section');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <TopCompanies
        companies={INITIAL_COMPANIES}
        onSelectCompany={() => {
          triggerLoginPrompt('Candidate');
        }}
      />

      <AboutClyptus onLogin={() => triggerLoginPrompt()} />

      <Footer
        onNewsletterSubscribe={() => {}}
        onFilterLocation={() => {
          const section = document.getElementById('companies-section');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }}
        onFilterRole={() => {
          const section = document.getElementById('companies-section');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 3000,
          background: '#0F172A', color: '#FFFFFF', padding: '14px 22px',
          borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', gap: '10px',
          border: '1px solid #FF5500', fontSize: '0.95rem', fontWeight: 700
        }}>
          <Lock size={18} color="#FF5500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Login Alert Modal */}
      {loginAlertOpen && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setLoginAlertOpen(false); }}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(6, 16, 30, 0.72)',
            backdropFilter: 'blur(6px)', zIndex: 2500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
          }}
        >
          <div style={{
            maxWidth: '380px', width: '100%', padding: '32px 28px',
            textAlign: 'center', borderRadius: '24px', position: 'relative',
            background: '#ffffff', boxShadow: '0 25px 50px -12px rgba(255, 85, 0, 0.25)',
            border: '1.5px solid #FFB38A'
          }}>
            <button
              onClick={() => setLoginAlertOpen(false)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: '#F1F5F9', border: 'none', width: '32px', height: '32px',
                borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer'
              }}
            >
              <X size={18} color="#64748B" />
            </button>
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%',
              background: '#FFF3EE', color: '#FF5500',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', border: '2px solid #FFB38A'
            }}>
              <Lock size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#06101E', marginBottom: '8px' }}>
              Please Login
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '24px' }}>
              Please login to continue.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
              <button
                onClick={() => { setLoginAlertOpen(false); navigate('/candidate/login'); }}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 700 }}
              >
                Login to Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
