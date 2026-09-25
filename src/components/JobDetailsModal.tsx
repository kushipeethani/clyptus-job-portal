import React from 'react';
import { 
  X, 
  Star, 
  CheckCircle2, 
  Zap, 
  Bookmark, 
  BookmarkCheck
} from 'lucide-react';
import type { Job } from '../types/job';

interface JobDetailsModalProps {
  job: Job | null;
  onClose: () => void;
  onQuickApply: (job: Job) => void;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  onClose,
  onQuickApply,
  isSaved,
  onToggleSave
}) => {
  if (!job) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px', maxHeight: '88vh' }}
      >
        {/* Sticky Modal Top Bar */}
        <div style={{
          padding: '24px 30px',
          borderBottom: '1px solid #F1F5F9',
          background: 'linear-gradient(135deg, #FFF8F2 0%, #FFFFFF 100%)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: job.companyBg || '#FFF5EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              {job.companyLogo}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#475569' }}>
                  {job.company}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: '#FEF3C7', padding: '1px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#B45309' }}>
                  <Star size={11} fill="#B45309" color="#B45309" />
                  <span>{job.rating}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>({job.reviewCount} employee reviews)</span>
              </div>

              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', marginTop: '3px' }}>
                {job.title}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => onToggleSave(job.id)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: isSaved ? '#FFF0E5' : '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isSaved ? '#FF6600' : '#64748B'
              }}
              title="Save Job"
            >
              {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>

            <button
              onClick={onClose}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '30px', overflowY: 'auto' }}>
          
          {/* Quick Metrics Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            background: '#F8FAFC',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            marginBottom: '26px'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>ANNUAL CTC</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FF6600' }}>{job.salaryDisplay}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>EXPERIENCE</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1E293B' }}>{job.experience}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>LOCATION / MODE</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1E293B' }}>{job.location}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>APPLICANTS</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#059669' }}>{job.applicantsCount} Active</div>
            </div>
          </div>

          {/* Job Description Overview */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              About the Role
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65 }}>
              {job.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                Key Responsibilities
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '0', listStyle: 'none' }}>
                {job.responsibilities.map((item, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                    <div style={{ color: '#FF6600', marginTop: '2px', flexShrink: 0 }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                Candidate Qualifications & Skills
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '0', listStyle: 'none' }}>
                {job.requirements.map((item, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                    <div style={{ color: '#059669', marginTop: '2px', flexShrink: 0 }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Perks & Benefits */}
          {job.perks && job.perks.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                Company Benefits & Culture
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                {job.perks.map((perk, index) => (
                  <div key={index} style={{ background: '#FFF9F5', border: '1px solid #FED7AA', padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem', color: '#9A3412', fontWeight: 600 }}>
                    🎁 {perk}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Skills Chips */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
              Primary Technologies
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {job.skills.map((skill, index) => (
                <span key={index} className="badge-tag" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Action Bottom Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '20px',
            borderTop: '1px solid #E2E8F0',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
              🛡️ Clyptus Fast-Track Hiring Guarantee Enabled
            </div>

            <button
              onClick={() => {
                onClose();
                onQuickApply(job);
              }}
              className="btn-primary"
              style={{ padding: '12px 36px', fontSize: '1rem' }}
            >
              <Zap size={18} />
              <span>Apply for this Role Now</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
