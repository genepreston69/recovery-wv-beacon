
import React from 'react';

interface ChartSectionProps {
  title: string;
  chartId: string;
  description?: string;
}

export const ChartSection: React.FC<ChartSectionProps> = ({ title, chartId, description }) => {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
      </div>
      
      {description && (
        <p style={{ color: '#64748b', fontStyle: 'italic', marginBottom: '1rem', textAlign: 'center' }}>
          {description}
        </p>
      )}
      
      <div className="chart-container">
        <canvas id={chartId}></canvas>
      </div>
    </div>
  );
};
