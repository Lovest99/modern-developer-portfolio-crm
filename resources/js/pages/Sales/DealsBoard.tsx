import React, { useState } from 'react';
import { Link, router, Head } from '@inertiajs/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { LinkButton } from '@/components/ui/button';
import { SearchFilter, FilterPanel, useFilters } from '@/components/ui/filters';
import {
  Plus as PlusIcon,
  DollarSign as CurrencyDollarIcon,
  Building2 as OfficeBuildingIcon,
  User as UserIcon,
  MoreVertical as DotsVerticalIcon
} from 'lucide-react';

export default function DealsBoard({ dealsByStage, filters: initialFilters, message }) {
  const { filters, setFilters, applyFilters, resetFilters } = useFilters(
    initialFilters,
    'sales.deals.board'
  );

  const [isDropDisabled, setIsDropDisabled] = useState(false);

  const stageConfig = {
    prospect: { title: 'Prospect', color: 'bg-gray-100' },
    qualified: { title: 'Qualified', color: 'bg-blue-100' },
    proposal: { title: 'Proposal', color: 'bg-indigo-100' },
    closed: { title: 'Closed', color: 'bg-green-100' },
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

    // Update deal stage in the database
    if (destination.droppableId !== source.droppableId) {
      setIsDropDisabled(true);

      router.put(
        route('sales.deals.update-stage', draggableId),
        { stage: destination.droppableId },
        {
          preserveScroll: true,
          onSuccess: () => setIsDropDisabled(false),
          onError: () => setIsDropDisabled(false),
        }
      );
    }
  };

  const calculateTotalValue = (deals) => {
    return deals.reduce((total, deal) => total + (parseFloat(deal.amount) || 0), 0);
  };

  return (
    <AppLayout title="Deals Board">
      <Head title="Deals Board" />

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deals Board</h1>
          <p className="text-muted-foreground">
            Manage and track your sales opportunities
          </p>
        </div>
        <LinkButton
          href={route('sales.deals.create')}
          variant="primary"
          className="h-10"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          New Deal
        </LinkButton>
      </div>

      <div className="space-y-6">
        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <SearchFilter
            value={filters.search}
            onChange={(value) => setFilters({ ...filters, search: value })}
            onSubmit={applyFilters}
            placeholder="Search deals..."
            className="w-full sm:w-64 h-10"
          />
        </div>

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {Object.keys(stageConfig).map((stage) => (
              <div key={stage} className="flex flex-col h-full">
                <div className={`px-4 py-3 rounded-t-lg ${stageConfig[stage].color}`}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold uppercase tracking-wider">{stageConfig[stage].title}</h3>
                    <div className="text-sm font-medium bg-white/50 px-2 py-1 rounded-full">
                      {dealsByStage[stage]?.length || 0} deals
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-medium">
                    <span className="text-muted-foreground">Total:</span> ${calculateTotalValue(dealsByStage[stage] || []).toLocaleString()}
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
                      {dealsByStage[stage]?.length > 0 ? (
                        dealsByStage[stage].map((deal, index) => (
                          <Draggable
                            key={deal.id}
                            draggableId={deal.id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-primary/20 ${
                                  snapshot.isDragging ? 'shadow-md ring-2 ring-primary/20' : ''
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <Link
                                    href={route('sales.deals.show', deal.id)}
                                    className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                                  >
                                    {deal.name}
                                  </Link>
                                  <div className="relative">
                                    <button className="text-gray-400 hover:text-gray-500">
                                      <DotsVerticalIcon className="h-5 w-5" />
                                    </button>
                                  </div>
                                </div>

                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                  <OfficeBuildingIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  {deal.company?.name || 'No company'}
                                </div>

                                {deal.amount && (
                                  <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                    ${parseFloat(deal.amount).toLocaleString()}
                                  </div>
                                )}

                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                  <UserIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  {deal.user?.name || 'Unassigned'}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-sm text-gray-500">No deals in this stage</p>
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </AppLayout>
  );
}
