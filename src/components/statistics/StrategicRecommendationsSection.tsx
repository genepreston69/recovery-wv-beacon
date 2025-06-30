
import React from 'react';

export const StrategicRecommendationsSection = () => {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Strategic Recommendations</h2>
      </div>
      
      <div className="insights-grid">
        <div className="insight-card">
          <h3>🎯 Immediate Actions</h3>
          <ul>
            <li>
              <span>First-Week Retention Program</span>
              <span className="badge critical">URGENT</span>
            </li>
            <li>
              <span>30-Day Engagement Strategy</span>
              <span className="badge critical">URGENT</span>
            </li>
            <li>
              <span>Universal Trauma Screening</span>
              <span className="badge critical">URGENT</span>
            </li>
            <li>
              <span>Expand Assessment Coverage</span>
              <span className="badge warning">HIGH</span>
            </li>
            <li>
              <span>Family Addiction Services</span>
              <span className="badge warning">HIGH</span>
            </li>
            <li>
              <span>Mental Health Provider Expansion</span>
              <span className="badge warning">HIGH</span>
            </li>
          </ul>
        </div>
        
        <div className="insight-card">
          <h3>📊 Program Enhancements</h3>
          <ul>
            <li>
              <span>Universal Assessment Protocol</span>
              <span>83.3% gap</span>
            </li>
            <li>
              <span>Integrated MH Services</span>
              <span>Critical need</span>
            </li>
            <li>
              <span>Family Reunification Program</span>
              <span>Many impacted</span>
            </li>
            <li>
              <span>Parenting Skills Track</span>
              <span>For surveyed parents</span>
            </li>
            <li>
              <span>Intergenerational Healing</span>
              <span>33.6% need</span>
            </li>
            <li>
              <span>Data Collection Expansion</span>
              <span>6,025 to assess</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
