import React from 'react';
import { 
  Code2, 
  Sparkles, 
  Layout, 
  Cloud, 
  TrendingUp, 
  Briefcase, 
  ShieldCheck, 
  Globe, 
  ArrowUpRight 
} from 'lucide-react';
import type { Category } from '../types/job';

interface CategoryGridProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  const getIcon = (iconName: string) => {
    const props = { size: 24, color: '#FF6600', strokeWidth: 2.2 };
    switch (iconName) {
      case 'Code2': return <Code2 {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Layout': return <Layout {...props} />;
      case 'Cloud': return <Cloud {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Globe': return <Globe {...props} />;
      default: return <Briefcase {...props} />;
    }
  };

  return (
    <section id="categories-section" style={{ padding: '60px 0', background: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="badge-orange" style={{ marginBottom: '8px' }}>
              <span>🎯 Top Industries</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)', fontWeight: 800, color: '#0F172A' }}>
              Explore Jobs by Leading Domains
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.95rem', marginTop: '4px' }}>
              Find specialized roles matched with competitive compensation packages
            </p>
          </div>

          <a 
            href="#companies-section"
            style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#FF6600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none'
            }}
          >
            Explore Top MNC Companies ({categories.reduce((acc, c) => acc + c.count, 0).toLocaleString()}+) &rarr;
          </a>
        </div>

        {/* Category Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <a
                key={cat.id}
                href="#companies-section"
                onClick={() => onSelectCategory(cat.id)}
                className="card-white"
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  borderColor: isSelected ? '#FF6600' : '#EDF2F7',
                  background: isSelected ? '#FFF7ED' : '#FFFFFF',
                  boxShadow: isSelected ? '0 10px 25px -5px rgba(255, 102, 0, 0.25)' : undefined,
                  position: 'relative',
                  overflow: 'hidden',
                  textDecoration: 'none'
                }}
              >
                {/* Top Row: Icon + Growth Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: isSelected ? '#FFFFFF' : '#FFF5EC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(255, 102, 0, 0.12)'
                  }}>
                    {getIcon(cat.icon)}
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#059669',
                    background: '#ECFDF5',
                    padding: '3px 8px',
                    borderRadius: '999px'
                  }}>
                    {cat.growth}
                  </span>
                </div>

                {/* Category Name & Count */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                  {cat.name}
                </h3>
                
                <div style={{ fontSize: '0.85rem', color: '#FF6600', fontWeight: 700, marginBottom: '14px' }}>
                  {cat.count.toLocaleString()}+ Openings
                </div>

                {/* Popular Roles Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {cat.popularRoles.slice(0, 2).map((role, i) => (
                    <span 
                      key={i} 
                      style={{ 
                        fontSize: '0.72rem', 
                        background: '#F1F5F9', 
                        color: '#475569', 
                        padding: '2px 8px', 
                        borderRadius: '6px',
                        fontWeight: 500
                      }}
                    >
                      {role}
                    </span>
                  ))}
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', padding: '2px 4px' }}>
                    +{cat.popularRoles.length - 2} more
                  </span>
                </div>

                {/* Corner hover link indicator */}
                <div style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  opacity: 0.5,
                  transition: 'opacity 0.2s ease'
                }}>
                  <ArrowUpRight size={18} color="#FF6600" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
