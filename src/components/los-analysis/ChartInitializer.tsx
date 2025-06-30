
import { useEffect } from 'react';

interface ChartInitializerProps {
  onChartsReady: () => void;
}

export const ChartInitializer: React.FC<ChartInitializerProps> = ({ onChartsReady }) => {
  useEffect(() => {
    // Load Chart.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
    script.onload = () => {
      onChartsReady();
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [onChartsReady]);

  return null;
};
