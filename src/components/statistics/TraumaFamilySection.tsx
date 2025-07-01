
import React from 'react';

export const TraumaFamilySection = () => {
  return (
    <div className="section">
      <div className="section-header">
        <div>
          <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Trauma & Family Impact Analysis</h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', margin: 0 }}>Based on 1,207 clients surveyed (16.7% of total population)</p>
        </div>
      </div>
      
      <div className="alert-box" style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderColor: '#f59e0b' }}>
        <span className="alert-icon" style={{ color: '#f59e0b' }}>👨‍👩‍👧‍👦</span>
        <div>
          <strong>Children at Risk:</strong> Among the 1,207 surveyed clients, analysis reveals 932+ children impacted by their parents' recovery journey. Comprehensive family support services are essential for breaking intergenerational cycles.
        </div>
      </div>
      
      <div className="insights-grid">
        <div className="insight-card">
          <h3>🔍 Intergenerational Trauma Patterns</h3>
          <ul>
            <li>
              <span>Abuse History Reported</span>
              <span className="badge critical">1 in 3 surveyed</span>
            </li>
            <li>
              <span>Father Absent in Childhood</span>
              <span className="badge warning">30% of surveyed</span>
            </li>
            <li>
              <span>Correlation Pattern</span>
              <span className="badge">Absence + Abuse</span>
            </li>
            <li>
              <span>Sample Limitation</span>
              <span className="badge">1,207 clients</span>
            </li>
            <li>
              <span>Recommendation</span>
              <span style={{ fontSize: '0.85rem' }}>Expand screening</span>
            </li>
          </ul>
        </div>
        
        <div className="insight-card">
          <h3>👨‍👩‍👧‍👦 Family System Health</h3>
          <ul>
            <li>
              <span>Assessment Coverage</span>
              <span className="badge warning">16.7% only</span>
            </li>
            <li>
              <span>Family Relations Quality</span>
              <span className="badge">Variable</span>
            </li>
            <li>
              <span>Children Impact</span>
              <span className="badge critical">Significant</span>
            </li>
            <li>
              <span>Parental Status</span>
              <span className="badge">Many affected</span>
            </li>
            <li>
              <span>Data Need</span>
              <span style={{ fontSize: '0.85rem' }}>Universal assessment</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
