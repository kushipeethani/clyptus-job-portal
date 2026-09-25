import React, { useState } from 'react';
import { 
  UserCheck, 
  Building2, 
  Sparkles, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export const PortalTabsSection: React.FC = () => {
  const [activePortal, setActivePortal] = useState<'seekers' | 'employers'>('seekers');

  return (
    <section id="portals-section" style={{ padding: '70px 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
      <div className="container">
        
        {/* Toggle Switch */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            background: '#FFFFFF',
            padding: '6px',
            borderRadius: '20px',
            border: '1.5px solid #FFD8BF',
            boxShadow: '0 4px 14px rgba(255, 102, 0, 0.1)'
          }}>
            <button
              onClick={() => setActivePortal('seekers')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: '16px',
                fontSize: '0.95rem',
                fontWeight: 700,
                background: activePortal === 'seekers' ? 'linear-gradient(135deg, #FF7A00 0%, #FF4D00 100%)' : 'transparent',
                color: activePortal === 'seekers' ? '#FFFFFF' : '#475569',
                boxShadow: activePortal === 'seekers' ? '0 4px 12px rgba(255, 102, 0, 0.3)' : 'none'
              }}
            >
              <UserCheck size={18} />
              <span>For Job Seekers</span>
            </button>

            <button
              onClick={() => setActivePortal('employers')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: '16px',
                fontSize: '0.95rem',
                fontWeight: 700,
                background: activePortal === 'employers' ? 'linear-gradient(135deg, #FF7A00 0%, #FF4D00 100%)' : 'transparent',
                color: activePortal === 'employers' ? '#FFFFFF' : '#475569',
                boxShadow: activePortal === 'employers' ? '0 4px 12px rgba(255, 102, 0, 0.3)' : 'none'
              }}
            >
              <Building2 size={18} />
              <span>For Employers & Recruiters</span>
            </button>
          </div>
        </div>

        {/* TAB CONTENT 1: Job Seekers */}
        {activePortal === 'seekers' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }} className="portal-grid">
            
            <div>
              <div className="badge-orange" style={{ marginBottom: '12px' }}>
                <Sparkles size={14} color="#FF6600" />
                <span>Supercharge Your Career</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.2, marginBottom: '16px' }}>
                Get Discovered by Top Tech Companies Without The Spam
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
                Clyptus connects you directly to verified hiring managers with guaranteed compensation transparency and real-time application feedback.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[
                  '1-Click Instant Apply with zero redundant form filling',
                  'AI-matched roles based on your verified GitHub, portfolio, and skills',
                  'Transparent salary bands upfront with bonus and ESOP equity ranges',
                  'Automated interview scheduling and response tracker'
                ].map((point, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: '#FFF0E5', color: '#FF6600', padding: '4px', borderRadius: '50%' }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1E293B' }}>{point}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="#companies-section" className="btn-primary" style={{ padding: '12px 28px', textDecoration: 'none' }}>
                  <span>Browse Top MNC Openings</span>
                  <ArrowRight size={18} />
                </a>
                <a href="#categories-section" className="btn-outline" style={{ padding: '12px 24px', textDecoration: 'none' }}>
                  <span>Explore Domains</span>
                </a>
              </div>
            </div>

            {/* Visual Card Display */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>
                  Your Clyptus Candidate Passport
                </div>
                <span style={{ background: '#DCFCE7', color: '#166534', padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                  Active & Vetted
                </span>
              </div>

              {/* Sample Profile Preview */}
              <div style={{ background: '#FFF9F5', padding: '18px', borderRadius: '16px', border: '1px solid #FFD8BF', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FF6600', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    CS
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>Full Stack Engineer</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>5 Yrs Exp • Preferred CTC: ₹28 LPA</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', borderTop: '1px dashed #FED7AA', paddingTop: '10px' }}>
                  <span>⚡ 3 Recruiter Inquiries Today</span>
                  <span style={{ fontWeight: 700, color: '#FF6600' }}>96% Profile Match</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FF6600' }}>48 Hrs</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Avg. First Interview Call</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#059669' }}>85%+</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Average Salary Increase</div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB CONTENT 2: Employers & Recruiters */}
        {activePortal === 'employers' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }} className="portal-grid">
            
            <div>
              <div className="badge-orange" style={{ marginBottom: '12px' }}>
                <Building2 size={14} color="#FF6600" />
                <span>Recruiter & Enterprise Suite</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.2, marginBottom: '16px' }}>
                Hire Top 1% Verified Tech & Product Talent in Days
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
                Cut sourcing cycles by 70%. Access pre-assessed candidates with transparent notice periods, compensation expectations, and verified skills.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[
                  'Post your first job vacancy in under 2 minutes (100% Free)',
                  'AI pre-screens resumes and highlights candidate work samples',
                  'Instant candidate pipeline delivery directly to your email / ATS',
                  'Direct WhatsApp and InMail outreach with 82% candidate response rate'
                ].map((point, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: '#FFF0E5', color: '#FF6600', padding: '4px', borderRadius: '50%' }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1E293B' }}>{point}</span>
                  </div>
                ))}
              </div>

              <a href="#companies-section" className="btn-primary" style={{ padding: '14px 32px', textDecoration: 'none', display: 'inline-flex' }}>
                <span>Start Hiring on Clyptus &rarr;</span>
              </a>
            </div>

            {/* Recruiter Stats Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.06)'
            }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', marginBottom: '16px' }}>
                Employer Hiring Performance
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ background: '#FFF0E5', padding: '10px', borderRadius: '10px', color: '#FF6600' }}><Clock size={22} /></div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>12 Days Time-to-Hire</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Compared to 45 days industry average</div>
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ background: '#FFF0E5', padding: '10px', borderRadius: '10px', color: '#FF6600' }}><Users size={22} /></div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>2.4M+ Verified Profiles</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Software, AI, Cloud, Product & Leadership</div>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', background: '#FFF5EC', padding: '14px', borderRadius: '12px', border: '1px solid #FFD8BF' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#C2410C' }}>
                  ⚡ Free Job Postings for Certified Tech Employers
                </span>
              </div>
            </div>

          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 860px) {
          .portal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
