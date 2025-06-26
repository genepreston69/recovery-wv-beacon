import React, { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';

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
      document.head.removeChild(script);
    };
  }, []);

  const initializeCharts = () => {
    // @ts-ignore
    const Chart = window.Chart;
    if (!Chart) return;

    // Chart configurations with recovery colors
    Chart.defaults.color = '#64748b';
    Chart.defaults.borderColor = '#e2e8f0';
    
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
    
    // Trauma and Family Impact Chart
    const traumaCtx = (document.getElementById('traumaChart') as HTMLCanvasElement)?.getContext('2d');
    if (traumaCtx) {
      new Chart(traumaCtx, {
        type: 'doughnut',
        data: {
          labels: [
            'Treated for Abuse (337)',
            'No Abuse Treatment (1,182)',
            'Unknown (49)'
          ],
          datasets: [{
            data: [337, 1182, 49],
            backgroundColor: [
              'rgba(159, 122, 234, 0.8)',
              'rgba(76, 81, 191, 0.8)',
              'rgba(226, 232, 240, 0.8)'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Abuse Treatment History Among Clients',
              font: { size: 16, weight: 'normal' },
              padding: { bottom: 20 }
            },
            legend: {
              position: 'bottom',
              labels: {
                padding: 15,
                font: { size: 12 }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context: any) {
                  const label = context.label || '';
                  const value = context.parsed;
                  const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return label + ': ' + percentage + '%';
                }
              }
            }
          }
        }
      });
    }
    
    // Abuse Types Chart
    const abuseTypesCtx = (document.getElementById('abuseTypesChart') as HTMLCanvasElement)?.getContext('2d');
    if (abuseTypesCtx) {
      new Chart(abuseTypesCtx, {
        type: 'bar',
        data: {
          labels: ['Verbal Abuse', 'Physical Abuse', 'Sexual Abuse', 'Rape', 'Incest'],
          datasets: [{
            label: 'Number of Clients',
            data: [428, 427, 305, 185, 59],
            backgroundColor: [
              'rgba(159, 122, 234, 0.8)',
              'rgba(159, 122, 234, 0.8)',
              'rgba(102, 126, 234, 0.8)',
              'rgba(76, 81, 191, 0.8)',
              'rgba(76, 81, 191, 0.8)'
            ],
            borderRadius: 8,
            borderWidth: 0
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Types of Abuse Experienced by Clients',
              font: { size: 16, weight: 'normal' },
              padding: { bottom: 20 }
            },
            tooltip: {
              callbacks: {
                label: function(context: any) {
                  const value = context.parsed.x;
                  const percentage = ((value / 1568) * 100).toFixed(1);
                  return `${value} clients (${percentage}%)`;
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              max: 500,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            y: {
              grid: { display: false }
            }
          }
        }
      });
    }
  };

  const animateMetrics = () => {
    // Animated counter effect
    function animateValue(element: HTMLElement, start: number, end: number, duration: number, isPercentage = true) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = isPercentage ? currentValue + '%' : currentValue + '+';
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
        const isPercentage = text.includes('%');
        const value = parseFloat(text);
        
        if (!isNaN(value)) {
          if (isPercentage) {
            element.textContent = '0%';
            setTimeout(() => animateValue(element, 0, value, 1500, true), 300);
          } else if (text.includes('+')) {
            element.textContent = '0+';
            setTimeout(() => animateValue(element, 0, value, 1500, false), 300);
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
    <>
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
        
        .loading {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid #e2e8f0;
          border-top-color: #4c51bf;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <div className="dashboard-content">
        <div className="dashboard">
          <div className="header">
            <div style={{ marginBottom: '2rem' }}>
              <img 
                src="https://pvxbkqdeyrhuumjtwgzm.supabase.co/storage/v1/object/public/story-images//RPWV%20Logo%20with%20transparent%20background.png" 
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
            <p className="subtitle">Comprehensive Client Analysis | 1,568 Total Clients</p>
            <p style={{ color: '#94a3b8' }}>Data Analysis Date: June 26, 2025</p>
          </div>
          
          <div style={{ background: 'linear-gradient(135deg, #ebf4ff, #f0f4f8)', border: '1px solid #4c51bf', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#2d3748', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
              <strong>Data Collection Methodology:</strong> This comprehensive analysis is based on data gathered through intake assessments at admission and ongoing surveys conducted throughout each client's recovery journey. The information represents a holistic view of our clients' needs, progress, and outcomes during their time in our long-term recovery program.
            </p>
          </div>
          
          <div className="alert-box">
            <span className="alert-icon">⚠️</span>
            <div>
              <strong>Critical Action Required:</strong> 763 clients (48.7%) need mental health providers but don't have one. This represents our most significant service gap.
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
          
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Strategic Recommendations</h2>
            </div>
            
            <div className="insights-grid">
              <div className="insight-card">
                <h3>🎯 Immediate Actions</h3>
                <ul>
                  <li>
                    <span>Trauma-Informed Care Training</span>
                    <span className="badge critical">URGENT</span>
                  </li>
                  <li>
                    <span>Expand Trauma Treatment</span>
                    <span className="badge critical">URGENT</span>
                  </li>
                  <li>
                    <span>Mental Health Provider Recruitment</span>
                    <span className="badge critical">URGENT</span>
                  </li>
                  <li>
                    <span>Family Support Services</span>
                    <span className="badge critical">URGENT</span>
                  </li>
                  <li>
                    <span>Screen 176 Untreated Survivors</span>
                    <span className="badge warning">HIGH</span>
                  </li>
                  <li>
                    <span>Housing Stabilization Initiative</span>
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
    </>
  );
};

export default Statistics;
