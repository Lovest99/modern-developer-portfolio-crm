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
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  EmptyTableRow
} from '@/components/ui/table';
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
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-base">Filters</h4>
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                      Reset
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Stage</label>
                    <Select value={selectedStage} onValueChange={setSelectedStage}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="All Stages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Stages</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Assigned To</label>
                    <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="All Users" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Users</SelectItem>
                        <SelectItem value="mine">My Leads</SelectItem>
                        {users.map(user => (
                          <SelectItem key={user.id} value={user.id.toString()}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Source</label>
                    <Select value={selectedSource} onValueChange={setSelectedSource}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="All Sources" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Sources</SelectItem>
                        {sources.map(source => (
                          <SelectItem key={source} value={source}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Value Range</label>
                    <div className="flex gap-3">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={valueMin}
                        onChange={(e) => setValueMin(e.target.value)}
                        className="w-1/2 h-10"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={valueMax}
                        onChange={(e) => setValueMax(e.target.value)}
                        className="w-1/2 h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Date Range</label>
                    <div className="flex flex-col gap-3">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {dateRange.start ? format(new Date(dateRange.start), 'PPP') : 'Start date'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {dateRange.end ? format(new Date(dateRange.end), 'PPP') : 'End date'}
                          </span>
                        </div>
                      </div>
                      <Calendar
                        mode="range"
                        selected={{
                          from: dateRange.start ? new Date(dateRange.start) : undefined,
                          to: dateRange.end ? new Date(dateRange.end) : undefined,
                        }}
                        onSelect={(range) => {
                          setDateRange({
                            start: range?.from ? format(range.from, 'yyyy-MM-dd') : null,
                            end: range?.to ? format(range.to, 'yyyy-MM-dd') : null,
                          });
                        }}
                        className="border rounded-md p-3"
                      />
                    </div>
                  </div>

                  <Button className="w-full h-10 mt-2" onClick={() => {
                    applyFilters();
                    setIsFilterPanelOpen(false);
                  }}>
                    Apply Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-r-none h-10"
                onClick={() => toggleViewMode('list')}
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-l-none h-10"
                onClick={() => toggleViewMode('kanban')}
              >
                <LayoutGrid className="h-4 w-4 mr-1" />
                Kanban
              </Button>
            </div>
          </div>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <Card className="shadow-sm">
            <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeadCell className="w-[180px]">
                        <button
                          onClick={() => handleSort('name')}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          <span className="uppercase text-xs tracking-wider">LEAD NAME</span>
                          {getSortIcon('name')}
                        </button>
                      </TableHeadCell>
                      <TableHeadCell className="w-[150px]">
                        <button
                          onClick={() => handleSort('company_id')}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          <span className="uppercase text-xs tracking-wider">COMPANY</span>
                          {getSortIcon('company_id')}
                        </button>
                      </TableHeadCell>
                      <TableHeadCell className="w-[100px]" align="center">
                        <button
                          onClick={() => handleSort('stage')}
                          className="flex items-center gap-2 hover:text-primary justify-center"
                        >
                          <span className="uppercase text-xs tracking-wider">STAGE</span>
                          {getSortIcon('stage')}
                        </button>
                      </TableHeadCell>
                      <TableHeadCell className="w-[100px]" align="right">
                        <button
                          onClick={() => handleSort('amount')}
                          className="flex items-center gap-2 hover:text-primary justify-end"
                        >
                          <span className="uppercase text-xs tracking-wider">VALUE</span>
                          {getSortIcon('amount')}
                        </button>
                      </TableHeadCell>
                      <TableHeadCell className="w-[120px]">
                        <button
                          onClick={() => handleSort('assigned_to')}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          <span className="uppercase text-xs tracking-wider">OWNER</span>
                          {getSortIcon('assigned_to')}
                        </button>
                      </TableHeadCell>
                      <TableHeadCell className="w-[120px]">
                        <button
                          onClick={() => handleSort('created_at')}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          <span className="uppercase text-xs tracking-wider">CREATED</span>
                          {getSortIcon('created_at')}
                        </button>
                      </TableHeadCell>
                      <TableHeadCell className="w-[100px]" align="right">
                        <span className="uppercase text-xs tracking-wider">ACTIONS</span>
                      </TableHeadCell>
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
                          <TableCell align="center">
                            <Badge variant="outline" className={getStageColor(lead.stage)}>
                              {lead.stage === 'prospect' ? 'Prospect' : 'Qualified'}
                            </Badge>
                          </TableCell>
                          <TableCell align="right">
                            <div className="flex items-center justify-end">
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

              {/* Pagination */}
              {leads.data && leads.data.length > 0 && leads.links && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {leads.from} to {leads.to} of {leads.total} leads
                  </div>
                  <div className="flex gap-2">
                    {leads.links.map((link, i) => (
                      <Button
                        key={i}
                        variant={link.active ? 'default' : 'outline'}
                        size="sm"
                        disabled={!link.url}
                        onClick={() => link.url && router.visit(link.url)}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Kanban View */}
        {viewMode === 'kanban' && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {['prospect', 'qualified'].map((stage) => {
                const stageConfig = getStageConfig(stage);
                const stageLeads = allLeads?.[stage] || [];

                return (
                  <div key={stage} className="flex flex-col h-full">
                    <div className={`px-4 py-2 rounded-t-lg ${stageConfig.color}`}>
                      <div className="flex justify-between items-center">
                        <h3 className={`text-sm font-medium ${stageConfig.textColor}`}>
                          {stageConfig.title}
                        </h3>
                        <div className={`text-sm font-medium ${stageConfig.textColor}`}>
                          {stageLeads.length} leads
                        </div>
                      </div>
                    </div>

                    <Droppable droppableId={stage} isDropDisabled={isDropDisabled}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex-1 p-2 overflow-y-auto bg-gray-50 rounded-b-lg ${
                            snapshot.isDraggingOver ? 'bg-gray-100' : ''
                          }`}
                          style={{ minHeight: '60vh', maxHeight: '60vh' }}
                        >
                          {stageLeads.length > 0 ? (
                            stageLeads.map((lead, index) => (
                              <Draggable
                                key={lead.id}
                                draggableId={lead.id.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`mb-2 p-3 bg-white rounded-lg shadow-sm border border-gray-200 ${
                                      snapshot.isDragging ? 'shadow-md' : ''
                                    }`}
                                  >
                                    <div className="flex justify-between items-start">
                                      <Link
                                        href={route('sales.leads.show', lead.id)}
                                        className="text-sm font-medium text-gray-900 hover:text-primary"
                                      >
                                        {lead.name}
                                      </Link>
                                      <div className="relative">
                                        <Button variant="ghost" size="icon" asChild>
                                          <Link href={route('sales.leads.show', lead.id)}>
                                            <MoreVertical className="h-4 w-4" />
                                          </Link>
                                        </Button>
                                      </div>
                                    </div>

                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                      <Building2 className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                      {lead.company?.name || 'No company'}
                                    </div>

                                    {lead.amount && (
                                      <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                        {formatCurrency(lead.amount)}
                                      </div>
                                    )}

                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                      <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                      {lead.assignee?.name || lead.creator?.name || 'Unassigned'}
                                    </div>

                                    {lead.source && (
                                      <div className="mt-2">
                                        <Badge variant="outline" className="text-xs">
                                          <Tag className="mr-1 h-3 w-3" />
                                          {lead.source}
                                        </Badge>
                                      </div>
                                    )}

                                    {lead.probability > 0 && (
                                      <div className="mt-2 flex items-center text-xs text-gray-500">
                                        <Percent className="flex-shrink-0 mr-1 h-3 w-3 text-gray-400" />
                                        {lead.probability}% probability
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <p className="text-sm text-gray-500">No leads in this stage</p>
                            </div>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    </AppLayout>
  );
}
