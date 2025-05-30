<?php

namespace App\Http\Controllers\Api;

use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends ApiController
{
    /**
     * Display a listing of the contacts.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Contact::query();

        // Filter by company if provided
        if ($request->has('company_id')) {
            $query->where('company_id', $request->company_id);
        }

        // Filter by type if provided
        if ($request->has('type')) {
            $types = explode(',', $request->type);
            $query->whereIn('type', $types);
        }

        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['company', 'client', 'deals'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $query->with($validRelations);
            }
        }

        // Search by name, email, or phone
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortField = $request->input('sort_by', 'last_name');
        $sortDirection = $request->input('sort_direction', 'asc');
        $allowedSortFields = ['first_name', 'last_name', 'email', 'phone', 'created_at'];

        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Pagination
        $perPage = $request->input('per_page', 15);
        $contacts = $query->paginate($perPage);

        return $this->successResponse($contacts);
    }

    /**
     * Store a newly created contact in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'job_title' => 'nullable|string|max:255',
            'company_id' => 'nullable|exists:companies,id',
            'type' => 'nullable|string|in:lead,customer,vendor,partner',
            'notes' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        $contact = Contact::create($validator->validated());

        // Load relationships
        if ($request->has('company_id')) {
            $contact->load('company');
        }

        return $this->successResponse($contact, 'Contact created successfully', 201);
    }

    /**
     * Display the specified contact.
     */
    public function show(Request $request, Contact $contact): JsonResponse
    {
        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['company', 'client', 'deals'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $contact->load($validRelations);
            }
        }

        return $this->successResponse($contact);
    }

    /**
     * Update the specified contact in storage.
     */
    public function update(Request $request, Contact $contact): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'job_title' => 'nullable|string|max:255',
            'company_id' => 'nullable|exists:companies,id',
            'type' => 'nullable|string|in:lead,customer,vendor,partner',
            'notes' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        $contact->update($validator->validated());

        // Load relationships
        if ($request->has('company_id')) {
            $contact->load('company');
        }

        return $this->successResponse($contact, 'Contact updated successfully');
    }

    /**
     * Remove the specified contact from storage.
     */
    public function destroy(Contact $contact): JsonResponse
    {
        // Check if contact is associated with a client
        if ($contact->client) {
            return $this->errorResponse('Cannot delete contact associated with a client', 409);
        }

        $contact->delete();
        return $this->successResponse(null, 'Contact deleted successfully');
    }

    /**
     * Convert a contact to a client.
     */
    public function convertToClient(Request $request, Contact $contact): JsonResponse
    {
        // Check if contact is already a client
        if ($contact->client) {
            return $this->errorResponse('Contact is already a client', 409);
        }

        $validator = Validator::make($request->all(), [
            'client_since' => 'required|date',
            'status' => 'required|in:active,inactive,prospect',
            'lifetime_value' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        // Create a new client record
        $client = $contact->client()->create([
            'contact_id' => $contact->id,
            'client_since' => $request->client_since,
            'status' => $request->status,
            'lifetime_value' => $request->lifetime_value ?? 0,
        ]);

        // Load the client relationship
        $contact->load('client');

        return $this->successResponse($contact, 'Contact converted to client successfully');
    }
}
