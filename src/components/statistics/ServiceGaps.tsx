
import React from 'react';

export const ServiceGaps = () => {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Service Gaps & Critical Needs</h2>
        <button className="action-button">Export Report</button>
      </div>
      
      <div className="insights-grid">
        <div className="insight-card">
          <h3>🧠 Mental Health Services Gap</h3>
          <ul>
            <li>
              <span>Need Provider (No Access)</span>
              <span className="badge critical">763 clients</span>
            </li>
            <li>
              <span>Have Provider</span>
              <span className="badge success">263 clients</span>
            </li>
            <li>
              <span>Inpatient Treatment History</span>
              <span className="badge">214 clients</span>
            </li>
            <li>
              <span>Service Coverage Rate</span>
              <span className="badge critical">25.6%</span>
            </li>
          </ul>
        </div>
        
        <div className="insight-card">
          <h3>🎖️ Veterans Services</h3>
          <ul>
            <li>
              <span>Military Service</span>
              <span className="badge">162 veterans</span>
            </li>
            <li>
              <span>Combat Veterans</span>
              <span className="badge">149 clients</span>
            </li>
            <li>
              <span>Not VA Registered</span>
              <span className="badge warning">92 veterans</span>
            </li>
            <li>
              <span>VA Coverage Gap</span>
              <span className="badge warning">56.8%</span>
            </li>
          </ul>
        </div>
        
        <div className="insight-card">
          <h3>📋 Documentation Status</h3>
          <ul>
            <li>
              <span>Birth Certificate</span>
              <span className="badge warning">52.9%</span>
            </li>
            <li>
              <span>Driver's License</span>
              <span className="badge critical">35.1%</span>
            </li>
            <li>
              <span>Social Security Card</span>
              <span className="badge warning">58.1%</span>
            </li>
            <li>
              <span>HS Diploma/GED</span>
              <span className="badge success">77.7%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
