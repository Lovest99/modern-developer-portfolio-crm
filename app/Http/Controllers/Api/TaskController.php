<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Project\TaskRequest;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends ApiController
{
    /**
     * Display a listing of the tasks.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Task::query();

        // Filter by status if provided
        if ($request->has('status')) {
            $statuses = explode(',', $request->status);
            $query->whereIn('status', $statuses);
        }

        // Filter by priority if provided
        if ($request->has('priority')) {
            $priorities = explode(',', $request->priority);
            $query->whereIn('priority', $priorities);
        }

        // Filter by project if provided
        if ($request->has('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        // Filter by assignee if provided
        if ($request->has('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        // Filter by creator if provided
        if ($request->has('created_by')) {
            $query->where('created_by', $request->created_by);
        }

        // Filter by due date range if provided
        if ($request->has('due_date_from') && $request->has('due_date_to')) {
            $query->whereBetween('due_date', [$request->due_date_from, $request->due_date_to]);
        } elseif ($request->has('due_date_from')) {
            $query->where('due_date', '>=', $request->due_date_from);
        } elseif ($request->has('due_date_to')) {
            $query->where('due_date', '<=', $request->due_date_to);
        }

        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['project', 'assignee', 'creator', 'timeEntries'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $query->with($validRelations);
            }
        }

        // Sorting
        $sortField = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $allowedSortFields = ['title', 'priority', 'status', 'due_date', 'created_at'];

        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Pagination
        $perPage = $request->input('per_page', 15);
        $tasks = $query->paginate($perPage);

        return $this->successResponse($tasks);
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(TaskRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Set the created_by to the authenticated user if not provided
        if (!isset($data['created_by'])) {
            $data['created_by'] = auth()->id();
        }

        $task = Task::create($data);

        // Load relationships
        $task->load(['project', 'assignee', 'creator']);

        return $this->successResponse($task, 'Task created successfully', 201);
    }

    /**
     * Display the specified task.
     */
    public function show(Request $request, Task $task): JsonResponse
    {
        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['project', 'assignee', 'creator', 'timeEntries'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $task->load($validRelations);
            }
        }

        return $this->successResponse($task);
    }

    /**
     * Update the specified task in storage.
     */
    public function update(TaskRequest $request, Task $task): JsonResponse
    {
        $data = $request->validated();
        $task->update($data);

        // Load relationships
        $task->load(['project', 'assignee', 'creator']);

        return $this->successResponse($task, 'Task updated successfully');
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy(Task $task): JsonResponse
    {
        $task->delete();
        return $this->successResponse(null, 'Task deleted successfully');
    }

    /**
     * Get tasks assigned to the authenticated user.
     */
    public function myTasks(Request $request): JsonResponse
    {
        $query = Task::where('assigned_to', auth()->id());

        // Filter by status if provided
        if ($request->has('status')) {
            $statuses = explode(',', $request->status);
            $query->whereIn('status', $statuses);
        }

        // Include relationships
        $query->with(['project', 'creator']);

        // Sorting
        $sortField = $request->input('sort_by', 'due_date');
        $sortDirection = $request->input('sort_direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        // Pagination
        $perPage = $request->input('per_page', 15);
        $tasks = $query->paginate($perPage);

        return $this->successResponse($tasks);
    }
}
