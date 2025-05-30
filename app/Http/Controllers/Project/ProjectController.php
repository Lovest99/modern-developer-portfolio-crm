<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Models\Deal;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects.
     */
    public function index(Request $request)
    {
        $query = Project::with(['user', 'deal.company']);

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->has('user_id')) {
            $userId = $request->input('user_id');
            if ($userId === 'mine') {
                $query->where('user_id', auth()->id());
            } else {
                $query->where('user_id', $userId);
            }
        }

        // Sort
        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $projects = $query->paginate(12)->withQueryString();

        // Get team members for filter dropdown
        $teamMembers = User::whereHas('roles', function ($query) {
            $query->whereJsonContains('permissions->projects', 'view');
        })->get(['id', 'name']);

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'teamMembers' => $teamMembers,
            'filters' => $request->only(['search', 'status', 'user_id', 'sort_field', 'sort_direction']),
        ]);
    }

    /**
     * Show the form for creating a new project.
     */
    public function create()
    {
        $deals = Deal::with('company')
            ->whereIn('stage', ['proposal', 'closed'])
            ->orderBy('name')
            ->get()
            ->map(function ($deal) {
                return [
                    'id' => $deal->id,
                    'name' => $deal->name . ' (' . $deal->company->name . ')',
                ];
            });

        $teamMembers = User::whereHas('roles', function ($query) {
            $query->whereJsonContains('permissions->projects', 'edit');
        })->get(['id', 'name']);

        return Inertia::render('Projects/ProjectForm', [
            'deals' => $deals,
            'teamMembers' => $teamMembers,
        ]);
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'technologies' => 'nullable|array',
            'github_url' => 'nullable|url|max:255',
            'live_url' => 'nullable|url|max:255',
            'status' => 'required|in:planning,development,completed,archived',
            'deal_id' => 'nullable|exists:deals,id',
            'team_members' => 'nullable|array',
            'team_members.*.id' => 'exists:users,id',
            'team_members.*.role' => 'nullable|string|max:50',
        ]);

        $validated['user_id'] = auth()->id();

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validated['image'] = $path;
        }

        // Create project
        $project = Project::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'image' => $validated['image'] ?? null,
            'technologies' => $validated['technologies'] ?? null,
            'github_url' => $validated['github_url'],
            'live_url' => $validated['live_url'],
            'status' => $validated['status'],
            'user_id' => $validated['user_id'],
            'deal_id' => $validated['deal_id'],
        ]);

        // Attach team members
        if (isset($validated['team_members'])) {
            foreach ($validated['team_members'] as $member) {
                $project->team()->attach($member['id'], ['role' => $member['role'] ?? null]);
            }
        }

        return redirect()->route('projects.index')
            ->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified project.
     */
    public function show(Project $project)
    {
        $project->load(['user', 'deal.company', 'team', 'tasks' => function ($query) {
            $query->with(['assignee', 'creator'])->orderBy('status')->orderBy('due_date');
        }]);

        // Get time tracking data
        $timeEntries = $project->timeEntries()
            ->with('user')
            ->orderBy('start_time', 'desc')
            ->get();

        $totalTime = $timeEntries->sum(function ($entry) {
            return $entry->end_time ? $entry->end_time->diffInSeconds($entry->start_time) : 0;
        });

        $totalHours = floor($totalTime / 3600);
        $totalMinutes = floor(($totalTime % 3600) / 60);

        return Inertia::render('Projects/ProjectShow', [
            'project' => $project,
            'timeEntries' => $timeEntries,
            'totalTime' => sprintf('%02d:%02d', $totalHours, $totalMinutes),
        ]);
    }

    /**
     * Show the form for editing the specified project.
     */
    public function edit(Project $project)
    {
        $project->load('team');

        $deals = Deal::with('company')
            ->whereIn('stage', ['proposal', 'closed'])
            ->orderBy('name')
            ->get()
            ->map(function ($deal) {
                return [
                    'id' => $deal->id,
                    'name' => $deal->name . ' (' . $deal->company->name . ')',
                ];
            });

        $teamMembers = User::whereHas('roles', function ($query) {
            $query->whereJsonContains('permissions->projects', 'edit');
        })->get(['id', 'name']);

        return Inertia::render('Projects/ProjectForm', [
            'project' => $project,
            'deals' => $deals,
            'teamMembers' => $teamMembers,
            'currentTeam' => $project->team->map(function ($member) {
                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    'role' => $member->pivot->role,
                ];
            }),
        ]);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'technologies' => 'nullable|array',
            'github_url' => 'nullable|url|max:255',
            'live_url' => 'nullable|url|max:255',
            'status' => 'required|in:planning,development,completed,archived',
            'deal_id' => 'nullable|exists:deals,id',
            'team_members' => 'nullable|array',
            'team_members.*.id' => 'exists:users,id',
            'team_members.*.role' => 'nullable|string|max:50',
            'remove_image' => 'nullable|boolean',
        ]);

        // Handle image upload or removal
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }

            $path = $request->file('image')->store('projects', 'public');
            $validated['image'] = $path;
        } elseif ($request->input('remove_image') && $project->image) {
            Storage::disk('public')->delete($project->image);
            $validated['image'] = null;
        }

        // Update project
        $project->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'image' => $validated['image'] ?? $project->image,
            'technologies' => $validated['technologies'] ?? $project->technologies,
            'github_url' => $validated['github_url'],
            'live_url' => $validated['live_url'],
            'status' => $validated['status'],
            'deal_id' => $validated['deal_id'],
        ]);

        // Sync team members
        if (isset($validated['team_members'])) {
            $syncData = [];
            foreach ($validated['team_members'] as $member) {
                $syncData[$member['id']] = ['role' => $member['role'] ?? null];
            }
            $project->team()->sync($syncData);
        } else {
            $project->team()->detach();
        }

        return redirect()->route('projects.index')
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(Project $project)
    {
        // Check if project has tasks
        if ($project->tasks()->exists()) {
            return redirect()->route('projects.index')
                ->with('error', 'Cannot delete project because it has associated tasks.');
        }

        // Delete image if exists
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        // Detach team members
        $project->team()->detach();

        // Delete project
        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project deleted successfully.');
    }
}
