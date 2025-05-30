import React from 'react';
import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import {
  Mail as MailIcon,
  MessageSquare as ChatAltIcon,
  CheckCircle as CheckCircleIcon,
  Briefcase as BriefcaseIcon,
  DollarSign as DollarIcon,
  User as UserIcon,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  Bell as BellIcon,
  AlertCircle as AlertCircleIcon
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Activity type definitions
type ActivityType =
  | 'website_contact'
  | 'client_communication'
  | 'task'
  | 'project'
  | 'deal'
  | 'client'
  | 'meeting'
  | 'notification';

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
  url: string;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  status?: 'pending' | 'completed' | 'in_progress';
  priority?: 'low' | 'medium' | 'high';
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

// Helper function to get icon based on activity type
const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'website_contact':
      return <MailIcon className="h-5 w-5 text-blue-500" />;
    case 'client_communication':
      return <ChatAltIcon className="h-5 w-5 text-green-500" />;
    case 'task':
      return <CheckCircleIcon className="h-5 w-5 text-yellow-500" />;
    case 'project':
      return <BriefcaseIcon className="h-5 w-5 text-purple-500" />;
    case 'deal':
      return <DollarIcon className="h-5 w-5 text-emerald-500" />;
    case 'client':
      return <UserIcon className="h-5 w-5 text-indigo-500" />;
    case 'meeting':
      return <CalendarIcon className="h-5 w-5 text-orange-500" />;
    case 'notification':
      return <BellIcon className="h-5 w-5 text-red-500" />;
    default:
      return <AlertCircleIcon className="h-5 w-5 text-gray-500" />;
  }
};

// Helper function to get background color based on activity type
const getActivityBgColor = (type: ActivityType) => {
  switch (type) {
    case 'website_contact':
      return 'bg-blue-50 dark:bg-blue-950';
    case 'client_communication':
      return 'bg-green-50 dark:bg-green-950';
    case 'task':
      return 'bg-yellow-50 dark:bg-yellow-950';
    case 'project':
      return 'bg-purple-50 dark:bg-purple-950';
    case 'deal':
      return 'bg-emerald-50 dark:bg-emerald-950';
    case 'client':
      return 'bg-indigo-50 dark:bg-indigo-950';
    case 'meeting':
      return 'bg-orange-50 dark:bg-orange-950';
    case 'notification':
      return 'bg-red-50 dark:bg-red-950';
    default:
      return 'bg-gray-50 dark:bg-gray-800';
  }
};

// Helper function to get status badge color
const getStatusBadge = (status?: string) => {
  if (!status) return null;

  switch (status) {
    case 'completed':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">Completed</Badge>;
    case 'in_progress':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800">In Progress</Badge>;
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800">Pending</Badge>;
    default:
      return null;
  }
};

// Helper function to get priority badge
const getPriorityBadge = (priority?: string) => {
  if (!priority) return null;

  switch (priority) {
    case 'high':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800">High</Badge>;
    case 'medium':
      return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800">Medium</Badge>;
    case 'low':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">Low</Badge>;
    default:
      return null;
  }
};

export function ActivityFeedItem({ activity }: { activity: Activity }) {
  return (
    <div className="flex gap-4 py-4 group">
      {/* Activity Icon */}
      <div className="relative flex-shrink-0">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ring-4 ring-background ${getActivityBgColor(activity.type)}`}>
          {getActivityIcon(activity.type)}
        </div>
      </div>

      {/* Activity Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <Link
              href={activity.url}
              className="font-medium text-foreground hover:underline transition-colors"
            >
              {activity.title}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {activity.description}
            </p>
          </div>

          {/* Time */}
          <div className="text-xs text-muted-foreground whitespace-nowrap ml-4">
            {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
          </div>
        </div>

        {/* Additional metadata */}
        <div className="mt-2 flex flex-wrap gap-2">
          {/* User who performed the action */}
          {activity.user && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Avatar className="h-5 w-5 mr-1">
                {activity.user.avatar && <AvatarImage src={activity.user.avatar} alt={activity.user.name} />}
                <AvatarFallback className="text-[10px]">{activity.user.initials}</AvatarFallback>
              </Avatar>
              <span>{activity.user.name}</span>
            </div>
          )}

          {/* Status badge if applicable */}
          {getStatusBadge(activity.status)}

          {/* Priority badge if applicable */}
          {getPriorityBadge(activity.priority)}
        </div>
      </div>
    </div>
  );
}

export function ActivityFeed({ activities, className = "" }: ActivityFeedProps) {
  // Group activities by date (today, yesterday, this week, earlier)
  const groupedActivities = activities.reduce((groups, activity) => {
    const activityDate = new Date(activity.date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if the activity is from today
    if (activityDate.toDateString() === today.toDateString()) {
      groups.today.push(activity);
    }
    // Check if the activity is from yesterday
    else if (activityDate.toDateString() === yesterday.toDateString()) {
      groups.yesterday.push(activity);
    }
    // Check if the activity is from this week
    else if (activityDate > new Date(today.setDate(today.getDate() - 7))) {
      groups.thisWeek.push(activity);
    }
    // Otherwise, it's from earlier
    else {
      groups.earlier.push(activity);
    }

    return groups;
  }, { today: [], yesterday: [], thisWeek: [], earlier: [] } as Record<string, Activity[]>);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Activity Feed</h3>
          <Button variant="outline" size="sm">
            <BellIcon className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="all" className="w-full">
          <div className="px-6">
            <TabsList className="w-full justify-start mb-4 bg-muted/50">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="tasks" className="flex-1">Tasks</TabsTrigger>
              <TabsTrigger value="communications" className="flex-1">Communications</TabsTrigger>
              <TabsTrigger value="deals" className="flex-1">Deals</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="m-0">
            <div className="divide-y divide-border">
              {/* Today's activities */}
              {groupedActivities.today.length > 0 && (
                <div className="px-6">
                  <h4 className="text-sm font-medium text-muted-foreground py-2">Today</h4>
                  <div className="divide-y divide-border/50">
                    {groupedActivities.today.map((activity) => (
                      <ActivityFeedItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>
              )}

              {/* Yesterday's activities */}
              {groupedActivities.yesterday.length > 0 && (
                <div className="px-6">
                  <h4 className="text-sm font-medium text-muted-foreground py-2">Yesterday</h4>
                  <div className="divide-y divide-border/50">
                    {groupedActivities.yesterday.map((activity) => (
                      <ActivityFeedItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>
              )}

              {/* This week's activities */}
              {groupedActivities.thisWeek.length > 0 && (
                <div className="px-6">
                  <h4 className="text-sm font-medium text-muted-foreground py-2">This Week</h4>
                  <div className="divide-y divide-border/50">
                    {groupedActivities.thisWeek.map((activity) => (
                      <ActivityFeedItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>
              )}

              {/* Earlier activities */}
              {groupedActivities.earlier.length > 0 && (
                <div className="px-6">
                  <h4 className="text-sm font-medium text-muted-foreground py-2">Earlier</h4>
                  <div className="divide-y divide-border/50">
                    {groupedActivities.earlier.map((activity) => (
                      <ActivityFeedItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {activities.length === 0 && (
                <div className="py-12 px-6 text-center">
                  <BellIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-sm font-medium text-foreground">No activity yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    When you start working on tasks, communicating with clients, or making deals, your activity will show up here.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="m-0">
            <div className="divide-y divide-border px-6">
              {activities.filter(a => a.type === 'task').length > 0 ? (
                activities
                  .filter(a => a.type === 'task')
                  .map((activity) => (
                    <ActivityFeedItem key={activity.id} activity={activity} />
                  ))
              ) : (
                <div className="py-12 text-center">
                  <CheckCircleIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-sm font-medium text-foreground">No task activity</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    When you create or complete tasks, they will appear here.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="communications" className="m-0">
            <div className="divide-y divide-border px-6">
              {activities.filter(a => a.type === 'client_communication' || a.type === 'website_contact').length > 0 ? (
                activities
                  .filter(a => a.type === 'client_communication' || a.type === 'website_contact')
                  .map((activity) => (
                    <ActivityFeedItem key={activity.id} activity={activity} />
                  ))
              ) : (
                <div className="py-12 text-center">
                  <ChatAltIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-sm font-medium text-foreground">No communication activity</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Client communications and website contacts will appear here.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="deals" className="m-0">
            <div className="divide-y divide-border px-6">
              {activities.filter(a => a.type === 'deal').length > 0 ? (
                activities
                  .filter(a => a.type === 'deal')
                  .map((activity) => (
                    <ActivityFeedItem key={activity.id} activity={activity} />
                  ))
              ) : (
                <div className="py-12 text-center">
                  <DollarIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-sm font-medium text-foreground">No deal activity</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    When you create or update deals, they will appear here.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* View all link */}
        <div className="p-4 text-center border-t border-border">
          <Button variant="link" asChild>
            <Link href="/dashboard/activity">View all activity</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ActivityFeed;
