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
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import {
  SearchFilter,
  SelectFilter,
  FilterPanel,
  useFilters
} from '@/components/ui/filters';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ArrowTopRightOnSquareIcon as ExternalLinkIcon
} from '@heroicons/react/solid';

export default function Campaigns({ campaigns, filters: initialFilters }) {
  const { filters, setFilters, applyFilters, resetFilters } = useFilters(
    initialFilters,
    'marketing.campaigns.index'
  );

  const handleSort = (field, direction) => {
    setFilters({
      ...filters,
      sort_field: field,
      sort_direction: direction,
    });
    applyFilters();
  };

  const deleteCampaign = (id) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      router.delete(route('marketing.campaigns.destroy', id));
    }
  };

  const typeOptions = [
    { value: 'email', label: 'Email' },
    { value: 'social', label: 'Social Media' },
    { value: 'content', label: 'Content' },
    { value: 'ppc', label: 'PPC' },
    { value: 'other', label: 'Other' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
  ];

  const getCampaignStatus = (campaign) => {
    const now = new Date().toISOString().split('T')[0];

    if (campaign.start_date > now) {
      return 'upcoming';
    } else if (!campaign.end_date || campaign.end_date >= now) {
      return 'active';
    } else {
      return 'completed';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="yellow">Upcoming</Badge>;
      case 'active':
        return <Badge variant="green">Active</Badge>;
      case 'completed':
        return <Badge variant="gray">Completed</Badge>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'email':
        return <Badge variant="blue">Email</Badge>;
      case 'social':
        return <Badge variant="indigo">Social Media</Badge>;
      case 'content':
        return <Badge variant="purple">Content</Badge>;
      case 'ppc':
        return <Badge variant="pink">PPC</Badge>;
      default:
        return <Badge variant="gray">Other</Badge>;
    }
  };

  return (
    <AppLayout title="Marketing Campaigns">
      <div className="space-y-6">
        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <SearchFilter
            value={filters.search}
            onChange={(value) => setFilters({ ...filters, search: value })}
            onSubmit={applyFilters}
            placeholder="Search campaigns..."
            className="w-full sm:w-64"
          />

          <LinkButton
            href={route('marketing.campaigns.create')}
            variant="primary"
            className="whitespace-nowrap"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Campaign
          </LinkButton>
        </div>

        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onSubmit={applyFilters}
          onReset={resetFilters}
        >
          <SelectFilter
            label="Type"
            value={filters.type}
            onChange={(value) => setFilters({ ...filters, type: value })}
            options={typeOptions}
          />
          <SelectFilter
            label="Status"
            value={filters.status}
            onChange={(value) => setFilters({ ...filters, status: value })}
            options={statusOptions}
          />
        </FilterPanel>

        {/* Campaigns Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHead>
                <SortableTableHeadCell
                  field="name"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Name
                </SortableTableHeadCell>
                <TableHeadCell>Type</TableHeadCell>
                <SortableTableHeadCell
                  field="start_date"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Dates
                </SortableTableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <SortableTableHeadCell
                  field="budget"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Budget
                </SortableTableHeadCell>
                <TableHeadCell>Metrics</TableHeadCell>
                <TableHeadCell className="relative">
                  <span className="sr-only">Actions</span>
                </TableHeadCell>
              </TableHead>
              <TableBody>
                {campaigns.data.length > 0 ? (
                  campaigns.data.map((campaign) => {
                    const status = getCampaignStatus(campaign);
                    const metrics = campaign.metrics || {};

                    return (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium text-gray-900">
                          <Link
                            href={route('marketing.campaigns.show', campaign.id)}
                            className="hover:text-indigo-600"
                          >
                            {campaign.name}
                          </Link>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                            {campaign.description || 'No description'}
                          </p>
                        </TableCell>
                        <TableCell>{getTypeBadge(campaign.type)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <div>
                              <div>
                                {new Date(campaign.start_date).toLocaleDateString()}
                              </div>
                              {campaign.end_date && (
                                <div className="text-gray-500 text-sm">
                                  to {new Date(campaign.end_date).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(status)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            {campaign.budget && (
                              <div className="flex items-center">
                                <CurrencyDollarIcon className="h-4 w-4 text-gray-400 mr-1" />
                                <span>${parseFloat(campaign.budget).toLocaleString()}</span>
                              </div>
                            )}
                            {campaign.cost && (
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <span>Spent: ${parseFloat(campaign.cost).toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {Object.keys(metrics).length > 0 ? (
                            <div className="space-y-1">
                              {metrics.impressions && (
                                <div className="text-sm">
                                  <span className="font-medium">Impressions:</span>{' '}
                                  {parseInt(metrics.impressions).toLocaleString()}
                                </div>
                              )}
                              {metrics.clicks && (
                                <div className="text-sm">
                                  <span className="font-medium">Clicks:</span>{' '}
                                  {parseInt(metrics.clicks).toLocaleString()}
                                </div>
                              )}
                              {metrics.conversions && (
                                <div className="text-sm">
                                  <span className="font-medium">Conversions:</span>{' '}
                                  {parseInt(metrics.conversions).toLocaleString()}
                                </div>
                              )}
                              {metrics.revenue && (
                                <div className="text-sm">
                                  <span className="font-medium">Revenue:</span> $
                                  {parseFloat(metrics.revenue).toLocaleString()}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">No metrics</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <IconButton
                              icon={ChartBarIcon}
                              variant="transparent"
                              size="sm"
                              srText="View metrics"
                              as={Link}
                              href={route('marketing.campaigns.show', campaign.id)}
                            />
                            <IconButton
                              icon={PencilIcon}
                              variant="transparent"
                              size="sm"
                              srText="Edit campaign"
                              as={Link}
                              href={route('marketing.campaigns.edit', campaign.id)}
                            />
                            <IconButton
                              icon={TrashIcon}
                              variant="transparent"
                              size="sm"
                              srText="Delete campaign"
                              onClick={() => deleteCampaign(campaign.id)}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <EmptyTableRow
                    colSpan={7}
                    message="No campaigns found. Create your first campaign to get started."
                  />
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Pagination links={campaigns.links} />
      </div>
    </AppLayout>
  );
}
