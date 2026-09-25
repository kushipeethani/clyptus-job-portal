import React, { useState } from 'react';
import { X, PlusCircle, Sparkles } from 'lucide-react';
import type { Job } from '../types/job';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (newJob: Job) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  isOpen,
  onClose,
  onAddJob
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('Clyptus Technologies');
  const [location] = useState('Bengaluru (Hybrid)');
  const [locationType, setLocationType] = useState<'Hybrid' | 'Remote' | 'On-site'>('Hybrid');
  const [experience, setExperience] = useState('3-6 Yrs');
  const [salaryDisplay, setSalaryDisplay] = useState('₹24 - ₹35 LPA');
  const [category, setCategory] = useState('tech');
  const [skills, setSkills] = useState('React, TypeScript, Node.js, AWS');
  const [description, setDescription] = useState(
    'Looking for a passionate engineer to architect robust enterprise features, lead cross-functional sprints, and deliver high-impact cloud solutions.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);

    const createdJob: Job = {
      id: `job-${Date.now()}`,
      title: title || 'Senior Software Engineer',
      company: company || 'Clyptus Partner',
      companyLogo: '⚡',
      companyBg: '#FFF0E5',
      rating: 4.8,
      reviewCount: 45,
      location: location || 'Bengaluru',
      locationType,
      experience: experience || '2-5 Yrs',
      salaryMin: 2000000,
      salaryMax: 3500000,
      salaryDisplay: salaryDisplay || '₹20 - ₹35 LPA',
      category,
      jobType: 'Full Time',
      tags: [...skillsArray, 'Verified Recruiter'],
      skills: skillsArray.length > 0 ? skillsArray : ['React', 'TypeScript'],
      postedTime: 'Just now',
      isUrgent: true,
      isFeatured: true,
      applicantsCount: 1,
      description,
      responsibilities: [
        'Lead key component and service architecture implementations.',
        'Collaborate with agile cross-functional engineering teams.',
        'Ensure continuous code quality and automated testing coverage.'
      ],
      requirements: [
        `${experience} of relevant industry hands-on experience.`,
        'Proven expertise with modern web architectures and APIs.',
        'Strong problem-solving and collaboration mindset.'
      ],
      perks: [
        'Top market compensation + Equity grant',
        'Comprehensive family healthcare insurance',
        'Flexible working model & annual learning budget'
      ],
      department: 'Engineering'
    };

    onAddJob(createdJob);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid #F1F5F9',
          background: 'linear-gradient(135deg, #FFF9F5 0%, #FFFFFF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div className="badge-orange" style={{ marginBottom: '4px' }}>
              <Sparkles size={12} color="#FF6600" />
              <span>Recruiter Portal</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>
              Post a New Vacancy
            </h3>
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

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '28px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Job Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Frontend Engineer, AI Researcher, Lead PM..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                fontSize: '0.92rem',
                color: '#0F172A'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Hiring Company Name *
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
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
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Domain Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  color: '#0F172A',
                  background: '#FFFFFF'
                }}
              >
                <option value="tech">Technology & Software</option>
                <option value="ai-data">AI & Data Science</option>
                <option value="product">Product & Design</option>
                <option value="cloud-devops">Cloud & Infrastructure</option>
                <option value="marketing">Marketing & Growth</option>
                <option value="sales-biz">Sales & Business Dev</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Work Mode
              </label>
              <select
                value={locationType}
                onChange={(e) => setLocationType(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  color: '#0F172A',
                  background: '#FFFFFF'
                }}
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">100% Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Experience
              </label>
              <input
                type="text"
                placeholder="e.g. 3-6 Yrs"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  color: '#0F172A'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Salary Range
              </label>
              <input
                type="text"
                placeholder="e.g. ₹25 - ₹35 LPA"
                value={salaryDisplay}
                onChange={(e) => setSalaryDisplay(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  color: '#0F172A'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              placeholder="React, TypeScript, Next.js, Docker, AWS"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
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

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Role Overview
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                fontSize: '0.9rem',
                color: '#0F172A',
                resize: 'none'
              }}
            />
          </div>

          {/* Action */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '12px 28px' }}
            >
              <PlusCircle size={18} />
              <span>Publish Job Instantly</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
