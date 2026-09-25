import React from 'react';
import { Building2, Zap } from 'lucide-react';
import type { Company } from '../types/job';

interface TopCompaniesProps {
  companies?: Company[];
  onSelectCompany: (companyName: string) => void;
}

interface MNCBrand {
  id: string;
  name: string;
  category: string;
  openings: number;
  rating: number;
  isParent?: boolean;
  bgGradient: string;
  renderLogo: () => React.ReactNode;
}

// ROW 1: Cloud, AI & Frontier Tech Giants
const ROW_1_COMPANIES: MNCBrand[] = [
  {
    id: 'clyptus',
    name: 'Clyptus Technologies',
    category: 'Enterprise AI & Cloud',
    openings: 28,
    rating: 4.8,
    isParent: true,
    bgGradient: 'linear-gradient(135deg, #FFF5EB 0%, #FFE6CC 100%)',
    renderLogo: () => (
      <img 
        src="/clyptus_logo.jpg" 
        alt="Clyptus Technologies" 
        style={{
          height: '52px',
          width: 'auto',
          maxWidth: '70px',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    )
  },
  {
    id: 'google',
    name: 'Google',
    category: 'Cloud & AI Research',
    openings: 142,
    rating: 4.9,
    bgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    renderLogo: () => (
      <svg width="46" height="46" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
    )
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    category: 'Enterprise Platforms',
    openings: 118,
    rating: 4.8,
    bgGradient: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
    renderLogo: () => (
      <svg width="42" height="42" viewBox="0 0 23 23">
        <path fill="#f25022" d="M1 1h10v10H1z" />
        <path fill="#7fba00" d="M12 1h10v10H12z" />
        <path fill="#00a4ef" d="M1 12h10v10H1z" />
        <path fill="#ffb900" d="M12 12h10v10H12z" />
      </svg>
    )
  },
  {
    id: 'amazon',
    name: 'Amazon / AWS',
    category: 'Cloud Infrastructure',
    openings: 195,
    rating: 4.7,
    bgGradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
    renderLogo: () => (
      <svg width="46" height="46" viewBox="0 0 24 24">
        <path fill="#FF9900" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.88c.64-.78 1.08-1.86.96-2.95-.93.04-2.05.62-2.72 1.4-.59.68-1.1 1.77-.96 2.83 1.04.08 2.08-.5 2.72-1.28" />
        <path fill="#232F3E" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.1" />
      </svg>
    )
  },
  {
    id: 'meta',
    name: 'Meta',
    category: 'GenAI & Frontier Tech',
    openings: 64,
    rating: 4.8,
    bgGradient: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
    renderLogo: () => (
      <svg width="46" height="46" viewBox="0 0 24 24">
        <path fill="#0668E1" d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.4 2.88 8.13 6.84 9.44.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48 3.96-1.31 6.83-5.04 6.83-9.44 0-5.5-4.46-9.96-9.96-9.96z" />
      </svg>
    )
  },
  {
    id: 'apple',
    name: 'Apple',
    category: 'Consumer Hardware & OS',
    openings: 52,
    rating: 4.9,
    bgGradient: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
    renderLogo: () => (
      <svg width="42" height="42" viewBox="0 0 170 170">
        <path fill="#000000" d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.85-12.01-14.44-6.3-9.5-11.29-20.25-14.99-32.26-3.7-12-5.55-23.23-5.55-33.68 0-14.65 3.82-26.69 11.45-36.14 7.63-9.45 17.3-14.28 29.02-14.48 4.8 0 10.37 1.25 16.71 3.76 6.34 2.5 10.27 3.82 11.78 3.96 1.76-.14 5.95-1.5 12.56-4.08 6.61-2.58 12.09-3.79 16.43-3.64 12.82.72 23.01 5.37 30.58 13.97-11.28 6.83-16.79 16.27-16.53 28.32.27 9.4 3.89 17.26 10.87 23.57 6.98 6.31 15.42 10.05 25.32 11.22-2.18 6.42-4.79 12.65-7.84 18.69zM119.22 33.15c0-7.39 2.67-14.41 8.01-21.06 5.34-6.65 11.95-10.99 19.83-13.01.27 1.02.41 2.04.41 3.06 0 7.32-2.73 14.41-8.19 21.27-5.46 6.86-12.18 11.19-20.16 12.99-.07-1.08-.1-2.16-.1-3.25z" />
      </svg>
    )
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    category: 'Accelerated GPU Computing',
    openings: 78,
    rating: 4.9,
    bgGradient: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
    renderLogo: () => (
      <svg width="46" height="46" viewBox="0 0 24 24">
        <path fill="#76B900" d="M11.77 4.29c-4.32.32-8.01 3.6-8.75 7.82-.41 2.37.1 4.78 1.42 6.74l1.83-2.14c-.69-1.34-.94-2.88-.66-4.41.48-2.61 2.76-4.66 5.4-4.87 1.2-.1 2.38.2 3.4.82l1.64-1.92c-1.34-.84-2.8-1.12-4.28-1.04zm4.45 2.59l-1.57 1.83c1.94 1.34 2.87 3.68 2.37 6.01-.5 2.34-2.38 4.18-4.76 4.67-1.56.32-3.15-.04-4.45-.96l-1.63 1.9c1.87 1.37 4.2 1.88 6.49 1.39 3.51-.74 6.28-3.48 7.02-6.99.73-3.48-.68-6.97-3.47-7.85z" />
      </svg>
    )
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'Enterprise CRM & Cloud',
    openings: 92,
    rating: 4.7,
    bgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #BAE6FD 100%)',
    renderLogo: () => (
      <svg width="46" height="46" viewBox="0 0 24 24">
        <path fill="#00A1E0" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    )
  }
];

// ROW 2: Enterprise Systems, Global Consulting & IT Leaders
const ROW_2_COMPANIES: MNCBrand[] = [
  {
    id: 'infosys',
    name: 'Infosys',
    category: 'Digital Services & Tech',
    openings: 320,
    rating: 4.6,
    bgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)',
    renderLogo: () => (
      <div style={{
        background: '#007CC3',
        color: '#FFFFFF',
        fontWeight: 900,
        fontSize: '1rem',
        padding: '8px 12px',
        borderRadius: '10px',
        letterSpacing: '0.02em'
      }}>
        Infosys
      </div>
    )
  },
  {
    id: 'tcs',
    name: 'TCS',
    category: 'Global IT Consulting',
    openings: 460,
    rating: 4.6,
    bgGradient: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
    renderLogo: () => (
      <div style={{
        background: '#002B49',
        color: '#FFFFFF',
        fontWeight: 900,
        fontSize: '1.1rem',
        padding: '8px 14px',
        borderRadius: '10px',
        letterSpacing: '0.06em'
      }}>
        TATA
      </div>
    )
  },
  {
    id: 'oracle',
    name: 'Oracle',
    category: 'Autonomous Database & Cloud',
    openings: 86,
    rating: 4.6,
    bgGradient: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
    renderLogo: () => (
      <svg width="46" height="46" viewBox="0 0 24 24">
        <path fill="#F80000" d="M16.2 14.4h-8.4c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4h8.4c2.4 0 4.4 2 4.4 4.4s-2 4.4-4.4 4.4zm-8.4-6.8c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4h8.4c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4H7.8z" />
      </svg>
    )
  },
  {
    id: 'adobe',
    name: 'Adobe',
    category: 'Creative Cloud & Experience',
    openings: 48,
    rating: 4.8,
    bgGradient: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
    renderLogo: () => (
      <svg width="44" height="44" viewBox="0 0 24 24">
        <path fill="#FF0000" d="M14.58 2H24v20zM9.42 2H0v20zM12 9.17l3.78 8.83h-2.45l-1.15-2.82h-3.4L12 9.17z" />
      </svg>
    )
  },
  {
    id: 'accenture',
    name: 'Accenture',
    category: 'Strategy & Technology',
    openings: 240,
    rating: 4.7,
    bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
    renderLogo: () => (
      <div style={{
        background: '#A100FF',
        color: '#FFFFFF',
        fontWeight: 900,
        fontSize: '1.4rem',
        width: '46px',
        height: '46px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        &gt;
      </div>
    )
  },
  {
    id: 'ibm',
    name: 'IBM',
    category: 'Hybrid Cloud & Quantum',
    openings: 135,
    rating: 4.6,
    bgGradient: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
    renderLogo: () => (
      <div style={{
        background: '#1F70C1',
        color: '#FFFFFF',
        fontWeight: 900,
        fontSize: '1.1rem',
        padding: '6px 14px',
        borderRadius: '8px',
        letterSpacing: '0.08em'
      }}>
        IBM
      </div>
    )
  },
  {
    id: 'intel',
    name: 'Intel',
    category: 'Semiconductor & Compute',
    openings: 74,
    rating: 4.6,
    bgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    renderLogo: () => (
      <div style={{
        background: '#0068B5',
        color: '#FFFFFF',
        fontWeight: 900,
        fontSize: '1.05rem',
        padding: '6px 12px',
        borderRadius: '8px',
        letterSpacing: '0.04em'
      }}>
        intel
      </div>
    )
  },
  {
    id: 'cisco',
    name: 'Cisco Systems',
    category: 'Networking & Cybersecurity',
    openings: 62,
    rating: 4.7,
    bgGradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
    renderLogo: () => (
      <div style={{
        background: '#049FD9',
        color: '#FFFFFF',
        fontWeight: 900,
        fontSize: '0.95rem',
        padding: '6px 12px',
        borderRadius: '8px',
        letterSpacing: '0.02em'
      }}>
        CISCO
      </div>
    )
  }
];

export const TopCompanies: React.FC<TopCompaniesProps> = ({
  onSelectCompany
}) => {
  // Duplicate for seamless right-to-left infinite marquee loops
  const row1Doubled = [...ROW_1_COMPANIES, ...ROW_1_COMPANIES];
  const row2Doubled = [...ROW_2_COMPANIES, ...ROW_2_COMPANIES];

  const renderCompanyCard = (comp: MNCBrand, idx: number, prefix: string) => (
    <div
      key={`${prefix}-${comp.id}-${idx}`}
      className="card-white"
      style={{
        width: '270px',
        minWidth: '270px',
        padding: '24px 22px',
        borderRadius: '22px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: comp.isParent ? '2px solid #FF8533' : '1.5px solid #E2E8F0',
        background: '#FFFFFF',
        boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
        position: 'relative',
        flexShrink: 0
      }}
    >
      {comp.isParent && (
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'linear-gradient(135deg, #FF7A00 0%, #FF3D00 100%)',
          color: '#FFFFFF',
          fontSize: '0.65rem',
          fontWeight: 800,
          padding: '2px 8px',
          borderRadius: '999px',
          textTransform: 'uppercase'
        }}>
          Parent
        </span>
      )}

      {/* Big Real-Time Vector Logo Container */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '22px',
        background: comp.bgGradient || '#FFF5EC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '14px',
        boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        {comp.renderLogo()}
      </div>

      {/* Company Name & Sector */}
      <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#0F172A', marginBottom: '3px' }}>
        {comp.name}
      </h3>
      <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600, marginBottom: '14px' }}>
        {comp.category}
      </span>

      {/* Openings & Action Button */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FF6600' }}>
          {comp.openings} Openings
        </span>

        <button
          type="button"
          onClick={() => onSelectCompany(comp.name)}
          className="btn-primary"
          style={{
            padding: '6px 14px',
            fontSize: '0.8rem',
            borderRadius: '8px',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
        >
          <Zap size={12} />
          <span>Opening</span>
        </button>
      </div>

    </div>
  );

  return (
    <section id="companies-section" style={{ padding: '60px 0', background: '#FFFFFF', overflow: 'hidden' }}>
      
      {/* Section Header */}
      <div className="container" style={{ marginBottom: '32px' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <div className="badge-orange" style={{ marginBottom: '10px' }}>
            <Building2 size={14} color="#FF6600" />
            <span>Top MNC Network</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            Top MNC Companies
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.98rem', marginTop: '6px' }}>
            Explore verified active openings across global Fortune 500 technology leaders and enterprise innovators.
          </p>
        </div>
      </div>

      {/* ROW 1: Tech & Cloud Titans scrolling Right to Left */}
      <div className="marquee-container" style={{ marginBottom: '22px' }}>
        <div className="marquee-track" style={{ gap: '22px', padding: '10px 0' }}>
          {row1Doubled.map((comp, idx) => renderCompanyCard(comp, idx, 'row1'))}
        </div>
      </div>

      {/* ROW 2: Enterprise Systems & Global Consulting scrolling Right to Left */}
      <div className="marquee-container">
        <div className="marquee-track-slow" style={{ gap: '22px', padding: '10px 0' }}>
          {row2Doubled.map((comp, idx) => renderCompanyCard(comp, idx, 'row2'))}
        </div>
      </div>

    </section>
  );
};
