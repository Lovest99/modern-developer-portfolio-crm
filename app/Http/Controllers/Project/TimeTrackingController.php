<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use App\Models\TimeTracking;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimeTrackingController extends Controller
{
    /**
     * Display a listing of time entries.
     */
    public function index(Request $request)
    {
        $query = TimeTracking::with(['user', 'project', 'task']);

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('description', 'like', "%{$search}%")
                  ->orWhereHas('project', function ($q) use ($search) {
                      $q->where('title', 'like', "%{$search}%");
                  })
                  ->orWhereHas('task', function ($q) use ($search) {
                      $q->where('title', 'like', "%{$search}%");
                  });
        }

        if ($request->has('user_id')) {
            $userId = $request->input('user_id');
            if ($userId === 'me') {
                $query->where('user_id', auth()->id());
            } else {
                $query->where('user_id', $userId);
            }
        }

        if ($request->has('project_id')) {
            $query->where('project_id', $request->input('project_id'));
        }

        if ($request->has('date_from')) {
            $query->where('start_time', '>=', $request->input('date_from'));
        }

        if ($request->has('date_to')) {
            $query->where('start_time', '<=', $request->input('date_to') . ' 23:59:59');
        }

        if ($request->has('billable')) {
            $query->where('billable', $request->input('billable') === 'true');
        }

        // Sort
        $sortField = $request->input('sort_field', 'start_time');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $timeEntries = $query->paginate(20)->withQueryString();

        // Calculate total time
        $totalSeconds = $timeEntries->sum(function ($entry) {
            return $entry->end_time ? $entry->end_time->diffInSeconds($entry->start_time) : 0;
        });

        $totalHours = floor($totalSeconds / 3600);
        $totalMinutes = floor(($totalSeconds % 3600) / 60);

        // Get projects for filter dropdown
        $projects = Project::orderBy('title')->get(['id', 'title']);

        // Get team members for filter dropdown
        $teamMembers = User::whereHas('roles', function ($query) {
            $query->whereJsonContains('permissions->time_tracking', 'view');
        })->get(['id', 'name']);

        return Inertia::render('Projects/TimeTracking', [
            'timeEntries' => $timeEntries,
            'totalTime' => sprintf('%02d:%02d', $totalHours, $totalMinutes),
            'projects' => $projects,
            'teamMembers' => $teamMembers,
            'filters' => $request->only(['search', 'user_id', 'project_id', 'date_from', 'date_to', 'billable', 'sort_field', 'sort_direction']),
        ]);
    }

    /**
     * Show the form for creating a new time entry.
     */
    public function create(Request $request)
    {
        $projectId = $request->input('project_id');
        $taskId = $request->input('task_id');

        $projects = Project::orderBy('title')->get(['id', 'title']);

        $tasks = collect();
        if ($projectId) {
            $tasks = Task::where('project_id', $projectId)
                ->orderBy('title')
                ->get(['id', 'title']);
        }

        return Inertia::render('Projects/TimeEntryForm', [
            'projects' => $projects,
            'tasks' => $tasks,
            'projectId' => $projectId,
            'taskId' => $taskId,
        ]);
    }

    /**
     * Store a newly created time entry in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'nullable|exists:projects,id',
            'task_id' => 'nullable|exists:tasks,id',
            'start_time' => 'required|date',
            'end_time' => 'nullable|date|after:start_time',
            'description' => 'nullable|string',
            'billable' => 'boolean',
        ]);

        $validated['user_id'] = auth()->id();

        TimeTracking::create($validated);

        if ($request->has('redirect_to_task') && $validated['task_id']) {
            return redirect()->route('projects.tasks.show', $validated['task_id'])
                ->with('success', 'Time entry created successfully.');
        }

        if ($request->has('redirect_to_project') && $validated['project_id']) {
            return redirect()->route('projects.show', $validated['project_id'])
                ->with('success', 'Time entry created successfully.');
        }

        return redirect()->route('projects.time.index')
            ->with('success', 'Time entry created successfully.');
    }

    /**
     * Start a new time tracking session.
     */
    public function start(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'nullable|exists:projects,id',
            'task_id' => 'nullable|exists:tasks,id',
            'description' => 'nullable|string',
            'billable' => 'boolean',
        ]);

        $validated['user_id'] = auth()->id();
        $validated['start_time'] = now();

        // Check if there's already an active session
        $activeSession = TimeTracking::where('user_id', auth()->id())
            ->whereNull('end_time')
            ->first();

        if ($activeSession) {
            // End the active session
            $activeSession->update(['end_time' => now()]);
        }

        $timeEntry = TimeTracking::create($validated);

        return response()->json([
            'success' => true,
            'time_entry_id' => $timeEntry->id,
        ]);
    }

    /**
     * End an active time tracking session.
     */
    public function end(TimeTracking $timeEntry)
    {
        // Ensure the time entry belongs to the authenticated user
        if ($timeEntry->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $timeEntry->update(['end_time' => now()]);

        return response()->json([
            'success' => true,
            'duration' => $timeEntry->formatted_duration,
        ]);
    }

    /**
     * Show the form for editing the specified time entry.
     */
    public function edit(TimeTracking $timeEntry)
    {
        $projects = Project::orderBy('title')->get(['id', 'title']);

        $tasks = collect();
        if ($timeEntry->project_id) {
            $tasks = Task::where('project_id', $timeEntry->project_id)
                ->orderBy('title')
                ->get(['id', 'title']);
        }

        return Inertia::render('Projects/TimeEntryForm', [
            'timeEntry' => $timeEntry,
            'projects' => $projects,
            'tasks' => $tasks,
        ]);
    }

    /**
     * Update the specified time entry in storage.
     */
    public function update(Request $request, TimeTracking $timeEntry)
    {
        $validated = $request->validate([
            'project_id' => 'nullable|exists:projects,id',
            'task_id' => 'nullable|exists:tasks,id',
            'start_time' => 'required|date',
            'end_time' => 'nullable|date|after:start_time',
            'description' => 'nullable|string',
            'billable' => 'boolean',
        ]);

        $timeEntry->update($validated);

        if ($request->has('redirect_to_task') && $timeEntry->task_id) {
            return redirect()->route('projects.tasks.show', $timeEntry->task_id)
                ->with('success', 'Time entry updated successfully.');
        }

        if ($request->has('redirect_to_project') && $timeEntry->project_id) {
            return redirect()->route('projects.show', $timeEntry->project_id)
                ->with('success', 'Time entry updated successfully.');
        }

        return redirect()->route('projects.time.index')
            ->with('success', 'Time entry updated successfully.');
    }

    /**
     * Remove the specified time entry from storage.
     */
    public function destroy(TimeTracking $timeEntry)
    {
        $projectId = $timeEntry->project_id;
        $taskId = $timeEntry->task_id;

        $timeEntry->delete();

        if (request()->has('redirect_to_task') && $taskId) {
            return redirect()->route('projects.tasks.show', $taskId)
                ->with('success', 'Time entry deleted successfully.');
        }

        if (request()->has('redirect_to_project') && $projectId) {
            return redirect()->route('projects.show', $projectId)
                ->with('success', 'Time entry deleted successfully.');
        }

        return redirect()->route('projects.time.index')
            ->with('success', 'Time entry deleted successfully.');
    }

    /**
     * Get tasks for a specific project (for dynamic form updates).
     */
    public function getProjectTasks(Project $project)
    {
        $tasks = Task::where('project_id', $project->id)
            ->orderBy('title')
            ->get(['id', 'title']);

        return response()->json($tasks);
    }
}
