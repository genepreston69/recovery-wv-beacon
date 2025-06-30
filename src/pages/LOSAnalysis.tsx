
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { AzureProtectedRoute } from '@/components/auth/AzureProtectedRoute';
import { LengthOfStaySection } from '@/components/statistics/LengthOfStaySection';
import { StatisticsHeader } from '@/components/statistics/StatisticsHeader';

const LOSAnalysis = () => {
  return (
    <AzureProtectedRoute>
      <Navigation />
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .dashboard-content {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f0f4f8;
          color: #2d3748;
          line-height: 1.6;
          overflow-x: hidden;
        }
        
        .dashboard {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          overflow: hidden;
        }
        
        .subtitle {
          color: #64748b;
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        
        .key-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        
        .metric-card {
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          border: 1px solid #4da6d9;
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 119, 190, 0.2);
        }
        
        .metric-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0, 119, 190, 0.3);
        }
        
        .metric-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #0077be, #4da6d9, #80c7ea);
          transform: scaleX(1);
          transition: transform 0.3s ease;
          transform-origin: left;
        }
        
        .metric-value {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #0077be;
        }
        
        .metric-label {
          color: #64748b;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .metric-trend {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 1.5rem;
        }
        
        .trend-up { color: #0077be; }
        .trend-down { color: #80c7ea; }
        .trend-neutral { color: #4da6d9; }
        
        .section {
          margin-bottom: 3rem;
        }
        
        .section-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .section-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #2d3748;
          margin-right: auto;
        }
        
        .chart-container {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          position: relative;
          min-height: 400px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .alert-box {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border: 1px solid #80c7ea;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .alert-icon {
          font-size: 2rem;
          color: #80c7ea;
        }
        
        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .insight-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .insight-card h3 {
          color: #0077be;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }
        
        .insight-card ul {
          list-style: none;
          padding: 0;
        }
        
        .insight-card li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #f0f4f8;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .insight-card li:last-child {
          border-bottom: none;
        }
        
        .badge {
          background: #f0f4f8;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .badge.critical { background: #80c7ea; color: white; }
        .badge.warning { background: #4da6d9; color: white; }
        .badge.success { background: #0077be; color: white; }
        
        @media (max-width: 768px) {
          .dashboard { padding: 1rem; }
          .metric-value { font-size: 2rem; }
          .key-metrics { grid-template-columns: 1fr; }
        }
        
        .loading {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid #e2e8f0;
          border-top-color: #0077be;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <div className="dashboard-content">
        <div className="dashboard">
          <StatisticsHeader />
          
          <div style={{ background: 'linear-gradient(135deg, #ebf4ff, #f0f4f8)', border: '1px solid #4c51bf', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#2d3748', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
              <strong>Length of Stay Analysis:</strong> This analysis focuses specifically on client retention patterns and identifies critical periods where interventions can maximize program success. Understanding when and why clients leave helps us develop targeted retention strategies.
            </p>
          </div>

          <LengthOfStaySection />
          
          <div className="alert-box">
            <span className="alert-icon">⚠️</span>
            <div>
              <strong>Critical Retention Challenge:</strong> 45.6% of clients leave within 30 days, with 24.5% departing in the first week. Early intervention and engagement strategies are urgently needed.
            </div>
          </div>
        </div>
      </div>
    </AzureProtectedRoute>
  );
};

export default LOSAnalysis;
