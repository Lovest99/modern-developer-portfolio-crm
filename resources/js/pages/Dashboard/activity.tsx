import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActivityFeedItem } from '@/components/dashboard/ActivityFeed';
import { Calendar, Search, Filter, Download, RefreshCw } from 'lucide-react';
import { DateRangePicker } from '@/components/ui/date-range-picker';

export default function Activity({ activities }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });

  // Filter activities based on search query, type, and date range
  const filteredActivities = activities.filter(activity => {
    // Filter by search query
    const matchesSearch =
      searchQuery === '' ||
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by type
    const matchesType =
      selectedType === 'all' ||
      activity.type === selectedType;

    // Filter by date range
    let matchesDateRange = true;
    if (dateRange.from) {
      const activityDate = new Date(activity.date);
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);

      matchesDateRange = activityDate >= fromDate;

      if (dateRange.to) {
        const toDate = new Date(dateRange.to);
        toDate.setHours(23, 59, 59, 999);
        matchesDateRange = matchesDateRange && activityDate <= toDate;
      }
    }

    return matchesSearch && matchesType && matchesDateRange;
  });

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(activity);
    return groups;
  }, {});

  return (
    <AppLayout>
      <Head title="Activity Feed" />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Activity Feed</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex items-center space-x-2 w-full md:w-1/3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9"
                />
              </div>

              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0 w-full md:w-2/3">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="h-9 w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Activities</SelectItem>
                      <SelectItem value="website_contact">Website Contacts</SelectItem>
                      <SelectItem value="client_communication">Client Communications</SelectItem>
                      <SelectItem value="task">Tasks</SelectItem>
                      <SelectItem value="project">Projects</SelectItem>
                      <SelectItem value="deal">Deals</SelectItem>
                      <SelectItem value="client">Clients</SelectItem>
                      <SelectItem value="meeting">Meetings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <DateRangePicker
                    date={dateRange}
                    onDateChange={setDateRange}
                    className="h-9"
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full justify-start mb-6 bg-muted/50">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="tasks" className="flex-1">Tasks</TabsTrigger>
                <TabsTrigger value="communications" className="flex-1">Communications</TabsTrigger>
                <TabsTrigger value="deals" className="flex-1">Deals</TabsTrigger>
                <TabsTrigger value="projects" className="flex-1">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="m-0">
                {Object.keys(groupedActivities).length > 0 ? (
                  Object.entries(groupedActivities)
                    .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
                    .map(([date, activities]) => (
                      <div key={date} className="mb-8">
                        <h3 className="text-sm font-medium text-muted-foreground mb-4">{date}</h3>
                        <div className="space-y-1 divide-y divide-border">
                          {activities.map((activity) => (
                            <ActivityFeedItem key={activity.id} activity={activity} />
                          ))}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No activities found matching your filters.</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedType('all');
                        setDateRange({ from: undefined, to: undefined });
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tasks" className="m-0">
                {Object.entries(groupedActivities)
                  .map(([date, activities]) => {
                    const taskActivities = activities.filter(a => a.type === 'task');
                    if (taskActivities.length === 0) return null;

                    return (
                      <div key={date} className="mb-8">
                        <h3 className="text-sm font-medium text-muted-foreground mb-4">{date}</h3>
                        <div className="space-y-1 divide-y divide-border">
                          {taskActivities.map((activity) => (
                            <ActivityFeedItem key={activity.id} activity={activity} />
                          ))}
                        </div>
                      </div>
                    );
                  })
                  .filter(Boolean)
                  .length > 0 ? null : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No task activities found matching your filters.</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedType('task');
                        setDateRange({ from: undefined, to: undefined });
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Similar content for other tabs */}
              <TabsContent value="communications" className="m-0">
                {Object.entries(groupedActivities)
                  .map(([date, activities]) => {
                    const commActivities = activities.filter(a =>
                      a.type === 'client_communication' || a.type === 'website_contact'
                    );
                    if (commActivities.length === 0) return null;

                    return (
                      <div key={date} className="mb-8">
                        <h3 className="text-sm font-medium text-muted-foreground mb-4">{date}</h3>
                        <div className="space-y-1 divide-y divide-border">
                          {commActivities.map((activity) => (
                            <ActivityFeedItem key={activity.id} activity={activity} />
                          ))}
                        </div>
                      </div>
                    );
                  })
                  .filter(Boolean)
                  .length > 0 ? null : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No communication activities found matching your filters.</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedType('client_communication');
                        setDateRange({ from: undefined, to: undefined });
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="deals" className="m-0">
                {Object.entries(groupedActivities)
                  .map(([date, activities]) => {
                    const dealActivities = activities.filter(a => a.type === 'deal');
                    if (dealActivities.length === 0) return null;

                    return (
                      <div key={date} className="mb-8">
                        <h3 className="text-sm font-medium text-muted-foreground mb-4">{date}</h3>
                        <div className="space-y-1 divide-y divide-border">
                          {dealActivities.map((activity) => (
                            <ActivityFeedItem key={activity.id} activity={activity} />
                          ))}
                        </div>
                      </div>
                    );
                  })
                  .filter(Boolean)
                  .length > 0 ? null : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No deal activities found matching your filters.</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedType('deal');
                        setDateRange({ from: undefined, to: undefined });
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="projects" className="m-0">
                {Object.entries(groupedActivities)
                  .map(([date, activities]) => {
                    const projectActivities = activities.filter(a => a.type === 'project');
                    if (projectActivities.length === 0) return null;

                    return (
                      <div key={date} className="mb-8">
                        <h3 className="text-sm font-medium text-muted-foreground mb-4">{date}</h3>
                        <div className="space-y-1 divide-y divide-border">
                          {projectActivities.map((activity) => (
                            <ActivityFeedItem key={activity.id} activity={activity} />
                          ))}
                        </div>
                      </div>
                    );
                  })
                  .filter(Boolean)
                  .length > 0 ? null : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No project activities found matching your filters.</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedType('project');
                        setDateRange({ from: undefined, to: undefined });
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
