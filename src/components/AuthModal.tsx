import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Mail, 
  Lock, 
  User, 
  Briefcase, 
  Phone, 
  UploadCloud, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialType?: 'candidate' | 'recruiter';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialType = 'candidate',
  onClose
}) => {
  const [authType, setAuthType] = useState<'candidate' | 'recruiter'>(initialType);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [roleDomain, setRoleDomain] = useState('Full Stack Development');
  const [expYears, setExpYears] = useState('3 - 5 Years');
  const [phone, setPhone] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');

  // Sync state if initialType changes
  React.useEffect(() => {
    setAuthType(initialType);
    setSubmitted(false);
  }, [initialType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div 
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        className="modal-content card-white"
        style={{
          width: '100%',
          maxWidth: '540px',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '0',
          position: 'relative',
          background: '#FFFFFF',
          border: '1.5px solid #FED7AA',
          boxShadow: '0 25px 50px -12px rgba(255, 102, 0, 0.25)'
        }}
      >
        
        {/* Header Header with Clyptus Brand & Close */}
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          padding: '24px 28px',
          borderTopLeftRadius: '22px',
          borderTopRightRadius: '22px',
          color: '#FFFFFF',
          position: 'relative'
        }}>
          
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFFFFF',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 102, 0, 0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
          >
            <X size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: '#FF6600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={16} color="#FFFFFF" />
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              clyptus<span style={{ color: '#FF6600' }}>careers</span>
            </span>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
            {authType === 'candidate' ? 'Candidate Login' : 'Recruiter Login'}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
            {authType === 'candidate' 
              ? 'Access 150,000+ verified active openings with instant direct HR calls'
              : 'Sign in to access corporate candidate pipelines & post active openings'}
          </p>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px' }}>
          
          {submitted ? (
            /* Success View */
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#DCFCE7',
                color: '#16A34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                {authMode === 'login' ? 'Welcome Back!' : 'Registration Successful!'}
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '24px' }}>
                {authType === 'candidate'
                  ? 'Your candidate profile is verified and ready. You can now explore top MNC openings and apply with 1-click.'
                  : 'Your recruiter dashboard has been initialized. You can now post jobs and reach verified candidates.'}
              </p>
              <button
                onClick={onClose}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '0.95rem' }}
              >
                <span>Continue to Dashboard</span>
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            /* Auth Form */
            <>
              {/* Mode Toggle: Login vs Register */}
              <div style={{
                display: 'flex',
                borderBottom: '2px solid #F1F5F9',
                marginBottom: '24px'
              }}>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: authMode === 'login' ? '#FF6600' : '#64748B',
                    borderBottom: authMode === 'login' ? '2.5px solid #FF6600' : '2.5px solid transparent',
                    marginBottom: '-2px',
                    transition: 'all 0.2s'
                  }}
                >
                  {authType === 'candidate' ? 'Candidate Login' : 'Recruiter Login'}
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: authMode === 'register' ? '#FF6600' : '#64748B',
                    borderBottom: authMode === 'register' ? '2.5px solid #FF6600' : '2.5px solid transparent',
                    marginBottom: '-2px',
                    transition: 'all 0.2s'
                  }}
                >
                  {authType === 'candidate' ? 'Register Free' : 'Create Free Account'}
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Extra Registration Fields */}
                {authMode === 'register' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        {authType === 'candidate' ? 'Full Name' : 'Contact Person Name'} *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <User size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                        <input
                          type="text"
                          required
                          placeholder={authType === 'candidate' ? 'e.g. Rahul Sharma' : 'e.g. Priya Nair (HR Lead)'}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 14px 12px 42px',
                            borderRadius: '12px',
                            border: '1.5px solid #E2E8F0',
                            fontSize: '0.9rem',
                            background: '#F8FAFC'
                          }}
                        />
                      </div>
                    </div>

                    {authType === 'recruiter' && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                          Company / Organization Name *
                        </label>
                        <div style={{ position: 'relative' }}>
                          <Building2 size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Clyptus Technologies or Infosys"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '12px 14px 12px 42px',
                              borderRadius: '12px',
                              border: '1.5px solid #E2E8F0',
                              fontSize: '0.9rem',
                              background: '#F8FAFC'
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {authType === 'candidate' && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                            Primary Domain
                          </label>
                          <div style={{ position: 'relative' }}>
                            <Briefcase size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                            <select
                              value={roleDomain}
                              onChange={(e) => setRoleDomain(e.target.value)}
                              style={{
                                width: '100%',
                                padding: '12px 14px 12px 42px',
                                borderRadius: '12px',
                                border: '1.5px solid #E2E8F0',
                                fontSize: '0.85rem',
                                background: '#F8FAFC',
                                color: '#1E293B'
                              }}
                            >
                              <option value="Full Stack Development">Full Stack Dev</option>
                              <option value="Frontend Development">Frontend Dev (React)</option>
                              <option value="Backend & APIs">Backend & APIs</option>
                              <option value="AI & Machine Learning">AI & Machine Learning</option>
                              <option value="Cloud & DevOps">Cloud & DevOps</option>
                              <option value="Product Management">Product Management</option>
                              <option value="UI/UX Design">UI/UX Design</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                            Experience
                          </label>
                          <select
                            value={expYears}
                            onChange={(e) => setExpYears(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '12px 14px',
                              borderRadius: '12px',
                              border: '1.5px solid #E2E8F0',
                              fontSize: '0.85rem',
                              background: '#F8FAFC',
                              color: '#1E293B'
                            }}
                          >
                            <option value="0 - 1 Years (Fresher)">0 - 1 Yr (Fresher)</option>
                            <option value="1 - 3 Years">1 - 3 Years</option>
                            <option value="3 - 5 Years">3 - 5 Years</option>
                            <option value="5 - 8 Years">5 - 8 Years</option>
                            <option value="8+ Years (Lead)">8+ Years (Lead)</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Email Address */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    {authType === 'recruiter' ? 'Official Work Email' : 'Email Address'} *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                    <input
                      type="email"
                      required
                      placeholder={authType === 'recruiter' ? 'name@company.com' : 'you@email.com'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        borderRadius: '12px',
                        border: '1.5px solid #E2E8F0',
                        fontSize: '0.9rem',
                        background: '#F8FAFC'
                      }}
                    />
                  </div>
                </div>

                {/* Phone number (for registration) */}
                {authMode === 'register' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Mobile / WhatsApp Number *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 14px 12px 42px',
                          borderRadius: '12px',
                          border: '1.5px solid #E2E8F0',
                          fontSize: '0.9rem',
                          background: '#F8FAFC'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>
                      Password *
                    </label>
                    {authMode === 'login' && (
                      <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your email.'); }} style={{ fontSize: '0.78rem', color: '#FF6600', fontWeight: 600 }}>
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        borderRadius: '12px',
                        border: '1.5px solid #E2E8F0',
                        fontSize: '0.9rem',
                        background: '#F8FAFC'
                      }}
                    />
                  </div>
                </div>

                {/* Candidate Resume Upload in Register Mode */}
                {authType === 'candidate' && authMode === 'register' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Upload Resume (PDF, DOCX) - Optional
                    </label>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1.5px dashed #FF8533',
                      background: '#FFF9F5',
                      cursor: 'pointer'
                    }}>
                      <UploadCloud size={20} color="#FF6600" />
                      <span style={{ fontSize: '0.85rem', color: resumeFileName ? '#0F172A' : '#FF6600', fontWeight: 600 }}>
                        {resumeFileName ? `Attached: ${resumeFileName}` : 'Click to attach resume'}
                      </span>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setResumeFileName(e.target.files[0].name);
                          }
                        }}
                      />
                    </label>
                  </div>
                )}

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '13px',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    marginTop: '8px'
                  }}
                >
                  <span>
                    {authMode === 'login' 
                      ? (authType === 'candidate' ? 'Sign In as Candidate' : 'Sign In as Recruiter')
                      : (authType === 'candidate' ? 'Register Free & View MNCs' : 'Create Recruiter Account')}
                  </span>
                  <ArrowRight size={18} />
                </button>

              </form>

              {/* Bottom switch link */}
              <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: '#64748B' }}>
                {authMode === 'login' ? (
                  <span>
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      style={{ color: '#FF6600', fontWeight: 700 }}
                    >
                      Create one for free
                    </button>
                  </span>
                ) : (
                  <span>
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      style={{ color: '#FF6600', fontWeight: 700 }}
                    >
                      Sign In here
                    </button>
                  </span>
                )}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
