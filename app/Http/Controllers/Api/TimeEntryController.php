<?php

namespace App\Http\Controllers\Api;

use App\Models\TimeEntry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TimeEntryController extends ApiController
{
    /**
     * Display a listing of the time entries.
     */
    public function index(Request $request): JsonResponse
    {
        $query = TimeEntry::query();

        // Filter by project if provided
        if ($request->has('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        // Filter by task if provided
        if ($request->has('task_id')) {
            $query->where('task_id', $request->task_id);
        }

        // Filter by user if provided
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by date range if provided
        if ($request->has('date_from') && $request->has('date_to')) {
            $query->where(function ($q) use ($request) {
                $q->whereBetween('start_time', [$request->date_from, $request->date_to])
                  ->orWhereBetween('end_time', [$request->date_from, $request->date_to]);
            });
        } elseif ($request->has('date_from')) {
            $query->where('start_time', '>=', $request->date_from);
        } elseif ($request->has('date_to')) {
            $query->where('start_time', '<=', $request->date_to);
        }

        // Filter by billable status if provided
        if ($request->has('billable')) {
            $billable = filter_var($request->billable, FILTER_VALIDATE_BOOLEAN);
            $query->where('billable', $billable);
        }

        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['project', 'task', 'user'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $query->with($validRelations);
            }
        }

        // Sorting
        $sortField = $request->input('sort_by', 'start_time');
        $sortDirection = $request->input('sort_direction', 'desc');
        $allowedSortFields = ['start_time', 'end_time', 'duration', 'created_at'];

        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Pagination
        $perPage = $request->input('per_page', 15);
        $timeEntries = $query->paginate($perPage);

        return $this->successResponse($timeEntries);
    }

    /**
     * Store a newly created time entry in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id',
            'task_id' => 'nullable|exists:tasks,id',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'nullable|date|after:start_time',
            'duration' => 'nullable|integer|min:0',
            'billable' => 'boolean',
            'user_id' => 'nullable|exists:users,id',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        $data = $validator->validated();

        // Set the user_id to the authenticated user if not provided
        if (!isset($data['user_id'])) {
            $data['user_id'] = auth()->id();
        }

        // Calculate duration if end_time is provided but duration is not
        if (isset($data['end_time']) && !isset($data['duration'])) {
            $startTime = new \DateTime($data['start_time']);
            $endTime = new \DateTime($data['end_time']);
            $data['duration'] = $endTime->getTimestamp() - $startTime->getTimestamp();
        }

        $timeEntry = TimeEntry::create($data);

        // Load relationships
        $timeEntry->load(['project', 'task', 'user']);

        return $this->successResponse($timeEntry, 'Time entry created successfully', 201);
    }

    /**
     * Display the specified time entry.
     */
    public function show(Request $request, TimeEntry $timeEntry): JsonResponse
    {
        // Include relationships if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->with);
            $allowedRelations = ['project', 'task', 'user'];
            $validRelations = array_intersect($allowedRelations, $relations);

            if (!empty($validRelations)) {
                $timeEntry->load($validRelations);
            }
        }

        return $this->successResponse($timeEntry);
    }

    /**
     * Update the specified time entry in storage.
     */
    public function update(Request $request, TimeEntry $timeEntry): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'sometimes|required|exists:projects,id',
            'task_id' => 'nullable|exists:tasks,id',
            'description' => 'nullable|string',
            'start_time' => 'sometimes|required|date',
            'end_time' => 'nullable|date|after:start_time',
            'duration' => 'nullable|integer|min:0',
            'billable' => 'boolean',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        $data = $validator->validated();

        // Calculate duration if end_time is provided but duration is not
        if (isset($data['end_time']) && !isset($data['duration'])) {
            $startTime = new \DateTime($data['start_time'] ?? $timeEntry->start_time);
            $endTime = new \DateTime($data['end_time']);
            $data['duration'] = $endTime->getTimestamp() - $startTime->getTimestamp();
        }

        $timeEntry->update($data);

        // Load relationships
        $timeEntry->load(['project', 'task', 'user']);

        return $this->successResponse($timeEntry, 'Time entry updated successfully');
    }

    /**
     * Remove the specified time entry from storage.
     */
    public function destroy(TimeEntry $timeEntry): JsonResponse
    {
        $timeEntry->delete();
        return $this->successResponse(null, 'Time entry deleted successfully');
    }

    /**
     * Start a new time tracking session.
     */
    public function start(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id',
            'task_id' => 'nullable|exists:tasks,id',
            'description' => 'nullable|string',
            'billable' => 'boolean',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation error', 422, $validator->errors());
        }

        // Check if there's already an active time entry for this user
        $activeEntry = TimeEntry::where('user_id', auth()->id())
            ->whereNull('end_time')
            ->first();

        if ($activeEntry) {
            return $this->errorResponse('You already have an active time tracking session', 409);
        }

        $data = $validator->validated();
        $data['user_id'] = auth()->id();
        $data['start_time'] = now();

        $timeEntry = TimeEntry::create($data);

        // Load relationships
        $timeEntry->load(['project', 'task', 'user']);

        return $this->successResponse($timeEntry, 'Time tracking started successfully', 201);
    }

    /**
     * Stop an active time tracking session.
     */
    public function stop(TimeEntry $timeEntry): JsonResponse
    {
        // Check if the time entry belongs to the authenticated user
        if ($timeEntry->user_id !== auth()->id()) {
            return $this->errorResponse('Unauthorized', 403);
        }

        // Check if the time entry is already stopped
        if ($timeEntry->end_time) {
            return $this->errorResponse('This time tracking session is already stopped', 409);
        }

        $endTime = now();
        $startTime = new \DateTime($timeEntry->start_time);
        $duration = $endTime->getTimestamp() - $startTime->getTimestamp();

        $timeEntry->update([
            'end_time' => $endTime,
            'duration' => $duration,
        ]);

        // Load relationships
        $timeEntry->load(['project', 'task', 'user']);

        return $this->successResponse($timeEntry, 'Time tracking stopped successfully');
    }

    /**
     * Get time entries for the authenticated user.
     */
    public function myTimeEntries(Request $request): JsonResponse
    {
        $query = TimeEntry::where('user_id', auth()->id());

        // Filter by project if provided
        if ($request->has('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        // Filter by task if provided
        if ($request->has('task_id')) {
            $query->where('task_id', $request->task_id);
        }

        // Filter by date range if provided
        if ($request->has('date_from') && $request->has('date_to')) {
            $query->where(function ($q) use ($request) {
                $q->whereBetween('start_time', [$request->date_from, $request->date_to])
                  ->orWhereBetween('end_time', [$request->date_from, $request->date_to]);
            });
        } elseif ($request->has('date_from')) {
            $query->where('start_time', '>=', $request->date_from);
        } elseif ($request->has('date_to')) {
            $query->where('start_time', '<=', $request->date_to);
        }

        // Include relationships
        $query->with(['project', 'task']);

        // Sorting
        $sortField = $request->input('sort_by', 'start_time');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        // Pagination
        $perPage = $request->input('per_page', 15);
        $timeEntries = $query->paginate($perPage);

        return $this->successResponse($timeEntries);
    }

    /**
     * Get the current active time entry for the authenticated user.
     */
    public function current(): JsonResponse
    {
        $activeEntry = TimeEntry::where('user_id', auth()->id())
            ->whereNull('end_time')
            ->with(['project', 'task'])
            ->first();

        if (!$activeEntry) {
            return $this->successResponse(null, 'No active time tracking session');
        }

        return $this->successResponse($activeEntry);
    }

    /**
     * Get time tracking summary for a project.
     */
    public function projectSummary(Request $request, $projectId): JsonResponse
    {
        // Validate project exists
        $project = \App\Models\Project::findOrFail($projectId);

        $query = TimeEntry::where('project_id', $projectId);

        // Filter by date range if provided
        if ($request->has('date_from') && $request->has('date_to')) {
            $query->where(function ($q) use ($request) {
                $q->whereBetween('start_time', [$request->date_from, $request->date_to])
                  ->orWhereBetween('end_time', [$request->date_from, $request->date_to]);
            });
        } elseif ($request->has('date_from')) {
            $query->where('start_time', '>=', $request->date_from);
        } elseif ($request->has('date_to')) {
            $query->where('start_time', '<=', $request->date_to);
        }

        // Get total time
        $totalDuration = $query->sum('duration');

        // Get time by user
        $timeByUser = $query->select('user_id', \DB::raw('SUM(duration) as total_duration'))
            ->groupBy('user_id')
            ->with('user')
            ->get()
            ->map(function ($item) {
                return [
                    'user_id' => $item->user_id,
                    'user_name' => $item->user ? $item->user->name : 'Unknown',
                    'total_duration' => $item->total_duration,
                    'hours' => round($item->total_duration / 3600, 2),
                ];
            });

        // Get time by task
        $timeByTask = $query->select('task_id', \DB::raw('SUM(duration) as total_duration'))
            ->groupBy('task_id')
            ->with('task')
            ->get()
            ->map(function ($item) {
                return [
                    'task_id' => $item->task_id,
                    'task_title' => $item->task ? $item->task->title : 'No Task',
                    'total_duration' => $item->total_duration,
                    'hours' => round($item->total_duration / 3600, 2),
                ];
            });

        return $this->successResponse([
            'project' => $project,
            'total_duration' => $totalDuration,
            'total_hours' => round($totalDuration / 3600, 2),
            'by_user' => $timeByUser,
            'by_task' => $timeByTask,
        ]);
    }
}
