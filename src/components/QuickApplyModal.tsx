import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Zap, 
  FileText, 
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Job } from '../types/job';

interface QuickApplyModalProps {
  job: Job | null;
  onClose: () => void;
  onSuccess: (jobTitle: string, company: string) => void;
}

export const QuickApplyModal: React.FC<QuickApplyModalProps> = ({
  job,
  onClose,
  onSuccess
}) => {
  if (!job) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [fullName, setFullName] = useState('Rahul Verma');
  const [email, setEmail] = useState('rahul.verma@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [experience, setExperience] = useState('4.5 Years');
  const [noticePeriod, setNoticePeriod] = useState('15 Days / Immediate');
  const [expectedCtc, setExpectedCtc] = useState('₹28 LPA');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6600', '#FF3D00', '#FFA366', '#059669', '#3B82F6']
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
      triggerConfetti();
      onSuccess(job.title, job.company);
    }, 900);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '580px' }}
      >
        
        {/* Header */}
        <div style={{
          padding: '24px 28px 20px',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #FFF9F5 0%, #FFFFFF 100%)'
        }}>
          <div>
            <div className="badge-orange" style={{ marginBottom: '6px' }}>
              <Zap size={12} color="#FF6600" />
              <span>1-Click Fast-Track Apply</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
              {job.title}
            </h3>
            <div style={{ fontSize: '0.86rem', color: '#64748B', marginTop: '2px' }}>
              {job.company} • <span style={{ color: '#FF6600', fontWeight: 700 }}>{job.salaryDisplay}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} style={{ padding: '28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    color: '#0F172A'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    color: '#0F172A'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    color: '#0F172A'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Total Experience
                </label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    color: '#0F172A'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Notice Period
                </label>
                <input
                  type="text"
                  value={noticePeriod}
                  onChange={(e) => setNoticePeriod(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    color: '#0F172A'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Expected CTC
                </label>
                <input
                  type="text"
                  value={expectedCtc}
                  onChange={(e) => setExpectedCtc(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    color: '#0F172A'
                  }}
                />
              </div>
            </div>

            {/* Resume Upload Simulator */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Resume (ATS Formatted PDF/DOC)
              </label>
              <div style={{
                border: '2px dashed #FED7AA',
                background: '#FFF9F5',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: '#FF6600', color: '#FFF', padding: '8px', borderRadius: '10px' }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A' }}>
                      Rahul_Verma_Senior_Developer_Resume.pdf
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                      ✓ 94% ATS Match with {job.company}
                    </div>
                  </div>
                </div>

                <span style={{ fontSize: '0.78rem', color: '#FF6600', fontWeight: 700, textDecoration: 'underline' }}>
                  Replace
                </span>
              </div>
            </div>

            {/* Submit CTA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748B' }}>
                <Lock size={14} /> Direct to Verified Recruiter
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ padding: '12px 32px' }}
              >
                {isSubmitting ? 'Sending Application...' : 'Submit Application Now 🚀'}
              </button>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div style={{ padding: '40px 28px', textAlign: 'center' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: '#DCFCE7',
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 4px 16px rgba(22, 101, 52, 0.2)'
            }}>
              <CheckCircle2 size={42} />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Application Successfully Sent! 🎉
            </h3>
            
            <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto 24px', lineHeight: 1.5 }}>
              Your profile and verified resume have been forwarded directly to the hiring director at <strong>{job.company}</strong>.
            </p>

            <div style={{
              background: '#F8FAFC',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid #E2E8F0',
              maxWidth: '380px',
              margin: '0 auto 28px',
              fontSize: '0.85rem',
              color: '#334155',
              textAlign: 'left'
            }}>
              <div style={{ marginBottom: '6px' }}><strong>Application Ref:</strong> #CLYP-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div style={{ marginBottom: '6px' }}><strong>Role:</strong> {job.title}</div>
              <div><strong>Expected Turnaround:</strong> Within 48 Hours</div>
            </div>

            <button
              onClick={onClose}
              className="btn-primary"
              style={{ padding: '12px 36px' }}
            >
              Back to Job Portal
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
