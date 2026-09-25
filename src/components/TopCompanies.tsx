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

const ROW_1_COMPANIES: MNCBrand[] = [
  {
    id: 'clyptus', name: 'Clyptus Technologies', category: 'Enterprise AI & Cloud', openings: 28, rating: 4.8, isParent: true, bgGradient: 'linear-gradient(135deg, #FFF5EB 0%, #FFE6CC 100%)',
    renderLogo: () => <img src="/clyptus_logo.jpg" alt="Clyptus Technologies" style={{ height: '52px', maxWidth: '70px', objectFit: 'contain' }} />
  },
  {
    id: 'google', name: 'Google', category: 'Cloud & AI Research', openings: 142, rating: 4.9, bgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    renderLogo: () => <Building2 size={32} color="#4285F4" />
  },
  {
    id: 'microsoft', name: 'Microsoft', category: 'Enterprise Platforms', openings: 118, rating: 4.8, bgGradient: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
    renderLogo: () => <Building2 size={32} color="#00a4ef" />
  },
  {
    id: 'amazon', name: 'Amazon / AWS', category: 'Cloud Infrastructure', openings: 195, rating: 4.7, bgGradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
    renderLogo: () => <Building2 size={32} color="#FF9900" />
  },
  {
    id: 'meta', name: 'Meta', category: 'GenAI & Frontier Tech', openings: 64, rating: 4.8, bgGradient: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
    renderLogo: () => <Building2 size={32} color="#0668E1" />
  },
  {
    id: 'apple', name: 'Apple', category: 'Consumer Hardware & OS', openings: 52, rating: 4.9, bgGradient: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
    renderLogo: () => <Building2 size={32} color="#000000" />
  },
  {
    id: 'nvidia', name: 'NVIDIA', category: 'Accelerated GPU Computing', openings: 78, rating: 4.9, bgGradient: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
    renderLogo: () => <Building2 size={32} color="#76B900" />
  },
  {
    id: 'salesforce', name: 'Salesforce', category: 'Enterprise CRM & Cloud', openings: 92, rating: 4.7, bgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #BAE6FD 100%)',
    renderLogo: () => <Building2 size={32} color="#00A1E0" />
  }
];

const ROW_2_COMPANIES: MNCBrand[] = [
  {
    id: 'infosys', name: 'Infosys', category: 'Digital Services & Tech', openings: 320, rating: 4.6, bgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)',
    renderLogo: () => <Building2 size={32} color="#007CC3" />
  },
  {
    id: 'tcs', name: 'TCS', category: 'Global IT Consulting', openings: 460, rating: 4.6, bgGradient: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
    renderLogo: () => <Building2 size={32} color="#002B49" />
  },
  {
    id: 'oracle', name: 'Oracle', category: 'Autonomous Database & Cloud', openings: 86, rating: 4.6, bgGradient: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
    renderLogo: () => <Building2 size={32} color="#F80000" />
  },
  {
    id: 'adobe', name: 'Adobe', category: 'Creative Cloud & Experience', openings: 48, rating: 4.8, bgGradient: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
    renderLogo: () => <Building2 size={32} color="#FF0000" />
  },
  {
    id: 'accenture', name: 'Accenture', category: 'Strategy & Technology', openings: 240, rating: 4.7, bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
    renderLogo: () => <Building2 size={32} color="#A100FF" />
  },
  {
    id: 'ibm', name: 'IBM', category: 'Hybrid Cloud & Quantum', openings: 135, rating: 4.6, bgGradient: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
    renderLogo: () => <Building2 size={32} color="#1F70C1" />
  },
  {
    id: 'intel', name: 'Intel', category: 'Semiconductor & Compute', openings: 74, rating: 4.6, bgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    renderLogo: () => <Building2 size={32} color="#0068B5" />
  },
  {
    id: 'cisco', name: 'Cisco Systems', category: 'Networking & Cybersecurity', openings: 62, rating: 4.7, bgGradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
    renderLogo: () => <Building2 size={32} color="#049FD9" />
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
