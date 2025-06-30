
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { AzureProtectedRoute } from '@/components/auth/AzureProtectedRoute';
import { StatisticsDashboard } from '@/components/statistics/StatisticsDashboard';
import { StatisticsStyles } from '@/components/statistics/StatisticsStyles';

const Statistics = () => {
  return (
    <AzureProtectedRoute>
      <Navigation />
      <StatisticsStyles />
      <StatisticsDashboard />
    </AzureProtectedRoute>
  );
};

export default Statistics;
