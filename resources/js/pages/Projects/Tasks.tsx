import React from 'react';
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
import { LinkButton, IconButton } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import {
  SearchFilter,
  SelectFilter,
  FilterPanel,
  useFilters
} from '@/components/ui/filters';
import {
  Plus as PlusIcon,
  Pencil as PencilIcon,
  Trash as TrashIcon,
  Check as CheckIcon,
  Clock as ClockIcon,
  AlertTriangle as ExclamationIcon,
  User as UserIcon,
  Briefcase as BriefcaseIcon,
  ExternalLink as ExternalLinkIcon
} from 'lucide-react';

export default function Tasks({ tasks, projects, teamMembers, filters: initialFilters }) {
  const { filters, setFilters, applyFilters, resetFilters } = useFilters(
    initialFilters,
    'projects.tasks.index'
  );

  const handleSort = (field, direction) => {
    setFilters({
      ...filters,
      sort_field: field,
      sort_direction: direction,
    });
    applyFilters();
  };

  const deleteTask = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      router.delete(route('projects.tasks.destroy', id));
    }
  };

  const updateTaskStatus = (id, status) => {
    router.put(
      route('projects.tasks.update-status', id),
      { status },
      { preserveScroll: true }
    );
  };

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'review', label: 'Review' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ];

  const assigneeOptions = [
    { value: 'me', label: 'Assigned to Me' },
    { value: 'unassigned', label: 'Unassigned' },
    ...teamMembers.map(member => ({
      value: member.id.toString(),
      label: member.name,
    })),
  ];

  const projectOptions = projects.map(project => ({
    value: project.id.toString(),
    label: project.title,
  }));

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent':
        return <ExclamationIcon className="h-5 w-5 text-red-500" />;
      case 'high':
        return <ExclamationIcon className="h-5 w-5 text-yellow-500" />;
      case 'medium':
        return <ExclamationIcon className="h-5 w-5 text-blue-500" />;
      case 'low':
        return <ExclamationIcon className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <AppLayout title="Tasks">
      <div className="space-y-6">
        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <SearchFilter
            value={filters.search}
            onChange={(value) => setFilters({ ...filters, search: value })}
            onSubmit={applyFilters}
            placeholder="Search tasks..."
            className="w-full sm:w-64"
          />

          <LinkButton
            href={route('projects.tasks.create')}
            variant="primary"
            className="whitespace-nowrap"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Task
          </LinkButton>
        </div>

        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onSubmit={applyFilters}
          onReset={resetFilters}
        >
          <SelectFilter
            label="Status"
            value={filters.status}
            onChange={(value) => setFilters({ ...filters, status: value })}
            options={statusOptions}
          />
          <SelectFilter
            label="Priority"
            value={filters.priority}
            onChange={(value) => setFilters({ ...filters, priority: value })}
            options={priorityOptions}
          />
          <SelectFilter
            label="Project"
            value={filters.project_id}
            onChange={(value) => setFilters({ ...filters, project_id: value })}
            options={projectOptions}
          />
          <SelectFilter
            label="Assigned To"
            value={filters.assigned_to}
            onChange={(value) => setFilters({ ...filters, assigned_to: value })}
            options={assigneeOptions}
          />
        </FilterPanel>

        {/* Tasks Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHead>
                <TableHeadCell className="w-10"></TableHeadCell>
                <SortableTableHeadCell
                  field="title"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Task
                </SortableTableHeadCell>
                <SortableTableHeadCell
                  field="project_id"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Project
                </SortableTableHeadCell>
                <SortableTableHeadCell
                  field="assigned_to"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Assigned To
                </SortableTableHeadCell>
                <SortableTableHeadCell
                  field="priority"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Priority
                </SortableTableHeadCell>
                <SortableTableHeadCell
                  field="due_date"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Due Date
                </SortableTableHeadCell>
                <SortableTableHeadCell
                  field="status"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Status
                </SortableTableHeadCell>
                <TableHeadCell className="relative">
                  <span className="sr-only">Actions</span>
                </TableHeadCell>
              </TableHead>
              <TableBody>
                {tasks.data.length > 0 ? (
                  tasks.data.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            checked={task.status === 'completed'}
                            onChange={() =>
                              updateTaskStatus(
                                task.id,
                                task.status === 'completed' ? 'todo' : 'completed'
                              )
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        <Link
                          href={route('projects.tasks.show', task.id)}
                          className="hover:text-indigo-600"
                        >
                          {task.title}
                        </Link>
                        {task.description && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                            {task.description}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        {task.project ? (
                          <Link
                            href={route('projects.show', task.project.id)}
                            className="flex items-center text-gray-500 hover:text-indigo-600"
                          >
                            <BriefcaseIcon className="h-4 w-4 mr-1" />
                            <span>{task.project.title}</span>
                          </Link>
                        ) : (
                          <span className="text-gray-400">No project</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {task.assignee ? (
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <span>{task.assignee.name}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getPriorityIcon(task.priority)}
                          <StatusBadge status={task.priority} className="ml-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        {task.due_date ? (
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <span>{new Date(task.due_date).toLocaleDateString()}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">No due date</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={task.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <IconButton
                            icon={ExternalLinkIcon}
                            variant="transparent"
                            size="sm"
                            srText="View task"
                            as={Link}
                            href={route('projects.tasks.show', task.id)}
                          />
                          <IconButton
                            icon={PencilIcon}
                            variant="transparent"
                            size="sm"
                            srText="Edit task"
                            as={Link}
                            href={route('projects.tasks.edit', task.id)}
                          />
                          <IconButton
                            icon={TrashIcon}
                            variant="transparent"
                            size="sm"
                            srText="Delete task"
                            onClick={() => deleteTask(task.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyTableRow
                    colSpan={8}
                    message="No tasks found. Create your first task to get started."
                  />
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Pagination links={tasks.links} />
      </div>
    </AppLayout>
  );
}
