import React from 'react';
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  TrendingUp, 
  ExternalLink,
  CheckCircle2,
  Users,
  Zap
} from 'lucide-react';

interface AboutClyptusProps {
  onLogin?: () => void;
}

export const AboutClyptus: React.FC<AboutClyptusProps> = ({
  onLogin = () => {}
}) => {
  return (
    <section id="about-clyptus" style={{ padding: '80px 0', background: '#FAF9F6', borderTop: '1px solid #EDF2F7', borderBottom: '1px solid #EDF2F7' }}>
      <div className="container">
        
        {/* Top Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
          <div className="badge-orange" style={{ marginBottom: '12px' }}>
            <Sparkles size={14} color="#FF6600" />
            <span>Why Clyptus Careers?</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            More Than Just a Job Portal
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.02rem', lineHeight: 1.6, marginTop: '12px' }}>
            <strong>Clyptus</strong> transforms how tech and product professionals discover opportunities. Unlike traditional job portals with outdated listings and spam, Clyptus guarantees 100% verified active openings, transparent salary bands, and direct fast-track corporate hiring.
          </p>
        </div>

        {/* 4 Core Job Portal Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '24px',
          marginBottom: '50px'
        }}>
          
          {/* Card 1: 150K+ Verified Openings */}
          <div className="card-white" style={{ padding: '30px', borderRadius: '22px', border: '1px solid #EDF2F7', background: '#FFFFFF' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: '#FFF5EC',
              color: '#FF6600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px',
              border: '1px solid #FED7AA'
            }}>
              <Search size={28} />
            </div>
            <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Wide Job Opportunities
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Explore thousands of verified job openings from top multinational companies, high-growth startups, and Fortune 500 tech leaders.
            </p>
          </div>

          {/* Card 2: 100% Direct Corporate HR Calls */}
          <div className="card-white" style={{ padding: '30px', borderRadius: '22px', border: '1px solid #EDF2F7', background: '#FFFFFF' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: '#ECFDF5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px',
              border: '1px solid #A7F3D0'
            }}>
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Trusted & Secure Hiring
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Zero spam agencies and zero ghost jobs. Your data is encrypted, and you receive direct interview invitations from verified HR leads.
            </p>
          </div>

          {/* Card 3: 1-Click Fast Apply */}
          <div className="card-white" style={{ padding: '30px', borderRadius: '22px', border: '1px solid #EDF2F7', background: '#FFFFFF' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: '#FFF7ED',
              color: '#EA580C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px',
              border: '1px solid #FFEDD5'
            }}>
              <Zap size={28} />
            </div>
            <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Easy to Use & 1-Click Apply
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Seamless experience for candidates with rapid application tracking and real-time status updates.
            </p>
          </div>

          {/* Card 4: High CTC Bands & Live Benchmarks */}
          <div className="card-white" style={{ padding: '30px', borderRadius: '22px', border: '1px solid #EDF2F7', background: '#FFFFFF' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px',
              border: '1px solid #BFDBFE'
            }}>
              <TrendingUp size={28} />
            </div>
            <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Talent Meets Opportunity
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.88rem', lineHeight: 1.6 }}>
              We bring the right candidates and top employers together with transparent compensation insights (₹20L – ₹65L+ LPA CTC).
            </p>
          </div>

        </div>

        {/* Highlighted Banner & Official Link */}
        <div style={{
          background: 'linear-gradient(135deg, #06101E 0%, #0B172B 100%)',
          borderRadius: '24px',
          padding: '40px',
          color: '#FFFFFF',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '30px',
          alignItems: 'center',
          boxShadow: '0 20px 40px -10px rgba(6, 16, 30, 0.5)',
          border: '1px solid rgba(255, 85, 0, 0.35)'
        }} className="about-banner-grid">
          
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 102, 0, 0.15)', color: '#FF8533', padding: '4px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>
              <Users size={14} />
              <span>India&apos;s Leading Talent Network</span>
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px', lineHeight: 1.3 }}>
              Ready to Discover Your Next High-Impact Role?
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Join 250,000+ developers, designers, and managers hired by top multinational technology leaders through Clyptus.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={onLogin}
                className="btn-primary"
                style={{
                  padding: '12px 28px',
                  fontSize: '0.95rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <span>Find Jobs on Clyptus</span>
                <CheckCircle2 size={18} />
              </button>

              <a
                href="https://clyptus.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
              >
                <span>Visit Clyptus.com</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '24px',
            borderRadius: '18px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FF6600' }}>150K+</div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '2px' }}>Active Job Openings</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10B981' }}>45K+</div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '2px' }}>Hiring Companies</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#38BDF8' }}>48 Hrs</div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '2px' }}>Direct HR Response</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#F59E0B' }}>₹26.5L</div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '2px' }}>Average CTC Band</div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-banner-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
