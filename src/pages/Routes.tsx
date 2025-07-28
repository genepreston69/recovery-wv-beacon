import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { AzureProtectedRoute } from '@/components/auth/AzureProtectedRoute';
import { supabase } from '@/integrations/supabase/client';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Truck, DollarSign, Activity, Users, TrendingUp, TrendingDown } from 'lucide-react';

// Interfaces for type safety
interface DashboardMetrics {
  rides_today: number;
  revenue_today: number;
  miles_today: number;
  active_accounts_today: number;
  avg_revenue_per_ride: number;
  avg_miles_per_ride: number;
}

interface MonthlyTrend {
  month: string;
  ride_count: number;
  total_revenue: number;
  total_miles: number;
  unique_accounts: number;
}

interface TopAccount {
  account_code: string;
  rides_this_month: number;
  revenue_this_month: number;
  miles_this_month: number;
}

// Utility functions
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
};

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: number;
  color: 'blue' | 'green' | 'purple' | 'orange';
  loading?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon: Icon, trend, color, loading }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="ml-1">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const RoutesDashboard = () => {
  // State management
  const [loading, setLoading] = useState(true);
  const [todayMetrics, setTodayMetrics] = useState<DashboardMetrics | null>(null);
  const [monthlyTrends, setMonthlyTrends] = useState<MonthlyTrend[]>([]);
  const [topAccounts, setTopAccounts] = useState<TopAccount[]>([]);
  const [recentRides, setRecentRides] = useState<any[]>([]);
  const [cityMetrics, setCityMetrics] = useState<any[]>([]);
  const [routeAnalysis, setRouteAnalysis] = useState<any[]>([]);

  // Chart colors
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data for demonstration
      setTodayMetrics({
        rides_today: 45,
        revenue_today: 2450.75,
        miles_today: 832,
        active_accounts_today: 12,
        avg_revenue_per_ride: 54.46,
        avg_miles_per_ride: 18.5
      });

      setMonthlyTrends([
        { month: '2024-01', ride_count: 325, total_revenue: 17500, total_miles: 5420, unique_accounts: 45 },
        { month: '2024-02', ride_count: 398, total_revenue: 21200, total_miles: 6780, unique_accounts: 52 },
        { month: '2024-03', ride_count: 456, total_revenue: 24300, total_miles: 7890, unique_accounts: 58 },
        { month: '2024-04', ride_count: 523, total_revenue: 28100, total_miles: 8950, unique_accounts: 62 },
        { month: '2024-05', ride_count: 578, total_revenue: 31200, total_miles: 9870, unique_accounts: 67 },
        { month: '2024-06', ride_count: 634, total_revenue: 34500, total_miles: 10890, unique_accounts: 71 }
      ]);

      setTopAccounts([
        { account_code: 'HOSP001', rides_this_month: 45, revenue_this_month: 2340, miles_this_month: 789 },
        { account_code: 'REHAB002', rides_this_month: 38, revenue_this_month: 1980, miles_this_month: 654 },
        { account_code: 'CLINIC003', rides_this_month: 32, revenue_this_month: 1650, miles_this_month: 543 },
        { account_code: 'PHARM004', rides_this_month: 28, revenue_this_month: 1420, miles_this_month: 467 },
        { account_code: 'THER005', rides_this_month: 24, revenue_this_month: 1240, miles_this_month: 398 }
      ]);

      setRecentRides([
        { ride_date: '2024-01-15', trip_number: 1234, rider_name: 'John D.', pickup_city: 'Charleston', dropoff_city: 'Huntington', miles: 52, total: 78.50 },
        { ride_date: '2024-01-15', trip_number: 1235, rider_name: 'Sarah M.', pickup_city: 'Morgantown', dropoff_city: 'Fairmont', miles: 24, total: 36.75 },
        { ride_date: '2024-01-15', trip_number: 1236, rider_name: 'Michael R.', pickup_city: 'Parkersburg', dropoff_city: 'Clarksburg', miles: 31, total: 47.25 },
        { ride_date: '2024-01-15', trip_number: 1237, rider_name: 'Lisa K.', pickup_city: 'Wheeling', dropoff_city: 'Moundsville', miles: 18, total: 28.50 },
        { ride_date: '2024-01-15', trip_number: 1238, rider_name: 'David B.', pickup_city: 'Martinsburg', dropoff_city: 'Charles Town', miles: 15, total: 24.75 }
      ]);

      setCityMetrics([
        { city: 'Charleston', trip_count: 156 },
        { city: 'Huntington', trip_count: 134 },
        { city: 'Morgantown', trip_count: 98 },
        { city: 'Parkersburg', trip_count: 76 },
        { city: 'Wheeling', trip_count: 64 },
        { city: 'Martinsburg', trip_count: 52 }
      ]);

      setRouteAnalysis([
        { route: 'Charleston → Huntington', trip_count: 89, avg_miles: 52.3 },
        { route: 'Morgantown → Fairmont', trip_count: 67, avg_miles: 24.1 },
        { route: 'Parkersburg → Clarksburg', trip_count: 54, avg_miles: 31.7 },
        { route: 'Wheeling → Moundsville', trip_count: 43, avg_miles: 18.9 },
        { route: 'Martinsburg → Charles Town', trip_count: 38, avg_miles: 15.2 }
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  // Load data on mount and set up auto-refresh
  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Routes Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time transportation metrics and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Rides Today"
          value={todayMetrics ? formatNumber(todayMetrics.rides_today) : '—'}
          icon={Truck}
          trend={12}
          color="blue"
          loading={loading}
        />
        <KPICard
          title="Revenue Today"
          value={todayMetrics ? formatCurrency(todayMetrics.revenue_today) : '—'}
          icon={DollarSign}
          trend={8}
          color="green"
          loading={loading}
        />
        <KPICard
          title="Miles this Month To Date"
          value={todayMetrics ? formatNumber(todayMetrics.miles_today) : '—'}
          icon={Activity}
          trend={-3}
          color="purple"
          loading={loading}
        />
        <KPICard
          title="Active Accounts"
          value={todayMetrics ? todayMetrics.active_accounts_today : '—'}
          icon={Users}
          trend={15}
          color="orange"
          loading={loading}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                  }}
                />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Line 
                  type="monotone" 
                  dataKey="total_revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Ride Volume Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Ride Volume</h3>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { month: 'short' });
                  }}
                />
                <YAxis />
                <Tooltip formatter={(value: number) => formatNumber(value)} />
                <Bar dataKey="ride_count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Tables and Pie Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Top Accounts Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Top Accounts This Month</h3>
          {loading ? (
            <div className="animate-pulse space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Account</th>
                    <th className="text-right py-2">Rides</th>
                    <th className="text-right py-2">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topAccounts.slice(0, 5).map((account, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-2">{account.account_code}</td>
                      <td className="text-right py-2">{account.rides_this_month}</td>
                      <td className="text-right py-2">{formatCurrency(account.revenue_this_month)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Popular Routes Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Popular Routes</h3>
          {loading ? (
            <div className="animate-pulse space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Route</th>
                    <th className="text-right py-2">Trips</th>
                    <th className="text-right py-2">Avg Miles</th>
                  </tr>
                </thead>
                <tbody>
                  {routeAnalysis.slice(0, 5).map((route, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-2 text-xs">{route.route}</td>
                      <td className="text-right py-2">{route.trip_count}</td>
                      <td className="text-right py-2">{route.avg_miles?.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* City Distribution Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Activity by City</h3>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={cityMetrics}
                  dataKey="trip_count"
                  nameKey="city"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ city, percent }) => `${city} ${(percent * 100).toFixed(0)}%`}
                >
                  {cityMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Rides Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Rides</h3>
        {loading ? (
          <div className="animate-pulse space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Trip #</th>
                  <th className="text-left py-2">Rider</th>
                  <th className="text-left py-2">Route</th>
                  <th className="text-right py-2">Miles</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentRides.map((ride, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2">
                      {new Date(ride.ride_date).toLocaleDateString()}
                    </td>
                    <td className="py-2">{ride.trip_number}</td>
                    <td className="py-2">{ride.rider_name}</td>
                    <td className="py-2 text-xs">{ride.pickup_city} → {ride.dropoff_city}</td>
                    <td className="text-right py-2">{ride.miles}</td>
                    <td className="text-right py-2">{formatCurrency(ride.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const Routes = () => {
  return (
    <AzureProtectedRoute>
      <Navigation />
      <RoutesDashboard />
    </AzureProtectedRoute>
  );
};

export default Routes;