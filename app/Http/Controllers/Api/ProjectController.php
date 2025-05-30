<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Project\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends ApiController
{
    /**
     * Display a listing of the projects.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Project::query();

        // Filter by status if provided
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by user if provided
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by deal if provided
        if ($request->has('deal_id')) {
            $query->where('deal_id', $request->deal_id);
        }

        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['user', 'deal', 'team', 'tasks', 'timeEntries'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $query->with($validRelations);
            }
        }

        // Pagination
        $perPage = $request->input('per_page', 15);
        $projects = $query->paginate($perPage);

        return $this->successResponse($projects);
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(ProjectRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $data['image'] = $path;
        }

        // Set the user_id to the authenticated user if not provided
        if (!isset($data['user_id'])) {
            $data['user_id'] = auth()->id();
        }

        $project = Project::create($data);

        // Load relationships
        $project->load(['user', 'deal']);

        return $this->successResponse($project, 'Project created successfully', 201);
    }

    /**
     * Display the specified project.
     */
    public function show(Request $request, Project $project): JsonResponse
    {
        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['user', 'deal', 'team', 'tasks', 'timeEntries'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $project->load($validRelations);
            }
        }

        return $this->successResponse($project);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(ProjectRequest $request, Project $project): JsonResponse
    {
        $data = $request->validated();

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($project->image && Storage::disk('public')->exists($project->image)) {
                Storage::disk('public')->delete($project->image);
            }

            $path = $request->file('image')->store('projects', 'public');
            $data['image'] = $path;
        }

        $project->update($data);

        // Load relationships
        $project->load(['user', 'deal']);

        return $this->successResponse($project, 'Project updated successfully');
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(Project $project): JsonResponse
    {
        // Delete project image if exists
        if ($project->image && Storage::disk('public')->exists($project->image)) {
            Storage::disk('public')->delete($project->image);
        }

        $project->delete();

        return $this->successResponse(null, 'Project deleted successfully');
    }
}
