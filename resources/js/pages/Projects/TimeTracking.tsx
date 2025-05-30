import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  EmptyTableRow,
  SortableTableHeadCell
} from '@/components/ui/table';
import { Button, LinkButton, IconButton } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import {
  SearchFilter,
  SelectFilter,
  DateRangeFilter,
  FilterPanel,
  useFilters
} from '@/components/ui/filters';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  ClockIcon,
  BriefcaseIcon,
  CheckCircleIcon
} from '@heroicons/react/solid';

export default function TimeTracking({ timeEntries, projects, filters: initialFilters, summary }) {
  const { filters, setFilters, applyFilters, resetFilters } = useFilters(
    initialFilters,
    'projects.time.index'
  );

  const [activeTimer, setActiveTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    // Check if there's an active timer
    const active = timeEntries.data.find(entry => !entry.end_time);

    if (active) {
      const startTime = new Date(active.start_time).getTime();
      const elapsed = Math.floor((Date.now() - startTime) / 1000);

      setActiveTimer(active);
      setElapsedTime(elapsed);

      // Start the timer
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);

      setTimerInterval(interval);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timeEntries.data]);

  const handleSort = (field, direction) => {
    setFilters({
      ...filters,
      sort_field: field,
      sort_direction: direction,
    });
    applyFilters();
  };

  const deleteTimeEntry = (id) => {
    if (confirm('Are you sure you want to delete this time entry?')) {
      router.delete(route('projects.time.destroy', id));
    }
  };

  const startTimer = (projectId, taskId = null) => {
    router.post(route('projects.time.start'), {
      project_id: projectId,
      task_id: taskId,
      description: 'Time tracking',
    });
  };

  const stopTimer = () => {
    if (!activeTimer) return;

    router.put(route('projects.time.stop', activeTimer.id));
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const projectOptions = projects.map(project => ({
    value: project.id.toString(),
    label: project.title,
  }));

  const billableOptions = [
    { value: 'billable', label: 'Billable' },
    { value: 'non_billable', label: 'Non-billable' },
  ];

  return (
    <AppLayout title="Time Tracking">
      <div className="space-y-6">
        {/* Active Timer */}
        <Card className={activeTimer ? 'bg-green-50 border border-green-200' : ''}>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <ClockIcon className={`h-8 w-8 ${activeTimer ? 'text-green-500 animate-pulse' : 'text-gray-400'} mr-3`} />
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {activeTimer ? 'Timer Running' : 'Timer Stopped'}
                  </h2>
                  {activeTimer && (
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">
                        Started at {new Date(activeTimer.start_time).toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activeTimer.project?.title}
                        {activeTimer.task && ` - ${activeTimer.task.title}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                {activeTimer ? (
                  <>
                    <div className="text-2xl font-bold text-gray-900 mr-4">
                      {formatDuration(elapsedTime)}
                    </div>
                    <Button
                      variant="danger"
                      onClick={stopTimer}
                    >
                      <StopIcon className="-ml-1 mr-2 h-5 w-5" />
                      Stop
                    </Button>
                  </>
                ) : (
                  <div className="flex space-x-2">
                    <select
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      defaultValue=""
                    >
                      <option value="" disabled>Select a project</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.title}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant="success"
                      onClick={() => {
                        const select = document.querySelector('select');
                        if (select.value) {
                          startTimer(select.value);
                        }
                      }}
                    >
                      <PlayIcon className="-ml-1 mr-2 h-5 w-5" />
                      Start
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <ClockIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Hours (This Week)
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {summary.weekTotal}
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
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Billable Hours
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {summary.billableTotal}
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
                  <BriefcaseIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Projects Tracked
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {summary.projectsCount}
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
                  <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Tasks Tracked
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {summary.tasksCount}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <SearchFilter
            value={filters.search}
            onChange={(value) => setFilters({ ...filters, search: value })}
            onSubmit={applyFilters}
            placeholder="Search time entries..."
            className="w-full sm:w-64"
          />

          <LinkButton
            href={route('projects.time.create')}
            variant="primary"
            className="whitespace-nowrap"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Time Entry
          </LinkButton>
        </div>

        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onSubmit={applyFilters}
          onReset={resetFilters}
        >
          <SelectFilter
            label="Project"
            value={filters.project_id}
            onChange={(value) => setFilters({ ...filters, project_id: value })}
            options={projectOptions}
          />
          <SelectFilter
            label="Billable"
            value={filters.billable}
            onChange={(value) => setFilters({ ...filters, billable: value })}
            options={billableOptions}
          />
          <DateRangeFilter
            startLabel="From"
            endLabel="To"
            startValue={filters.start_date}
            endValue={filters.end_date}
            onStartChange={(value) => setFilters({ ...filters, start_date: value })}
            onEndChange={(value) => setFilters({ ...filters, end_date: value })}
          />
        </FilterPanel>

        {/* Time Entries Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHead>
                <SortableTableHeadCell
                  field="start_time"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Date
                </SortableTableHeadCell>
                <SortableTableHeadCell
                  field="project_id"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Project
                </SortableTableHeadCell>
                <TableHeadCell>Task</TableHeadCell>
                <TableHeadCell>Description</TableHeadCell>
                <SortableTableHeadCell
                  field="start_time"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Start
                </SortableTableHeadCell>
                <SortableTableHeadCell
                  field="end_time"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  End
                </SortableTableHeadCell>
                <TableHeadCell>Duration</TableHeadCell>
                <TableHeadCell>Billable</TableHeadCell>
                <TableHeadCell className="relative">
                  <span className="sr-only">Actions</span>
                </TableHeadCell>
              </TableHead>
              <TableBody>
                {timeEntries.data.length > 0 ? (
                  timeEntries.data.map((entry) => (
                    <TableRow key={entry.id} className={!entry.end_time ? 'bg-green-50' : ''}>
                      <TableCell>
                        {new Date(entry.start_time).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {entry.project ? (
                          <Link
                            href={route('projects.show', entry.project.id)}
                            className="hover:text-indigo-600"
                          >
                            {entry.project.title}
                          </Link>
                        ) : (
                          <span className="text-gray-400">No project</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {entry.task ? (
                          <Link
                            href={route('projects.tasks.show', entry.task.id)}
                            className="text-gray-500 hover:text-indigo-600"
                          >
                            {entry.task.title}
                          </Link>
                        ) : (
                          <span className="text-gray-400">No task</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {entry.description || 'No description'}
                        </p>
                      </TableCell>
                      <TableCell>
                        {new Date(entry.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </TableCell>
                      <TableCell>
                        {entry.end_time ? (
                          new Date(entry.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        ) : (
                          <Badge variant="green">Running</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {entry.formatted_duration || (
                          <span className="text-green-500 font-medium">
                            {formatDuration(elapsedTime)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {entry.billable ? (
                          <Badge variant="green">Billable</Badge>
                        ) : (
                          <Badge variant="gray">Non-billable</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          {entry.end_time ? (
                            <>
                              <IconButton
                                icon={PencilIcon}
                                variant="transparent"
                                size="sm"
                                srText="Edit time entry"
                                as={Link}
                                href={route('projects.time.edit', entry.id)}
                              />
                              <IconButton
                                icon={TrashIcon}
                                variant="transparent"
                                size="sm"
                                srText="Delete time entry"
                                onClick={() => deleteTimeEntry(entry.id)}
                              />
                            </>
                          ) : (
                            <IconButton
                              icon={StopIcon}
                              variant="transparent"
                              size="sm"
                              srText="Stop timer"
                              onClick={stopTimer}
                              className="text-red-500 hover:text-red-600"
                            />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyTableRow
                    colSpan={9}
                    message="No time entries found. Start tracking your time or add a manual entry."
                  />
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Pagination links={timeEntries.links} />
      </div>
    </AppLayout>
  );
}
