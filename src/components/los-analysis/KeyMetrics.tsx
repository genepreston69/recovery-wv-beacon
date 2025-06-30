
import React from 'react';

export const KeyMetrics = () => {
  return (
    <div className="key-metrics">
      <div className="metric-card">
        <span className="metric-trend trend-neutral">➡</span>
        <div className="metric-value">82.1</div>
        <div className="metric-label">Average LOS (Days)</div>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Across all facilities</p>
      </div>
      
      <div className="metric-card">
        <span className="metric-trend trend-down">⬇</span>
        <div className="metric-value">24.5%</div>
        <div className="metric-label">Early Departure Rate</div>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Leave within 7 days</p>
      </div>
      
      <div className="metric-card">
        <span className="metric-trend trend-up">⬆</span>
        <div className="metric-value">54.3%</div>
        <div className="metric-label">30-Day Retention</div>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Stay beyond 30 days</p>
      </div>
      
      <div className="metric-card">
        <span className="metric-trend trend-neutral">➡</span>
        <div className="metric-value">28.2</div>
        <div className="metric-label">Gender Gap (Days)</div>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Female vs Male LOS</p>
      </div>
    </div>
  );
};
