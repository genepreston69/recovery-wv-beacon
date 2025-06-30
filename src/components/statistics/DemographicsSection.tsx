
import React from 'react';

export const DemographicsSection = () => {
  return (
    <div className="space-y-8">
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Client Demographics Overview</h2>
        </div>
        
        <div className="key-metrics">
          <div className="metric-card">
            <span className="metric-trend trend-neutral">👥</span>
            <div className="metric-value">7,232</div>
            <div className="metric-label">Total Clients</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '100%' }}></div>
            </div>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-up">♂️</span>
            <div className="metric-value">68.2%</div>
            <div className="metric-label">Male Clients</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '68.2%' }}></div>
            </div>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-neutral">♀️</span>
            <div className="metric-value">31.8%</div>
            <div className="metric-label">Female Clients</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '31.8%' }}></div>
            </div>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-neutral">📅</span>
            <div className="metric-value">34.2</div>
            <div className="metric-label">Average Age</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '57%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Age Distribution</h2>
        </div>
        
        <div className="chart-container">
          <canvas id="ageChart"></canvas>
          <div className="insights-grid" style={{ marginTop: '2rem' }}>
            <div className="insight-card">
              <h3>Age Group Breakdown</h3>
              <ul>
                <li>18-25 years <span className="badge success">22.4%</span></li>
                <li>26-35 years <span className="badge warning">35.7%</span></li>
                <li>36-45 years <span className="badge warning">28.1%</span></li>
                <li>46-55 years <span className="badge success">10.3%</span></li>
                <li>56+ years <span className="badge success">3.5%</span></li>
              </ul>
            </div>
            
            <div className="insight-card">
              <h3>Geographic Distribution</h3>
              <ul>
                <li>West Virginia <span className="badge critical">78.2%</span></li>
                <li>Ohio <span className="badge warning">12.1%</span></li>
                <li>Pennsylvania <span className="badge success">5.3%</span></li>
                <li>Virginia <span className="badge success">2.8%</span></li>
                <li>Other States <span className="badge success">1.6%</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Educational & Employment Background</h2>
        </div>
        
        <div className="insights-grid">
          <div className="insight-card">
            <h3>Education Level</h3>
            <ul>
              <li>Less than High School <span className="badge critical">28.5%</span></li>
              <li>High School/GED <span className="badge warning">42.3%</span></li>
              <li>Some College <span className="badge success">21.7%</span></li>
              <li>College Graduate <span className="badge success">6.1%</span></li>
              <li>Advanced Degree <span className="badge success">1.4%</span></li>
            </ul>
          </div>
          
          <div className="insight-card">
            <h3>Employment Status at Intake</h3>
            <ul>
              <li>Unemployed <span className="badge critical">64.2%</span></li>
              <li>Part-time Employment <span className="badge warning">18.7%</span></li>
              <li>Full-time Employment <span className="badge success">12.1%</span></li>
              <li>Disabled/Unable to Work <span className="badge warning">3.8%</span></li>
              <li>Student <span className="badge success">1.2%</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Housing & Living Situation</h2>
        </div>
        
        <div className="insights-grid">
          <div className="insight-card">
            <h3>Pre-Admission Housing</h3>
            <ul>
              <li>Homeless/Transient <span className="badge critical">34.7%</span></li>
              <li>Family/Friends <span className="badge warning">28.3%</span></li>
              <li>Own/Rent Apartment <span className="badge success">21.2%</span></li>
              <li>Transitional Housing <span className="badge warning">8.9%</span></li>
              <li>Institutional Setting <span className="badge warning">6.9%</span></li>
            </ul>
          </div>
          
          <div className="insight-card">
            <h3>Family Structure</h3>
            <ul>
              <li>Single/No Children <span className="badge success">41.8%</span></li>
              <li>Single Parent <span className="badge critical">23.4%</span></li>
              <li>Married/Partner with Children <span className="badge warning">19.2%</span></li>
              <li>Married/Partner No Children <span className="badge success">12.1%</span></li>
              <li>Extended Family <span className="badge success">3.5%</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
