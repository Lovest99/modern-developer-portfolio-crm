import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
  BarChart as ChartBarIcon,
  PieChart as ChartPieIcon,
  DollarSign as CurrencyDollarIcon,
  Filter as FilterIcon,
  Calendar as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Download as DownloadIcon
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function Forecast() {
  const [timeframe, setTimeframe] = useState('quarter');
  const [year, setYear] = useState('2023');
  const [quarter, setQuarter] = useState('Q2');
  const [month, setMonth] = useState('May');

  // Sample data for demonstration
  const forecastData = {
    summary: {
      totalForecast: 245000,
      closedDeals: 87500,
      pipeline: 157500,
      targetCompletion: 65,
      quarterlyTarget: 380000,
      yearlyTarget: 1500000,
      yearToDate: 342000
    },
    byStage: [
      { stage: 'Prospect', amount: 42500, count: 8, color: 'bg-blue-200' },
      { stage: 'Qualified', amount: 68000, count: 5, color: 'bg-blue-400' },
      { stage: 'Proposal', amount: 47000, count: 3, color: 'bg-blue-600' },
      { stage: 'Closed', amount: 87500, count: 4, color: 'bg-blue-800' }
    ],
    byMonth: [
      { month: 'Jan', amount: 78000, target: 120000 },
      { month: 'Feb', amount: 92000, target: 120000 },
      { month: 'Mar', amount: 84500, target: 120000 },
      { month: 'Apr', amount: 87500, target: 130000 },
      { month: 'May', amount: 0, target: 130000, forecast: 95000 },
      { month: 'Jun', amount: 0, target: 130000, forecast: 62500 }
    ],
    topDeals: [
      { id: 1, name: 'Enterprise Website Redesign', company: 'Acme Corp', amount: 45000, probability: 80, stage: 'Proposal' },
      { id: 2, name: 'E-commerce Platform', company: 'TechStart Inc', amount: 38000, probability: 60, stage: 'Qualified' },
      { id: 3, name: 'Mobile App Development', company: 'Global Solutions', amount: 32000, probability: 90, stage: 'Proposal' },
      { id: 4, name: 'Digital Marketing Campaign', company: 'Marketing Pros', amount: 28500, probability: 70, stage: 'Qualified' },
      { id: 5, name: 'CRM Integration', company: 'Sales Experts', amount: 24000, probability: 50, stage: 'Prospect' }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AppLayout title="Sales Forecast">
      <Head title="Sales Forecast" />

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Forecast</h1>
          <p className="text-muted-foreground">
            Analyze and predict your future sales performance
          </p>
        </div>
        <Button variant="outline" className="h-10">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="space-y-6">
        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px] h-10">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="quarter">Quarterly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
              </SelectContent>
            </Select>

            {timeframe === 'month' && (
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="w-[180px] h-10">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jan">January</SelectItem>
                  <SelectItem value="Feb">February</SelectItem>
                  <SelectItem value="Mar">March</SelectItem>
                  <SelectItem value="Apr">April</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="Jun">June</SelectItem>
                  <SelectItem value="Jul">July</SelectItem>
                  <SelectItem value="Aug">August</SelectItem>
                  <SelectItem value="Sep">September</SelectItem>
                  <SelectItem value="Oct">October</SelectItem>
                  <SelectItem value="Nov">November</SelectItem>
                  <SelectItem value="Dec">December</SelectItem>
                </SelectContent>
              </Select>
            )}

            {timeframe === 'quarter' && (
              <Select value={quarter} onValueChange={setQuarter}>
                <SelectTrigger className="w-[180px] h-10">
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1">Q1 (Jan-Mar)</SelectItem>
                  <SelectItem value="Q2">Q2 (Apr-Jun)</SelectItem>
                  <SelectItem value="Q3">Q3 (Jul-Sep)</SelectItem>
                  <SelectItem value="Q4">Q4 (Oct-Dec)</SelectItem>
                </SelectContent>
              </Select>
            )}

            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[180px] h-10">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="h-10">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-blue-500 mr-2" />
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(forecastData.summary.totalForecast)}</p>
                  <p className="text-sm text-gray-500">
                    {timeframe === 'month' ? 'This Month' : timeframe === 'quarter' ? 'This Quarter' : 'This Year'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Closed Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ChartPieIcon className="h-8 w-8 text-green-500 mr-2" />
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(forecastData.summary.closedDeals)}</p>
                  <p className="text-sm text-gray-500">
                    {Math.round((forecastData.summary.closedDeals / forecastData.summary.totalForecast) * 100)}% of forecast
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUpIcon className="h-8 w-8 text-blue-500 mr-2" />
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(forecastData.summary.pipeline)}</p>
                  <p className="text-sm text-gray-500">
                    {Math.round((forecastData.summary.pipeline / forecastData.summary.totalForecast) * 100)}% of forecast
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Target Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">{forecastData.summary.targetCompletion}%</p>
                  <p className="text-sm font-medium">
                    {formatCurrency(forecastData.summary.totalForecast)} / {formatCurrency(forecastData.summary.quarterlyTarget)}
                  </p>
                </div>
                <Progress value={forecastData.summary.targetCompletion} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="pipeline">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pipeline">Pipeline Breakdown</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Forecast</TabsTrigger>
            <TabsTrigger value="deals">Top Deals</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline by Stage</CardTitle>
                <CardDescription>Breakdown of your sales pipeline by stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forecastData.byStage.map((item) => (
                    <div key={item.stage} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                          <span className="font-medium">{item.stage}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(item.amount)}</p>
                          <p className="text-sm text-gray-500">{item.count} deals</p>
                        </div>
                      </div>
                      <Progress
                        value={Math.round((item.amount / forecastData.summary.totalForecast) * 100)}
                        className={`h-2 ${item.color}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Actual vs target sales by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forecastData.byMonth.map((item) => (
                    <div key={item.month} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="font-medium">{item.month}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {item.amount > 0
                              ? formatCurrency(item.amount)
                              : item.forecast
                                ? `${formatCurrency(item.forecast)} (forecast)`
                                : 'No data'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Target: {formatCurrency(item.target)}
                          </p>
                        </div>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                              (item.amount / item.target) >= 1 ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${Math.min(Math.round((item.amount / item.target) * 100), 100)}%` }}
                          ></div>
                          {item.forecast && !item.amount && (
                            <div
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-300"
                              style={{ width: `${Math.min(Math.round((item.forecast / item.target) * 100), 100)}%` }}
                            ></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deals" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Deals</CardTitle>
                <CardDescription>Highest value opportunities in your pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forecastData.topDeals.map((deal) => (
                    <div key={deal.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{deal.name}</h3>
                          <p className="text-sm text-gray-500">{deal.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(deal.amount)}</p>
                          <Badge
                            className={
                              deal.stage === 'Closed' ? 'bg-green-500 text-white hover:bg-green-600' :
                              deal.stage === 'Proposal' ? 'bg-gray-500 text-white hover:bg-gray-600' :
                              'border border-gray-200 bg-white text-gray-900 hover:bg-gray-100'
                            }
                          >
                            {deal.stage}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Probability: {deal.probability}%</span>
                          <span>
                            Weighted: {formatCurrency(deal.amount * (deal.probability / 100))}
                          </span>
                        </div>
                        <Progress value={deal.probability} className="h-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
