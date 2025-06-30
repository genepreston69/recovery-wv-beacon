
import React, { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const Statistics = () => {
  useEffect(() => {
    // Load Chart.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
    script.onload = () => {
      initializeCharts();
      animateMetrics();
      setupInteractivity();
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initializeCharts = () => {
    // @ts-ignore
    const Chart = window.Chart;
    if (!Chart) return;

    // Chart configurations with recovery colors
    Chart.defaults.color = '#64748b';
    Chart.defaults.borderColor = '#e2e8f0';
    
    // LOS Chart
    const losCtx = (document.getElementById('losChart') as HTMLCanvasElement)?.getContext('2d');
    if (losCtx) {
      new Chart(losCtx, {
        type: 'bar',
        data: {
          labels: ['0-7 Days', '8-30 Days', '31-60 Days', '61-90 Days', 'Over 90 Days'],
          datasets: [{
            label: 'Number of Clients',
            data: [1701, 1473, 907, 843, 2031],
            backgroundColor: [
              'rgba(159, 122, 234, 0.8)',
              'rgba(159, 122, 234, 0.8)',
              'rgba(102, 126, 234, 0.8)',
              'rgba(102, 126, 234, 0.8)',
              'rgba(76, 81, 191, 0.8)'
            ],
            borderRadius: 8,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Client Retention by Length of Stay',
              font: { size: 16, weight: 'normal' },
              padding: { bottom: 20 }
            },
            tooltip: {
              callbacks: {
                label: function(context: any) {
                  const value = context.parsed.y;
                  const percentage = ((value / 6955) * 100).toFixed(1);
                  return `${value} clients (${percentage}%)`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 2500,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                callback: function(value: any) {
                  return value.toLocaleString();
                }
              }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    }
    
    // Legal Status Chart
    const legalCtx = (document.getElementById('legalChart') as HTMLCanvasElement)?.getContext('2d');
    if (legalCtx) {
      new Chart(legalCtx, {
        type: 'bar',
        data: {
          labels: ['On Probation/Parole', 'Pending Charges', 'Legal Actions Against'],
          datasets: [{
            label: 'Percentage of Clients',
            data: [50.0, 36.6, 13.8],
            backgroundColor: [
              'rgba(76, 81, 191, 0.8)',
              'rgba(102, 126, 234, 0.8)',
              'rgba(76, 81, 191, 0.8)'
            ],
            borderRadius: 8,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Current Legal Status',
              font: { size: 16, weight: 'normal' },
              padding: { bottom: 20 }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function(value: any) {
                  return value + '%';
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    }
    
    // Quality of Life Chart
    const qolCtx = (document.getElementById('qolChart') as HTMLCanvasElement)?.getContext('2d');
    if (qolCtx) {
      new Chart(qolCtx, {
        type: 'radar',
        data: {
          labels: [
            'Mental Health',
            'Overall Health',
            'Recovery Support',
            'Financial Security',
            'Living Conditions',
            'Education/Skills'
          ],
          datasets: [{
            label: 'Good/Excellent',
            data: [52.7, 64.4, 83.4, 29.5, 69.0, 50],
            borderColor: 'rgba(76, 81, 191, 0.8)',
            backgroundColor: 'rgba(76, 81, 191, 0.2)',
            pointBackgroundColor: 'rgba(76, 81, 191, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(76, 81, 191, 1)'
          }, {
            label: 'Poor/Terrible',
            data: [13.2, 8.1, 6.4, 36.4, 12.7, 25],
            borderColor: 'rgba(159, 122, 234, 0.8)',
            backgroundColor: 'rgba(159, 122, 234, 0.2)',
            pointBackgroundColor: 'rgba(159, 122, 234, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(159, 122, 234, 1)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Quality of Life Indicators',
              font: { size: 16, weight: 'normal' },
              padding: { bottom: 20 }
            }
          },
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 20,
                callback: function(value: any) {
                  return value + '%';
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              angleLines: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          }
        }
      });
    }
  };

  const animateMetrics = () => {
    // Animated counter effect
    function animateValue(element: HTMLElement, start: number, end: number, duration: number, suffix = '') {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = progress * (end - start) + start;
        
        if (suffix === '%' || suffix === '+') {
          element.textContent = Math.floor(currentValue) + suffix;
        } else {
          element.textContent = currentValue.toFixed(1) + suffix;
        }
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
    
    // Animate metric values on load
    setTimeout(() => {
      document.querySelectorAll('.metric-value').forEach(el => {
        const element = el as HTMLElement;
        const text = element.textContent || '';
        const value = parseFloat(text);
        
        if (!isNaN(value)) {
          if (text.includes('%')) {
            element.textContent = '0%';
            setTimeout(() => animateValue(element, 0, value, 1500, '%'), 300);
          } else if (text.includes('+')) {
            element.textContent = '0+';
            setTimeout(() => animateValue(element, 0, value, 1500, '+'), 300);
          } else {
            element.textContent = '0.0';
            setTimeout(() => animateValue(element, 0, value, 1500, ''), 300);
          }
        }
      });
    }, 100);
  };

  const setupInteractivity = () => {
    // Interactive features
    document.querySelectorAll('.metric-card').forEach(card => {
      const cardElement = card as HTMLElement;
      cardElement.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    });
    
    // Export functionality (placeholder)
    const actionButton = document.querySelector('.action-button') as HTMLElement;
    if (actionButton) {
      actionButton.addEventListener('click', () => {
        alert('Report export functionality would be implemented here. This would generate a comprehensive PDF report with all dashboard data and insights.');
      });
    }
  };

  return (
    <ProtectedRoute>
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
        
        .header h1 {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(45deg, #4c51bf, #667eea, #9f7aea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .metric-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(79, 70, 229, 0.2);
          border-color: #667eea;
        }
        
        .metric-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #4c51bf, #667eea, #9f7aea);
          transform: scaleX(0);
          transition: transform 0.3s ease;
          transform-origin: left;
        }
        
        .metric-card:hover::before {
          transform: scaleX(1);
        }
        
        .metric-value {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #4c51bf;
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
        
        .trend-up { color: #4c51bf; }
        .trend-down { color: #9f7aea; }
        .trend-neutral { color: #667eea; }
        
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
        
        .action-button {
          background: linear-gradient(135deg, #4c51bf, #667eea);
          color: white;
          border: none;
          padding: 0.7rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }
        
        .action-button:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
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
        
        .risk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .risk-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .risk-card.high {
          border-color: #9f7aea;
          background: linear-gradient(135deg, #ffffff, #faf5ff);
        }
        
        .risk-card.medium {
          border-color: #667eea;
          background: linear-gradient(135deg, #ffffff, #f0f4ff);
        }
        
        .risk-card.low {
          border-color: #4c51bf;
          background: linear-gradient(135deg, #ffffff, #ebf4ff);
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 0.5rem;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4c51bf, #667eea);
          transition: width 0.5s ease;
          border-radius: 4px;
        }
        
        .alert-box {
          background: linear-gradient(135deg, #faf5ff, #f3e8ff);
          border: 1px solid #9f7aea;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .alert-icon {
          font-size: 2rem;
          color: #9f7aea;
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
          color: #4c51bf;
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
        
        .badge.critical { background: #9f7aea; color: white; }
        .badge.warning { background: #667eea; color: white; }
        .badge.success { background: #4c51bf; color: white; }
        
        @media (max-width: 768px) {
          .dashboard { padding: 1rem; }
          .header h1 { font-size: 2rem; }
          .metric-value { font-size: 2rem; }
          .key-metrics { grid-template-columns: 1fr; }
        }
      `}</style>
      
      <div className="dashboard-content">
        <div className="dashboard">
          <div className="header">
            <div style={{ marginBottom: '2rem' }}>
              <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" 
                alt="Recovery Point West Virginia" 
                style={{ maxWidth: '400px', height: 'auto', margin: '0 auto', display: 'block' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const textLogo = document.getElementById('text-logo');
                  if (textLogo) textLogo.style.display = 'block';
                }}
              />
              <div id="text-logo" style={{ display: 'none', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2d3748', marginBottom: 0 }}>
                  RECOVERY<span style={{ color: '#4c51bf' }}>POINT</span>
                </h2>
                <p style={{ color: '#4c51bf', fontSize: '1.2rem', letterSpacing: '0.3em', marginTop: '-0.5rem' }}>
                  WEST VIRGINIA
                </p>
              </div>
            </div>
            <h1>Long-Term Recovery Dashboard</h1>
            <p className="subtitle">Comprehensive Client Analysis | 7,232 Total Clients</p>
            <p style={{ color: '#94a3b8' }}>Data Analysis Date: June 30, 2025</p>
          </div>
          
          <div style={{ background: 'linear-gradient(135deg, #ebf4ff, #f0f4f8)', border: '1px solid #4c51bf', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#2d3748', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
              <strong>Data Collection Methodology:</strong> This comprehensive analysis is based on data gathered through intake assessments at admission and ongoing surveys conducted throughout each client's recovery journey. The information represents a holistic view of our clients' needs, progress, and outcomes during their time in our long-term recovery program.
            </p>
          </div>

          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Executive Insights & Key Findings</h2>
            </div>
            
            <div style={{ background: 'linear-gradient(135deg, #ebf4ff, #f0f4f8)', border: '2px solid #4c51bf', borderRadius: '12px', padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ color: '#4c51bf', marginBottom: '1rem' }}>📊 Data-Driven Discoveries from 7,232 Client Records</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #9f7aea' }}>
                  <strong style={{ color: '#9f7aea' }}>🚨 Retention Crisis:</strong> Nearly half (45.6%) of clients leave within 30 days, with 1 in 4 departing in the first week. This early attrition represents the single greatest challenge to program effectiveness.
                </div>
                <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
                  <strong style={{ color: '#667eea' }}>⏱️ Success Threshold:</strong> Clients who stay beyond 30 days average 146.6 days in treatment, suggesting a critical stabilization period that dramatically improves long-term outcomes.
                </div>
                <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #4c51bf' }}>
                  <strong style={{ color: '#4c51bf' }}>🔄 Intergenerational Impact:</strong> 7.1% have siblings with addiction issues, and 12.2% have recent arrests, highlighting the complex family and legal challenges facing recovery.
                </div>
                <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #9f7aea' }}>
                  <strong style={{ color: '#9f7aea' }}>💡 Strategic Opportunity:</strong> The 54.4% who stay beyond 30 days show strong engagement. Investing in first-month retention could potentially help 3,174 additional clients annually.
                </div>
                <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #9f7aea' }}>
                  <strong style={{ color: '#9f7aea' }}>🧠 Trauma Prevalence:</strong> Among the 1,207 clients surveyed about abuse, 1 in 3 (33.6%) reported abuse histories, with 40.2% of survivors lacking treatment - highlighting the need for universal trauma screening.
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Length of Stay (LOS) Analysis</h2>
            </div>
            
            <div className="key-metrics" style={{ marginBottom: '2rem' }}>
              <div className="metric-card">
                <span className="metric-trend trend-down">⬇</span>
                <div className="metric-value" style={{ color: '#9f7aea' }}>24.5%</div>
                <div className="metric-label">Leave Within 7 Days</div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>1,701 clients</p>
              </div>
              
              <div className="metric-card">
                <span className="metric-trend trend-down">⬇</span>
                <div className="metric-value" style={{ color: '#9f7aea' }}>45.6%</div>
                <div className="metric-label">Leave Within 30 Days</div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>3,174 clients</p>
              </div>
              
              <div className="metric-card">
                <span className="metric-trend trend-up">⬆</span>
                <div className="metric-value" style={{ color: '#4c51bf' }}>146.6</div>
                <div className="metric-label">Avg Days (30+ Day Stays)</div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>3,781 clients</p>
              </div>
              
              <div className="metric-card">
                <span className="metric-trend trend-neutral">➡</span>
                <div className="metric-value" style={{ color: '#667eea' }}>29.2%</div>
                <div className="metric-label">Stay Over 90 Days</div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>2,031 clients</p>
              </div>
            </div>
            
            <div className="chart-container">
              <canvas id="losChart"></canvas>
            </div>
            
            <div className="insights-grid" style={{ marginTop: '2rem' }}>
              <div className="insight-card">
                <h3>📊 Retention Breakdown</h3>
                <ul>
                  <li>
                    <span>Week 1 Departures</span>
                    <span className="badge critical">1,701 (24.5%)</span>
                  </li>
                  <li>
                    <span>Days 8-30</span>
                    <span className="badge warning">1,473 (21.2%)</span>
                  </li>
                  <li>
                    <span>Days 31-60</span>
                    <span className="badge">907 (13.0%)</span>
                  </li>
                  <li>
                    <span>Days 61-90</span>
                    <span className="badge">843 (12.1%)</span>
                  </li>
                  <li>
                    <span>Over 90 Days</span>
                    <span className="badge success">2,031 (29.2%)</span>
                  </li>
                </ul>
              </div>
              
              <div className="insight-card">
                <h3>🎯 Critical Insights</h3>
                <ul>
                  <li>
                    <span>Early Crisis Period</span>
                    <span style={{ fontSize: '0.85rem' }}>First 30 days</span>
                  </li>
                  <li>
                    <span>Retention Rate (30+ days)</span>
                    <span className="badge">54.4%</span>
                  </li>
                  <li>
                    <span>Long-term Success Rate</span>
                    <span className="badge success">29.2%</span>
                  </li>
                  <li>
                    <span>Average Full Program LOS</span>
                    <span className="badge">146.6 days</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="alert-box">
            <span className="alert-icon">⚠️</span>
            <div>
              <strong>Critical Retention Challenge:</strong> 45.6% of clients leave within 30 days, with 24.5% departing in the first week. Early intervention and engagement strategies are urgently needed.
            </div>
          </div>
          
          <div className="key-metrics">
            <div className="metric-card">
              <span className="metric-trend trend-down">⬇</span>
              <div className="metric-value">24.9%</div>
              <div className="metric-label">High-Risk Clients</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '24.9%' }}></div>
              </div>
            </div>
            
            <div className="metric-card">
              <span className="metric-trend trend-up">⬆</span>
              <div className="metric-value">59.6%</div>
              <div className="metric-label">Stable Housing</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '59.6%' }}></div>
              </div>
            </div>
            
            <div className="metric-card">
              <span className="metric-trend trend-neutral">➡</span>
              <div className="metric-value">83.4%</div>
              <div className="metric-label">Supportive Recovery</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '83.4%' }}></div>
              </div>
            </div>
            
            <div className="metric-card">
              <span className="metric-trend trend-down">⬇</span>
              <div className="metric-value">50.0%</div>
              <div className="metric-label">On Probation/Parole</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
          
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
          
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Legal System Involvement</h2>
            </div>
            
            <div className="chart-container">
              <canvas id="legalChart"></canvas>
            </div>
          </div>
          
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Quality of Life Assessment</h2>
            </div>
            
            <p style={{ color: '#64748b', fontStyle: 'italic', marginBottom: '1rem', textAlign: 'center' }}>
              Based on client survey after 90 days of residency.
            </p>
            
            <div className="chart-container">
              <canvas id="qolChart"></canvas>
            </div>
          </div>
          
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
          
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Trauma & Family Impact Analysis</h2>
            </div>
            
            <div className="alert-box" style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderColor: '#f59e0b' }}>
              <span className="alert-icon" style={{ color: '#f59e0b' }}>👨‍👩‍👧‍👦</span>
              <div>
                <strong>Children at Risk:</strong> Updated analysis shows thousands of children impacted by their parents' recovery journey. Comprehensive family support services are essential for breaking intergenerational cycles.
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
          </div>
          
          <div className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Comprehensive Abuse & Trauma Analysis</h2>
                <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', margin: 0 }}>Based on 1,207 clients surveyed (16.7% of total population)</p>
              </div>
            </div>
            
            <div className="alert-box" style={{ background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)', borderColor: '#9f7aea' }}>
              <span className="alert-icon" style={{ color: '#9f7aea' }}>⚡</span>
              <div>
                <strong>Critical Finding:</strong> Among 1,207 clients surveyed about abuse, 405 (33.6%) have documented abuse histories, but only 242 (20.0%) received treatment. This represents 163 abuse survivors with unmet trauma treatment needs.
              </div>
            </div>
            
            <div className="key-metrics" style={{ marginBottom: '2rem' }}>
              <div className="metric-card">
                <span className="metric-trend trend-down">⬇</span>
                <div className="metric-value" style={{ color: '#9f7aea' }}>33.6%</div>
                <div className="metric-label">Documented Abuse History</div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>405 of 1,207 surveyed</p>
              </div>
              
              <div className="metric-card">
                <span className="metric-trend trend-down">⬇</span>
                <div className="metric-value" style={{ color: '#9f7aea' }}>163</div>
                <div className="metric-label">Treatment Gap</div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Untreated abuse survivors</p>
              </div>
              
              <div className="metric-card">
                <span className="metric-trend trend-down">⬇</span>
                <div className="metric-value" style={{ color: '#9f7aea' }}>59.8%</div>
                <div className="metric-label">Treatment Coverage</div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Of abuse survivors</p>
              </div>
              
              <div className="metric-card">
                <span className="metric-trend trend-neutral">➡</span>
                <div className="metric-value" style={{ color: '#9f7aea' }}>242</div>
                <div className="metric-label">Received Treatment</div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>20.0% of surveyed</p>
              </div>
            </div>
            
            <div className="insights-grid">
              <div className="insight-card">
                <h3>⚠️ Treatment Coverage Analysis</h3>
                <ul>
                  <li>
                    <span>Clients Surveyed About Abuse</span>
                    <span className="badge">1,207 clients</span>
                  </li>
                  <li>
                    <span>Abuse Survivors Identified</span>
                    <span className="badge critical">405 (33.6%)</span>
                  </li>
                  <li>
                    <span>Received Treatment</span>
                    <span className="badge warning">242 (59.8%)</span>
                  </li>
                  <li>
                    <span>No Treatment</span>
                    <span className="badge critical">163 (40.2%)</span>
                  </li>
                  <li>
                    <span>Sample Size Note</span>
                    <span style={{ fontSize: '0.85rem' }}>1,207 of 7,232</span>
                  </li>
                </ul>
              </div>
              
              <div className="insight-card">
                <h3>📊 Key Abuse Findings</h3>
                <ul>
                  <li>
                    <span>Prevalence Rate</span>
                    <span className="badge critical">1 in 3 surveyed</span>
                  </li>
                  <li>
                    <span>Treatment Gap</span>
                    <span className="badge critical">40.2% untreated</span>
                  </li>
                  <li>
                    <span>Trauma-Informed Need</span>
                    <span className="badge warning">High Priority</span>
                  </li>
                  <li>
                    <span>Screening Coverage</span>
                    <span className="badge">16.7% of clients</span>
                  </li>
                  <li>
                    <span>Recommendation</span>
                    <span style={{ fontSize: '0.85rem' }}>Universal screening</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Strategic Recommendations</h2>
            </div>
            
            <div className="insights-grid">
              <div className="insight-card">
                <h3>🎯 Immediate Actions</h3>
                <ul>
                  <li>
                    <span>First-Week Retention Program</span>
                    <span className="badge critical">URGENT</span>
                  </li>
                  <li>
                    <span>30-Day Engagement Strategy</span>
                    <span className="badge critical">URGENT</span>
                  </li>
                  <li>
                    <span>Trauma-Informed Care Training</span>
                    <span className="badge critical">URGENT</span>
                  </li>
                  <li>
                    <span>Family Addiction Services</span>
                    <span className="badge warning">HIGH</span>
                  </li>
                  <li>
                    <span>Mental Health Provider Expansion</span>
                    <span className="badge warning">HIGH</span>
                  </li>
                  <li>
                    <span>Criminal Justice Partnership</span>
                    <span className="badge warning">HIGH</span>
                  </li>
                </ul>
              </div>
              
              <div className="insight-card">
                <h3>📊 Program Enhancements</h3>
                <ul>
                  <li>
                    <span>Integrated MH Services</span>
                    <span>48.7% need</span>
                  </li>
                  <li>
                    <span>Family Reunification Program</span>
                    <span>932+ children</span>
                  </li>
                  <li>
                    <span>Parenting Skills Track</span>
                    <span>444 parents</span>
                  </li>
                  <li>
                    <span>Intergenerational Healing</span>
                    <span>337 trauma cases</span>
                  </li>
                  <li>
                    <span>Legal Aid Partnership</span>
                    <span>50% affected</span>
                  </li>
                  <li>
                    <span>Veterans-Specific Track</span>
                    <span>162 clients</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Statistics;
