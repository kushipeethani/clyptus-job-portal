import React from 'react';
import { Star, CheckCircle, TrendingUp } from 'lucide-react';
import type { Testimonial } from '../types/job';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section style={{ padding: '70px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <div className="badge-orange" style={{ marginBottom: '10px' }}>
            <TrendingUp size={14} color="#FF6600" />
            <span>Real Candidate Outcomes</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
            Transforming Tech Careers Everyday
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem' }}>
            Read how engineers, designers, and managers landed 80%+ compensation hikes through Clyptus.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="card-white"
              style={{
                padding: '30px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                border: '1px solid #EDF2F7',
                position: 'relative'
              }}
            >
              <div>
                {/* Hike Pill Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#FF6600" color="#FF6600" />
                    ))}
                  </div>

                  <span style={{
                    background: '#DCFCE7',
                    color: '#15803D',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '999px',
                    border: '1px solid #BBF7D0'
                  }}>
                    {test.hike}
                  </span>
                </div>

                {/* Feedback Content */}
                <p style={{
                  fontSize: '0.94rem',
                  color: '#334155',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  marginBottom: '24px'
                }}>
                  &ldquo;{test.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid #F1F5F9'
              }}>
                <img
                  src={test.avatar}
                  alt={test.name}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #FFD8BF'
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>
                      {test.name}
                    </span>
                    {test.verified && (
                      <CheckCircle size={14} color="#059669" />
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    {test.role} • <span style={{ color: '#FF6600', fontWeight: 600 }}>{test.company}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
