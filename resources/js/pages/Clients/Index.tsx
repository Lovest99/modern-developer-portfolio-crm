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
  Phone as PhoneIcon,
  Mail as MailIcon,
  ExternalLink as ExternalLinkIcon
} from 'lucide-react';

export default function ClientIndex({ clients, filters: initialFilters }) {
  const { filters, setFilters, applyFilters, resetFilters } = useFilters(
    initialFilters,
    'clients.index'
  );

  const handleSort = (field, direction) => {
    setFilters({
      ...filters,
      sort_field: field,
      sort_direction: direction,
    });
    applyFilters();
  };

  const deleteClient = (id) => {
    if (confirm('Are you sure you want to delete this client?')) {
      router.delete(route('clients.destroy', id));
    }
  };

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'churned', label: 'Churned' },
  ];

  return (
    <AppLayout title="Clients">
      <div className="space-y-6">
        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <SearchFilter
            value={filters.search}
            onChange={(value) => setFilters({ ...filters, search: value })}
            onSubmit={applyFilters}
            placeholder="Search clients..."
            className="w-full sm:w-64"
          />

          <LinkButton
            href={route('clients.create')}
            variant="primary"
            className="whitespace-nowrap"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Client
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
        </FilterPanel>

        {/* Clients Table */}
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
                <TableHeadCell>Contact</TableHeadCell>
                <SortableTableHeadCell
                  field="company"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Company
                </SortableTableHeadCell>
                <SortableTableHeadCell
                  field="client_since"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Client Since
                </SortableTableHeadCell>
                <SortableTableHeadCell
                  field="status"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Status
                </SortableTableHeadCell>
                <SortableTableHeadCell
                  field="lifetime_value"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Lifetime Value
                </SortableTableHeadCell>
                <TableHeadCell className="relative">
                  <span className="sr-only">Actions</span>
                </TableHeadCell>
              </TableHead>
              <TableBody>
                {clients.data.length > 0 ? (
                  clients.data.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium text-gray-900">
                        <Link
                          href={route('clients.show', client.id)}
                          className="hover:text-indigo-600"
                        >
                          {client.contact.full_name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          {client.contact.channels.map((channel) => (
                            <div key={channel.id} className="flex items-center">
                              {channel.channel_type === 'email' && (
                                <>
                                  <MailIcon className="h-4 w-4 text-gray-400 mr-1" />
                                  <a
                                    href={`mailto:${channel.value}`}
                                    className="text-gray-500 hover:text-indigo-600"
                                  >
                                    {channel.value}
                                  </a>
                                </>
                              )}
                              {channel.channel_type === 'phone' && (
                                <>
                                  <PhoneIcon className="h-4 w-4 text-gray-400 mr-1" />
                                  <a
                                    href={`tel:${channel.value}`}
                                    className="text-gray-500 hover:text-indigo-600"
                                  >
                                    {channel.value}
                                  </a>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {client.contact.company ? (
                          <div className="flex items-center">
                            <span className="text-gray-500">
                              {client.contact.company.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(client.client_since).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={client.status} />
                      </TableCell>
                      <TableCell>
                        ${parseFloat(client.lifetime_value).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <IconButton
                            icon={ExternalLinkIcon}
                            variant="transparent"
                            size="sm"
                            srText="View client"
                            as={Link}
                            href={route('clients.show', client.id)}
                          />
                          <IconButton
                            icon={PencilIcon}
                            variant="transparent"
                            size="sm"
                            srText="Edit client"
                            as={Link}
                            href={route('clients.edit', client.id)}
                          />
                          <IconButton
                            icon={TrashIcon}
                            variant="transparent"
                            size="sm"
                            srText="Delete client"
                            onClick={() => deleteClient(client.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyTableRow
                    colSpan={7}
                    message="No clients found. Create your first client to get started."
                  />
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Pagination links={clients.links} />
      </div>
    </AppLayout>
  );
}
