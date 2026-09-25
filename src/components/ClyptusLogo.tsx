import React from 'react';

interface ClyptusLogoProps {
  height?: number;
  theme?: 'light' | 'dark';
}

export const ClyptusLogo: React.FC<ClyptusLogoProps> = ({ 
  height = 46,
  theme = 'light' 
}) => {
  if (theme === 'dark') {
    return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: '#FFFFFF',
        padding: '6px 14px',
        borderRadius: '12px',
        boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
        userSelect: 'none'
      }}>
        <img 
          src="/clyptus_logo.jpg" 
          alt="Clyptus Logo" 
          style={{
            height: `${height}px`,
            width: 'auto',
            display: 'block',
            objectFit: 'contain'
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', userSelect: 'none' }}>
      <img 
        src="/clyptus_logo.jpg" 
        alt="Clyptus Logo" 
        style={{
          height: `${height}px`,
          width: 'auto',
          display: 'block',
          objectFit: 'contain'
        }}
      />
    </div>
  );
};
