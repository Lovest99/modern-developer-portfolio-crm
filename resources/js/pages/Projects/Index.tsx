import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { LinkButton } from '@/components/ui/button';
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
  User as UserIcon,
  Clock as ClockIcon,
  Check as CheckIcon,
  ExternalLink as ExternalLinkIcon
} from 'lucide-react';

export default function ProjectIndex({ projects, teamMembers, filters: initialFilters }) {
  const { filters, setFilters, applyFilters, resetFilters } = useFilters(
    initialFilters,
    'projects.index'
  );

  const statusOptions = [
    { value: 'planning', label: 'Planning' },
    { value: 'development', label: 'Development' },
    { value: 'completed', label: 'Completed' },
    { value: 'archived', label: 'Archived' },
  ];

  const userOptions = [
    { value: 'mine', label: 'My Projects' },
    ...teamMembers.map(member => ({
      value: member.id.toString(),
      label: member.name,
    })),
  ];

  return (
    <AppLayout title="Projects">
      <div className="space-y-6">
        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <SearchFilter
            value={filters.search}
            onChange={(value) => setFilters({ ...filters, search: value })}
            onSubmit={applyFilters}
            placeholder="Search projects..."
            className="w-full sm:w-64"
          />

          <LinkButton
            href={route('projects.create')}
            variant="primary"
            className="whitespace-nowrap"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Project
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
            label="Owner"
            value={filters.user_id}
            onChange={(value) => setFilters({ ...filters, user_id: value })}
            options={userOptions}
          />
        </FilterPanel>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.data.map((project) => (
            <Card key={project.id} className="flex flex-col h-full">
              <div className="relative">
                {project.image ? (
                  <img
                    src={`/storage/${project.image}`}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <StatusBadge status={project.status} />
                </div>
              </div>

              <CardContent className="flex-1">
                <Link
                  href={route('projects.show', project.id)}
                  className="text-lg font-medium text-gray-900 hover:text-indigo-600"
                >
                  {project.title}
                </Link>

                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                  {project.description || 'No description provided.'}
                </p>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <UserIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <span>{project.user.name}</span>
                </div>

                {project.deal && project.deal.company && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span>{project.deal.company.name}</span>
                  </div>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Technologies
                    </h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>

              <div className="px-4 py-4 border-t border-gray-200 sm:px-6">
                <div className="flex justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    <span>{new Date(project.created_at).toLocaleDateString()}</span>
                  </div>

                  <Link
                    href={route('projects.show', project.id)}
                    className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View details
                    <ExternalLinkIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}

          {projects.data.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow">
              <svg
                className="h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
              <p className="text-gray-500 mb-4">No projects found.</p>
              <LinkButton href={route('projects.create')} variant="primary">
                Create your first project
              </LinkButton>
            </div>
          )}
        </div>

        <Pagination links={projects.links} />
      </div>
    </AppLayout>
  );
}
