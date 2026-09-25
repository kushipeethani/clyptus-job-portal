import React from 'react';
import { 
  Users, 
  Award, 
  Sparkles, 
  Building2, 
  CheckCircle 
} from 'lucide-react';

interface HeroProps {
  totalJobsCount?: number;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section style={{ 
      position: 'relative', 
      background: 'radial-gradient(ellipse at 50% 0%, #FFF7F0 0%, #FFFFFF 70%)',
      padding: '44px 0 64px',
      overflow: 'hidden',
      borderBottom: '1px solid #F1F5F9'
    }}>
      {/* Subtle background ambient glow */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '900px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(255,85,0,0.08) 0%, rgba(255,255,255,0) 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* 2-Column Hero Section: Left Content + Right Smiling Professional Woman */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '44px'
        }} className="hero-main-grid">
          
          {/* Left Column: Headline, Description & Direct CTAs */}
          <div>
            {/* Top Subtitle Tag */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#FF5500',
              fontWeight: 800,
              fontSize: '0.86rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}>
              <span>YOUR CAREER</span>
              <span>•</span>
              <span>OUR MISSION</span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#06101E',
              marginBottom: '18px'
            }}>
              Find Your Next <br />
              Opportunity with <br />
              <span style={{
                background: 'linear-gradient(135deg, #FF6600 0%, #FF3D00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Clyptus
              </span>
            </h1>

            {/* Description Paragraph */}
            <p style={{
              fontSize: '1.05rem',
              color: '#52637A',
              lineHeight: 1.65,
              maxWidth: '560px',
              marginBottom: '32px'
            }}>
              India’s next-generation career discovery platform. Explore 150,000+ verified active openings across global Fortune 500 MNCs, high-growth tech startups, and enterprise leaders with 1-click apply and fast-tracked HR direct calls.
            </p>





          </div>

          {/* Right Column: Professional Woman Photo & Floating Badges */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            
            {/* Circular Warm Background Aura */}
            <div style={{
              position: 'absolute',
              width: '430px',
              height: '430px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFE4D1 0%, #FFF3EB 100%)',
              zIndex: 0,
              filter: 'blur(20px)'
            }} />

            {/* Professional Indian Corporate Woman Photo */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: '430px',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(6, 16, 30, 0.18)',
              border: '4px solid #FFFFFF'
            }}>
              <img 
                src="/hero_woman.jpg" 
                alt="Smiling professional woman ready for high-impact tech career"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Floating Badge 1: Top Right "Better Jobs, Brighter Future" */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '-16px',
              zIndex: 2,
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              padding: '12px 18px',
              borderRadius: '16px',
              boxShadow: '0 12px 28px rgba(6, 16, 30, 0.12)',
              border: '1px solid #FFCBB3',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }} className="hero-floating-badge-1">
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#FFF3EC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FF5500'
              }}>
                <Sparkles size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Clyptus Guarantee
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#06101E' }}>
                  Better Jobs, Brighter Future
                </div>
              </div>
            </div>

            {/* Floating Badge 2: Bottom Left "100% Direct HR Calls" */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '-20px',
              zIndex: 2,
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              padding: '12px 18px',
              borderRadius: '16px',
              boxShadow: '0 12px 28px rgba(6, 16, 30, 0.12)',
              border: '1px solid #BBF7D0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }} className="hero-floating-badge-2">
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#ECFDF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#16A34A'
              }}>
                <CheckCircle size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#06101E' }}>
                  Verified Openings
                </div>
                <div style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 700 }}>
                  100% Direct HR Calls
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Bottom Metric Stat Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '18px',
          marginTop: '10px'
        }}>
          
          <div className="card-white" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '18px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FFF3EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF5500' }}>
              <Building2 size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#06101E' }}>150,000+</div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Active Tech Jobs</div>
            </div>
          </div>

          <div className="card-white" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '18px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#06101E' }}>45,000+</div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Verified Recruiters</div>
            </div>
          </div>

          <div className="card-white" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '18px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
              <Sparkles size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#06101E' }}>₹24.8 LPA</div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Average CTC Band</div>
            </div>
          </div>

          <div className="card-white" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '18px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
              <Award size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#06101E' }}>48 Hours</div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Interview Turnaround</div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-main-grid > div {
            margin: 0 auto;
          }
          .hero-floating-badge-1 {
            right: 0px !important;
          }
          .hero-floating-badge-2 {
            left: 0px !important;
          }
        }
      `}</style>
    </section>
  );
};
