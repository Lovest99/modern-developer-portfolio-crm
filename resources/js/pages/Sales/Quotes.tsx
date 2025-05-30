import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
  Plus as PlusIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  FileText as DocumentTextIcon,
  Building2 as OfficeBuildingIcon,
  User as UserIcon,
  DollarSign as CurrencyDollarIcon,
  Calendar as CalendarIcon,
  ChevronRight as ChevronRightIcon,
  FileDown as DocumentDownloadIcon,
  Mail as MailIcon,
  ArrowUpDown as ArrowUpDownIcon,
  Pencil as PencilIcon,
  Trash as TrashIcon
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  EmptyTableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { formatDistanceToNow } from 'date-fns';

export default function Quotes({ quotes, filters }) {
  const [searchTerm, setSearchTerm] = useState(filters?.search || '');
  const [statusFilter, setStatusFilter] = useState(filters?.status || '');
  const [sortField, setSortField] = useState(filters?.sort_field || 'created_at');
  const [sortDirection, setSortDirection] = useState(filters?.sort_direction || 'desc');

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters({ search: searchTerm });
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    applyFilters({ status: value });
  };

  const handleSort = (field) => {
    const direction = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
    applyFilters({ sort_field: field, sort_direction: direction });
  };

  const applyFilters = (newFilters) => {
    router.get(route('sales.quotes.index'), {
      ...filters,
      ...newFilters
    }, {
      preserveState: true,
      replace: true
    });
  };

  const getSortIcon = (field) => {
    if (field !== sortField) {
      return <ArrowUpDownIcon className="h-4 w-4 ml-1 text-muted-foreground" />;
    }

    return sortDirection === 'asc'
      ? <ArrowUpDownIcon className="h-4 w-4 ml-1 text-primary" />
      : <ArrowUpDownIcon className="h-4 w-4 ml-1 text-primary rotate-180" />;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      sent: { label: 'Sent', className: 'bg-blue-100 text-blue-800' },
      accepted: { label: 'Accepted', className: 'bg-green-100 text-green-800' },
      declined: { label: 'Declined', className: 'bg-red-100 text-red-800' },
      expired: { label: 'Expired', className: 'bg-yellow-100 text-yellow-800' }
    };

    const statusInfo = statusMap[status] || { label: status, className: 'bg-gray-100 text-gray-800' };

    return (
      <Badge variant="outline" className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    );
  };

  const handleDelete = (quoteId) => {
    router.delete(route('sales.quotes.destroy', quoteId), {
      onSuccess: () => {
        // Success notification would go here
      }
    });
  };

  // Sample data for demonstration
  const sampleQuotes = [
    {
      id: 1,
      quote_number: 'Q-2023-001',
      client: { name: 'Acme Corporation', id: 1 },
      contact: { name: 'John Doe', id: 1 },
      total: 5000,
      status: 'sent',
      created_at: '2023-06-15T10:30:00',
      expiry_date: '2023-07-15'
    },
    {
      id: 2,
      quote_number: 'Q-2023-002',
      client: { name: 'Globex Industries', id: 2 },
      contact: { name: 'Jane Smith', id: 2 },
      total: 12500,
      status: 'accepted',
      created_at: '2023-06-20T14:45:00',
      expiry_date: '2023-07-20'
    },
    {
      id: 3,
      quote_number: 'Q-2023-003',
      client: { name: 'Initech LLC', id: 3 },
      contact: { name: 'Michael Johnson', id: 3 },
      total: 3200,
      status: 'draft',
      created_at: '2023-06-25T09:15:00',
      expiry_date: '2023-07-25'
    }
  ];

  // Use sample data if no quotes are provided
  const displayQuotes = quotes?.data?.length > 0 ? quotes.data : sampleQuotes;

  return (
    <AppLayout>
      <Head title="Quotes & Proposals" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Quotes & Proposals</h1>
            <Link href={route('sales.quotes.create')}>
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Quote
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card className="mb-6 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                      type="search"
                      placeholder="Search quotes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                    <Button type="submit" size="icon">
                      <SearchIcon className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
                <div className="w-full sm:w-[180px]">
                  <Select value={statusFilter} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quotes Table */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Quotes & Proposals</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeadCell className="w-[180px]">
                      <button
                        onClick={() => handleSort('quote_number')}
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <span className="uppercase text-xs tracking-wider">QUOTE #</span>
                        {getSortIcon('quote_number')}
                      </button>
                    </TableHeadCell>
                    <TableHeadCell className="w-[180px]">
                      <button
                        onClick={() => handleSort('client')}
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <span className="uppercase text-xs tracking-wider">CLIENT</span>
                        {getSortIcon('client')}
                      </button>
                    </TableHeadCell>
                    <TableHeadCell className="w-[150px]">
                      <button
                        onClick={() => handleSort('contact')}
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <span className="uppercase text-xs tracking-wider">CONTACT</span>
                        {getSortIcon('contact')}
                      </button>
                    </TableHeadCell>
                    <TableHeadCell className="w-[120px]" align="right">
                      <button
                        onClick={() => handleSort('total')}
                        className="flex items-center gap-2 hover:text-primary justify-end"
                      >
                        <span className="uppercase text-xs tracking-wider">TOTAL</span>
                        {getSortIcon('total')}
                      </button>
                    </TableHeadCell>
                    <TableHeadCell className="w-[120px]" align="center">
                      <button
                        onClick={() => handleSort('status')}
                        className="flex items-center gap-2 hover:text-primary justify-center"
                      >
                        <span className="uppercase text-xs tracking-wider">STATUS</span>
                        {getSortIcon('status')}
                      </button>
                    </TableHeadCell>
                    <TableHeadCell className="w-[120px]" align="center">
                      <button
                        onClick={() => handleSort('created_at')}
                        className="flex items-center gap-2 hover:text-primary justify-center"
                      >
                        <span className="uppercase text-xs tracking-wider">CREATED</span>
                        {getSortIcon('created_at')}
                      </button>
                    </TableHeadCell>
                    <TableHeadCell className="w-[120px]" align="center">
                      <button
                        onClick={() => handleSort('expiry_date')}
                        className="flex items-center gap-2 hover:text-primary justify-center"
                      >
                        <span className="uppercase text-xs tracking-wider">EXPIRES</span>
                        {getSortIcon('expiry_date')}
                      </button>
                    </TableHeadCell>
                    <TableHeadCell className="w-[100px]" align="right">
                      <span className="uppercase text-xs tracking-wider">ACTIONS</span>
                    </TableHeadCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayQuotes.length > 0 ? (
                    displayQuotes.map((quote) => (
                      <TableRow key={quote.id}>
                        <TableCell className="font-medium">
                          <Link
                            href={route('sales.quotes.show', quote.id)}
                            className="hover:text-primary hover:underline flex items-center"
                          >
                            <DocumentTextIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            {quote.quote_number}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <OfficeBuildingIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <Link
                              href={route('sales.clients.show', quote.client.id)}
                              className="hover:text-primary hover:underline"
                            >
                              {quote.client.name}
                            </Link>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <Link
                              href={route('sales.contacts.show', quote.contact.id)}
                              className="hover:text-primary hover:underline"
                            >
                              {quote.contact.name}
                            </Link>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex items-center justify-end">
                            <CurrencyDollarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                            {formatCurrency(quote.total)}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {getStatusBadge(quote.status)}
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex items-center justify-center">
                            <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span title={new Date(quote.created_at).toLocaleString()}>
                              {formatDistanceToNow(new Date(quote.created_at), { addSuffix: true })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex items-center justify-center">
                            <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                            {new Date(quote.expiry_date).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <Link href={route('sales.quotes.edit', quote.id)}>
                                <PencilIcon className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                  <TrashIcon className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Quote</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this quote? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(quote.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <EmptyTableRow colSpan={8} message="No quotes found" />
                  )}
                </TableBody>
              </Table>

              {/* Pagination */}
              {quotes?.links && (
                <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {quotes.from || 0} to {quotes.to || 0} of {quotes.total} quotes
                  </div>
                  <div className="flex space-x-1">
                    {quotes.links.map((link, i) => {
                      if (link.url === null) {
                        return (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            disabled
                            className="text-xs"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                          />
                        );
                      }

                      return (
                        <Button
                          key={i}
                          variant={link.active ? "default" : "outline"}
                          size="sm"
                          className="text-xs"
                          onClick={() => router.visit(link.url)}
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
