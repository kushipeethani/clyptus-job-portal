import React from 'react';
import { Smartphone, QrCode, CheckCircle } from 'lucide-react';

export const AppDownloadBanner: React.FC = () => {
  return (
    <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background orange glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '10%',
        transform: 'translateY(-50%)',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255,102,0,0.2) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '40px',
          alignItems: 'center'
        }} className="app-grid">
          
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 102, 0, 0.2)',
              color: '#FF8533',
              border: '1px solid rgba(255, 102, 0, 0.4)',
              padding: '4px 14px',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '14px'
            }}>
              <Smartphone size={14} />
              <span>Clyptus Mobile App 2.0</span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, marginBottom: '14px' }}>
              Never Miss an Interview Call On The Go
            </h2>

            <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px', maxWidth: '540px' }}>
              Download the Clyptus Careers app to get real-time message alerts, 1-tap fast apply, and salary insight notifications directly on iOS & Android.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {[
                'Instant push notifications when your profile is viewed',
                'In-app direct chat with verified hiring managers',
                'Offline bookmarking and personalized daily job digests'
              ].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#E2E8F0' }}>
                  <CheckCircle size={16} color="#FF6600" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* App Store / Google Play Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => alert('Clyptus Careers App for iOS is available on App Store!')}
                style={{
                  background: '#FFFFFF',
                  color: '#0F172A',
                  padding: '12px 24px',
                  borderRadius: '14px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span>🍏 App Store</span>
              </button>

              <button
                onClick={() => alert('Clyptus Careers App for Android is available on Google Play!')}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '12px 24px',
                  borderRadius: '14px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span>🤖 Google Play</span>
              </button>
            </div>
          </div>

          {/* Right Mock Phone Screen / QR Preview */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '28px',
              padding: '32px',
              textAlign: 'center',
              backdropFilter: 'blur(12px)',
              maxWidth: '340px',
              width: '100%'
            }}>
              <div style={{
                background: '#FFFFFF',
                padding: '16px',
                borderRadius: '18px',
                display: 'inline-block',
                marginBottom: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
              }}>
                <div style={{ width: '150px', height: '150px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', flexDirection: 'column', gap: '6px' }}>
                  <QrCode size={100} color="#0F172A" />
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#FF6600' }}>SCAN TO INSTALL</span>
                </div>
              </div>

              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#FFF' }}>
                Scan with your smartphone
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                Available on iOS 16+ & Android 12+
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .app-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
