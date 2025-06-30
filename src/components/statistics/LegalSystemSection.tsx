
import React from 'react';

export const LegalSystemSection = () => {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Legal System Involvement</h2>
      </div>
      
      <div className="chart-container">
        <canvas id="legalChart"></canvas>
      </div>
    </div>
  );
};
