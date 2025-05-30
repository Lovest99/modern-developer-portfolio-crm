import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
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
  FilterPanel,
  useFilters
} from '@/components/ui/filters';
import {
  Plus as PlusIcon,
  Trash as TrashIcon,
  Mail as MailIcon,
  Clock as ClockIcon,
  Check as CheckIcon,
  X as XIcon,
  Upload as UploadIcon,
  Download as DownloadIcon
} from 'lucide-react';

export default function Subscribers({ subscribers, filters: initialFilters, stats }) {
  const { filters, setFilters, applyFilters, resetFilters } = useFilters(
    initialFilters,
    'marketing.subscribers.index'
  );

  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importing, setImporting] = useState(false);

  const handleSort = (field, direction) => {
    setFilters({
      ...filters,
      sort_field: field,
      sort_direction: direction,
    });
    applyFilters();
  };

  const deleteSubscriber = (id) => {
    if (confirm('Are you sure you want to delete this subscriber?')) {
      router.delete(route('marketing.subscribers.destroy', id));
    }
  };

  const confirmSubscriber = (id) => {
    router.put(
      route('marketing.subscribers.confirm', id),
      {},
      { preserveScroll: true }
    );
  };

  const handleImportSubmit = (e) => {
    e.preventDefault();

    if (!importFile) return;

    setImporting(true);

    const formData = new FormData();
    formData.append('file', importFile);

    router.post(route('marketing.subscribers.import'), formData, {
      onSuccess: () => {
        setShowImportModal(false);
        setImportFile(null);
        setImporting(false);
      },
      onError: () => {
        setImporting(false);
      },
    });
  };

  const sourceOptions = [
    { value: 'website', label: 'Website' },
    { value: 'import', label: 'Import' },
    { value: 'manual', label: 'Manual' },
  ];

  const statusOptions = [
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'unconfirmed', label: 'Unconfirmed' },
    { value: 'unsubscribed', label: 'Unsubscribed' },
  ];

  return (
    <AppLayout title="Newsletter Subscribers">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <MailIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Subscribers
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.total.toLocaleString()}
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
                  <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Confirmed
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.confirmed.toLocaleString()}
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
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <ClockIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Unconfirmed
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.unconfirmed.toLocaleString()}
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
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Unsubscribed
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.unsubscribed.toLocaleString()}
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
            placeholder="Search subscribers..."
            className="w-full sm:w-64"
          />

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="white"
              onClick={() => setShowImportModal(true)}
            >
              <UploadIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Import
            </Button>

            <LinkButton
              href={route('marketing.subscribers.export')}
              variant="white"
            >
              <DownloadIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Export
            </LinkButton>

            <LinkButton
              href={route('marketing.subscribers.create')}
              variant="primary"
              className="whitespace-nowrap"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Subscriber
            </LinkButton>
          </div>
        </div>

        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onSubmit={applyFilters}
          onReset={resetFilters}
        >
          <SelectFilter
            label="Source"
            value={filters.source}
            onChange={(value) => setFilters({ ...filters, source: value })}
            options={sourceOptions}
          />
          <SelectFilter
            label="Status"
            value={filters.status}
            onChange={(value) => setFilters({ ...filters, status: value })}
            options={statusOptions}
          />
        </FilterPanel>

        {/* Subscribers Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHead>
                <TableHeadCell className="w-12">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </TableHeadCell>
                <SortableTableHeadCell
                  field="email"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Email
                </SortableTableHeadCell>
                <SortableTableHeadCell
                  field="subscribed_at"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Subscribed
                </SortableTableHeadCell>
                <SortableTableHeadCell
                  field="source"
                  currentSortField={filters.sort_field}
                  currentSortDirection={filters.sort_direction}
                  onSort={handleSort}
                >
                  Source
                </SortableTableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell className="relative">
                  <span className="sr-only">Actions</span>
                </TableHeadCell>
              </TableHead>
              <TableBody>
                {subscribers.data.length > 0 ? (
                  subscribers.data.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        <a
                          href={`mailto:${subscriber.email}`}
                          className="flex items-center hover:text-indigo-600"
                        >
                          <MailIcon className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{subscriber.email}</span>
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{new Date(subscriber.subscribed_at).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            subscriber.source === 'website'
                              ? 'blue'
                              : subscriber.source === 'import'
                              ? 'yellow'
                              : 'purple'
                          }
                        >
                          {subscriber.source}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {subscriber.is_confirmed ? (
                          <Badge variant="green">Confirmed</Badge>
                        ) : subscriber.unsubscribed_at ? (
                          <Badge variant="red">Unsubscribed</Badge>
                        ) : (
                          <Badge variant="yellow">Unconfirmed</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          {!subscriber.is_confirmed && !subscriber.unsubscribed_at && (
                            <IconButton
                              icon={CheckIcon}
                              variant="transparent"
                              size="sm"
                              srText="Confirm subscriber"
                              onClick={() => confirmSubscriber(subscriber.id)}
                            />
                          )}
                          <IconButton
                            icon={TrashIcon}
                            variant="transparent"
                            size="sm"
                            srText="Delete subscriber"
                            onClick={() => deleteSubscriber(subscriber.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyTableRow
                    colSpan={6}
                    message="No subscribers found."
                  />
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Pagination links={subscribers.links} />
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleImportSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <UploadIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Import Subscribers
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Upload a CSV file with subscriber emails. The file should have a header row and at least one column named "email".
                        </p>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            CSV File
                          </label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    accept=".csv"
                                    onChange={(e) => setImportFile(e.target.files[0])}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">CSV up to 10MB</p>
                            </div>
                          </div>
                          {importFile && (
                            <p className="mt-2 text-sm text-gray-500">
                              Selected file: {importFile.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto sm:ml-3"
                    disabled={!importFile || importing}
                  >
                    {importing ? 'Importing...' : 'Import'}
                  </Button>
                  <Button
                    type="button"
                    variant="white"
                    className="mt-3 w-full sm:mt-0 sm:w-auto"
                    onClick={() => setShowImportModal(false)}
                    disabled={importing}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
