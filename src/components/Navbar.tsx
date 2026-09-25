import React, { useState } from 'react';
import { 
  Sparkles, 
  Building2, 
  Menu, 
  X, 
  User, 
  Briefcase,
  Grid 
} from 'lucide-react';
import { ClyptusLogo } from './ClyptusLogo';

interface NavbarProps {
  onCandidateLogin?: () => void;
  onRecruiterLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onCandidateLogin = () => {},
  onRecruiterLogin = () => {}
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header 
      className="glass-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%'
      }}
    >
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '84px',
          padding: '0 8px'
        }}>
          
          {/* 1. Brand Logo: Official Clyptus Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <ClyptusLogo height={68} theme="light" />
          </a>

          {/* 2. Center Nav: Equal, balanced spacing between items */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
            <a 
              href="#categories-section" 
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                fontSize: '0.96rem',
                fontWeight: 600,
                color: '#334155',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FF6600';
                e.currentTarget.style.background = '#FFF6EE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#334155';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Grid size={18} color="#FF6600" />
              <span>Categories</span>
            </a>

            <a 
              href="#companies-section" 
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                fontSize: '0.96rem',
                fontWeight: 600,
                color: '#334155',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FF6600';
                e.currentTarget.style.background = '#FFF6EE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#334155';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Building2 size={18} color="#FF6600" />
              <span>Top MNC Companies</span>
            </a>

            <a 
              href="#about-clyptus" 
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                fontSize: '0.96rem',
                fontWeight: 600,
                color: '#334155',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FF6600';
                e.currentTarget.style.background = '#FFF6EE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#334155';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Sparkles size={18} color="#FF6600" />
              <span>About Clyptus</span>
            </a>
          </nav>

          {/* 3. Right Actions: Candidate & Recruiter Login */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

            {/* Candidate Button */}
            <button
              type="button"
              onClick={onCandidateLogin}
              className="btn-primary"
              style={{
                padding: '10px 22px',
                fontSize: '0.92rem',
                borderRadius: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                boxShadow: '0 6px 18px rgba(255, 102, 0, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <User size={16} />
              <span>Candidate</span>
            </button>

            {/* Recruiter Button */}
            <button
              type="button"
              onClick={onRecruiterLogin}
              style={{
                padding: '10px 22px',
                fontSize: '0.92rem',
                borderRadius: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                background: 'transparent',
                border: '2px solid #06101E',
                color: '#06101E',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#06101E';
                (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = '#06101E';
              }}
            >
              <Briefcase size={16} />
              <span>Recruiter</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none', padding: '10px', borderRadius: '10px', background: '#F1F5F9' }}
              className="mobile-toggle"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            padding: '20px 8px 24px',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <a href="#categories-section" onClick={() => setMobileMenuOpen(false)} style={{ padding: '10px 12px', fontWeight: 600, color: '#1E293B', borderRadius: '8px' }}>Categories</a>
            <a href="#companies-section" onClick={() => setMobileMenuOpen(false)} style={{ padding: '10px 12px', fontWeight: 600, color: '#1E293B', borderRadius: '8px' }}>Top MNC Companies</a>
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); onCandidateLogin(); }}
              className="btn-primary"
              style={{ padding: '12px', textAlign: 'center', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}
            >
              <User size={18} />
              <span>Candidate Login</span>
            </button>
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); onRecruiterLogin(); }}
              style={{ padding: '12px', textAlign: 'center', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'transparent', border: '2px solid #06101E', color: '#06101E', cursor: 'pointer' }}
            >
              <Briefcase size={18} />
              <span>Recruiter Login</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hidden.md\\:flex {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
