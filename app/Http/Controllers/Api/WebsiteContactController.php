<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Marketing\WebsiteContactRequest;
use App\Models\WebsiteContact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebsiteContactController extends ApiController
{
    /**
     * Display a listing of the website contacts.
     */
    public function index(Request $request): JsonResponse
    {
        $query = WebsiteContact::query();

        // Filter by status if provided
        if ($request->has('status')) {
            $statuses = explode(',', $request->status);
            $query->whereIn('status', $statuses);
        }

        // Filter by assigned user if provided
        if ($request->has('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        // Filter by date range if provided
        if ($request->has('date_from') && $request->has('date_to')) {
            $query->whereBetween('created_at', [$request->date_from, $request->date_to]);
        } elseif ($request->has('date_from')) {
            $query->where('created_at', '>=', $request->date_from);
        } elseif ($request->has('date_to')) {
            $query->where('created_at', '<=', $request->date_to);
        }

        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['assignedUser'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $query->with($validRelations);
            }
        }

        // Search by name, email, subject, or message
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortField = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $allowedSortFields = ['name', 'email', 'subject', 'status', 'created_at'];

        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Pagination
        $perPage = $request->input('per_page', 15);
        $contacts = $query->paginate($perPage);

        return $this->successResponse($contacts);
    }

    /**
     * Store a newly created website contact in storage.
     */
    public function store(WebsiteContactRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Set default status for new submissions
        if (!isset($data['status'])) {
            $data['status'] = 'new';
        }

        $contact = WebsiteContact::create($data);

        return $this->successResponse($contact, 'Contact submission received successfully', 201);
    }

    /**
     * Display the specified website contact.
     */
    public function show(Request $request, WebsiteContact $websiteContact): JsonResponse
    {
        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['assignedUser'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $websiteContact->load($validRelations);
            }
        }

        return $this->successResponse($websiteContact);
    }

    /**
     * Update the specified website contact in storage.
     */
    public function update(WebsiteContactRequest $request, WebsiteContact $websiteContact): JsonResponse
    {
        // Only allow authenticated users to update
        if (!auth()->check()) {
            return $this->errorResponse('Unauthorized', 401);
        }

        $data = $request->validated();
        $websiteContact->update($data);

        // Load relationships
        $websiteContact->load(['assignedUser']);

        return $this->successResponse($websiteContact, 'Contact submission updated successfully');
    }

    /**
     * Remove the specified website contact from storage.
     */
    public function destroy(WebsiteContact $websiteContact): JsonResponse
    {
        // Only allow authenticated users to delete
        if (!auth()->check()) {
            return $this->errorResponse('Unauthorized', 401);
        }

        $websiteContact->delete();
        return $this->successResponse(null, 'Contact submission deleted successfully');
    }

    /**
     * Get contact statistics.
     */
    public function statistics(): JsonResponse
    {
        // Only allow authenticated users to view statistics
        if (!auth()->check()) {
            return $this->errorResponse('Unauthorized', 401);
        }

        $stats = [
            'total' => WebsiteContact::count(),
            'by_status' => [
                'new' => WebsiteContact::where('status', 'new')->count(),
                'in_progress' => WebsiteContact::where('status', 'in_progress')->count(),
                'completed' => WebsiteContact::where('status', 'completed')->count(),
                'spam' => WebsiteContact::where('status', 'spam')->count(),
            ],
            'unassigned' => WebsiteContact::whereNull('assigned_to')->count(),
            'recent' => WebsiteContact::where('created_at', '>=', now()->subDays(7))->count(),
        ];

        return $this->successResponse($stats);
    }
}
