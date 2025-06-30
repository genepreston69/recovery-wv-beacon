
import React, { useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { AzureProtectedRoute } from '@/components/auth/AzureProtectedRoute';
import { LOSHeader } from '@/components/los-analysis/LOSHeader';
import { KeyMetrics } from '@/components/los-analysis/KeyMetrics';
import { StratificationMetrics } from '@/components/los-analysis/StratificationMetrics';
import { FacilityGrid } from '@/components/los-analysis/FacilityGrid';
import { InsightsGrid } from '@/components/los-analysis/InsightsGrid';
import { FacilityTable } from '@/components/los-analysis/FacilityTable';
import { ChartInitializer } from '@/components/los-analysis/ChartInitializer';
import { LOSStyles } from '@/components/los-analysis/LOSStyles';

const LOSAnalysis = () => {
  const initializeCharts = useCallback(() => {
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

    animateMetrics();
  }, []);

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
      <LOSStyles />
      <ChartInitializer onChartsReady={initializeCharts} />
      
      <div className="dashboard">
        <LOSHeader />
        
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
        
        <KeyMetrics />
        
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
          
          <StratificationMetrics />
          
          <div className="chart-container">
            <canvas id="stratificationChart"></canvas>
          </div>
          
          <InsightsGrid type="stratification" />
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
          
          <FacilityGrid />
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
          
          <FacilityTable />
          
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
          
          <InsightsGrid type="performance" />
          
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
