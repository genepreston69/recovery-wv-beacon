
import React from 'react';
import { ChartSection } from './ChartSection';

export const TraumaAnalysis = () => {
  return (
    <>
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Trauma & Family Impact Analysis</h2>
        </div>
        
        <div className="alert-box" style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderColor: '#f59e0b' }}>
          <span className="alert-icon" style={{ color: '#f59e0b' }}>👨‍👩‍👧‍👦</span>
          <div>
            <strong>Children at Risk:</strong> An estimated 932+ children are impacted by their parents' recovery journey, with 69+ in high-risk situations requiring immediate family support services.
          </div>
        </div>
        
        <div className="key-metrics" style={{ marginBottom: '2rem' }}>
          <div className="metric-card">
            <span className="metric-trend trend-down">⬇</span>
            <div className="metric-value" style={{ color: '#9f7aea' }}>21.5%</div>
            <div className="metric-label">Treated for Abuse</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '21.5%', background: 'linear-gradient(90deg, #9f7aea, #b794f4)' }}></div>
            </div>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-neutral">➡</span>
            <div className="metric-value" style={{ color: '#667eea' }}>932+</div>
            <div className="metric-label">Children Impacted</div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Based on 444 likely parents</p>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-down">⬇</span>
            <div className="metric-value" style={{ color: '#9f7aea' }}>30.0%</div>
            <div className="metric-label">Father Absent</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '30%', background: 'linear-gradient(90deg, #9f7aea, #b794f4)' }}></div>
            </div>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-down">⬇</span>
            <div className="metric-value" style={{ color: '#9f7aea' }}>20.8%</div>
            <div className="metric-label">Poor Family Relations</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '20.8%', background: 'linear-gradient(90deg, #9f7aea, #b794f4)' }}></div>
            </div>
          </div>
        </div>
        
        <div className="insights-grid">
          <div className="insight-card">
            <h3>🔍 Intergenerational Trauma Patterns</h3>
            <ul>
              <li>
                <span>Abuse History</span>
                <span className="badge critical">337 clients</span>
              </li>
              <li>
                <span>Absent Father + Abuse</span>
                <span className="badge warning">106 clients</span>
              </li>
              <li>
                <span>% with Absent Fathers Abused</span>
                <span className="badge critical">22.6%</span>
              </li>
              <li>
                <span>Abuse + Poor Family Relations</span>
                <span className="badge warning">109 clients</span>
              </li>
            </ul>
          </div>
          
          <div className="insight-card">
            <h3>👨‍👩‍👧‍👦 Family System Health</h3>
            <ul>
              <li>
                <span>Good/Excellent Relations</span>
                <span className="badge success">48.8%</span>
              </li>
              <li>
                <span>Poor/Terrible Relations</span>
                <span className="badge critical">20.8%</span>
              </li>
              <li>
                <span>Father Present in Childhood</span>
                <span className="badge">69.6%</span>
              </li>
              <li>
                <span>High-Risk Parent Situations</span>
                <span className="badge critical">33 families</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="chart-container" style={{ marginTop: '2rem' }}>
          <canvas id="traumaChart"></canvas>
        </div>
      </div>
      
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Comprehensive Abuse & Trauma Analysis</h2>
        </div>
        
        <div className="alert-box" style={{ background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)', borderColor: '#9f7aea' }}>
          <span className="alert-icon" style={{ color: '#9f7aea' }}>⚡</span>
          <div>
            <strong>Critical Finding:</strong> 513 clients (32.7%) have documented abuse histories, but only 337 (21.5%) received treatment. This represents 176 abuse survivors with unmet trauma treatment needs.
          </div>
        </div>
        
        <div className="key-metrics" style={{ marginBottom: '2rem' }}>
          <div className="metric-card">
            <span className="metric-trend trend-down">⬇</span>
            <div className="metric-value" style={{ color: '#9f7aea' }}>32.7%</div>
            <div className="metric-label">Documented Abuse History</div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>513 total clients</p>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-down">⬇</span>
            <div className="metric-value" style={{ color: '#9f7aea' }}>176</div>
            <div className="metric-label">Treatment Gap</div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Untreated abuse survivors</p>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-down">⬇</span>
            <div className="metric-value" style={{ color: '#9f7aea' }}>82.8%</div>
            <div className="metric-label">Multiple Trauma Types</div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Of abuse survivors</p>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-down">⬇</span>
            <div className="metric-value" style={{ color: '#9f7aea' }}>275</div>
            <div className="metric-label">Severe Cases</div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>3+ types of abuse</p>
          </div>
        </div>
        
        <div className="insights-grid">
          <div className="insight-card">
            <h3>📊 Abuse Type Prevalence</h3>
            <ul>
              <li>
                <span>Verbal Abuse</span>
                <span className="badge critical">428 (27.3%)</span>
              </li>
              <li>
                <span>Physical Abuse</span>
                <span className="badge critical">427 (27.2%)</span>
              </li>
              <li>
                <span>Sexual Abuse</span>
                <span className="badge critical">305 (19.5%)</span>
              </li>
              <li>
                <span>Rape</span>
                <span className="badge critical">185 (11.8%)</span>
              </li>
              <li>
                <span>Incest</span>
                <span className="badge warning">59 (3.8%)</span>
              </li>
            </ul>
          </div>
          
          <div className="insight-card">
            <h3>⚠️ Treatment Coverage Analysis</h3>
            <ul>
              <li>
                <span>Abuse Survivors Identified</span>
                <span className="badge">513 clients</span>
              </li>
              <li>
                <span>Received Treatment</span>
                <span className="badge warning">337 (65.7%)</span>
              </li>
              <li>
                <span>No Treatment</span>
                <span className="badge critical">176 (34.3%)</span>
              </li>
              <li>
                <span>Treatment Coverage Rate</span>
                <span className="badge warning">65.7%</span>
              </li>
            </ul>
          </div>
          
          <div className="insight-card">
            <h3>🔄 Trauma Complexity Patterns</h3>
            <ul>
              <li>
                <span>Single Type of Abuse</span>
                <span className="badge">88 (17.2%)</span>
              </li>
              <li>
                <span>2 Types of Abuse</span>
                <span className="badge warning">150 (29.2%)</span>
              </li>
              <li>
                <span>3+ Types of Abuse</span>
                <span className="badge critical">275 (53.6%)</span>
              </li>
              <li>
                <span>Most Common Pattern</span>
                <span style={{ fontSize: '0.85rem' }}>Physical + Verbal + Sexual</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="chart-container" style={{ marginTop: '2rem' }}>
          <canvas id="abuseTypesChart"></canvas>
        </div>
      </div>
    </>
  );
};
