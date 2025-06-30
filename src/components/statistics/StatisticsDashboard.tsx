import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatisticsHeader } from './StatisticsHeader';
import { ExecutiveInsights } from './ExecutiveInsights';
import { LengthOfStaySection } from './LengthOfStaySection';
import { KeyMetricsGrid } from './KeyMetricsGrid';
import { ServiceGapsSection } from './ServiceGapsSection';
import { LegalSystemSection } from './LegalSystemSection';
import { QualityOfLifeSection } from './QualityOfLifeSection';
import { RiskStratificationSection } from './RiskStratificationSection';
import { TraumaFamilySection } from './TraumaFamilySection';
import { ComprehensiveAbuseSection } from './ComprehensiveAbuseSection';
import { StrategicRecommendationsSection } from './StrategicRecommendationsSection';
import { DemographicsSection } from './DemographicsSection';
import { ProgramInsightsSection } from './ProgramInsightsSection';

export const StatisticsDashboard = () => {
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

    // Chart configurations with print optimization
    Chart.defaults.color = '#64748b';
    Chart.defaults.borderColor = '#e2e8f0';
    
    // Print-friendly chart defaults
    Chart.defaults.font.family = 'Times New Roman, serif';
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    
    // LOS Chart with print optimization
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
            borderColor: [
              'rgba(0, 0, 0, 1)',
              'rgba(0, 0, 0, 1)',
              'rgba(0, 0, 0, 1)',
              'rgba(0, 0, 0, 1)',
              'rgba(0, 0, 0, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 0 // Disable animations for print
          },
          plugins: {
            legend: { 
              display: false,
              labels: {
                color: '#000',
                font: {
                  family: 'Times New Roman, serif'
                }
              }
            },
            title: {
              display: true,
              text: 'Client Retention by Length of Stay',
              font: { size: 16, weight: 'normal', family: 'Times New Roman, serif' },
              color: '#000',
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
                color: 'rgba(0, 0, 0, 0.2)'
              },
              ticks: {
                color: '#000',
                font: {
                  family: 'Times New Roman, serif'
                },
                callback: function(value: any) {
                  return value.toLocaleString();
                }
              }
            },
            x: {
              grid: { display: false },
              ticks: {
                color: '#000',
                font: {
                  family: 'Times New Roman, serif'
                }
              }
            }
          }
        }
      });
    }
    
    // Legal Status Chart with print optimization
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
            borderColor: [
              'rgba(0, 0, 0, 1)',
              'rgba(0, 0, 0, 1)',
              'rgba(0, 0, 0, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 0
          },
          plugins: {
            legend: { 
              display: false,
              labels: {
                color: '#000',
                font: {
                  family: 'Times New Roman, serif'
                }
              }
            },
            title: {
              display: true,
              text: 'Current Legal Status',
              font: { size: 16, weight: 'normal', family: 'Times New Roman, serif' },
              color: '#000',
              padding: { bottom: 20 }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                color: '#000',
                font: {
                  family: 'Times New Roman, serif'
                },
                callback: function(value: any) {
                  return value + '%';
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.2)'
              }
            },
            x: {
              grid: { display: false },
              ticks: {
                color: '#000',
                font: {
                  family: 'Times New Roman, serif'
                }
              }
            }
          }
        }
      });
    }
    
    // Quality of Life Chart with print optimization
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
            borderColor: 'rgba(0, 0, 0, 1)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            pointBackgroundColor: 'rgba(0, 0, 0, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0, 0, 0, 1)'
          }, {
            label: 'Poor/Terrible',
            data: [13.2, 8.1, 6.4, 36.4, 12.7, 25],
            borderColor: 'rgba(100, 100, 100, 1)',
            backgroundColor: 'rgba(100, 100, 100, 0.1)',
            pointBackgroundColor: 'rgba(100, 100, 100, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(100, 100, 100, 1)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 0
          },
          plugins: {
            title: {
              display: true,
              text: 'Quality of Life Indicators',
              font: { size: 16, weight: 'normal', family: 'Times New Roman, serif' },
              color: '#000',
              padding: { bottom: 20 }
            },
            legend: {
              labels: {
                color: '#000',
                font: {
                  family: 'Times New Roman, serif'
                }
              }
            }
          },
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 20,
                color: '#000',
                font: {
                  family: 'Times New Roman, serif'
                },
                callback: function(value: any) {
                  return value + '%';
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.2)'
              },
              angleLines: {
                color: 'rgba(0, 0, 0, 0.2)'
              },
              pointLabels: {
                color: '#000',
                font: {
                  family: 'Times New Roman, serif'
                }
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
    <div className="dashboard-content">
      <div className="dashboard">
        <StatisticsHeader />
        
        <div style={{ background: 'linear-gradient(135deg, #ebf4ff, #f0f4f8)', border: '1px solid #4c51bf', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#2d3748', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
            <strong>Data Collection Methodology:</strong> This comprehensive analysis is based on data gathered through intake assessments at admission and ongoing surveys conducted throughout each client's recovery journey. The information represents a holistic view of our clients' needs, progress, and outcomes during their time in our long-term recovery program.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="program-insights">Program Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <ExecutiveInsights />
            <LengthOfStaySection />
            
            <div className="alert-box">
              <span className="alert-icon">⚠️</span>
              <div>
                <strong>Critical Retention Challenge:</strong> 45.6% of clients leave within 30 days, with 24.5% departing in the first week. Early intervention and engagement strategies are urgently needed.
              </div>
            </div>
            
            <KeyMetricsGrid />
            <ServiceGapsSection />
            <LegalSystemSection />
            <QualityOfLifeSection />
            <RiskStratificationSection />
            <TraumaFamilySection />
            <ComprehensiveAbuseSection />
            <StrategicRecommendationsSection />
          </TabsContent>
          
          <TabsContent value="demographics">
            <DemographicsSection />
          </TabsContent>
          
          <TabsContent value="program-insights">
            <ProgramInsightsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
