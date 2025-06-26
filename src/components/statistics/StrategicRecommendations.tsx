
import React from 'react';

export const StrategicRecommendations = () => {
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
              <span>Trauma-Informed Care Training</span>
              <span className="badge critical">URGENT</span>
            </li>
            <li>
              <span>Expand Trauma Treatment</span>
              <span className="badge critical">URGENT</span>
            </li>
            <li>
              <span>Mental Health Provider Recruitment</span>
              <span className="badge critical">URGENT</span>
            </li>
            <li>
              <span>Family Support Services</span>
              <span className="badge critical">URGENT</span>
            </li>
            <li>
              <span>Screen 176 Untreated Survivors</span>
              <span className="badge warning">HIGH</span>
            </li>
            <li>
              <span>Housing Stabilization Initiative</span>
              <span className="badge warning">HIGH</span>
            </li>
          </ul>
        </div>
        
        <div className="insight-card">
          <h3>📊 Program Enhancements</h3>
          <ul>
            <li>
              <span>Integrated MH Services</span>
              <span>48.7% need</span>
            </li>
            <li>
              <span>Family Reunification Program</span>
              <span>932+ children</span>
            </li>
            <li>
              <span>Parenting Skills Track</span>
              <span>444 parents</span>
            </li>
            <li>
              <span>Intergenerational Healing</span>
              <span>337 trauma cases</span>
            </li>
            <li>
              <span>Legal Aid Partnership</span>
              <span>50% affected</span>
            </li>
            <li>
              <span>Veterans-Specific Track</span>
              <span>162 clients</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
