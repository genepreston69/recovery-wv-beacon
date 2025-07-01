
import React from 'react';

export const ExecutiveInsights = () => {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Executive Insights & Key Findings</h2>
      </div>
      
      <div style={{ background: 'linear-gradient(135deg, #f0f9ff, #f0f4f8)', border: '2px solid #0077be', borderRadius: '12px', padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ color: '#0077be', marginBottom: '1rem' }}>📊 Data-Driven Discoveries from 7,232 Client Records</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #80c7ea' }}>
            <strong style={{ color: '#80c7ea' }}>🚨 Retention Crisis:</strong> Nearly half (45.6%) of clients leave within 30 days, with 1 in 4 departing in the first week. This early attrition represents the single greatest challenge to program effectiveness.
          </div>
          <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #4da6d9' }}>
            <strong style={{ color: '#4da6d9' }}>⏱️ Success Threshold:</strong> Clients who stay beyond 30 days average 146.6 days in treatment, suggesting a critical stabilization period that dramatically improves long-term outcomes.
          </div>
          <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #0077be' }}>
            <strong style={{ color: '#0077be' }}>🔄 Intergenerational Impact:</strong> Among the 1,207 surveyed clients, significant family addiction patterns and criminal justice involvement were reported, highlighting the complex family and legal challenges facing recovery.
          </div>
          <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #80c7ea' }}>
            <strong style={{ color: '#80c7ea' }}>💡 Strategic Opportunity:</strong> The 54.4% who stay beyond 30 days show strong engagement. Investing in first-month retention could potentially help 3,174 additional clients annually.
          </div>
          <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #80c7ea' }}>
            <strong style={{ color: '#80c7ea' }}>🧠 Trauma Prevalence:</strong> Among the 1,207 clients surveyed about abuse, 1 in 3 (33.6%) reported abuse histories, with 40.2% of survivors lacking treatment - highlighting the need for universal trauma screening.
          </div>
        </div>
      </div>
    </div>
  );
};
