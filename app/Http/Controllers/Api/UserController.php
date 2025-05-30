<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends ApiController
{
    /**
     * Display a listing of the users.
     */
    public function index(Request $request): JsonResponse
    {
        // Only admin users should be able to list all users
        if (!auth()->user()->hasRole('admin')) {
            return $this->errorResponse('Unauthorized', 403);
        }

        $query = User::query();

        // Filter by role if provided
        if ($request->has('role')) {
            $role = $request->role;
            $query->whereHas('roles', function ($q) use ($role) {
                $q->where('name', $role);
            });
        }

        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['roles', 'permissions'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $query->with($validRelations);
            }
        }

        // Search by name or email
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortField = $request->input('sort_by', 'name');
        $sortDirection = $request->input('sort_direction', 'asc');
        $allowedSortFields = ['name', 'email', 'created_at'];

        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Pagination
        $perPage = $request->input('per_page', 15);
        $users = $query->paginate($perPage);

        return $this->successResponse($users);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request): JsonResponse
    {
        // Only admin users should be able to create users
        if (!auth()->user()->hasRole('admin')) {
            return $this->errorResponse('Unauthorized', 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'roles' => 'nullable|array',
            'roles.*' => 'exists:roles,name',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Assign roles if provided
        if ($request->has('roles')) {
            $user->assignRole($request->roles);
        }

        // Load relationships
        $user->load(['roles']);

        return $this->successResponse($user, 'User created successfully', 201);
    }

    /**
     * Display the specified user.
     */
    public function show(Request $request, User $user): JsonResponse
    {
        // Users can only view their own profile or admin users can view any profile
        if (auth()->id() !== $user->id && !auth()->user()->hasRole('admin')) {
            return $this->errorResponse('Unauthorized', 403);
        }

        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['roles', 'permissions'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $user->load($validRelations);
            }
        }

        return $this->successResponse($user);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user): JsonResponse
    {
        // Users can only update their own profile or admin users can update any profile
        if (auth()->id() !== $user->id && !auth()->user()->hasRole('admin')) {
            return $this->errorResponse('Unauthorized', 403);
        }

        $rules = [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
        ];

        // Only admin users can update roles
        if (auth()->user()->hasRole('admin')) {
            $rules['roles'] = 'nullable|array';
            $rules['roles.*'] = 'exists:roles,name';
        }

        // Password is optional for updates
        if ($request->filled('password')) {
            $rules['password'] = 'string|min:8|confirmed';
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        $data = $validator->validated();

        // Only update password if provided
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        // Update roles if provided and user is admin
        if (auth()->user()->hasRole('admin') && $request->has('roles')) {
            $user->syncRoles($request->roles);
        }

        // Load relationships
        $user->load(['roles']);

        return $this->successResponse($user, 'User updated successfully');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user): JsonResponse
    {
        // Only admin users can delete users and they cannot delete themselves
        if (!auth()->user()->hasRole('admin') || auth()->id() === $user->id) {
            return $this->errorResponse('Unauthorized', 403);
        }

        $user->delete();
        return $this->successResponse(null, 'User deleted successfully');
    }

    /**
     * Get the authenticated user's profile.
     */
    public function profile(Request $request): JsonResponse
    {
        $user = auth()->user();

        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['roles', 'permissions'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $user->load($validRelations);
            }
        }

        return $this->successResponse($user);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'current_password' => 'required_with:password|string',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        // Verify current password if changing password
        if ($request->filled('password')) {
            if (!Hash::check($request->current_password, $user->password)) {
                return $this->errorResponse('Current password is incorrect', 422);
            }
        }

        $data = $validator->validated();

        // Remove current_password from data
        unset($data['current_password']);

        // Only update password if provided
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return $this->successResponse($user, 'Profile updated successfully');
    }
}
