
import React from 'react';

export const StatisticsHeader = () => {
  return (
    <div className="header">
      <div style={{ marginBottom: '2rem' }}>
        <div id="text-logo" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2d3748', marginBottom: 0 }}>
            RECOVERY<span style={{ color: '#0077be' }}>POINT</span>
          </h2>
          <p style={{ color: '#0077be', fontSize: '1.2rem', letterSpacing: '0.3em', marginTop: '-0.5rem' }}>
            WEST VIRGINIA
          </p>
        </div>
      </div>
      <h1>Data Insights Dashboard</h1>
      <p className="subtitle">Comprehensive Client Analysis | 7,232 Total Clients</p>
      <p style={{ color: '#94a3b8' }}>Data Analysis Date: June 30, 2025</p>
    </div>
  );
};
