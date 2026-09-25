import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" style={{ padding: '70px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge-orange" style={{ marginBottom: '10px' }}>
            <HelpCircle size={14} color="#FF6600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
            Got Questions? We’ve Got Answers
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
            Everything you need to know about job searching, salary benchmarks, and hiring with Clyptus.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="card-white"
                style={{
                  borderRadius: '16px',
                  border: isOpen ? '1.5px solid #FFD2B3' : '1px solid #E2E8F0',
                  background: isOpen ? '#FFFDFB' : '#FFFFFF',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    background: 'none'
                  }}
                >
                  <span style={{ fontSize: '1.02rem', fontWeight: 700, color: '#0F172A', paddingRight: '16px' }}>
                    {faq.question}
                  </span>
                  <div style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    color: isOpen ? '#FF6600' : '#94A3B8'
                  }}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 24px 22px',
                    color: '#475569',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid #FFF1E6',
                    paddingTop: '14px'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
