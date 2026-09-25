import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Bookmark, 
  Zap, 
  Building2, 
  Star, 
  SlidersHorizontal,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import type { Job } from '../types/job';

interface JobDirectoryProps {
  jobs: Job[];
}

export const JobDirectory: React.FC<JobDirectoryProps> = ({ jobs }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'mnc' | 'high-salary' | 'remote' | 'freshers'>('all');
  const [keyword, setKeyword] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [experience, setExperience] = useState('');
  const [minSalary, setMinSalary] = useState(0);

  // Frontend filter logic
  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'mnc' && !job.company.includes('Clyptus') && !job.company.includes('Nexa') && !job.company.includes('FinScale')) return false;
    if (activeTab === 'high-salary' && job.salaryMin < 2400000) return false;
    if (activeTab === 'remote' && job.locationType !== 'Remote') return false;
    if (activeTab === 'freshers' && !job.experience.includes('0-') && !job.experience.includes('1-') && !job.tags.includes('Entry Level')) return false;

    if (keyword) {
      const q = keyword.toLowerCase();
      const match = job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q) || job.skills.some(s => s.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (workMode && job.locationType !== workMode) return false;
    if (minSalary > 0 && job.salaryMax < minSalary) return false;

    return true;
  });

  const resetFilters = () => {
    setActiveTab('all');
    setKeyword('');
    setWorkMode('');
    setExperience('');
    setMinSalary(0);
  };

  return (
    <section id="jobs-section" style={{ padding: '70px 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
          <div className="badge-orange" style={{ marginBottom: '10px' }}>
            <Building2 size={14} color="#FF6600" />
            <span>Top Tier Global Employers</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
            Top MNC Companies
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem' }}>
            Explore verified active openings across global Fortune 500 technology leaders and enterprise innovators.
          </p>
        </div>

        {/* Quick Filter Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '32px'
        }}>
          {[
            { id: 'all', label: 'All Top MNCs' },
            { id: 'mnc', label: '🏢 Enterprise Leaders' },
            { id: 'high-salary', label: '💰 High Package (₹25L+)' },
            { id: 'remote', label: '🌍 100% Remote MNCs' },
            { id: 'freshers', label: '🎓 Graduate / Freshers (0-2 Yrs)' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '999px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                  background: isActive ? '#FF6600' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  border: isActive ? '1px solid #FF6600' : '1px solid #E2E8F0',
                  boxShadow: isActive ? '0 4px 14px rgba(255, 102, 0, 0.3)' : '0 1px 3px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Filters Sidebar + Company / Job Listings */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '290px 1fr',
          gap: '28px',
          alignItems: 'start'
        }} className="job-board-layout">
          
          {/* Left Sidebar Filters */}
          <aside style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            position: 'sticky',
            top: '90px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1rem', color: '#0F172A' }}>
                <SlidersHorizontal size={18} color="#FF6600" />
                <span>MNC Filters</span>
              </div>
              <button 
                onClick={resetFilters}
                style={{ fontSize: '0.78rem', color: '#FF6600', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Workplace Type */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>
                Work Mode
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['', 'Remote', 'Hybrid', 'On-site'].map((type) => (
                  <label 
                    key={type} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      fontSize: '0.86rem', 
                      color: '#475569', 
                      cursor: 'pointer' 
                    }}
                  >
                    <input 
                      type="radio" 
                      name="workMode"
                      checked={workMode === type}
                      onChange={() => setWorkMode(type)}
                      style={{ accentColor: '#FF6600' }}
                    />
                    <span>{type === '' ? 'All Modes' : type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Range */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>
                Experience Level
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.86rem',
                  color: '#1E293B',
                  background: '#FFFFFF'
                }}
              >
                <option value="">Any Experience</option>
                <option value="0-2">0 - 2 Years (Fresher / Junior)</option>
                <option value="2-5">2 - 5 Years (Mid-Level)</option>
                <option value="5-8">5 - 8 Years (Senior)</option>
                <option value="8+">8+ Years (Lead / Staff)</option>
              </select>
            </div>

            {/* Minimum Expected CTC */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                  Min Salary (Annual)
                </label>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FF6600' }}>
                  {minSalary > 0 ? `₹${(minSalary / 100000).toFixed(0)} LPA` : 'Any'}
                </span>
              </div>
              <input 
                type="range"
                min="0"
                max="5000000"
                step="500000"
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#FF6600', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                <span>₹0</span>
                <span>₹25L</span>
                <span>₹50L+</span>
              </div>
            </div>

            {/* Clyptus Guarantee Badge */}
            <div style={{
              background: '#FFF6EE',
              borderRadius: '14px',
              padding: '14px',
              border: '1px dashed #FFB088',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#FF6600', marginBottom: '4px' }}>
                🏢 Global MNC Network
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4 }}>
                100% verified corporate hiring with fast-tracked HR direct calls.
              </p>
            </div>
          </aside>

          {/* Right Main Job Listings Feed */}
          <div>
            
            {/* Results Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ fontSize: '0.95rem', color: '#475569', fontWeight: 600 }}>
                Showing <strong style={{ color: '#0F172A' }}>{filteredJobs.length}</strong> top MNC job openings
              </div>
            </div>

            {/* Job Cards List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="card-white"
                  style={{
                    padding: '24px',
                    borderRadius: '20px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  {/* Top Row: Company Info & Badges */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '14px',
                        background: job.companyBg || '#FFF5EC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.6rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        flexShrink: 0
                      }}>
                        {job.companyLogo}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1E293B' }}>
                            {job.company}
                          </span>
                          <span style={{ background: '#F1F5F9', color: '#475569', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>
                            🏢 Global MNC
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: '#FEF3C7', padding: '1px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#B45309' }}>
                            <Star size={11} fill="#B45309" color="#B45309" />
                            <span>{job.rating}</span>
                            <span style={{ color: '#78350F', opacity: 0.7 }}>({job.reviewCount})</span>
                          </div>

                          {job.isFeatured && (
                            <span style={{ background: '#FFF7ED', color: '#FF6600', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', border: '1px solid #FFD2B3' }}>
                              ⭐ Featured MNC
                            </span>
                          )}
                        </div>

                        <h3 
                          style={{ 
                            fontSize: '1.22rem', 
                            fontWeight: 700, 
                            color: '#0F172A', 
                            marginTop: '3px'
                          }}
                        >
                          {job.title}
                        </h3>
                      </div>
                    </div>

                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94A3B8',
                        flexShrink: 0
                      }}
                    >
                      <Bookmark size={18} />
                    </div>
                  </div>

                  {/* Middle Row: Meta Information */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    fontSize: '0.88rem',
                    color: '#475569',
                    background: '#FAFAFA',
                    padding: '10px 14px',
                    borderRadius: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Briefcase size={15} color="#FF6600" />
                      <span>{job.experience}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={15} color="#FF6600" />
                      <span>{job.location}</span>
                      <span style={{ 
                        fontSize: '0.72rem', 
                        background: job.locationType === 'Remote' ? '#DCFCE7' : '#E0F2FE',
                        color: job.locationType === 'Remote' ? '#166534' : '#0369A1',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontWeight: 600
                      }}>
                        {job.locationType}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700, color: '#0F172A' }}>
                      <IndianRupee size={15} color="#FF6600" />
                      <span style={{ color: '#FF6600' }}>{job.salaryDisplay}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: 'auto', fontSize: '0.78rem', color: '#94A3B8' }}>
                      <Clock size={14} />
                      <span>{job.postedTime}</span>
                    </div>
                  </div>

                  {/* Description snippet */}
                  <p style={{
                    fontSize: '0.88rem',
                    color: '#64748B',
                    lineHeight: 1.5
                  }}>
                    {job.description}
                  </p>

                  {/* Skills Chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                    {job.skills.map((skill, index) => (
                      <span key={index} className="badge-tag">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Footer Row with "Opening" Button */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '1px solid #F1F5F9',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                      ⚡ <strong>{job.applicantsCount} professionals</strong> applied
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {/* Opening Button */}
                      <a
                        href="#companies-section"
                        className="btn-primary"
                        style={{
                          padding: '10px 24px',
                          fontSize: '0.9rem',
                          borderRadius: '12px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <Zap size={16} />
                        <span>Opening</span>
                        <ArrowRight size={15} />
                      </a>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .job-board-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
