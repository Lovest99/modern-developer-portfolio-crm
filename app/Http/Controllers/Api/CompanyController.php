<?php

namespace App\Http\Controllers\Api;

use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyController extends ApiController
{
    /**
     * Display a listing of the companies.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Company::query();

        // Filter by industry if provided
        if ($request->has('industry')) {
            $industries = explode(',', $request->industry);
            $query->whereIn('industry', $industries);
        }

        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['contacts', 'clients'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $query->with($validRelations);
            }
        }

        // Search by name, website, or industry
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('website', 'like', "%{$search}%")
                  ->orWhere('industry', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortField = $request->input('sort_by', 'name');
        $sortDirection = $request->input('sort_direction', 'asc');
        $allowedSortFields = ['name', 'industry', 'created_at'];

        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Pagination
        $perPage = $request->input('per_page', 15);
        $companies = $query->paginate($perPage);

        return $this->successResponse($companies);
    }

    /**
     * Store a newly created company in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'website' => 'nullable|url|max:255',
            'industry' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        $data = $validator->validated();

        // Handle logo upload if provided
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('companies', 'public');
            $data['logo'] = $path;
        }

        $company = Company::create($data);

        return $this->successResponse($company, 'Company created successfully', 201);
    }

    /**
     * Display the specified company.
     */
    public function show(Request $request, Company $company): JsonResponse
    {
        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['contacts', 'clients'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $company->load($validRelations);
            }
        }

        return $this->successResponse($company);
    }

    /**
     * Update the specified company in storage.
     */
    public function update(Request $request, Company $company): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'website' => 'nullable|url|max:255',
            'industry' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        $data = $validator->validated();

        // Handle logo upload if provided
        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($company->logo && \Storage::disk('public')->exists($company->logo)) {
                \Storage::disk('public')->delete($company->logo);
            }

            $path = $request->file('logo')->store('companies', 'public');
            $data['logo'] = $path;
        }

        $company->update($data);

        return $this->successResponse($company, 'Company updated successfully');
    }

    /**
     * Remove the specified company from storage.
     */
    public function destroy(Company $company): JsonResponse
    {
        // Check if company has contacts
        if ($company->contacts()->count() > 0) {
            return $this->errorResponse('Cannot delete company with associated contacts', 409);
        }

        // Delete logo if exists
        if ($company->logo && \Storage::disk('public')->exists($company->logo)) {
            \Storage::disk('public')->delete($company->logo);
        }

        $company->delete();
        return $this->successResponse(null, 'Company deleted successfully');
    }
}
