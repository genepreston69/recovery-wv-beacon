import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LOSAnalysis = () => {
  const retentionData = {
    labels: ['RPB', 'RPC', 'RPH', 'RPP', 'Point Apartments'],
    datasets: [
      {
        label: '<=7 Days',
        data: [107, 681, 632, 256, 25],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '<=30 Days',
        data: [290, 1079, 1236, 516, 53],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: '>30 Days',
        data: [672, 1062, 1315, 658, 74],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
      {
        label: '>90 Days',
        data: [379, 728, 560, 322, 42],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Facility Retention Analysis',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Length of Stay Analysis
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Insights into client retention across different facilities.
          </p>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Retention Metrics Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <strong className="text-blue-700 block mb-2">Average Stay</strong>
              <span className="text-gray-700">45 days</span>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <strong className="text-green-700 block mb-2">Success Rate</strong>
              <span className="text-gray-700">68%</span>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <strong className="text-yellow-700 block mb-2">Early Departure Rate (≤7 Days)</strong>
              <span className="text-gray-700">24.5%</span>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <strong className="text-red-700 block mb-2">30-Day Retention</strong>
              <span className="text-gray-700">54.4%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Retention Chart by Facility
          </h3>
          <Bar options={chartOptions} data={retentionData} />
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-blue-800 font-semibold mb-4 flex items-center gap-2">
            <span>🎯</span>
            Strategic Recommendations
          </h3>
          <div className="grid gap-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
              <strong className="text-blue-800">1. Replicate RPB Success:</strong> Study and implement RPB's intake, engagement, and support practices across all facilities, particularly at RPC.
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-600">
              <strong className="text-indigo-800">2. First-Week Intervention:</strong> Develop facility-specific protocols for the critical first 7 days, with intensive focus on RPC where 1 in 3 clients leave early.
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-purple-600">
              <strong className="text-purple-800">3. Gender-Responsive Programming:</strong> Investigate why women stay 38% longer and develop targeted retention strategies for male clients.
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
              <strong className="text-blue-800">4. Facility Performance Metrics:</strong> Implement weekly retention dashboards by facility with early warning indicators for at-risk clients.
            </div>
          </div>
        </div>

        {/* Facility-Specific Retention Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Facility-Specific Retention Numbers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="p-3 text-left">Facility</th>
                  <th className="p-3 text-center">Total Clients</th>
                  <th className="p-3 text-center">≤7 Days</th>
                  <th className="p-3 text-center">≤30 Days</th>
                  <th className="p-3 text-center">>30 Days</th>
                  <th className="p-3 text-center">>90 Days</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-semibold">RPB</td>
                  <td className="p-3 text-center">962</td>
                  <td className="p-3 text-center text-blue-600">107 (11.1%)</td>
                  <td className="p-3 text-center">290 (30.1%)</td>
                  <td className="p-3 text-center text-blue-600 font-semibold">672 (69.9%)</td>
                  <td className="p-3 text-center text-blue-600">379 (39.4%)</td>
                </tr>
                <tr className="border-b border-gray-200 bg-purple-50">
                  <td className="p-3 font-semibold">RPC</td>
                  <td className="p-3 text-center">2,141</td>
                  <td className="p-3 text-center text-purple-600">681 (31.8%)</td>
                  <td className="p-3 text-center">1,079 (50.4%)</td>
                  <td className="p-3 text-center">1,062 (49.6%)</td>
                  <td className="p-3 text-center">728 (34.0%)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-semibold">RPH</td>
                  <td className="p-3 text-center">2,551</td>
                  <td className="p-3 text-center">632 (24.8%)</td>
                  <td className="p-3 text-center">1,236 (48.5%)</td>
                  <td className="p-3 text-center">1,315 (51.5%)</td>
                  <td className="p-3 text-center">560 (22.0%)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-semibold">RPP</td>
                  <td className="p-3 text-center">1,174</td>
                  <td className="p-3 text-center">256 (21.8%)</td>
                  <td className="p-3 text-center">516 (44.0%)</td>
                  <td className="p-3 text-center">658 (56.0%)</td>
                  <td className="p-3 text-center">322 (27.4%)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-semibold">Point Apartments</td>
                  <td className="p-3 text-center">127</td>
                  <td className="p-3 text-center">25 (19.7%)</td>
                  <td className="p-3 text-center">53 (41.7%)</td>
                  <td className="p-3 text-center">74 (58.3%)</td>
                  <td className="p-3 text-center">42 (33.1%)</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="p-3">TOTAL</td>
                  <td className="p-3 text-center">6,955</td>
                  <td className="p-3 text-center">1,701 (24.5%)</td>
                  <td className="p-3 text-center">3,174 (45.6%)</td>
                  <td className="p-3 text-center">3,781 (54.4%)</td>
                  <td className="p-3 text-center">2,031 (29.2%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LOSAnalysis;
