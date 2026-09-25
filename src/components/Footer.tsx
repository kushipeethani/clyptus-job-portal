import React from 'react';
import { 
  ExternalLink, 
  Heart 
} from 'lucide-react';
import { ClyptusLogo } from './ClyptusLogo';

interface FooterProps {
  onNewsletterSubscribe?: (email: string) => void;
  onFilterLocation?: (loc: string) => void;
  onFilterRole?: (role: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onFilterLocation = () => {},
  onFilterRole = () => {}
}) => {
  return (
    <footer style={{ background: '#06101E', color: '#8A9BA8', paddingTop: '60px', borderTop: '1px solid #162744' }}>
      <div className="container">
        
        {/* Main Footer Directory Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
          gap: '36px',
          marginBottom: '50px'
        }} className="footer-links-grid">
          
          {/* Brand Info */}
          <div>
            <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: '16px' }}>
              <ClyptusLogo height={54} theme="dark" />
            </a>

            <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px' }}>
              Clyptus is an innovative digital solutions & talent intelligence company empowering global enterprises and ambitious professionals.
            </p>

            <a 
              href="https://clyptus.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#FF8533',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <span>Visit Parent Company: clyptus.com</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Jobs by Location */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px', letterSpacing: '0.02em' }}>
              Jobs by Tech Hub
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              {['Bengaluru', 'Hyderabad', 'Pune', 'Mumbai', 'Gurgaon / NCR', 'Remote Global'].map((loc) => (
                <li key={loc}>
                  <a
                    href="#companies-section"
                    onClick={() => onFilterLocation(loc)}
                    style={{ color: '#94A3B8', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6600')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    Jobs in {loc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Jobs by Role */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px', letterSpacing: '0.02em' }}>
              Trending Tech Roles
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              {['React Developer', 'Fullstack Engineer', 'AI / ML Engineer', 'DevOps & SRE', 'Product Manager', 'UI/UX Designer'].map((role) => (
                <li key={role}>
                  <a
                    href="#companies-section"
                    onClick={() => onFilterRole(role)}
                    style={{ color: '#94A3B8', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6600')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    {role} Jobs
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Services */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px', letterSpacing: '0.02em' }}>
              Career Boosters
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              <li><a href="#companies-section" style={{ color: '#94A3B8' }}>Top MNC Openings</a></li>
              <li><a href="#categories-section" style={{ color: '#94A3B8' }}>Explore Categories</a></li>
              <li><a href="#companies-section" style={{ color: '#94A3B8' }}>High-Paying Roles (₹25L+)</a></li>
              <li><a href="#companies-section" style={{ color: '#94A3B8' }}>Employer Recruiter Hub</a></li>
              <li><a href="#companies-section" style={{ color: '#94A3B8' }}>Post a Free Job</a></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px', letterSpacing: '0.02em' }}>
              Company & Legal
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              <li><a href="https://clyptus.com/" target="_blank" rel="noreferrer" style={{ color: '#94A3B8' }}>About Clyptus</a></li>
              <li><a href="https://clyptus.com/" target="_blank" rel="noreferrer" style={{ color: '#94A3B8' }}>Privacy Policy</a></li>
              <li><a href="https://clyptus.com/" target="_blank" rel="noreferrer" style={{ color: '#94A3B8' }}>Terms of Service</a></li>
              <li><a href="https://clyptus.com/" target="_blank" rel="noreferrer" style={{ color: '#94A3B8' }}>Trust & Safety</a></li>
              <li><a href="mailto:careers@clyptus.com" style={{ color: '#94A3B8' }}>Contact Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright and Made with Love */}
        <div style={{
          padding: '24px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.82rem',
          color: '#64748B'
        }}>
          <div>
            © 2026 <strong>Clyptus Technologies</strong>. All rights reserved. Designed for next-generation talent discovery.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Powered with</span>
            <Heart size={14} color="#FF6600" fill="#FF6600" />
            <span>by <a href="https://clyptus.com/" target="_blank" rel="noreferrer" style={{ color: '#FF8533', fontWeight: 700 }}>Clyptus.com</a></span>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-links-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
