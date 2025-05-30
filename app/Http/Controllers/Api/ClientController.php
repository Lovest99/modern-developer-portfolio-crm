<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Client\ClientRequest;
use App\Models\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClientController extends ApiController
{
    /**
     * Display a listing of the clients.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Client::query();

        // Filter by status if provided
        if ($request->has('status')) {
            $statuses = explode(',', $request->status);
            $query->whereIn('status', $statuses);
        }

        // Filter by client_since date range if provided
        if ($request->has('client_since_from') && $request->has('client_since_to')) {
            $query->whereBetween('client_since', [$request->client_since_from, $request->client_since_to]);
        } elseif ($request->has('client_since_from')) {
            $query->where('client_since', '>=', $request->client_since_from);
        } elseif ($request->has('client_since_to')) {
            $query->where('client_since', '<=', $request->client_since_to);
        }

        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['contact', 'contact.company', 'deals', 'communications'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $query->with($validRelations);
            }
        }

        // Search by contact name or company name
        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('contact', function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhereHas('company', function ($q2) use ($search) {
                      $q2->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Sorting
        $sortField = $request->input('sort_by', 'client_since');
        $sortDirection = $request->input('sort_direction', 'desc');
        $allowedSortFields = ['client_since', 'status', 'lifetime_value'];

        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Pagination
        $perPage = $request->input('per_page', 15);
        $clients = $query->paginate($perPage);

        return $this->successResponse($clients);
    }

    /**
     * Store a newly created client in storage.
     */
    public function store(ClientRequest $request): JsonResponse
    {
        $data = $request->validated();
        $client = Client::create($data);

        // Load relationships
        $client->load(['contact', 'contact.company']);

        return $this->successResponse($client, 'Client created successfully', 201);
    }

    /**
     * Display the specified client.
     */
    public function show(Request $request, Client $client): JsonResponse
    {
        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['contact', 'contact.company', 'deals', 'communications'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $client->load($validRelations);
            }
        }

        return $this->successResponse($client);
    }

    /**
     * Update the specified client in storage.
     */
    public function update(ClientRequest $request, Client $client): JsonResponse
    {
        $data = $request->validated();
        $client->update($data);

        // Load relationships
        $client->load(['contact', 'contact.company']);

        return $this->successResponse($client, 'Client updated successfully');
    }

    /**
     * Remove the specified client from storage.
     */
    public function destroy(Client $client): JsonResponse
    {
        $client->delete();
        return $this->successResponse(null, 'Client deleted successfully');
    }

    /**
     * Get client statistics.
     */
    public function statistics(): JsonResponse
    {
        $stats = [
            'total' => Client::count(),
            'active' => Client::where('status', 'active')->count(),
            'inactive' => Client::where('status', 'inactive')->count(),
            'prospect' => Client::where('status', 'prospect')->count(),
            'total_lifetime_value' => Client::sum('lifetime_value'),
            'average_lifetime_value' => Client::avg('lifetime_value'),
        ];

        return $this->successResponse($stats);
    }
}
