<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Client\CommunicationRequest;
use App\Models\ClientComm;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommunicationController extends ApiController
{
    /**
     * Display a listing of the communications.
     */
    public function index(Request $request): JsonResponse
    {
        $query = ClientComm::query();

        // Filter by client if provided
        if ($request->has('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        // Filter by channel if provided
        if ($request->has('channel')) {
            $channels = explode(',', $request->channel);
            $query->whereIn('channel', $channels);
        }

        // Filter by direction if provided
        if ($request->has('direction')) {
            $directions = explode(',', $request->direction);
            $query->whereIn('direction', $directions);
        }

        // Filter by user if provided
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
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
            $allowedRelations = ['client', 'client.contact', 'user'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $query->with($validRelations);
            }
        }

        // Search by subject or content
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('subject', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortField = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $allowedSortFields = ['channel', 'direction', 'subject', 'created_at'];

        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Pagination
        $perPage = $request->input('per_page', 15);
        $communications = $query->paginate($perPage);

        return $this->successResponse($communications);
    }

    /**
     * Store a newly created communication in storage.
     */
    public function store(CommunicationRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Set the user_id to the authenticated user if not provided
        if (!isset($data['user_id'])) {
            $data['user_id'] = auth()->id();
        }

        $communication = ClientComm::create($data);

        // Load relationships
        $communication->load(['client', 'client.contact', 'user']);

        return $this->successResponse($communication, 'Communication created successfully', 201);
    }

    /**
     * Display the specified communication.
     */
    public function show(Request $request, ClientComm $communication): JsonResponse
    {
        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['client', 'client.contact', 'user'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $communication->load($validRelations);
            }
        }

        return $this->successResponse($communication);
    }

    /**
     * Update the specified communication in storage.
     */
    public function update(CommunicationRequest $request, ClientComm $communication): JsonResponse
    {
        $data = $request->validated();
        $communication->update($data);

        // Load relationships
        $communication->load(['client', 'client.contact', 'user']);

        return $this->successResponse($communication, 'Communication updated successfully');
    }

    /**
     * Remove the specified communication from storage.
     */
    public function destroy(ClientComm $communication): JsonResponse
    {
        $communication->delete();
        return $this->successResponse(null, 'Communication deleted successfully');
    }

    /**
     * Get communications for the authenticated user.
     */
    public function myCommunications(Request $request): JsonResponse
    {
        $query = ClientComm::where('user_id', auth()->id());

        // Filter by client if provided
        if ($request->has('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        // Include relationships
        $query->with(['client', 'client.contact']);

        // Sorting
        $sortField = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        // Pagination
        $perPage = $request->input('per_page', 15);
        $communications = $query->paginate($perPage);

        return $this->successResponse($communications);
    }
}
