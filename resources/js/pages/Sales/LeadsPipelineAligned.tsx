import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  EmptyTableRow
} from '@/components/ui/table-improved';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  Search,
  Filter,
  Building2,
  User,
  DollarSign,
  Calendar as CalendarIcon,
  BarChart,
  ArrowUpDown as SortAscendingIcon,
  ArrowDownUp as SortDescendingIcon,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function LeadsPipeline({
  leads,
  filters = {},
}) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [selectedStage, setSelectedStage] = useState(filters.stage || '');
  const [sortField, setSortField] = useState(filters.sort_field || 'created_at');
  const [sortDirection, setSortDirection] = useState(filters.sort_direction || 'desc');
  const [viewMode, setViewMode] = useState(filters.view || 'list');

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = () => {
    router.get(route('sales.leads.index'), {
      search: searchQuery,
      stage: selectedStage,
      sort_field: sortField,
      sort_direction: sortDirection,
      view: viewMode,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStage('');
    setSortField('created_at');
    setSortDirection('desc');

    router.get(route('sales.leads.index'), {
      view: viewMode,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const handleSort = (field) => {
    const direction = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
    router.get(route('sales.leads.index'), {
      search: searchQuery,
      stage: selectedStage,
      sort_field: field,
      sort_direction: direction,
      view: viewMode,
    });
  };

  const getSortIcon = (field) => {
    if (field !== sortField) {
      return <SortAscendingIcon className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === 'asc'
      ? <SortAscendingIcon className="h-4 w-4 text-primary" />
      : <SortDescendingIcon className="h-4 w-4 text-primary" />;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'prospect':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'qualified':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <AppLayout title="Leads Pipeline">
      <Head title="Leads Pipeline" />

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads Pipeline</h1>
          <p className="text-muted-foreground">
            Manage and track your sales leads
          </p>
        </div>
        <Button asChild className="h-10">
          <Link href={route('sales.leads.create')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64 h-10"
                />
              </div>
              <Button type="submit" variant="secondary" size="icon" className="h-10 w-10">
                <Filter className="h-4 w-4" />
              </Button>
            </form>

            <Select value={selectedStage} onValueChange={(value) => {
              setSelectedStage(value);
              applyFilters();
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Stages</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Leads Table */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeadCell className="w-[250px]">
                      <button
                        onClick={() => handleSort('name')}
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <span className="uppercase text-xs tracking-wider">LEAD NAME</span>
                        {getSortIcon('name')}
                      </button>
                    </TableHeadCell>
                    <TableHeadCell>
                      <button
                        onClick={() => handleSort('company_id')}
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <span className="uppercase text-xs tracking-wider">COMPANY</span>
                        {getSortIcon('company_id')}
                      </button>
                    </TableHeadCell>
                    <TableHeadCell align="center">
                      <button
                        onClick={() => handleSort('stage')}
                        className="flex items-center gap-2 hover:text-primary justify-center"
                      >
                        <span className="uppercase text-xs tracking-wider">STAGE</span>
                        {getSortIcon('stage')}
                      </button>
                    </TableHeadCell>
                    <TableHeadCell align="right">
                      <button
                        onClick={() => handleSort('amount')}
                        className="flex items-center gap-2 hover:text-primary justify-end"
                      >
                        <span className="uppercase text-xs tracking-wider">VALUE</span>
                        {getSortIcon('amount')}
                      </button>
                    </TableHeadCell>
                    <TableHeadCell>
                      <button
                        onClick={() => handleSort('assigned_to')}
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <span className="uppercase text-xs tracking-wider">OWNER</span>
                        {getSortIcon('assigned_to')}
                      </button>
                    </TableHeadCell>
                    <TableHeadCell>
                      <button
                        onClick={() => handleSort('created_at')}
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <span className="uppercase text-xs tracking-wider">CREATED</span>
                        {getSortIcon('created_at')}
                      </button>
                    </TableHeadCell>
                    <TableHeadCell align="right">
                      <span className="uppercase text-xs tracking-wider">ACTIONS</span>
                    </TableHeadCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.data && leads.data.length > 0 ? (
                    leads.data.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">
                          <Link
                            href={route('sales.leads.show', lead.id)}
                            className="hover:text-primary hover:underline"
                          >
                            {lead.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Building2 className="mr-2 h-4 w-4 text-gray-400" />
                            {lead.company?.name || 'No company'}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          <Badge variant="outline" className={getStageColor(lead.stage)}>
                            {lead.stage === 'prospect' ? 'Prospect' : 'Qualified'}
                          </Badge>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex items-center justify-end">
                            <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
                            <span className="font-medium">{lead.amount ? formatCurrency(lead.amount) : 'N/A'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary font-medium">
                              {(lead.assignee?.name || lead.creator?.name || '?').charAt(0)}
                            </div>
                            <span>{lead.assignee?.name || lead.creator?.name || 'Unassigned'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                            <span title={new Date(lead.created_at).toLocaleString()}>
                              {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={route('sales.leads.show', lead.id)}>
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={route('sales.leads.edit', lead.id)}>
                                  Edit Lead
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={route('sales.leads.destroy', lead.id)}
                                  method="delete"
                                  as="button"
                                  className="w-full text-left text-destructive hover:text-destructive"
                                >
                                  Delete Lead
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <EmptyTableRow
                      colSpan={7}
                      message="No leads found. Try adjusting your search or filter to find what you're looking for."
                    />
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
