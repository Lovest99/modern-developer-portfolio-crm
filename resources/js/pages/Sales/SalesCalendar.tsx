import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
  CalendarIcon,
  ViewListIcon,
  ViewGridIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  FilterIcon
} from '@heroicons/react/solid';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';

// This is a placeholder component since the backend for calendar is not yet implemented
export default function SalesCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [filterType, setFilterType] = useState('all');

  // Sample data for demonstration
  const events = [
    {
      id: 1,
      title: 'Client Meeting - Acme Corp',
      start: new Date(2023, 10, 15, 10, 0),
      end: new Date(2023, 10, 15, 11, 30),
      type: 'meeting',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Product Demo - XYZ Inc',
      start: new Date(2023, 10, 18, 14, 0),
      end: new Date(2023, 10, 18, 15, 0),
      type: 'demo',
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Follow-up Call - Global Tech',
      start: new Date(2023, 10, 20, 11, 0),
      end: new Date(2023, 10, 20, 11, 30),
      type: 'call',
      status: 'confirmed'
    },
    {
      id: 4,
      title: 'Proposal Deadline - Startup Inc',
      start: new Date(2023, 10, 25),
      end: new Date(2023, 10, 25),
      type: 'deadline',
      status: 'pending'
    },
    {
      id: 5,
      title: 'Contract Signing - Big Client',
      start: new Date(2023, 10, 28, 15, 0),
      end: new Date(2023, 10, 28, 16, 0),
      type: 'meeting',
      status: 'confirmed'
    }
  ];

  // Filter events based on the selected filter
  const filteredEvents = events.filter(event => {
    if (filterType === 'all') return true;
    return event.type === filterType;
  });

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate days for the month view
  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  // Get events for a specific day
  const getEventsForDay = (day) => {
    return filteredEvents.filter(event => isSameDay(day, event.start));
  };

  // Format time for display
  const formatEventTime = (date) => {
    return format(date, 'h:mm a');
  };

  // Get color for event type
  const getEventColor = (type) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'call':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'demo':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'deadline':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <AppLayout title="Sales Calendar">
      <Head title="Sales Calendar" />

      <div className="space-y-6">
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={goToToday}>
              Today
            </Button>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={prevMonth}>
                <ChevronLeftIcon className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-semibold px-2">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <Button variant="ghost" size="icon" onClick={nextMonth}>
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="call">Calls</SelectItem>
                <SelectItem value="demo">Demos</SelectItem>
                <SelectItem value="deadline">Deadlines</SelectItem>
              </SelectContent>
            </Select>

            <Tabs value={view} onValueChange={setView} className="w-[180px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="month">
                  <ViewGridIcon className="h-4 w-4 mr-2" />
                  Month
                </TabsTrigger>
                <TabsTrigger value="list">
                  <ViewListIcon className="h-4 w-4 mr-2" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Calendar Content */}
        <Card>
          <CardContent className="p-0">
            <TabsContent value="month" className="m-0">
              {/* Month View */}
              <div className="grid grid-cols-7 gap-px bg-gray-200">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="bg-white p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {getDaysInMonth().map((day, i) => {
                  const dayEvents = getEventsForDay(day);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const isCurrentDay = isToday(day);

                  return (
                    <div
                      key={i}
                      className={`min-h-[120px] bg-white p-2 ${
                        !isCurrentMonth ? 'text-gray-400' : ''
                      } ${
                        isCurrentDay ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className={`text-sm font-medium ${
                          isCurrentDay ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
                        }`}>
                          {format(day, 'd')}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="text-xs text-gray-500">
                            {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`px-2 py-1 text-xs rounded border ${getEventColor(event.type)}`}
                          >
                            {event.start.getHours() > 0 && (
                              <div className="font-medium">{formatEventTime(event.start)}</div>
                            )}
                            <div className="truncate">{event.title}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="list" className="m-0">
              {/* List View */}
              <div className="divide-y">
                {filteredEvents.length > 0 ? (
                  filteredEvents
                    .sort((a, b) => a.start.getTime() - b.start.getTime())
                    .map((event) => (
                      <div key={event.id} className="flex items-start p-4 hover:bg-gray-50">
                        <div className="w-16 text-center">
                          <div className="text-sm font-medium">{format(event.start, 'MMM')}</div>
                          <div className="text-2xl font-bold">{format(event.start, 'd')}</div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-medium">{event.title}</h3>
                            <Badge variant="outline" className={getEventColor(event.type)}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <CalendarIcon className="mr-1.5 h-4 w-4 text-gray-400" />
                            {formatEventTime(event.start)} - {formatEventTime(event.end)}
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No events found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {filterType === 'all'
                        ? 'There are no events scheduled for this period.'
                        : `There are no ${filterType} events scheduled for this period.`}
                    </p>
                    <Button className="mt-4">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </CardContent>
        </Card>

        {/* Implementation Note */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FilterIcon className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Implementation Note</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    This is a placeholder component for the Sales Calendar section. The backend implementation
                    for this feature is not yet complete. To fully implement this feature, you would need to:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Create Event and EventType models and migrations</li>
                    <li>Implement an EventController with CRUD operations</li>
                    <li>Add routes for the calendar functionality</li>
                    <li>Create an event creation/editing form</li>
                    <li>Implement notifications and reminders for upcoming events</li>
                    <li>Add integration with external calendars (Google Calendar, Outlook, etc.)</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
