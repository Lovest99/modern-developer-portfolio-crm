import React from 'react';
import { Head } from '@inertiajs/react';
import {
  User as UserIcon,
  Briefcase as BriefcaseIcon,
  DollarSign as BanknotesIcon,
  CheckCircle as CheckCircleIcon,
  Mail as EnvelopeIcon,
  MessageSquare as ChatBubbleLeftIcon,
  Calendar as CalendarIcon,
  Plus
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Dashboard({ metrics, recentActivity }) {
  return (
    <AppLayout title="Dashboard">
      <Head title="Dashboard" />

      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground">Welcome to your portfolio dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BanknotesIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Deals</p>
                  <h3 className="text-2xl font-bold">{metrics.activeDeals}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BriefcaseIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                  <h3 className="text-2xl font-bold">{metrics.activeProjects}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <UserIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                  <h3 className="text-2xl font-bold">{metrics.activeClients}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircleIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                  <h3 className="text-2xl font-bold">{metrics.pendingTasks}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity && recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={`${activity.type}-${activity.id}`} className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="flex-shrink-0">
                      {activity.type === 'website_contact' && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                          <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                      {activity.type === 'client_communication' && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                          <ChatBubbleLeftIcon className="h-5 w-5 text-green-600" />
                        </div>
                      )}
                      {activity.type === 'task' && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                          <CheckCircleIcon className="h-5 w-5 text-amber-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CalendarIcon className="h-12 w-12 text-muted-foreground/60" />
                <h3 className="mt-4 text-lg font-medium">No recent activity</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get started by creating a new task or contacting a client.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <Button className="justify-start gap-2">
                <Plus className="h-4 w-4" />
                Create Project
              </Button>
              <Button className="justify-start gap-2">
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
              <Button className="justify-start gap-2">
                <Plus className="h-4 w-4" />
                Add Client
              </Button>
              <Button className="justify-start gap-2">
                <Plus className="h-4 w-4" />
                Create Deal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
