
import React from 'react';

export const QualityOfLifeSection = () => {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Quality of Life Assessment</h2>
      </div>
      
      <p style={{ color: '#64748b', fontStyle: 'italic', marginBottom: '1rem', textAlign: 'center' }}>
        Based on client survey after 90 days of residency.
      </p>
      
      <div className="chart-container">
        <canvas id="qolChart"></canvas>
      </div>
    </div>
  );
};
