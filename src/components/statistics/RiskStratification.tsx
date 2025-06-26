
import React from 'react';

export const RiskStratification = () => {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Risk Stratification</h2>
      </div>
      
      <div className="risk-grid">
        <div className="risk-card high">
          <h3 style={{ color: '#9f7aea' }}>🚨 High Risk (390 clients)</h3>
          <p>Multiple indicators including:</p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li>Recent arrests (past 30 days)</li>
            <li>Unstable housing</li>
            <li>Unmet mental health needs</li>
            <li>Multiple "Terrible" QOL ratings</li>
          </ul>
        </div>
        
        <div className="risk-card medium">
          <h3 style={{ color: '#667eea' }}>⚠️ Medium Risk (634 clients)</h3>
          <p>Key concerns:</p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li>Housing instability</li>
            <li>Pending legal charges</li>
            <li>Limited support systems</li>
            <li>Financial insecurity</li>
          </ul>
        </div>
        
        <div className="risk-card low">
          <h3 style={{ color: '#4c51bf' }}>✅ Stable/Low Risk (544 clients)</h3>
          <p>Positive indicators:</p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li>Stable housing (30+ days)</li>
            <li>Educational attainment</li>
            <li>Supportive recovery environment</li>
            <li>Good overall health</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
