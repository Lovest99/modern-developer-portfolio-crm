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
import { LinkButton, IconButton, Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import {
  SearchFilter,
  SelectFilter,
  FilterPanel,
  useFilters
} from '@/components/ui/filters';
import {
  Mail as MailIcon,
  Trash as TrashIcon,
  User as UserIcon,
  Clock as ClockIcon,
  Check as CheckIcon,
  X as XIcon,
  AlertTriangle as ExclamationIcon
} from 'lucide-react';

export default function WebsiteContacts({ contacts, filters: initialFilters }) {
  const { filters, setFilters, applyFilters, resetFilters } = useFilters(
    initialFilters,
    'marketing.website-contacts.index'
  );

  const handleSort = (field, direction) => {
    setFilters({
      ...filters,
      sort_field: field,
      sort_direction: direction,
    });
    applyFilters();
  };

  const deleteContact = (id) => {
    if (confirm('Are you sure you want to delete this contact submission?')) {
      router.delete(route('marketing.website-contacts.destroy', id));
    }
  };

  const markAsResponded = (id) => {
    router.put(
      route('marketing.website-contacts.update-status', id),
      { status: 'responded' },
      { preserveScroll: true }
    );
  };

  const markAsSpam = (id) => {
    router.put(
      route('marketing.website-contacts.update-status', id),
      { status: 'spam' },
      { preserveScroll: true }
    );
  };

  const subjectOptions = [
    { value: 'support', label: 'Support' },
    { value: 'sales', label: 'Sales' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'other', label: 'Other' },
  ];

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'responded', label: 'Responded' },
    { value: 'spam', label: 'Spam' },
  ];

  const getSubjectIcon = (subject) => {
    switch (subject) {
      case 'support':
        return <ExclamationIcon className="h-5 w-5 text-yellow-500" />;
      case 'sales':
        return <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>;
      case 'partnership':
        return <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>;
      default:
        return <MailIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <AppLayout title="Website Contact Submissions">
      <div className="space-y-6">
        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <SearchFilter
            value={filters.search}
            onChange={(value) => setFilters({ ...filters, search: value })}
            onSubmit={applyFilters}
            placeholder="Search contacts..."
            className="w-full sm:w-64"
          />
        </div>

        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onSubmit={applyFilters}
          onReset={resetFilters}
        >
          <SelectFilter
            label="Subject"
            value={filters.subject}
            onChange={(value) => setFilters({ ...filters, subject: value })}
            options={subjectOptions}
          />
          <SelectFilter
            label="Status"
            value={filters.status}
            onChange={(value) => setFilters({ ...filters, status: value })}
            options={statusOptions}
          />
        </FilterPanel>

        {/* Contacts Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHead>
                <SortableTableHeadCell
                  field="created_at"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Date
                </SortableTableHeadCell>
                <SortableTableHeadCell
                  field="name"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Name
                </SortableTableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <SortableTableHeadCell
                  field="subject"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Subject
                </SortableTableHeadCell>
                <TableHeadCell>Message</TableHeadCell>
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
                {contacts.data.length > 0 ? (
                  contacts.data.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{new Date(contact.created_at).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{contact.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${contact.email}`}
                          className="flex items-center text-gray-500 hover:text-indigo-600"
                        >
                          <MailIcon className="h-4 w-4 mr-1" />
                          <span>{contact.email}</span>
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getSubjectIcon(contact.subject)}
                          <span className="ml-1 capitalize">{contact.subject}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {contact.message}
                        </p>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={contact.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          {contact.status === 'new' && (
                            <>
                              <IconButton
                                icon={CheckIcon}
                                variant="transparent"
                                size="sm"
                                srText="Mark as responded"
                                onClick={() => markAsResponded(contact.id)}
                              />
                              <IconButton
                                icon={XIcon}
                                variant="transparent"
                                size="sm"
                                srText="Mark as spam"
                                onClick={() => markAsSpam(contact.id)}
                              />
                            </>
                          )}
                          <IconButton
                            icon={TrashIcon}
                            variant="transparent"
                            size="sm"
                            srText="Delete contact"
                            onClick={() => deleteContact(contact.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyTableRow
                    colSpan={7}
                    message="No contact submissions found."
                  />
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Pagination links={contacts.links} />
      </div>
    </AppLayout>
  );
}
