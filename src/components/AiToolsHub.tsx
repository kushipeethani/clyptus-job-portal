import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  Calculator, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw 
} from 'lucide-react';
import { SALARY_BENCHMARKS } from '../data/mockData';

interface AiToolsHubProps {
  initialActiveTab?: 'resume' | 'salary';
}

export const AiToolsHub: React.FC<AiToolsHubProps> = ({ initialActiveTab = 'resume' }) => {
  const [activeTab, setActiveTab] = useState<'resume' | 'salary'>(initialActiveTab);

  // Resume Scanner State
  const [resumeText, setResumeText] = useState(
    "Senior Frontend Developer with 5+ years of experience in React, TypeScript, Redux, Next.js, and Node.js. Built high-traffic SaaS dashboards serving 2M+ monthly active users. Reduced bundle size by 42% and improved Core Web Vitals to 99/100. Experienced with Docker, CI/CD, and AWS deployment."
  );
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    score: number;
    grade: string;
    strengths: string[];
    gaps: string[];
    atsKeywords: string[];
  } | null>({
    score: 92,
    grade: 'Excellent ATS Fit',
    strengths: [
      'Quantifiable impact metrics present (2M+ users, 42% bundle reduction)',
      'Modern tech stack coverage (React 19, TypeScript, Next.js, Node.js)',
      'Strong action verbs and performance optimization focus'
    ],
    gaps: [
      'Add system design or architecture leadership keywords',
      'Mention unit testing libraries (Jest / Vitest / Playwright)'
    ],
    atsKeywords: ['React', 'TypeScript', 'Next.js', 'Core Web Vitals', 'Docker', 'CI/CD']
  });

  // Salary Estimator State
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [selectedExp, setSelectedExp] = useState(4);
  const currentBenchmark = SALARY_BENCHMARKS[selectedRoleIndex];

  // Calculate adjusted salary based on experience
  const expMultiplier = 0.8 + (selectedExp * 0.12);
  const calculatedMedian = Math.round(currentBenchmark.median * expMultiplier);
  const calculatedMin = Math.round(currentBenchmark.min * expMultiplier);
  const calculatedMax = Math.round(currentBenchmark.max * expMultiplier);

  const handleScanResume = () => {
    setIsScanning(true);
    setTimeout(() => {
      const len = resumeText.length;
      const hasKeywords = ['react', 'python', 'aws', 'docker', 'typescript', 'sql', 'lead', 'scale'].filter(k => 
        resumeText.toLowerCase().includes(k)
      );

      const calculatedScore = Math.min(96, Math.max(68, 70 + (hasKeywords.length * 4) + (len > 120 ? 10 : 0)));
      
      setScanResult({
        score: calculatedScore,
        grade: calculatedScore > 85 ? 'Top 5% Candidate Fit' : 'Good Candidate Fit',
        strengths: [
          'High relevance for senior tech openings',
          `Detected ${hasKeywords.length} core high-demand industry keywords`,
          'Clear impact and technical domain clarity'
        ],
        gaps: [
          'Consider detailing cloud automation and unit testing coverage',
          'Include links to public GitHub or portfolio demonstrations'
        ],
        atsKeywords: hasKeywords.map(k => k.toUpperCase())
      });
      setIsScanning(false);
    }, 800);
  };

  const loadSample = (type: 'frontend' | 'ai' | 'pm') => {
    if (type === 'frontend') {
      setResumeText("Lead Full Stack Engineer with 6 years experience in React, Next.js, Node.js, and Cloud architectures. Led team of 8 engineers delivering enterprise fintech platforms with 99.99% uptime.");
    } else if (type === 'ai') {
      setResumeText("Staff AI / ML Researcher specialized in Large Language Models (LLMs), PyTorch, Vector Databases, and Agentic workflows. Fine-tuned domain models yielding 28% higher accuracy in production.");
    } else {
      setResumeText("Product Manager with 4+ years leading B2B SaaS lifecycle from 0 to $5M ARR. Expert in SQL, user journey mapping, Agile sprints, and growth monetization loops.");
    }
  };

  return (
    <section id="ai-tools" style={{ padding: '70px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 36px' }}>
          <div className="badge-orange" style={{ marginBottom: '10px' }}>
            <Sparkles size={14} color="#FF6600" />
            <span>Clyptus Career Accelerator</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
            AI-Powered Career & Compensation Intelligence
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem' }}>
            Benchmark your market compensation, audit your resume against top ATS screeners, and unlock your true earning potential.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '36px'
        }}>
          <div style={{
            background: '#F1F5F9',
            padding: '6px',
            borderRadius: '16px',
            display: 'inline-flex',
            gap: '8px'
          }}>
            <button
              onClick={() => setActiveTab('resume')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '12px',
                fontSize: '0.92rem',
                fontWeight: 700,
                background: activeTab === 'resume' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'resume' ? '#FF6600' : '#475569',
                boxShadow: activeTab === 'resume' ? '0 4px 12px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              <FileText size={18} />
              <span>AI Resume Score Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('salary')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '12px',
                fontSize: '0.92rem',
                fontWeight: 700,
                background: activeTab === 'salary' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'salary' ? '#FF6600' : '#475569',
                boxShadow: activeTab === 'salary' ? '0 4px 12px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              <Calculator size={18} />
              <span>Live Salary Benchmark</span>
            </button>
          </div>
        </div>

        {/* TAB 1: AI Resume Scanner */}
        {activeTab === 'resume' && (
          <div style={{
            background: 'linear-gradient(135deg, #FFF9F5 0%, #FFFFFF 100%)',
            borderRadius: '24px',
            padding: '36px',
            border: '1.5px solid #FFD8BF',
            boxShadow: '0 20px 40px -15px rgba(255, 102, 0, 0.1)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '32px',
              alignItems: 'start'
            }} className="tools-grid">
              
              {/* Left Column: Input & Samples */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>
                    Paste Resume Summary / Profile Bio:
                  </label>
                  
                  {/* Sample buttons */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button 
                      onClick={() => loadSample('frontend')} 
                      style={{ fontSize: '0.72rem', background: '#F1F5F9', padding: '3px 8px', borderRadius: '6px', color: '#475569', fontWeight: 600 }}
                    >
                      Sample Frontend
                    </button>
                    <button 
                      onClick={() => loadSample('ai')} 
                      style={{ fontSize: '0.72rem', background: '#F1F5F9', padding: '3px 8px', borderRadius: '6px', color: '#475569', fontWeight: 600 }}
                    >
                      Sample AI
                    </button>
                    <button 
                      onClick={() => loadSample('pm')} 
                      style={{ fontSize: '0.72rem', background: '#F1F5F9', padding: '3px 8px', borderRadius: '6px', color: '#475569', fontWeight: 600 }}
                    >
                      Sample PM
                    </button>
                  </div>
                </div>

                <textarea
                  rows={7}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your career experience, skills, and achievements here..."
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.92rem',
                    color: '#1E293B',
                    lineHeight: 1.6,
                    background: '#FFFFFF',
                    resize: 'vertical',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    🔒 100% Private & Confidential. Scanned with Clyptus ATS Engine.
                  </div>

                  <button
                    onClick={handleScanResume}
                    disabled={isScanning}
                    className="btn-primary"
                    style={{ padding: '12px 28px' }}
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" />
                        <span>Analyzing Resume...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        <span>Analyze ATS Match</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Instant Live Score Card */}
              {scanResult && (
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}>
                  {/* Score Gauge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', fontWeight: 700 }}>
                        ATS Readiness Score
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                        {scanResult.grade}
                      </div>
                    </div>

                    <div style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      background: 'conic-gradient(#FF6600 0% 92%, #FFE5D4 92% 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(255, 102, 0, 0.25)'
                    }}>
                      <div style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: '1.2rem',
                        color: '#0F172A'
                      }}>
                        {scanResult.score}
                      </div>
                    </div>
                  </div>

                  {/* Strengths */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <CheckCircle size={15} color="#059669" /> Strengths Identified:
                    </div>
                    <ul style={{ paddingLeft: '22px', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                      {scanResult.strengths.map((str, idx) => (
                        <li key={idx}>{str}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <AlertCircle size={15} color="#FF6600" /> Actionable Improvements:
                    </div>
                    <ul style={{ paddingLeft: '22px', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                      {scanResult.gaps.map((gap, idx) => (
                        <li key={idx}>{gap}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Detected High-Value Keywords */}
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700, marginBottom: '6px' }}>
                      Matched Industry Keywords:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {scanResult.atsKeywords.map((kw, i) => (
                        <span key={i} style={{ background: '#FFF0E5', color: '#FF6600', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 2: Live Salary Estimator */}
        {activeTab === 'salary' && (
          <div style={{
            background: 'linear-gradient(135deg, #FFF9F5 0%, #FFFFFF 100%)',
            borderRadius: '24px',
            padding: '36px',
            border: '1.5px solid #FFD8BF',
            boxShadow: '0 20px 40px -15px rgba(255, 102, 0, 0.1)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr',
              gap: '32px',
              alignItems: 'center'
            }} className="tools-grid">
              
              {/* Left Controls */}
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '18px' }}>
                  Select Role & Experience
                </h3>

                {/* Role selection buttons */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
                    Target Job Title:
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {SALARY_BENCHMARKS.map((bench, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedRoleIndex(idx)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '10px',
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          background: selectedRoleIndex === idx ? '#FF6600' : '#FFFFFF',
                          color: selectedRoleIndex === idx ? '#FFFFFF' : '#334155',
                          border: selectedRoleIndex === idx ? '1px solid #FF6600' : '1px solid #CBD5E1',
                          boxShadow: selectedRoleIndex === idx ? '0 4px 10px rgba(255,102,0,0.25)' : 'none'
                        }}
                      >
                        {bench.role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Slider */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>
                      Years of Experience:
                    </label>
                    <span style={{ fontWeight: 800, color: '#FF6600', fontSize: '0.9rem' }}>
                      {selectedExp} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={selectedExp}
                    onChange={(e) => setSelectedExp(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#FF6600', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                    <span>Fresher (0)</span>
                    <span>5 Yrs</span>
                    <span>10+ Yrs</span>
                  </div>
                </div>

                {/* Top High Paying Skills */}
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
                    Highest Value Skills in this Role:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {currentBenchmark.topSkills.map((sk, idx) => (
                      <span key={idx} className="badge-tag" style={{ background: '#FFF5EC', color: '#C2410C', border: '1px solid #FED7AA' }}>
                        +{sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Salary Breakdown Display */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                      Estimated Market CTC Band
                    </div>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                      {currentBenchmark.role} ({selectedExp} Yrs)
                    </h4>
                  </div>
                  <span style={{ background: '#DCFCE7', color: '#166534', padding: '4px 10px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700 }}>
                    {currentBenchmark.trend}
                  </span>
                </div>

                {/* Main Median Figure */}
                <div style={{
                  background: 'linear-gradient(135deg, #FFF5EC 0%, #FFE8D6 100%)',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid #FFD2B3',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C2410C', textTransform: 'uppercase' }}>
                    Expected Median Annual Compensation
                  </div>
                  <div style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', fontWeight: 900, color: '#FF6600', fontFamily: 'Outfit, sans-serif' }}>
                    ₹{(calculatedMedian / 100000).toFixed(1)} LPA
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#7C2D12' }}>
                    (Based on {currentBenchmark.sampleCount.toLocaleString()} verified offers on Clyptus)
                  </div>
                </div>

                {/* Percentiles Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
                  <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>25th Percentile</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B' }}>₹{(calculatedMin / 100000).toFixed(1)}L</div>
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Median</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FF6600' }}>₹{(calculatedMedian / 100000).toFixed(1)}L</div>
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Top 10% Bracket</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#059669' }}>₹{(calculatedMax / 100000).toFixed(1)}L+</div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 860px) {
          .tools-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
