
import React from 'react';

interface InsightsGridProps {
  type: 'stratification' | 'performance';
}

export const InsightsGrid: React.FC<InsightsGridProps> = ({ type }) => {
  if (type === 'stratification') {
    return (
      <div className="insights-grid" style={{ marginTop: '2rem' }}>
        <div className="insight-card">
          <h3>📊 Retention Breakdown</h3>
          <ul>
            <li>
              <span>0-7 Days</span>
              <span className="badge critical">1,701 clients</span>
            </li>
            <li>
              <span>8-30 Days</span>
              <span className="badge warning">1,473 clients</span>
            </li>
            <li>
              <span>31-60 Days</span>
              <span className="badge">907 clients</span>
            </li>
            <li>
              <span>61-90 Days</span>
              <span className="badge">843 clients</span>
            </li>
            <li>
              <span>Over 90 Days</span>
              <span className="badge success">2,031 clients</span>
            </li>
          </ul>
        </div>
        
        <div className="insight-card">
          <h3>💡 Critical Insights</h3>
          <ul>
            <li>
              <span>First Week Crisis</span>
              <span style={{ fontSize: '0.85rem' }}>1,701 clients lost</span>
            </li>
            <li>
              <span>Month 1 Total Loss</span>
              <span style={{ fontSize: '0.85rem' }}>3,174 clients</span>
            </li>
            <li>
              <span>Stabilization Point</span>
              <span className="badge">After 30 days</span>
            </li>
            <li>
              <span>Long-term Success</span>
              <span className="badge success">Only 29.2%</span>
            </li>
            <li>
              <span>Annual Impact</span>
              <span style={{ fontSize: '0.85rem' }}>~4,800 early exits</span>
            </li>
          </ul>
        </div>
        
        <div className="insight-card">
          <h3>🎯 Opportunity Analysis</h3>
          <ul>
            <li>
              <span>If 50% of Week 1 stayed</span>
              <span className="badge">+850 clients</span>
            </li>
            <li>
              <span>If matched RPB rate</span>
              <span className="badge success">+1,220 retained</span>
            </li>
            <li>
              <span>Treatment Days Impact</span>
              <span style={{ fontSize: '0.85rem' }}>+178,932 days</span>
            </li>
            <li>
              <span>Bed Utilization</span>
              <span style={{ fontSize: '0.85rem' }}>Major improvement</span>
            </li>
            <li>
              <span>Success Rate Potential</span>
              <span className="badge success">Could reach 40%+</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="insights-grid">
      <div className="insight-card">
        <h3>🎯 Performance Variations</h3>
        <ul>
          <li>
            <span>Best Performer (RPB)</span>
            <span className="badge success">11.1% early exit</span>
          </li>
          <li>
            <span>Worst Performer (RPC)</span>
            <span className="badge critical">31.8% early exit</span>
          </li>
          <li>
            <span>Performance Gap</span>
            <span className="badge warning">20.7% difference</span>
          </li>
          <li>
            <span>Long-term Success (RPB)</span>
            <span className="badge success">39.4% stay 90+ days</span>
          </li>
          <li>
            <span>Improvement Potential</span>
            <span className="badge">~700 clients/year</span>
          </li>
        </ul>
      </div>
      
      <div className="insight-card">
        <h3>👥 Gender Differences</h3>
        <ul>
          <li>
            <span>Female Average LOS</span>
            <span className="badge">102.6 days</span>
          </li>
          <li>
            <span>Male Average LOS</span>
            <span className="badge">74.4 days</span>
          </li>
          <li>
            <span>Gender Gap</span>
            <span className="badge warning">28.2 days</span>
          </li>
          <li>
            <span>Female Clients</span>
            <span className="badge">2,123 (30.5%)</span>
          </li>
          <li>
            <span>Male Clients</span>
            <span className="badge">4,558 (65.6%)</span>
          </li>
        </ul>
      </div>
      
      <div className="insight-card">
        <h3>📊 Facility Capacity</h3>
        <ul>
          <li>
            <span>RPH (Largest)</span>
            <span className="badge">2,551 clients</span>
          </li>
          <li>
            <span>RPC</span>
            <span className="badge">2,141 clients</span>
          </li>
          <li>
            <span>RPP</span>
            <span className="badge">1,174 clients</span>
          </li>
          <li>
            <span>RPB</span>
            <span className="badge">962 clients</span>
          </li>
          <li>
            <span>Point Apartments</span>
            <span className="badge">127 clients</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
