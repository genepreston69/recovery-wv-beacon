
import React from 'react';

export const ProgramInsightsSection = () => {
  return (
    <div className="space-y-8">
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Program Effectiveness & Outcomes</h2>
        </div>
        
        <div className="key-metrics">
          <div className="metric-card">
            <span className="metric-trend trend-up">📈</span>
            <div className="metric-value">72.3%</div>
            <div className="metric-label">90+ Day Completion Rate</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '72.3%' }}></div>
            </div>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-up">🎯</span>
            <div className="metric-value">68.9%</div>
            <div className="metric-label">Treatment Goals Met</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '68.9%' }}></div>
            </div>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-neutral">🔄</span>
            <div className="metric-value">15.2%</div>
            <div className="metric-label">Readmission Rate</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '15.2%' }}></div>
            </div>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-up">🏠</span>
            <div className="metric-value">84.7%</div>
            <div className="metric-label">Post-Discharge Stable Housing</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '84.7%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Treatment Engagement & Progress</h2>
        </div>
        
        <div className="chart-container">
          <canvas id="engagementChart"></canvas>
        </div>
        
        <div className="insights-grid" style={{ marginTop: '2rem' }}>
          <div className="insight-card">
            <h3>Treatment Participation</h3>
            <ul>
              <li>Individual Counseling <span className="badge success">94.2%</span></li>
              <li>Group Therapy <span className="badge success">89.7%</span></li>
              <li>Peer Support Groups <span className="badge warning">76.3%</span></li>
              <li>Family Therapy <span className="badge warning">52.8%</span></li>
              <li>Vocational Training <span className="badge critical">34.1%</span></li>
            </ul>
          </div>
          
          <div className="insight-card">
            <h3>Skill Development Progress</h3>
            <ul>
              <li>Coping Strategies <span className="badge success">87.4%</span></li>
              <li>Communication Skills <span className="badge success">82.1%</span></li>
              <li>Financial Literacy <span className="badge warning">67.5%</span></li>
              <li>Job Readiness <span className="badge warning">58.9%</span></li>
              <li>Life Skills <span className="badge success">79.3%</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Recovery Milestones</h2>
        </div>
        
        <div className="insights-grid">
          <div className="insight-card">
            <h3>30-Day Milestones</h3>
            <ul>
              <li>Completed Detox <span className="badge success">92.1%</span></li>
              <li>Treatment Plan Established <span className="badge success">88.7%</span></li>
              <li>Peer Connections Made <span className="badge warning">71.4%</span></li>
              <li>Family Contact Initiated <span className="badge warning">56.8%</span></li>
              <li>Educational Goals Set <span className="badge critical">43.2%</span></li>
            </ul>
          </div>
          
          <div className="insight-card">
            <h3>90-Day Milestones</h3>
            <ul>
              <li>Sustained Sobriety <span className="badge success">78.9%</span></li>
              <li>Improved Mental Health <span className="badge success">74.3%</span></li>
              <li>Stable Housing Plan <span className="badge success">69.2%</span></li>
              <li>Employment/Education Path <span className="badge warning">52.6%</span></li>
              <li>Family Relationships Improved <span className="badge warning">48.1%</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Program Utilization & Services</h2>
        </div>
        
        <div className="insights-grid">
          <div className="insight-card">
            <h3>Most Utilized Services</h3>
            <ul>
              <li>Medical Care <span className="badge success">96.8%</span></li>
              <li>Mental Health Services <span className="badge success">91.4%</span></li>
              <li>Case Management <span className="badge success">87.9%</span></li>
              <li>Substance Abuse Counseling <span className="badge success">85.3%</span></li>
              <li>Life Skills Training <span className="badge warning">72.1%</span></li>
            </ul>
          </div>
          
          <div className="insight-card">
            <h3>Specialized Programs</h3>
            <ul>
              <li>Trauma-Informed Care <span className="badge warning">64.7%</span></li>
              <li>Co-occurring Disorders <span className="badge warning">58.2%</span></li>
              <li>Legal Aid Services <span className="badge critical">45.3%</span></li>
              <li>Parenting Classes <span className="badge critical">32.8%</span></li>
              <li>Financial Counseling <span className="badge critical">28.9%</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="alert-box">
        <span className="alert-icon">💡</span>
        <div>
          <strong>Key Program Insight:</strong> Clients who engage in multiple service types (4+) show a 23% higher completion rate and 31% better long-term outcomes compared to those utilizing only basic services.
        </div>
      </div>
    </div>
  );
};
