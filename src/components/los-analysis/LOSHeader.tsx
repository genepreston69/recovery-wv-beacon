
import React from 'react';

export const LOSHeader = () => {
  return (
    <div className="header">
      <div style={{ marginBottom: '2rem' }}>
        <div id="text-logo" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2d3748', marginBottom: 0 }}>
            RECOVERY<span style={{ color: '#4c51bf' }}>POINT</span>
          </h2>
          <p style={{ color: '#4c51bf', fontSize: '1.2rem', letterSpacing: '0.3em', marginTop: '-0.5rem' }}>
            WEST VIRGINIA
          </p>
          <div style={{ background: 'linear-gradient(135deg, #ebf4ff, #f0f4f8)', border: '2px solid #4c51bf', borderRadius: '12px', padding: '1.5rem', marginTop: '2rem' }}>
            <h3 style={{ color: '#4c51bf', marginBottom: '1rem' }}>📈 Bottom Line Impact</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
              <strong>The Opportunity:</strong> If all facilities achieved RPB's 11.1% early departure rate instead of the current 24.5%, Recovery Point would retain an additional <strong>1,220 clients</strong> past the critical first week. With an average stay of 146.6 days for those who make it past 30 days, this represents approximately <strong>178,932 additional treatment days</strong> annually - transforming both lives and organizational sustainability.
            </p>
          </div>
        </div>
      </div>
      <h1>Length of Stay Analysis by Facility</h1>
      <p className="subtitle">Comprehensive Retention Analysis | 7,279 Total Clients</p>
      <p style={{ color: '#94a3b8' }}>Data Analysis Date: June 30, 2025</p>
    </div>
  );
};
