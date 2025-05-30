<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Sales\DealRequest;
use App\Models\Deal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DealController extends ApiController
{
    /**
     * Display a listing of the deals.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Deal::query();

        // Filter by stage if provided
        if ($request->has('stage')) {
            $stages = explode(',', $request->stage);
            $query->whereIn('stage', $stages);
        }

        // Filter by client if provided
        if ($request->has('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        // Filter by assigned user if provided
        if ($request->has('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        // Filter by expected close date range if provided
        if ($request->has('close_date_from') && $request->has('close_date_to')) {
            $query->whereBetween('expected_close_date', [$request->close_date_from, $request->close_date_to]);
        } elseif ($request->has('close_date_from')) {
            $query->where('expected_close_date', '>=', $request->close_date_from);
        } elseif ($request->has('close_date_to')) {
            $query->where('expected_close_date', '<=', $request->close_date_to);
        }

        // Filter by value range if provided
        if ($request->has('value_min') && $request->has('value_max')) {
            $query->whereBetween('value', [$request->value_min, $request->value_max]);
        } elseif ($request->has('value_min')) {
            $query->where('value', '>=', $request->value_min);
        } elseif ($request->has('value_max')) {
            $query->where('value', '<=', $request->value_max);
        }

        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['client', 'client.contact', 'assignedUser', 'projects'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $query->with($validRelations);
            }
        }

        // Search by title or description
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortField = $request->input('sort_by', 'expected_close_date');
        $sortDirection = $request->input('sort_direction', 'asc');
        $allowedSortFields = ['title', 'value', 'stage', 'expected_close_date', 'created_at'];

        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Pagination
        $perPage = $request->input('per_page', 15);
        $deals = $query->paginate($perPage);

        return $this->successResponse($deals);
    }

    /**
     * Store a newly created deal in storage.
     */
    public function store(DealRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Set the assigned_to to the authenticated user if not provided
        if (!isset($data['assigned_to'])) {
            $data['assigned_to'] = auth()->id();
        }

        $deal = Deal::create($data);

        // Load relationships
        $deal->load(['client', 'client.contact', 'assignedUser']);

        return $this->successResponse($deal, 'Deal created successfully', 201);
    }

    /**
     * Display the specified deal.
     */
    public function show(Request $request, Deal $deal): JsonResponse
    {
        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['client', 'client.contact', 'assignedUser', 'projects'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $deal->load($validRelations);
            }
        }

        return $this->successResponse($deal);
    }

    /**
     * Update the specified deal in storage.
     */
    public function update(DealRequest $request, Deal $deal): JsonResponse
    {
        $data = $request->validated();
        $deal->update($data);

        // Load relationships
        $deal->load(['client', 'client.contact', 'assignedUser']);

        return $this->successResponse($deal, 'Deal updated successfully');
    }

    /**
     * Remove the specified deal from storage.
     */
    public function destroy(Deal $deal): JsonResponse
    {
        $deal->delete();
        return $this->successResponse(null, 'Deal deleted successfully');
    }

    /**
     * Get deal statistics.
     */
    public function statistics(): JsonResponse
    {
        $stats = [
            'total' => Deal::count(),
            'total_value' => Deal::sum('value'),
            'average_value' => Deal::avg('value'),
            'by_stage' => [
                'prospect' => [
                    'count' => Deal::where('stage', 'prospect')->count(),
                    'value' => Deal::where('stage', 'prospect')->sum('value'),
                ],
                'qualified' => [
                    'count' => Deal::where('stage', 'qualified')->count(),
                    'value' => Deal::where('stage', 'qualified')->sum('value'),
                ],
                'proposal' => [
                    'count' => Deal::where('stage', 'proposal')->count(),
                    'value' => Deal::where('stage', 'proposal')->sum('value'),
                ],
                'negotiation' => [
                    'count' => Deal::where('stage', 'negotiation')->count(),
                    'value' => Deal::where('stage', 'negotiation')->sum('value'),
                ],
                'closed_won' => [
                    'count' => Deal::where('stage', 'closed_won')->count(),
                    'value' => Deal::where('stage', 'closed_won')->sum('value'),
                ],
                'closed_lost' => [
                    'count' => Deal::where('stage', 'closed_lost')->count(),
                    'value' => Deal::where('stage', 'closed_lost')->sum('value'),
                ],
            ],
        ];

        return $this->successResponse($stats);
    }

    /**
     * Get deals assigned to the authenticated user.
     */
    public function myDeals(Request $request): JsonResponse
    {
        $query = Deal::where('assigned_to', auth()->id());

        // Filter by stage if provided
        if ($request->has('stage')) {
            $stages = explode(',', $request->stage);
            $query->whereIn('stage', $stages);
        }

        // Include relationships
        $query->with(['client', 'client.contact']);

        // Sorting
        $sortField = $request->input('sort_by', 'expected_close_date');
        $sortDirection = $request->input('sort_direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        // Pagination
        $perPage = $request->input('per_page', 15);
        $deals = $query->paginate($perPage);

        return $this->successResponse($deals);
    }
}
