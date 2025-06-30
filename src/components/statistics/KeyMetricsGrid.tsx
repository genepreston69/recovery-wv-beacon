
import React from 'react';

export const KeyMetricsGrid = () => {
  return (
    <div className="key-metrics">
      <div className="metric-card">
        <span className="metric-trend trend-down">⬇</span>
        <div className="metric-value">24.9%</div>
        <div className="metric-label">High-Risk Clients</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '24.9%' }}></div>
        </div>
      </div>
      
      <div className="metric-card">
        <span className="metric-trend trend-up">⬆</span>
        <div className="metric-value">59.6%</div>
        <div className="metric-label">Stable Housing</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '59.6%' }}></div>
        </div>
      </div>
      
      <div className="metric-card">
        <span className="metric-trend trend-neutral">➡</span>
        <div className="metric-value">83.4%</div>
        <div className="metric-label">Supportive Recovery</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '83.4%' }}></div>
        </div>
      </div>
      
      <div className="metric-card">
        <span className="metric-trend trend-down">⬇</span>
        <div className="metric-value">50.0%</div>
        <div className="metric-label">On Probation/Parole</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '50%' }}></div>
        </div>
      </div>
    </div>
  );
};
