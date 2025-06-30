
import React from 'react';

export const LengthOfStaySection = () => {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Length of Stay (LOS) Analysis</h2>
      </div>
      
      <div className="key-metrics" style={{ marginBottom: '2rem' }}>
        <div className="metric-card">
          <span className="metric-trend trend-down">⬇</span>
          <div className="metric-value" style={{ color: '#9f7aea' }}>24.5%</div>
          <div className="metric-label">Leave Within 7 Days</div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>1,701 clients</p>
        </div>
        
        <div className="metric-card">
          <span className="metric-trend trend-down">⬇</span>
          <div className="metric-value" style={{ color: '#9f7aea' }}>45.6%</div>
          <div className="metric-label">Leave Within 30 Days</div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>3,174 clients</p>
        </div>
        
        <div className="metric-card">
          <span className="metric-trend trend-up">⬆</span>
          <div className="metric-value" style={{ color: '#4c51bf' }}>146.6</div>
          <div className="metric-label">Avg Days (>30 Day Stays)</div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>3,781 clients</p>
        </div>
        
        <div className="metric-card">
          <span className="metric-trend trend-neutral">➡</span>
          <div className="metric-value" style={{ color: '#667eea' }}>29.2%</div>
          <div className="metric-label">Stay Over 90 Days</div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>2,031 clients</p>
        </div>
      </div>
      
      <div className="chart-container">
        <canvas id="losChart"></canvas>
      </div>
      
      <div className="insights-grid" style={{ marginTop: '2rem' }}>
        <div className="insight-card">
          <h3>📊 Retention Breakdown</h3>
          <ul>
            <li>
              <span>Week 1 Departures</span>
              <span className="badge critical">1,701 (24.5%)</span>
            </li>
            <li>
              <span>Days 8-30</span>
              <span className="badge warning">1,473 (21.2%)</span>
            </li>
            <li>
              <span>Days 31-60</span>
              <span className="badge">907 (13.0%)</span>
            </li>
            <li>
              <span>Days 61-90</span>
              <span className="badge">843 (12.1%)</span>
            </li>
            <li>
              <span>Over 90 Days</span>
              <span className="badge success">2,031 (29.2%)</span>
            </li>
          </ul>
        </div>
        
        <div className="insight-card">
          <h3>🎯 Critical Insights</h3>
          <ul>
            <li>
              <span>Early Crisis Period</span>
              <span style={{ fontSize: '0.85rem' }}>First 30 days</span>
            </li>
            <li>
              <span>Retention Rate (30+ days)</span>
              <span className="badge">54.4%</span>
            </li>
            <li>
              <span>Long-term Success Rate</span>
              <span className="badge success">29.2%</span>
            </li>
            <li>
              <span>Average Full Program LOS</span>
              <span className="badge">146.6 days</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
