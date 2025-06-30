
import React, { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { AzureProtectedRoute } from '@/components/auth/AzureProtectedRoute';

const LOSAnalysis = () => {
  useEffect(() => {
    // Load Chart.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
    script.onload = () => {
      initializeCharts();
      animateMetrics();
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

    // Chart configurations
    Chart.defaults.color = '#64748b';
    Chart.defaults.borderColor = '#e2e8f0';
    
    // Stratification Chart
    const stratificationCtx = (document.getElementById('stratificationChart') as HTMLCanvasElement)?.getContext('2d');
    if (stratificationCtx) {
      new Chart(stratificationCtx, {
        type: 'doughnut',
        data: {
          labels: [
            '0-7 Days (1,701)',
            '8-30 Days (1,473)',
            '31-60 Days (907)',
            '61-90 Days (843)',
            'Over 90 Days (2,031)'
          ],
          datasets: [{
            data: [1701, 1473, 907, 843, 2031],
            backgroundColor: [
              'rgba(159, 122, 234, 0.8)',
              'rgba(159, 122, 234, 0.6)',
              'rgba(102, 126, 234, 0.8)',
              'rgba(102, 126, 234, 0.6)',
              'rgba(76, 81, 191, 0.8)'
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
              text: 'Client Distribution by Length of Stay',
              font: { size: 16, weight: 'normal' },
              padding: { bottom: 20 }
            },
            legend: {
              position: 'right',
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
    
    // Facility Comparison Chart
    const facilityCtx = (document.getElementById('facilityChart') as HTMLCanvasElement)?.getContext('2d');
    if (facilityCtx) {
      new Chart(facilityCtx, {
        type: 'bar',
        data: {
          labels: ['RPB', 'RPC', 'RPP', 'RPH', 'Point Apartments'],
          datasets: [{
            label: '7-Day Departure Rate',
            data: [11.1, 31.8, 21.8, 24.8, 19.7],
            backgroundColor: 'rgba(159, 122, 234, 0.8)',
            borderRadius: 8,
            borderWidth: 0
          }, {
            label: '30-Day Retention Rate',
            data: [69.9, 49.6, 56.0, 51.5, 58.3],
            backgroundColor: 'rgba(76, 81, 191, 0.8)',
            borderRadius: 8,
            borderWidth: 0
          }, {
            label: '90+ Day Success Rate',
            data: [39.4, 34.0, 27.4, 22.0, 33.1],
            backgroundColor: 'rgba(102, 126, 234, 0.8)',
            borderRadius: 8,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Retention Metrics by Facility (%)',
              font: { size: 16, weight: 'normal' },
              padding: { bottom: 20 }
            },
            tooltip: {
              callbacks: {
                label: function(context: any) {
                  return context.dataset.label + ': ' + context.parsed.y + '%';
                }
              }
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
    
    // LOS Distribution Chart
    const distributionCtx = (document.getElementById('distributionChart') as HTMLCanvasElement)?.getContext('2d');
    if (distributionCtx) {
      new Chart(distributionCtx, {
        type: 'line',
        data: {
          labels: ['0-7 Days', '8-30 Days', '31-60 Days', '61-90 Days', '91-180 Days', '180+ Days'],
          datasets: [{
            label: 'RPB (Best)',
            data: [11.1, 20.0, 15.8, 13.7, 25.4, 14.0],
            borderColor: 'rgba(76, 81, 191, 1)',
            backgroundColor: 'rgba(76, 81, 191, 0.1)',
            tension: 0.4
          }, {
            label: 'RPC (Women\'s Facility)',
            data: [31.8, 18.6, 9.2, 6.4, 16.5, 17.5],
            borderColor: 'rgba(159, 122, 234, 1)',
            backgroundColor: 'rgba(159, 122, 234, 0.1)',
            tension: 0.4
          }, {
            label: 'All Facilities',
            data: [24.5, 21.2, 13.0, 12.1, 17.8, 11.4],
            borderColor: 'rgba(102, 126, 234, 1)',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            tension: 0.4,
            borderDash: [5, 5]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Client Distribution by Length of Stay',
              font: { size: 16, weight: 'normal' },
              padding: { bottom: 20 }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 40,
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
  };

  const animateMetrics = () => {
    // Animated counter effect
    function animateValue(element: HTMLElement, start: number, end: number, duration: number, suffix = '') {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = progress * (end - start) + start;
        
        if (suffix === '%') {
          element.textContent = Math.floor(currentValue) + suffix;
        } else if (end > 999) {
          // Format large numbers with comma
          element.textContent = Math.floor(currentValue).toLocaleString() + suffix;
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
        const value = parseFloat(text.replace(/,/g, ''));
        
        if (!isNaN(value)) {
          if (text.includes('%')) {
            element.textContent = '0%';
            setTimeout(() => animateValue(element, 0, value, 1500, '%'), 300);
          } else {
            element.textContent = '0';
            setTimeout(() => animateValue(element, 0, value, 1500, ''), 300);
          }
        }
      });
      
      // Animate progress bars
      document.querySelectorAll('.progress-fill').forEach(el => {
        const element = el as HTMLElement;
        const width = element.style.width;
        element.style.width = '0%';
        setTimeout(() => {
          element.style.width = width;
        }, 300);
      });
    }, 100);
  };

  return (
    <AzureProtectedRoute>
      <Navigation />
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
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
        
        .facility-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .facility-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .facility-card.best {
          border-color: #4c51bf;
          background: linear-gradient(135deg, #ffffff, #ebf4ff);
        }
        
        .facility-card.concern {
          border-color: #9f7aea;
          background: linear-gradient(135deg, #ffffff, #faf5ff);
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
          background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
          border: 1px solid #4c51bf;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .alert-icon {
          font-size: 2rem;
          color: #4c51bf;
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
      
      <div className="dashboard">
        <div className="header">
          <div style={{ marginBottom: '2rem' }}>
            <div id="text-logo" style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2d3748', marginBottom: 0 }}>
                RECOVERY<span style={{ color: '#4c51bf' }}>POINT</span>
              </h2>
              <p style={{ color: '#4c51bf', fontSize: '1.2rem', letterSpacing: '0.3em', marginTop: '-0.5rem' }}>
                WEST VIRGINIA
              </p>
              <div style={{ background: 'linear-gradient(135deg, #ebf4ff, #f0f4f8)', border: '2px solid #4c51bf', borderRadius: '12px', padding: '1.5rem', marginTop: '2rem' }}>
                <h3 style={{ color: '#4c51bf', marginBottom: '1rem' }}>📈 Bottom Line Impact</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                  <strong>The Opportunity:</strong> If all facilities achieved RPB's 11.1% early departure rate instead of the current 24.5%, Recovery Point would retain an additional <strong>1,220 clients</strong> past the critical first week. With an average stay of 146.6 days for those who make it past 30 days, this represents approximately <strong>178,932 additional treatment days</strong> annually - transforming both lives and organizational sustainability.
                </p>
              </div>
            </div>
          </div>
          <h1>Length of Stay Analysis by Facility</h1>
          <p className="subtitle">Comprehensive Retention Analysis | 7,279 Total Clients</p>
          <p style={{ color: '#94a3b8' }}>Data Analysis Date: June 30, 2025</p>
        </div>
        
        <div style={{ background: 'linear-gradient(135deg, #ebf4ff, #f0f4f8)', border: '1px solid #4c51bf', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#2d3748', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
            <strong>Analysis Overview:</strong> This dashboard examines Length of Stay (LOS) patterns across all Recovery Point facilities, revealing significant performance variations and opportunities for targeted retention improvements.
          </p>
        </div>
        
        <div className="alert-box">
          <span className="alert-icon">📊</span>
          <div>
            <strong>Key Finding:</strong> Facility RPB demonstrates best-in-class retention with only 11.1% early departures and 69.9% staying beyond 30 days, while RPC shows concerning patterns with 31.8% leaving within the first week.
          </div>
        </div>
        
        <div className="key-metrics">
          <div className="metric-card">
            <span className="metric-trend trend-neutral">➡</span>
            <div className="metric-value">82.1</div>
            <div className="metric-label">Average LOS (Days)</div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Across all facilities</p>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-down">⬇</span>
            <div className="metric-value">24.5%</div>
            <div className="metric-label">Early Departure Rate</div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Leave within 7 days</p>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-up">⬆</span>
            <div className="metric-value">54.3%</div>
            <div className="metric-label">30-Day Retention</div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Stay beyond 30 days</p>
          </div>
          
          <div className="metric-card">
            <span className="metric-trend trend-neutral">➡</span>
            <div className="metric-value">28.2</div>
            <div className="metric-label">Gender Gap (Days)</div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Female vs Male LOS</p>
          </div>
        </div>
        
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Client Retention Stratification</h2>
          </div>
          
          <div className="alert-box" style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderColor: '#f59e0b' }}>
            <span className="alert-icon" style={{ color: '#f59e0b' }}>⚠️</span>
            <div>
              <strong>Critical Numbers:</strong> 3,174 clients (45.6%) leave within 30 days - representing a massive opportunity for intervention. The first week alone sees 1,701 departures.
            </div>
          </div>
          
          <div className="key-metrics" style={{ marginBottom: '2rem' }}>
            <div className="metric-card">
              <span className="metric-trend trend-down">⬇</span>
              <div className="metric-value" style={{ color: '#9f7aea' }}>1,701</div>
              <div className="metric-label">Leave Within 7 Days</div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>24.5% of all clients</p>
            </div>
            
            <div className="metric-card">
              <span className="metric-trend trend-down">⬇</span>
              <div className="metric-value" style={{ color: '#9f7aea' }}>3,174</div>
              <div className="metric-label">Leave Within 30 Days</div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>45.6% of all clients</p>
            </div>
            
            <div className="metric-card">
              <span className="metric-trend trend-down">⬇</span>
              <div className="metric-value" style={{ color: '#667eea' }}>4,924</div>
              <div className="metric-label">Leave Within 90 Days</div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>70.8% of all clients</p>
            </div>
            
            <div className="metric-card">
              <span className="metric-trend trend-up">⬆</span>
              <div className="metric-value" style={{ color: '#4c51bf' }}>2,031</div>
              <div className="metric-label">Stay Over 90 Days</div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>29.2% success rate</p>
            </div>
          </div>
          
          <div className="chart-container">
            <canvas id="stratificationChart"></canvas>
          </div>
          
          <div className="insights-grid" style={{ marginTop: '2rem' }}>
            <div className="insight-card">
              <h3>📊 Retention Breakdown</h3>
              <ul>
                <li>
                  <span>0-7 Days</span>
                  <span className="badge critical">1,701 clients</span>
                </li>
                <li>
                  <span>8-30 Days</span>
                  <span className="badge warning">1,473 clients</span>
                </li>
                <li>
                  <span>31-60 Days</span>
                  <span className="badge">907 clients</span>
                </li>
                <li>
                  <span>61-90 Days</span>
                  <span className="badge">843 clients</span>
                </li>
                <li>
                  <span>Over 90 Days</span>
                  <span className="badge success">2,031 clients</span>
                </li>
              </ul>
            </div>
            
            <div className="insight-card">
              <h3>💡 Critical Insights</h3>
              <ul>
                <li>
                  <span>First Week Crisis</span>
                  <span style={{ fontSize: '0.85rem' }}>1,701 clients lost</span>
                </li>
                <li>
                  <span>Month 1 Total Loss</span>
                  <span style={{ fontSize: '0.85rem' }}>3,174 clients</span>
                </li>
                <li>
                  <span>Stabilization Point</span>
                  <span className="badge">After 30 days</span>
                </li>
                <li>
                  <span>Long-term Success</span>
                  <span className="badge success">Only 29.2%</span>
                </li>
                <li>
                  <span>Annual Impact</span>
                  <span style={{ fontSize: '0.85rem' }}>~4,800 early exits</span>
                </li>
              </ul>
            </div>
            
            <div className="insight-card">
              <h3>🎯 Opportunity Analysis</h3>
              <ul>
                <li>
                  <span>If 50% of Week 1 stayed</span>
                  <span className="badge">+850 clients</span>
                </li>
                <li>
                  <span>If matched RPB rate</span>
                  <span className="badge success">+1,220 retained</span>
                </li>
                <li>
                  <span>Treatment Days Impact</span>
                  <span style={{ fontSize: '0.85rem' }}>+178,932 days</span>
                </li>
                <li>
                  <span>Bed Utilization</span>
                  <span style={{ fontSize: '0.85rem' }}>Major improvement</span>
                </li>
                <li>
                  <span>Success Rate Potential</span>
                  <span className="badge success">Could reach 40%+</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Facility Performance Comparison</h2>
          </div>
          
          <div className="chart-container">
            <canvas id="facilityChart"></canvas>
          </div>
        </div>
        
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Retention Patterns by Facility</h2>
          </div>
          
          <div className="facility-grid">
            <div className="facility-card best">
              <h3 style={{ color: '#4c51bf' }}>🏆 RPB - Best Performance</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>962 clients served</p>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Average LOS</span>
                  <strong>106.8 days</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Early Departure (≤7 days)</span>
                  <strong style={{ color: '#4c51bf' }}>11.1%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>30-Day Retention</span>
                  <strong style={{ color: '#4c51bf' }}>69.9%</strong>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '69.9%' }}></div>
              </div>
            </div>
            
            <div className="facility-card concern">
              <h3 style={{ color: '#9f7aea' }}>👩 RPC - Women's Facility</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>2,141 clients served</p>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Average LOS</span>
                  <strong>103.1 days</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Early Departure (≤7 days)</span>
                  <strong style={{ color: '#9f7aea' }}>31.8%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>30-Day Retention</span>
                  <strong style={{ color: '#9f7aea' }}>49.6%</strong>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '49.6%', background: 'linear-gradient(90deg, #9f7aea, #b794f4)' }}></div>
              </div>
            </div>
            
            <div className="facility-card">
              <h3 style={{ color: '#667eea' }}>📍 RPH - Largest Facility</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>2,551 clients served</p>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Average LOS</span>
                  <strong>62.1 days</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Early Departure (≤7 days)</span>
                  <strong>24.8%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>30-Day Retention</span>
                  <strong>51.5%</strong>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '51.5%' }}></div>
              </div>
            </div>
            
            <div className="facility-card">
              <h3 style={{ color: '#667eea' }}>🏢 RPP - Mid-Size Facility</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>1,174 clients served</p>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Average LOS</span>
                  <strong>77.1 days</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Early Departure (≤7 days)</span>
                  <strong>21.8%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>30-Day Retention</span>
                  <strong>56.0%</strong>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '56.0%' }}></div>
              </div>
            </div>
            
            <div className="facility-card">
              <h3 style={{ color: '#667eea' }}>🏠 The Point Apartments</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>127 clients served</p>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Average LOS</span>
                  <strong>95.2 days</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Early Departure (≤7 days)</span>
                  <strong>19.7%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>30-Day Retention</span>
                  <strong>58.3%</strong>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '58.3%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Length of Stay Distribution</h2>
          </div>
          
          <div className="chart-container">
            <canvas id="distributionChart"></canvas>
          </div>
        </div>
        
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Facility-Specific Retention Numbers</h2>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #4c51bf, #667eea)', color: 'white' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Facility</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Total Clients</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>≤7 Days</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>≤30 Days</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>{'>'}30 Days</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>{'>'}90 Days</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>RPB</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>962</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#4c51bf' }}>107 (11.1%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>290 (30.1%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#4c51bf', fontWeight: 600 }}>672 (69.9%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#4c51bf' }}>379 (39.4%)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#faf5ff' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>RPC</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>2,141</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#9f7aea' }}>681 (31.8%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>1,079 (50.4%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>1,062 (49.6%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>728 (34.0%)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>RPH</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>2,551</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>632 (24.8%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>1,236 (48.5%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>1,315 (51.5%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>560 (22.0%)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>RPP</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>1,174</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>256 (21.8%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>516 (44.0%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>658 (56.0%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>322 (27.4%)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>Point Apartments</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>127</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>25 (19.7%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>53 (41.7%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>74 (58.3%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>42 (33.1%)</td>
                </tr>
                <tr style={{ background: '#f0f4f8', fontWeight: 700 }}>
                  <td style={{ padding: '1rem' }}>TOTAL</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>6,955</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>1,701 (24.5%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>3,174 (45.6%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>3,781 (54.4%)</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>2,031 (29.2%)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style={{ background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)', border: '1px solid #9f7aea', borderRadius: '12px', padding: '1.5rem', marginTop: '2rem' }}>
            <h3 style={{ color: '#9f7aea', marginBottom: '1rem' }}>🔍 Key Stratification Insights</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.8rem' }}>
                <strong>• RPC's Crisis:</strong> 681 clients leave within 7 days. This single facility accounts for 40% of all early departures.
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <strong>• RPB Excellence:</strong> Only 107 early departures from 962 clients. If all facilities matched this rate, we'd retain an additional 1,220 clients in the critical first week.
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <strong>• 30-Day Threshold:</strong> 3,174 clients never make it to the stabilization point. This represents a massive loss of treatment opportunities and recovery potential.
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <strong>• Success Concentration:</strong> Only 2,031 clients (29.2%) achieve long-term recovery success. Improving first-month retention could double this number.
              </li>
            </ul>
          </div>
        </div>
        
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Key Insights & Recommendations</h2>
          </div>
          
          <div className="insights-grid">
            <div className="insight-card">
              <h3>🎯 Performance Variations</h3>
              <ul>
                <li>
                  <span>Best Performer (RPB)</span>
                  <span className="badge success">11.1% early exit</span>
                </li>
                <li>
                  <span>Worst Performer (RPC)</span>
                  <span className="badge critical">31.8% early exit</span>
                </li>
                <li>
                  <span>Performance Gap</span>
                  <span className="badge warning">20.7% difference</span>
                </li>
                <li>
                  <span>Long-term Success (RPB)</span>
                  <span className="badge success">39.4% stay 90+ days</span>
                </li>
                <li>
                  <span>Improvement Potential</span>
                  <span className="badge">~700 clients/year</span>
                </li>
              </ul>
            </div>
            
            <div className="insight-card">
              <h3>👥 Gender Differences</h3>
              <ul>
                <li>
                  <span>Female Average LOS</span>
                  <span className="badge">102.6 days</span>
                </li>
                <li>
                  <span>Male Average LOS</span>
                  <span className="badge">74.4 days</span>
                </li>
                <li>
                  <span>Gender Gap</span>
                  <span className="badge warning">28.2 days</span>
                </li>
                <li>
                  <span>Female Clients</span>
                  <span className="badge">2,123 (30.5%)</span>
                </li>
                <li>
                  <span>Male Clients</span>
                  <span className="badge">4,558 (65.6%)</span>
                </li>
              </ul>
            </div>
            
            <div className="insight-card">
              <h3>📊 Facility Capacity</h3>
              <ul>
                <li>
                  <span>RPH (Largest)</span>
                  <span className="badge">2,551 clients</span>
                </li>
                <li>
                  <span>RPC</span>
                  <span className="badge">2,141 clients</span>
                </li>
                <li>
                  <span>RPP</span>
                  <span className="badge">1,174 clients</span>
                </li>
                <li>
                  <span>RPB</span>
                  <span className="badge">962 clients</span>
                </li>
                <li>
                  <span>Point Apartments</span>
                  <span className="badge">127 clients</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div style={{ background: 'linear-gradient(135deg, #ebf4ff, #f0f4f8)', border: '2px solid #4c51bf', borderRadius: '12px', padding: '2rem', marginTop: '2rem' }}>
            <h3 style={{ color: '#4c51bf', marginBottom: '1rem' }}>🚀 Strategic Recommendations</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #4c51bf' }}>
                <strong style={{ color: '#4c51bf' }}>1. Replicate RPB Success:</strong> Study and implement RPB's intake, engagement, and support practices across all facilities, particularly at RPC.
              </div>
              <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
                <strong style={{ color: '#667eea' }}>2. First-Week Intervention:</strong> Develop facility-specific protocols for the critical first 7 days, with intensive focus on RPC where 1 in 3 clients leave early.
              </div>
              <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #9f7aea' }}>
                <strong style={{ color: '#9f7aea' }}>3. Gender-Responsive Programming:</strong> Investigate why women stay 38% longer and develop targeted retention strategies for male clients.
              </div>
              <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #4c51bf' }}>
                <strong style={{ color: '#4c51bf' }}>4. Facility Performance Metrics:</strong> Implement weekly retention dashboards by facility with early warning indicators for at-risk clients.
              </div>
            </div>
          </div>
        </div>
      </div>
    </AzureProtectedRoute>
  );
};

export default LOSAnalysis;
