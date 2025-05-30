<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of tasks.
     */
    public function index(Request $request)
    {
        $query = Task::with(['project', 'assignee', 'creator']);

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->has('priority')) {
            $query->where('priority', $request->input('priority'));
        }

        if ($request->has('project_id')) {
            $query->where('project_id', $request->input('project_id'));
        }

        if ($request->has('assigned_to')) {
            $assignedTo = $request->input('assigned_to');
            if ($assignedTo === 'me') {
                $query->where('assigned_to', auth()->id());
            } elseif ($assignedTo === 'unassigned') {
                $query->whereNull('assigned_to');
            } else {
                $query->where('assigned_to', $assignedTo);
            }
        }

        // Sort
        $sortField = $request->input('sort_field', 'due_date');
        $sortDirection = $request->input('sort_direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $tasks = $query->paginate(20)->withQueryString();

        // Get projects for filter dropdown
        $projects = Project::whereIn('status', ['planning', 'development'])
            ->orderBy('title')
            ->get(['id', 'title']);

        // Get team members for filter dropdown
        $teamMembers = User::whereHas('roles', function ($query) {
            $query->whereJsonContains('permissions->tasks', 'view');
        })->get(['id', 'name']);

        return Inertia::render('Projects/Tasks', [
            'tasks' => $tasks,
            'projects' => $projects,
            'teamMembers' => $teamMembers,
            'filters' => $request->only(['search', 'status', 'priority', 'project_id', 'assigned_to', 'sort_field', 'sort_direction']),
        ]);
    }

    /**
     * Display a listing of tasks assigned to the authenticated user.
     */
    public function myTasks(Request $request)
    {
        $query = Task::with(['project', 'creator'])
            ->where('assigned_to', auth()->id());

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->has('priority')) {
            $query->where('priority', $request->input('priority'));
        }

        if ($request->has('project_id')) {
            $query->where('project_id', $request->input('project_id'));
        }

        // Sort
        $sortField = $request->input('sort_field', 'due_date');
        $sortDirection = $request->input('sort_direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $tasks = $query->paginate(20)->withQueryString();

        // Get projects for filter dropdown
        $projects = Project::whereIn('status', ['planning', 'development'])
            ->orderBy('title')
            ->get(['id', 'title']);

        return Inertia::render('Projects/MyTasks', [
            'tasks' => $tasks,
            'projects' => $projects,
            'filters' => $request->only(['search', 'status', 'priority', 'project_id', 'sort_field', 'sort_direction']),
        ]);
    }

    /**
     * Show the form for creating a new task.
     */
    public function create(Request $request)
    {
        $projectId = $request->input('project_id');
        $project = null;

        if ($projectId) {
            $project = Project::findOrFail($projectId);
        } else {
            $projects = Project::whereIn('status', ['planning', 'development'])
                ->orderBy('title')
                ->get(['id', 'title']);
        }

        $teamMembers = User::whereHas('roles', function ($query) {
            $query->whereJsonContains('permissions->tasks', 'edit');
        })->get(['id', 'name']);

        return Inertia::render('Projects/TaskForm', [
            'project' => $project,
            'projects' => $projects ?? null,
            'teamMembers' => $teamMembers,
        ]);
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high,urgent',
            'status' => 'required|in:todo,in_progress,review,completed',
            'project_id' => 'nullable|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'due_date' => 'nullable|date',
        ]);

        $validated['created_by'] = auth()->id();

        Task::create($validated);

        if ($request->has('redirect_to_project') && $validated['project_id']) {
            return redirect()->route('projects.show', $validated['project_id'])
                ->with('success', 'Task created successfully.');
        }

        return redirect()->route('projects.tasks.index')
            ->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified task.
     */
    public function show(Task $task)
    {
        $task->load(['project', 'assignee', 'creator', 'timeEntries' => function ($query) {
            $query->with('user')->orderBy('start_time', 'desc');
        }]);

        return Inertia::render('Projects/TaskShow', [
            'task' => $task,
        ]);
    }

    /**
     * Show the form for editing the specified task.
     */
    public function edit(Task $task)
    {
        $task->load('project');

        $projects = Project::whereIn('status', ['planning', 'development'])
            ->orderBy('title')
            ->get(['id', 'title']);

        $teamMembers = User::whereHas('roles', function ($query) {
            $query->whereJsonContains('permissions->tasks', 'edit');
        })->get(['id', 'name']);

        return Inertia::render('Projects/TaskForm', [
            'task' => $task,
            'projects' => $projects,
            'teamMembers' => $teamMembers,
        ]);
    }

    /**
     * Update the specified task in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high,urgent',
            'status' => 'required|in:todo,in_progress,review,completed',
            'project_id' => 'nullable|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'due_date' => 'nullable|date',
        ]);

        $task->update($validated);

        if ($request->has('redirect_to_project') && $task->project_id) {
            return redirect()->route('projects.show', $task->project_id)
                ->with('success', 'Task updated successfully.');
        }

        return redirect()->route('projects.tasks.index')
            ->with('success', 'Task updated successfully.');
    }

    /**
     * Update the task status (for quick updates).
     */
    public function updateStatus(Request $request, Task $task)
    {
        $validated = $request->validate([
            'status' => 'required|in:todo,in_progress,review,completed',
        ]);

        $task->update(['status' => $validated['status']]);

        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy(Task $task)
    {
        $projectId = $task->project_id;

        // Delete time entries associated with the task
        $task->timeEntries()->delete();

        // Delete task
        $task->delete();

        if (request()->has('redirect_to_project') && $projectId) {
            return redirect()->route('projects.show', $projectId)
                ->with('success', 'Task deleted successfully.');
        }

        return redirect()->route('projects.tasks.index')
            ->with('success', 'Task deleted successfully.');
    }
}
