
import React from 'react';

export const StratificationMetrics = () => {
  return (
    <div className="key-metrics" style={{ marginBottom: '2rem' }}>
      <div className="metric-card">
        <span className="metric-trend trend-down">⬇</span>
        <div className="metric-value" style={{ color: '#9f7aea' }}>1,701</div>
        <div className="metric-label">Leave Within 7 Days</div>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>24.5% of all clients</p>
      </div>
      
      <div className="metric-card">
        <span className="metric-trend trend-down">⬇</span>
        <div className="metric-value" style={{ color: '#9f7aea' }}>3,174</div>
        <div className="metric-label">Leave Within 30 Days</div>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>45.6% of all clients</p>
      </div>
      
      <div className="metric-card">
        <span className="metric-trend trend-down">⬇</span>
        <div className="metric-value" style={{ color: '#667eea' }}>4,924</div>
        <div className="metric-label">Leave Within 90 Days</div>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>70.8% of all clients</p>
      </div>
      
      <div className="metric-card">
        <span className="metric-trend trend-up">⬆</span>
        <div className="metric-value" style={{ color: '#4c51bf' }}>2,031</div>
        <div className="metric-label">Stay Over 90 Days</div>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>29.2% success rate</p>
      </div>
    </div>
  );
};
