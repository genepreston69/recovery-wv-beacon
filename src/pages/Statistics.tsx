
import React, { useEffect, useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, ArrowRight, Users, Heart, Shield, FileText, Download } from 'lucide-react';

const Statistics = () => {
  const animatedRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate metric values on load
    const animateValue = (element: HTMLElement, start: number, end: number, duration: number, isPercentage = true) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = isPercentage ? currentValue + '%' : currentValue.toLocaleString();
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    setTimeout(() => {
      animatedRefs.current.forEach((el, index) => {
        if (el) {
          const valueElement = el.querySelector('.metric-value') as HTMLElement;
          if (valueElement) {
            const text = valueElement.getAttribute('data-value') || '0';
            const isPercentage = text.includes('%');
            const value = parseFloat(text);
            
            if (!isNaN(value)) {
              valueElement.textContent = isPercentage ? '0%' : '0';
              setTimeout(() => animateValue(valueElement, 0, value, 1500, isPercentage), index * 100);
            }
          }
        }
      });
    }, 300);
  }, []);

  const legalData = [
    { name: 'On Probation/Parole', value: 50.0 },
    { name: 'Pending Charges', value: 36.6 },
    { name: 'Legal Actions Against', value: 13.8 }
  ];

  const qolData = [
    { metric: 'Mental Health', good: 52.7, poor: 13.2 },
    { metric: 'Overall Health', good: 64.4, poor: 8.1 },
    { metric: 'Recovery Support', good: 83.4, poor: 6.4 },
    { metric: 'Financial Security', good: 29.5, poor: 36.4 },
    { metric: 'Living Conditions', good: 69.0, poor: 12.7 },
    { metric: 'Education/Skills', good: 50, poor: 25 }
  ];

  const traumaData = [
    { name: 'Treated for Abuse', value: 337, color: '#9f7aea' },
    { name: 'No Abuse Treatment', value: 1182, color: '#4c51bf' },
    { name: 'Unknown', value: 49, color: '#e2e8f0' }
  ];

  const abuseTypesData = [
    { name: 'Verbal Abuse', value: 428, percentage: 27.3 },
    { name: 'Physical Abuse', value: 427, percentage: 27.2 },
    { name: 'Sexual Abuse', value: 305, percentage: 19.5 },
    { name: 'Rape', value: 185, percentage: 11.8 },
    { name: 'Incest', value: 59, percentage: 3.8 }
  ];

  const keyMetrics = [
    { value: 24.9, label: 'High-Risk Clients', trend: 'down', icon: TrendingDown, color: 'text-red-600' },
    { value: 59.6, label: 'Stable Housing', trend: 'up', icon: TrendingUp, color: 'text-green-600' },
    { value: 83.4, label: 'Supportive Recovery', trend: 'neutral', icon: ArrowRight, color: 'text-blue-600' },
    { value: 50.0, label: 'On Probation/Parole', trend: 'down', icon: TrendingDown, color: 'text-orange-600' }
  ];

  const traumaMetrics = [
    { value: 21.5, label: 'Treated for Abuse', color: 'text-purple-600' },
    { value: 932, label: 'Children Impacted', color: 'text-blue-600', isNumber: true },
    { value: 30.0, label: 'Father Absent', color: 'text-purple-600' },
    { value: 20.8, label: 'Poor Family Relations', color: 'text-purple-600' }
  ];

  const abuseAnalysisMetrics = [
    { value: 32.7, label: 'Documented Abuse History', color: 'text-purple-600', subtitle: '513 total clients' },
    { value: 176, label: 'Treatment Gap', color: 'text-purple-600', isNumber: true, subtitle: 'Untreated abuse survivors' },
    { value: 82.8, label: 'Multiple Trauma Types', color: 'text-purple-600', subtitle: 'Of abuse survivors' },
    { value: 275, label: 'Severe Cases', color: 'text-purple-600', isNumber: true, subtitle: '3+ types of abuse' }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <img 
                src="https://pvxbkqdeyrhuumjtwgzm.supabase.co/storage/v1/object/public/story-images//RPWV%20Logo%20with%20transparent%20background.png" 
                alt="Recovery Point West Virginia" 
                className="max-w-md h-auto mx-auto"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Long-Term Recovery Dashboard
            </h1>
            <p className="text-xl text-gray-600 mb-2">Comprehensive Client Analysis | 1,568 Total Clients</p>
            <p className="text-gray-500">Data Analysis Date: June 26, 2025</p>
          </div>

          {/* Data Collection Methodology */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-gray-50 border-blue-300 text-center">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                <strong className="text-gray-900">Data Collection Methodology:</strong> This comprehensive analysis is based on data gathered through intake assessments at admission and ongoing surveys conducted throughout each client's recovery journey. The information represents a holistic view of our clients' needs, progress, and outcomes during their time in our long-term recovery program.
              </p>
            </CardContent>
          </Card>

          {/* Critical Alert */}
          <Card className="mb-8 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
                <div>
                  <strong className="text-amber-900">Critical Action Required:</strong>
                  <span className="text-amber-800"> 763 clients (48.7%) need mental health providers but don't have one. This represents our most significant service gap.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {keyMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card 
                  key={metric.label}
                  ref={el => animatedRefs.current[index] = el}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    <div className="metric-value text-3xl font-bold text-blue-600 mb-2" data-value={`${metric.value}%`}>
                      {metric.value}%
                    </div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide font-medium">
                      {metric.label}
                    </div>
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Service Gaps Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Service Gaps & Critical Needs</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Mental Health Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-purple-600" />
                    Mental Health Services Gap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Need Provider (No Access)</span>
                      <Badge variant="destructive">763 clients</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Have Provider</span>
                      <Badge className="bg-green-600">263 clients</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Inpatient Treatment History</span>
                      <Badge variant="secondary">214 clients</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Service Coverage Rate</span>
                      <Badge variant="destructive">25.6%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Veterans Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Veterans Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Military Service</span>
                      <Badge variant="secondary">162 veterans</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Combat Veterans</span>
                      <Badge variant="secondary">149 clients</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Not VA Registered</span>
                      <Badge className="bg-yellow-600">92 veterans</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>VA Coverage Gap</span>
                      <Badge className="bg-yellow-600">56.8%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documentation Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    Documentation Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Birth Certificate</span>
                      <Badge className="bg-yellow-600">52.9%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Driver's License</span>
                      <Badge variant="destructive">35.1%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Social Security Card</span>
                      <Badge className="bg-yellow-600">58.1%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>HS Diploma/GED</span>
                      <Badge className="bg-green-600">77.7%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Legal System Involvement Chart */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Legal System Involvement</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Percentage",
                    color: "#4c51bf",
                  },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={legalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#4c51bf" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Quality of Life Assessment */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Quality of Life Assessment</CardTitle>
              <p className="text-gray-600 italic">Based on client survey after 90 days of residency.</p>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  good: {
                    label: "Good/Excellent",
                    color: "#4c51bf",
                  },
                  poor: {
                    label: "Poor/Terrible", 
                    color: "#9f7aea",
                  },
                }}
                className="h-96"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={qolData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Good/Excellent" dataKey="good" stroke="#4c51bf" fill="#4c51bf" fillOpacity={0.2} />
                    <Radar name="Poor/Terrible" dataKey="poor" stroke="#9f7aea" fill="#9f7aea" fillOpacity={0.2} />
                    <Legend />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Risk Stratification */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Risk Stratification</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-purple-200 bg-gradient-to-br from-white to-purple-50">
                <CardHeader>
                  <CardTitle className="text-purple-700">🚨 High Risk (390 clients)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Multiple indicators including:</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Recent arrests (past 30 days)</li>
                    <li>• Unstable housing</li>
                    <li>• Unmet mental health needs</li>
                    <li>• Multiple "Terrible" QOL ratings</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-700">⚠️ Medium Risk (634 clients)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Key concerns:</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Housing instability</li>
                    <li>• Pending legal charges</li>
                    <li>• Limited support systems</li>
                    <li>• Financial insecurity</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-white to-green-50">
                <CardHeader>
                  <CardTitle className="text-green-700">✅ Stable/Low Risk (544 clients)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Positive indicators:</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Stable housing (30+ days)</li>
                    <li>• Educational attainment</li>
                    <li>• Supportive recovery environment</li>
                    <li>• Good overall health</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Trauma & Family Impact */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Trauma & Family Impact Analysis</h2>
            
            <Card className="mb-6 border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Users className="w-8 h-8 text-yellow-600" />
                  <div>
                    <strong className="text-yellow-900">Children at Risk:</strong>
                    <span className="text-yellow-800"> An estimated 932+ children are impacted by their parents' recovery journey, with 69+ in high-risk situations requiring immediate family support services.</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trauma Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {traumaMetrics.map((metric, index) => (
                <Card 
                  key={metric.label}
                  ref={el => animatedRefs.current[index + keyMetrics.length] = el}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div 
                      className={`text-3xl font-bold mb-2 ${metric.color}`}
                      data-value={metric.isNumber ? metric.value.toString() : `${metric.value}%`}>
                      {metric.isNumber ? metric.value.toLocaleString() : `${metric.value}%`}
                    </div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide font-medium">
                      {metric.label}
                    </div>
                    {metric.label === 'Children Impacted' && (
                      <p className="text-xs text-gray-500 mt-1">Based on 444 likely parents</p>
                    )}
                    {!metric.isNumber && (
                      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>🔍 Intergenerational Trauma Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Abuse History</span>
                      <Badge variant="destructive">337 clients</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Absent Father + Abuse</span>
                      <Badge className="bg-yellow-600">106 clients</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>% with Absent Fathers Abused</span>
                      <Badge variant="destructive">22.6%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Abuse + Poor Family Relations</span>
                      <Badge className="bg-yellow-600">109 clients</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>👨‍👩‍👧‍👦 Family System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Good/Excellent Relations</span>
                      <Badge className="bg-green-600">48.8%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Poor/Terrible Relations</span>
                      <Badge variant="destructive">20.8%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Father Present in Childhood</span>
                      <Badge variant="secondary">69.6%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>High-Risk Parent Situations</span>
                      <Badge variant="destructive">33 families</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Abuse Treatment History Among Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Clients",
                      color: "#4c51bf",
                    },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={traumaData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {traumaData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Comprehensive Abuse & Trauma Analysis */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comprehensive Abuse & Trauma Analysis</h2>
            
            <Card className="mb-6 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="w-8 h-8 text-purple-600" />
                  <div>
                    <strong className="text-purple-900">Critical Finding:</strong>
                    <span className="text-purple-800"> 513 clients (32.7%) have documented abuse histories, but only 337 (21.5%) received treatment. This represents 176 abuse survivors with unmet trauma treatment needs.</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Abuse Analysis Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {abuseAnalysisMetrics.map((metric, index) => (
                <Card 
                  key={metric.label}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
                      {metric.isNumber ? metric.value.toLocaleString() : `${metric.value}%`}
                    </div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide font-medium">
                      {metric.label}
                    </div>
                    {metric.subtitle && (
                      <p className="text-xs text-gray-500 mt-1">{metric.subtitle}</p>
                    )}
                    {!metric.isNumber && (
                      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>📊 Abuse Type Prevalence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Verbal Abuse</span>
                      <Badge variant="destructive">428 (27.3%)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Physical Abuse</span>
                      <Badge variant="destructive">427 (27.2%)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sexual Abuse</span>
                      <Badge variant="destructive">305 (19.5%)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Rape</span>
                      <Badge variant="destructive">185 (11.8%)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Incest</span>
                      <Badge className="bg-yellow-600">59 (3.8%)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>⚠️ Treatment Coverage Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Abuse Survivors Identified</span>
                      <Badge variant="secondary">513 clients</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Received Treatment</span>
                      <Badge className="bg-yellow-600">337 (65.7%)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>No Treatment</span>
                      <Badge variant="destructive">176 (34.3%)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Treatment Coverage Rate</span>
                      <Badge className="bg-yellow-600">65.7%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🔄 Trauma Complexity Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Single Type of Abuse</span>
                      <Badge variant="secondary">88 (17.2%)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>2 Types of Abuse</span>
                      <Badge className="bg-yellow-600">150 (29.2%)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>3+ Types of Abuse</span>
                      <Badge variant="destructive">275 (53.6%)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Most Common Pattern</span>
                      <span className="text-sm">Physical + Verbal + Sexual</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Types of Abuse Experienced by Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Number of Clients",
                      color: "#9f7aea",
                    },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={abuseTypesData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={100} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#9f7aea" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Strategic Recommendations */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Strategic Recommendations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>🎯 Immediate Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Trauma-Informed Care Training</span>
                      <Badge variant="destructive">URGENT</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Expand Trauma Treatment</span>
                      <Badge variant="destructive">URGENT</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Mental Health Provider Recruitment</span>
                      <Badge variant="destructive">URGENT</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Family Support Services</span>
                      <Badge variant="destructive">URGENT</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Screen 176 Untreated Survivors</span>
                      <Badge className="bg-yellow-600">HIGH</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Housing Stabilization Initiative</span>
                      <Badge className="bg-yellow-600">HIGH</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>📊 Program Enhancements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Integrated MH Services</span>
                      <span className="text-sm text-gray-600">48.7% need</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Family Reunification Program</span>
                      <span className="text-sm text-gray-600">932+ children</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Parenting Skills Track</span>
                      <span className="text-sm text-gray-600">444 parents</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Intergenerational Healing</span>
                      <span className="text-sm text-gray-600">337 trauma cases</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Legal Aid Partnership</span>
                      <span className="text-sm text-gray-600">50% affected</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Veterans-Specific Track</span>
                      <span className="text-sm text-gray-600">162 clients</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
