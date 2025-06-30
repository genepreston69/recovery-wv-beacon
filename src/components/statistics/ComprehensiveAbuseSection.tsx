
import React from 'react';

export const ComprehensiveAbuseSection = () => {
  return (
    <div className="section">
      <div className="section-header">
        <div>
          <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Comprehensive Abuse & Trauma Analysis</h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', margin: 0 }}>Based on 1,207 clients surveyed (16.7% of total population)</p>
        </div>
      </div>
      
      <div className="alert-box" style={{ background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)', borderColor: '#9f7aea' }}>
        <span className="alert-icon" style={{ color: '#9f7aea' }}>⚡</span>
        <div>
          <strong>Critical Finding:</strong> Among 1,207 clients surveyed about abuse, 405 (33.6%) have documented abuse histories, but only 242 (20.0%) received treatment. This represents 163 abuse survivors with unmet trauma treatment needs.
        </div>
      </div>
      
      <div className="key-metrics" style={{ marginBottom: '2rem' }}>
        <div className="metric-card">
          <span className="metric-trend trend-down">⬇</span>
          <div className="metric-value" style={{ color: '#9f7aea' }}>33.6%</div>
          <div className="metric-label">Documented Abuse History</div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>405 of 1,207 surveyed</p>
        </div>
        
        <div className="metric-card">
          <span className="metric-trend trend-down">⬇</span>
          <div className="metric-value" style={{ color: '#9f7aea' }}>163</div>
          <div className="metric-label">Treatment Gap</div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Untreated abuse survivors</p>
        </div>
        
        <div className="metric-card">
          <span className="metric-trend trend-down">⬇</span>
          <div className="metric-value" style={{ color: '#9f7aea' }}>59.8%</div>
          <div className="metric-label">Treatment Coverage</div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Of abuse survivors</p>
        </div>
        
        <div className="metric-card">
          <span className="metric-trend trend-neutral">➡</span>
          <div className="metric-value" style={{ color: '#9f7aea' }}>242</div>
          <div className="metric-label">Received Treatment</div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>20.0% of surveyed</p>
        </div>
      </div>
      
      <div className="insights-grid">
        <div className="insight-card">
          <h3>⚠️ Treatment Coverage Analysis</h3>
          <ul>
            <li>
              <span>Clients Surveyed About Abuse</span>
              <span className="badge">1,207 clients</span>
            </li>
            <li>
              <span>Abuse Survivors Identified</span>
              <span className="badge critical">405 (33.6%)</span>
            </li>
            <li>
              <span>Received Treatment</span>
              <span className="badge warning">242 (59.8%)</span>
            </li>
            <li>
              <span>No Treatment</span>
              <span className="badge critical">163 (40.2%)</span>
            </li>
            <li>
              <span>Sample Size Note</span>
              <span style={{ fontSize: '0.85rem' }}>1,207 of 7,232</span>
            </li>
          </ul>
        </div>
        
        <div className="insight-card">
          <h3>📊 Key Abuse Findings</h3>
          <ul>
            <li>
              <span>Prevalence Rate</span>
              <span className="badge critical">1 in 3 surveyed</span>
            </li>
            <li>
              <span>Treatment Gap</span>
              <span className="badge critical">40.2% untreated</span>
            </li>
            <li>
              <span>Trauma-Informed Need</span>
              <span className="badge warning">High Priority</span>
            </li>
            <li>
              <span>Screening Coverage</span>
              <span className="badge">16.7% of clients</span>
            </li>
            <li>
              <span>Recommendation</span>
              <span style={{ fontSize: '0.85rem' }}>Universal screening</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
