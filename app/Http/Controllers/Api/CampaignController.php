<?php

namespace App\Http\Controllers\Api;

use App\Models\Campaign;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CampaignController extends ApiController
{
    /**
     * Display a listing of the campaigns.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Campaign::query();

        // Filter by status if provided
        if ($request->has('status')) {
            $statuses = explode(',', $request->status);
            $query->whereIn('status', $statuses);
        }

        // Filter by type if provided
        if ($request->has('type')) {
            $types = explode(',', $request->type);
            $query->whereIn('type', $types);
        }

        // Filter by date range if provided
        if ($request->has('start_date_from') && $request->has('start_date_to')) {
            $query->whereBetween('start_date', [$request->start_date_from, $request->start_date_to]);
        } elseif ($request->has('start_date_from')) {
            $query->where('start_date', '>=', $request->start_date_from);
        } elseif ($request->has('start_date_to')) {
            $query->where('start_date', '<=', $request->start_date_to);
        }

        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['owner', 'subscribers'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $query->with($validRelations);
            }
        }

        // Search by name or description
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortField = $request->input('sort_by', 'start_date');
        $sortDirection = $request->input('sort_direction', 'desc');
        $allowedSortFields = ['name', 'type', 'status', 'start_date', 'end_date', 'created_at'];

        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Pagination
        $perPage = $request->input('per_page', 15);
        $campaigns = $query->paginate($perPage);

        return $this->successResponse($campaigns);
    }

    /**
     * Store a newly created campaign in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|in:email,social,content,event,webinar,ppc,seo',
            'status' => 'required|string|in:draft,scheduled,active,completed,cancelled',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric|min:0',
            'owner_id' => 'nullable|exists:users,id',
            'goals' => 'nullable|string',
            'target_audience' => 'nullable|string',
            'success_metrics' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        $data = $validator->validated();

        // Set the owner_id to the authenticated user if not provided
        if (!isset($data['owner_id'])) {
            $data['owner_id'] = auth()->id();
        }

        $campaign = Campaign::create($data);

        // Load relationships
        $campaign->load(['owner']);

        return $this->successResponse($campaign, 'Campaign created successfully', 201);
    }

    /**
     * Display the specified campaign.
     */
    public function show(Request $request, Campaign $campaign): JsonResponse
    {
        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['owner', 'subscribers'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $campaign->load($validRelations);
            }
        }

        return $this->successResponse($campaign);
    }

    /**
     * Update the specified campaign in storage.
     */
    public function update(Request $request, Campaign $campaign): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'sometimes|required|string|in:email,social,content,event,webinar,ppc,seo',
            'status' => 'sometimes|required|string|in:draft,scheduled,active,completed,cancelled',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric|min:0',
            'owner_id' => 'nullable|exists:users,id',
            'goals' => 'nullable|string',
            'target_audience' => 'nullable|string',
            'success_metrics' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        $campaign->update($validator->validated());

        // Load relationships
        $campaign->load(['owner']);

        return $this->successResponse($campaign, 'Campaign updated successfully');
    }

    /**
     * Remove the specified campaign from storage.
     */
    public function destroy(Campaign $campaign): JsonResponse
    {
        $campaign->delete();
        return $this->successResponse(null, 'Campaign deleted successfully');
    }

    /**
     * Get campaign statistics.
     */
    public function statistics(Campaign $campaign): JsonResponse
    {
        // This would typically be connected to your analytics system
        // For now, we'll return some placeholder statistics
        $stats = [
            'subscribers_count' => $campaign->subscribers()->count(),
            'open_rate' => rand(20, 60), // Placeholder
            'click_rate' => rand(5, 30), // Placeholder
            'conversion_rate' => rand(1, 10), // Placeholder
            'roi' => $campaign->budget > 0 ? rand(100, 500) / 100 : 0, // Placeholder
        ];

        return $this->successResponse([
            'campaign' => $campaign,
            'stats' => $stats,
        ]);
    }

    /**
     * Add subscribers to a campaign.
     */
    public function addSubscribers(Request $request, Campaign $campaign): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'subscriber_ids' => 'required|array',
            'subscriber_ids.*' => 'exists:newsletter_subscribers,id',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        $campaign->subscribers()->syncWithoutDetaching($request->subscriber_ids);

        return $this->successResponse(null, 'Subscribers added to campaign successfully');
    }

    /**
     * Remove subscribers from a campaign.
     */
    public function removeSubscribers(Request $request, Campaign $campaign): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'subscriber_ids' => 'required|array',
            'subscriber_ids.*' => 'exists:newsletter_subscribers,id',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        $campaign->subscribers()->detach($request->subscriber_ids);

        return $this->successResponse(null, 'Subscribers removed from campaign successfully');
    }
}
