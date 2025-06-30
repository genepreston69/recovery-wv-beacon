
import React from 'react';

export const StatisticsHeader = () => {
  return (
    <div className="header">
      <div style={{ marginBottom: '2rem' }}>
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" 
          alt="Recovery Point West Virginia" 
          style={{ maxWidth: '400px', height: 'auto', margin: '0 auto', display: 'block' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const textLogo = document.getElementById('text-logo');
            if (textLogo) textLogo.style.display = 'block';
          }}
        />
        <div id="text-logo" style={{ display: 'none', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2d3748', marginBottom: 0 }}>
            RECOVERY<span style={{ color: '#0077be' }}>POINT</span>
          </h2>
          <p style={{ color: '#0077be', fontSize: '1.2rem', letterSpacing: '0.3em', marginTop: '-0.5rem' }}>
            WEST VIRGINIA
          </p>
        </div>
      </div>
      <img 
        src="/lovable-uploads/90c1444e-a36a-4f0e-a3f4-78cc0c6d52bc.png"
        alt="Recovery Point West Virginia Logo"
        style={{ 
          maxWidth: '600px', 
          height: 'auto', 
          margin: '0 auto 2rem auto', 
          display: 'block' 
        }}
      />
      <p className="subtitle">Comprehensive Client Analysis | 7,232 Total Clients</p>
      <p style={{ color: '#94a3b8' }}>Data Analysis Date: June 30, 2025</p>
    </div>
  );
};
