
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
            RECOVERY<span style={{ color: '#4c51bf' }}>POINT</span>
          </h2>
          <p style={{ color: '#4c51bf', fontSize: '1.2rem', letterSpacing: '0.3em', marginTop: '-0.5rem' }}>
            WEST VIRGINIA
          </p>
        </div>
      </div>
      <h1>Long-Term Recovery Dashboard</h1>
      <p className="subtitle">Comprehensive Client Analysis | 7,232 Total Clients</p>
      <p style={{ color: '#94a3b8' }}>Data Analysis Date: June 30, 2025</p>
    </div>
  );
};
