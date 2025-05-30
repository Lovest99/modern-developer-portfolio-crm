import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { DateRangeFilter } from '@/components/ui/filters';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  RefreshIcon
} from '@heroicons/react/solid';

// Mock chart component - in a real app, you'd use a library like Chart.js or Recharts
const Chart = ({ type, data, options }) => {
  return (
    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Chart Placeholder</h3>
        <p className="mt-1 text-sm text-gray-500">
          {type} chart would be rendered here with actual data.
        </p>
      </div>
    </div>
  );
};

export default function MarketingAnalytics({ campaignsByType, campaignsWithROI, websiteStats, emailStats }) {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });

  const [isLoading, setIsLoading] = useState(false);

  const refreshData = () => {
    setIsLoading(true);
    // In a real app, you'd fetch new data here
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'email':
        return 'bg-blue-500';
      case 'social':
        return 'bg-indigo-500';
      case 'content':
        return 'bg-purple-500';
      case 'ppc':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <AppLayout title="Marketing Analytics">
      <div className="space-y-6">
        {/* Date Range and Refresh */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <DateRangeFilter
            startValue={dateRange.start}
            endValue={dateRange.end}
            onStartChange={(value) => setDateRange({ ...dateRange, start: value })}
            onEndChange={(value) => setDateRange({ ...dateRange, end: value })}
            className="w-full sm:w-auto"
          />

          <Button
            variant="white"
            onClick={refreshData}
            disabled={isLoading}
          >
            <RefreshIcon className={`-ml-1 mr-2 h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <ChartBarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Website Visitors
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-lg font-medium text-gray-900">
                        {websiteStats.visitors.toLocaleString()}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold">
                        {websiteStats.visitorChange >= 0 ? (
                          <TrendingUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                        ) : (
                          <TrendingDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                        )}
                        <span className={websiteStats.visitorChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {Math.abs(websiteStats.visitorChange)}%
                        </span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Conversion Rate
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-lg font-medium text-gray-900">
                        {websiteStats.conversionRate}%
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold">
                        {websiteStats.conversionChange >= 0 ? (
                          <TrendingUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                        ) : (
                          <TrendingDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                        )}
                        <span className={websiteStats.conversionChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {Math.abs(websiteStats.conversionChange)}%
                        </span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <CurrencyDollarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Marketing ROI
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-lg font-medium text-gray-900">
                        {websiteStats.roi}%
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold">
                        {websiteStats.roiChange >= 0 ? (
                          <TrendingUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                        ) : (
                          <TrendingDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                        )}
                        <span className={websiteStats.roiChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {Math.abs(websiteStats.roiChange)}%
                        </span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Email Open Rate
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-lg font-medium text-gray-900">
                        {emailStats.openRate}%
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold">
                        {emailStats.openRateChange >= 0 ? (
                          <TrendingUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                        ) : (
                          <TrendingDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                        )}
                        <span className={emailStats.openRateChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {Math.abs(emailStats.openRateChange)}%
                        </span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Website Traffic Chart */}
        <Card>
          <CardHeader
            title="Website Traffic"
            description="Daily visitors and page views"
          />
          <CardContent>
            <Chart
              type="line"
              data={{
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                datasets: [
                  {
                    label: 'Visitors',
                    data: [120, 190, 150, 170, 180, 210, 230],
                  },
                  {
                    label: 'Page Views',
                    data: [320, 390, 350, 470, 480, 510, 530],
                  },
                ],
              }}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Campaign Performance by Type */}
          <Card>
            <CardHeader
              title="Campaign Performance by Type"
              description="Budget allocation and results by campaign type"
            />
            <CardContent>
              <div className="space-y-4">
                {campaignsByType.map((campaign) => (
                  <div key={campaign.type} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className={`h-4 w-4 rounded-full ${getTypeColor(campaign.type)} mr-2`}></span>
                        <h3 className="text-lg font-medium leading-6 text-gray-900 capitalize">
                          {campaign.type}
                        </h3>
                      </div>
                      <Badge variant="blue">{campaign.count} campaigns</Badge>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Total Budget</dt>
                          <dd className="mt-1 text-lg font-medium text-gray-900">
                            ${campaign.total_budget.toLocaleString()}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Total Cost</dt>
                          <dd className="mt-1 text-lg font-medium text-gray-900">
                            ${campaign.total_cost.toLocaleString()}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Campaign ROI */}
          <Card>
            <CardHeader
              title="Campaign ROI"
              description="Return on investment for marketing campaigns"
            />
            <CardContent className="p-0">
              <Table>
                <TableHead>
                  <TableHeadCell>Campaign</TableHeadCell>
                  <TableHeadCell>Type</TableHeadCell>
                  <TableHeadCell>Cost</TableHeadCell>
                  <TableHeadCell>Revenue</TableHeadCell>
                  <TableHeadCell>ROI</TableHeadCell>
                </TableHead>
                <TableBody>
                  {campaignsWithROI.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium text-gray-900">
                        {campaign.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            campaign.type === 'email'
                              ? 'blue'
                              : campaign.type === 'social'
                              ? 'indigo'
                              : campaign.type === 'content'
                              ? 'purple'
                              : campaign.type === 'ppc'
                              ? 'pink'
                              : 'gray'
                          }
                        >
                          {campaign.type}
                        </Badge>
                      </TableCell>
                      <TableCell>${campaign.cost.toLocaleString()}</TableCell>
                      <TableCell>${campaign.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {campaign.roi >= 0 ? (
                            <TrendingUpIcon className="h-5 w-5 text-green-500 mr-1" />
                          ) : (
                            <TrendingDownIcon className="h-5 w-5 text-red-500 mr-1" />
                          )}
                          <span
                            className={
                              campaign.roi >= 0 ? 'text-green-600' : 'text-red-600'
                            }
                          >
                            {campaign.roi}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Email Performance */}
        <Card>
          <CardHeader
            title="Email Performance"
            description="Open rates, click rates, and conversions"
          />
          <CardContent>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="bg-white overflow-hidden rounded-lg border border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Open Rate
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {emailStats.openRate}%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden rounded-lg border border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                      <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Click Rate
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {emailStats.clickRate}%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden rounded-lg border border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Conversion Rate
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {emailStats.conversionRate}%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Chart
                type="bar"
                data={{
                  labels: ['Campaign 1', 'Campaign 2', 'Campaign 3', 'Campaign 4', 'Campaign 5'],
                  datasets: [
                    {
                      label: 'Open Rate',
                      data: [22.5, 24.3, 19.8, 26.1, 23.4],
                    },
                    {
                      label: 'Click Rate',
                      data: [3.2, 3.8, 2.9, 4.1, 3.6],
                    },
                    {
                      label: 'Conversion Rate',
                      data: [0.8, 1.2, 0.7, 1.5, 1.1],
                    },
                  ],
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
