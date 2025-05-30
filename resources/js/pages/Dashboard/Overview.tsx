import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { StatGrid, StatCard } from '@/components/ui/stats';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import {
  User as UsersIcon,
  Briefcase as BriefcaseIcon,
  DollarSign as CurrencyDollarIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  MessageSquare as ChatAltIcon,
  Mail as MailIcon
} from 'lucide-react';

export default function Overview({ metrics, recentActivity }) {
  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <StatGrid>
          <StatCard
            title="Active Deals"
            value={metrics.activeDeals}
            icon={CurrencyDollarIcon}
          />
          <StatCard
            title="Active Projects"
            value={metrics.activeProjects}
            icon={BriefcaseIcon}
          />
          <StatCard
            title="Active Clients"
            value={metrics.activeClients}
            icon={UsersIcon}
          />
          <StatCard
            title="Pending Tasks"
            value={metrics.pendingTasks}
            icon={CheckCircleIcon}
          />
        </StatGrid>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="flex flex-col">
            <ActivityFeed activities={recentActivity} />
            <div className="mt-4 flex justify-center">
              <Link
                href="/dashboard/activity"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                View Full Activity Feed
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader title="Quick Actions" />
            <CardContent>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">Sales</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-4">
                      <button
                        className="block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Add New Lead
                      </button>
                      <button
                        className="block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Create Deal
                      </button>
                      <button
                        className="block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Add New Product
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">Projects</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-4">
                      <button
                        className="block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Create New Project
                      </button>
                      <button
                        className="block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Add New Task
                      </button>
                      <button
                        className="block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Log Time
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">Clients</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-4">
                      <button
                        className="block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Add New Client
                      </button>
                      <button
                        className="block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Log Communication
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">Marketing</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-4">
                      <button
                        className="block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Create Campaign
                      </button>
                      <button
                        className="block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Add Subscriber
                      </button>
                      <button
                        className="block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        View Contact Submissions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar (Placeholder) */}
        <Card>
          <CardHeader
            title="Upcoming Schedule"
            description="Your tasks and meetings for the next 7 days"
          />
          <CardContent className="h-64 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming events</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new task or scheduling a meeting.</p>
              <div className="mt-6">
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Task
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
