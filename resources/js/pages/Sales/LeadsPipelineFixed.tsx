import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Pagination } from '@/components/ui/pagination';
import {
  Plus,
  Search,
  Filter,
  Building2,
  User,
  DollarSign,
  Calendar as CalendarIcon,
  BarChart,
  ArrowUpRight,
  Clock,
  Percent,
  Tag,
  LayoutGrid,
  List,
  ChevronDown,
  X,
  MoreVertical,
  ArrowUpDown as SortAscendingIcon,
  ArrowDownUp as SortDescendingIcon,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

export default function LeadsPipeline({
  leads,
  allLeads,
  filters = {},
  users = [],
  sources = [],
  metrics = {}
}) {
  // State for filters
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [selectedStage, setSelectedStage] = useState(filters.stage || '');
  const [selectedAssignee, setSelectedAssignee] = useState(filters.assigned_to || '');
  const [selectedCreator, setSelectedCreator] = useState(filters.created_by || '');
  const [selectedSource, setSelectedSource] = useState(filters.source || '');
  const [dateRange, setDateRange] = useState(filters.date_range || { start: null, end: null });
  const [valueMin, setValueMin] = useState(filters.value_min || '');
  const [valueMax, setValueMax] = useState(filters.value_max || '');
  const [sortField, setSortField] = useState(filters.sort_field || 'created_at');
  const [sortDirection, setSortDirection] = useState(filters.sort_direction || 'desc');
  const [viewMode, setViewMode] = useState(filters.view || 'list');

  // State for drag and drop
  const [isDropDisabled, setIsDropDisabled] = useState(false);

  // State for filter panel
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = () => {
    router.get(route('sales.leads.index'), {
      search: searchQuery,
      stage: selectedStage,
      assigned_to: selectedAssignee,
      created_by: selectedCreator,
      source: selectedSource,
      date_range: dateRange.start && dateRange.end ? dateRange : null,
      value_min: valueMin,
      value_max: valueMax,
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
    setSelectedAssignee('');
    setSelectedCreator('');
    setSelectedSource('');
    setDateRange({ start: null, end: null });
    setValueMin('');
    setValueMax('');
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
      assigned_to: selectedAssignee,
      created_by: selectedCreator,
      source: selectedSource,
      date_range: dateRange.start && dateRange.end ? dateRange : null,
      value_min: valueMin,
      value_max: valueMax,
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

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a droppable area
    if (!destination) return;

    // Dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Update lead stage in the database
    if (destination.droppableId !== source.droppableId) {
      setIsDropDisabled(true);

      router.put(
        route('sales.leads.update', draggableId),
        { stage: destination.droppableId },
        {
          preserveScroll: true,
          onSuccess: () => setIsDropDisabled(false),
          onError: () => setIsDropDisabled(false),
        }
      );
    }
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
    router.get(route('sales.leads.index'), {
      ...filters,
      view: mode,
    }, {
      preserveState: true,
      replace: true,
    });
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

  const getStageConfig = (stage) => {
    switch (stage) {
      case 'prospect':
        return { title: 'Prospect', color: 'bg-blue-100', textColor: 'text-blue-800' };
      case 'qualified':
        return { title: 'Qualified', color: 'bg-green-100', textColor: 'text-green-800' };
      default:
        return { title: 'Unknown', color: 'bg-gray-100', textColor: 'text-gray-800' };
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

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="shadow-sm hover:shadow transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Leads</p>
                <p className="text-2xl font-bold">{metrics.total_count || 0}</p>
              </div>
              <div className="rounded-full p-2.5 bg-blue-100">
                <BarChart className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Pipeline Value</p>
                <p className="text-2xl font-bold">{formatCurrency(metrics.total_value || 0)}</p>
              </div>
              <div className="rounded-full p-2.5 bg-green-100">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold">{metrics.conversion_rate || 0}%</p>
              </div>
              <div className="rounded-full p-2.5 bg-purple-100">
                <ArrowUpRight className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Avg. Qualification Time</p>
                <p className="text-2xl font-bold">{metrics.avg_qualification_time || 0} days</p>
              </div>
              <div className="rounded-full p-2.5 bg-orange-100">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
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

            <Popover open={isFilterPanelOpen} onOpenChange={setIsFilterPanelOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2 h-10">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  {Object.keys(filters).length > 1 && (
                    <Badge variant="secondary" className="ml-1">
                      {Object.keys(filters).length - 1}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-5" align="start">
                {/* Filter content here */}
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'outline'}
              size="sm"
              className="h-10"
              onClick={() => toggleViewMode('kanban')}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Kanban
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              className="h-10"
              onClick={() => toggleViewMode('list')}
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* View Modes */}
        {viewMode === 'list' && (
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <button
                          onClick={() => handleSort('name')}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          <span className="uppercase text-xs tracking-wider">LEAD NAME</span>
                          {getSortIcon('name')}
                        </button>
                      </TableHead>
                      <TableHead>
                        <button
                          onClick={() => handleSort('company_id')}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          <span className="uppercase text-xs tracking-wider">COMPANY</span>
                          {getSortIcon('company_id')}
                        </button>
                      </TableHead>
                      <TableHead>
                        <button
                          onClick={() => handleSort('stage')}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          <span className="uppercase text-xs tracking-wider">STAGE</span>
                          {getSortIcon('stage')}
                        </button>
                      </TableHead>
                      <TableHead>
                        <button
                          onClick={() => handleSort('amount')}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          <span className="uppercase text-xs tracking-wider">VALUE</span>
                          {getSortIcon('amount')}
                        </button>
                      </TableHead>
                      <TableHead>
                        <button
                          onClick={() => handleSort('assigned_to')}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          <span className="uppercase text-xs tracking-wider">OWNER</span>
                          {getSortIcon('assigned_to')}
                        </button>
                      </TableHead>
                      <TableHead>
                        <button
                          onClick={() => handleSort('created_at')}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          <span className="uppercase text-xs tracking-wider">CREATED</span>
                          {getSortIcon('created_at')}
                        </button>
                      </TableHead>
                      <TableHead className="text-right">
                        <span className="uppercase text-xs tracking-wider">ACTIONS</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.data && leads.data.length > 0 ? (
                      leads.data.map((lead) => (
                        <TableRow key={lead.id} className="hover:bg-muted/50">
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
                          <TableCell>
                            <Badge variant="outline" className={getStageColor(lead.stage)}>
                              {lead.stage === 'prospect' ? 'Prospect' : 'Qualified'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
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
                              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span title={new Date(lead.created_at).toLocaleString()}>
                                {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
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
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex flex-row items-center justify-center gap-6 text-gray-500">
                            <BarChart className="h-12 w-12 text-gray-300" />
                            <div className="text-left">
                              <h3 className="text-lg font-medium">No leads found</h3>
                              <p className="mt-1">Try adjusting your search or filter to find what you're looking for.</p>
                              <Button
                                variant="outline"
                                className="mt-3"
                                onClick={resetFilters}
                              >
                                Clear filters
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {leads.data && leads.data.length > 0 && leads.links && (
                <div className="mt-6">
                  <Pagination links={leads.links} />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Kanban View */}
        {viewMode === 'kanban' && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prospect Column */}
              <Droppable droppableId="prospect" isDropDisabled={isDropDisabled}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col h-full"
                  >
                    <div className="bg-blue-50 rounded-t-lg p-3 border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200 mr-2">
                            {allLeads.filter(l => l.stage === 'prospect').length}
                          </Badge>
                          <h3 className="font-medium text-blue-800">Prospects</h3>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                          {formatCurrency(allLeads.filter(l => l.stage === 'prospect').reduce((sum, lead) => sum + (lead.amount || 0), 0))}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-blue-50/50 rounded-b-lg p-3 border-x border-b border-blue-200 flex-1 min-h-[500px]">
                      <div className="space-y-3">
                        {allLeads
                          .filter(lead => lead.stage === 'prospect')
                          .map((lead, index) => (
                            <Draggable
                              key={lead.id}
                              draggableId={lead.id.toString()}
                              index={index}
                              isDragDisabled={isDropDisabled}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-white rounded-md p-3 shadow-sm border border-blue-100 hover:shadow-md transition-shadow"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <Link
                                      href={route('sales.leads.show', lead.id)}
                                      className="font-medium text-blue-800 hover:text-blue-600 hover:underline"
                                    >
                                      {lead.name}
                                    </Link>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                          <MoreVertical className="h-4 w-4" />
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
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  {lead.company && (
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                      <Building2 className="mr-1 h-3 w-3" />
                                      {lead.company.name}
                                    </div>
                                  )}
                                  {lead.amount && (
                                    <div className="flex items-center text-sm font-medium">
                                      <DollarSign className="mr-1 h-3 w-3 text-green-600" />
                                      {formatCurrency(lead.amount)}
                                    </div>
                                  )}
                                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                                    <div className="flex items-center">
                                      <User className="mr-1 h-3 w-3" />
                                      {lead.assignee?.name || 'Unassigned'}
                                    </div>
                                    <div>
                                      {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>

              {/* Qualified Column */}
              <Droppable droppableId="qualified" isDropDisabled={isDropDisabled}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col h-full"
                  >
                    <div className="bg-green-50 rounded-t-lg p-3 border border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Badge className="bg-green-100 text-green-800 border-green-200 mr-2">
                            {allLeads.filter(l => l.stage === 'qualified').length}
                          </Badge>
                          <h3 className="font-medium text-green-800">Qualified</h3>
                        </div>
                        <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
                          {formatCurrency(allLeads.filter(l => l.stage === 'qualified').reduce((sum, lead) => sum + (lead.amount || 0), 0))}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-green-50/50 rounded-b-lg p-3 border-x border-b border-green-200 flex-1 min-h-[500px]">
                      <div className="space-y-3">
                        {allLeads
                          .filter(lead => lead.stage === 'qualified')
                          .map((lead, index) => (
                            <Draggable
                              key={lead.id}
                              draggableId={lead.id.toString()}
                              index={index}
                              isDragDisabled={isDropDisabled}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-white rounded-md p-3 shadow-sm border border-green-100 hover:shadow-md transition-shadow"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <Link
                                      href={route('sales.leads.show', lead.id)}
                                      className="font-medium text-green-800 hover:text-green-600 hover:underline"
                                    >
                                      {lead.name}
                                    </Link>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                          <MoreVertical className="h-4 w-4" />
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
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  {lead.company && (
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                      <Building2 className="mr-1 h-3 w-3" />
                                      {lead.company.name}
                                    </div>
                                  )}
                                  {lead.amount && (
                                    <div className="flex items-center text-sm font-medium">
                                      <DollarSign className="mr-1 h-3 w-3 text-green-600" />
                                      {formatCurrency(lead.amount)}
                                    </div>
                                  )}
                                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                                    <div className="flex items-center">
                                      <User className="mr-1 h-3 w-3" />
                                      {lead.assignee?.name || 'Unassigned'}
                                    </div>
                                    <div>
                                      {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        )}
      </div>
    </AppLayout>
  );
}
