
// @ts-ignore
declare global {
  interface Window {
    Chart: any;
  }
}

export const initializeCharts = () => {
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

export const animateMetrics = () => {
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

export const setupInteractivity = () => {
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
