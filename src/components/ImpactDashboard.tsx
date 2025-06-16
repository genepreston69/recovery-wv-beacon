
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ImpactMetrics {
  livesChanged: number;
  familiesReunited: number;
  communityHours: number;
  costSavings: number;
}

interface ImpactDashboardProps {
  metrics: ImpactMetrics;
}

export const ImpactDashboard = ({ metrics }: ImpactDashboardProps) => {
  const impactMetrics = [
    { label: 'Lives Transformed', value: metrics.livesChanged, suffix: '+', color: 'text-yellow-400' },
    { label: 'Families Reunited', value: metrics.familiesReunited, suffix: '+', color: 'text-blue-400' },
    { label: 'Community Service Hours', value: metrics.communityHours.toLocaleString(), suffix: '', color: 'text-green-400' },
    { label: 'Healthcare Cost Savings', value: `$${metrics.costSavings}M`, suffix: '', color: 'text-purple-400' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Real-Time Community Impact</h2>
          <p className="text-xl text-blue-100">See the difference we're making together, updated daily</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactMetrics.map((metric, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border-0 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className={`text-4xl font-bold mb-2 ${metric.color}`}>
                  {metric.value}{metric.suffix}
                </div>
                <div className="text-white/90">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
