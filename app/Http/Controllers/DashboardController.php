<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Deal;
use App\Models\Project;
use App\Models\Task;
use App\Models\WebsiteContact;
use App\Models\ClientComm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with key metrics and activity feed.
     */
    public function index()
    {
        // Get key metrics
        $metrics = $this->getDashboardMetrics();

        // Get recent activity
        $activities = $this->getRecentActivity();

        return Inertia::render('dashboard', [
            'metrics' => $metrics,
            'recentActivity' => $activities, // Keep as recentActivity for backward compatibility
        ]);
    }

    /**
     * Get dashboard metrics.
     */
    private function getDashboardMetrics()
    {
        try {
            // Count active deals
            $activeDeals = Deal::where('stage', '!=', 'closed')
                ->count();

            // Count active projects
            $activeProjects = Project::whereIn('status', ['planning', 'development'])->count();

            // Count active clients
            $activeClients = Client::where('status', 'active')->count();

            // Count pending tasks
            $pendingTasks = Task::where('status', '!=', 'completed')
                ->count();

            return [
                'activeDeals' => $activeDeals,
                'activeProjects' => $activeProjects,
                'activeClients' => $activeClients,
                'pendingTasks' => $pendingTasks,
            ];
        } catch (\Exception $e) {
            // Return default values if there's an error
            \Log::error('Error getting dashboard metrics: ' . $e->getMessage());
            return [
                'activeDeals' => 0,
                'activeProjects' => 0,
                'activeClients' => 0,
                'pendingTasks' => 0,
            ];
        }
    }

    /**
     * Display the activity feed.
     */
    public function activity()
    {
        $activities = $this->getRecentActivity(50); // Get more items for the dedicated activity page

        // Add user information to activities
        $activities = $activities->map(function ($activity) {
            // Add user information if available
            if (isset($activity['user_id'])) {
                $user = \App\Models\User::find($activity['user_id']);
                if ($user) {
                    $activity['user'] = [
                        'name' => $user->name,
                        'avatar' => $user->profile_photo_url,
                        'initials' => strtoupper(substr($user->name, 0, 1) . (strpos($user->name, ' ') ? substr($user->name, strpos($user->name, ' ') + 1, 1) : '')),
                    ];
                }
            }

            // Add status and priority for tasks
            if ($activity['type'] === 'task') {
                $task = Task::find($activity['id']);
                if ($task) {
                    $activity['status'] = $task->status;
                    $activity['priority'] = $task->priority;
                }
            }

            return $activity;
        });

        return Inertia::render('Dashboard/activity', [
            'activities' => $activities,
        ]);
    }

    /**
     * Get recent activity across the system.
     */
    private function getRecentActivity($limit = 10)
    {
        try {
            // Get recent website contacts
            $contacts = WebsiteContact::with('assignedUser')
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get()
                ->map(function ($contact) {
                    return [
                        'id' => $contact->id,
                        'type' => 'website_contact',
                        'title' => "New contact from {$contact->name}",
                        'description' => "Subject: {$contact->subject}",
                        'date' => $contact->created_at,
                        'url' => '/marketing/website-contacts/' . $contact->id,
                        'user_id' => $contact->assigned_user_id,
                    ];
                });

            // Check if ClientComm model and related tables exist
            $communications = collect();
            if (class_exists(ClientComm::class) && \Schema::hasTable('client_comms')) {
                // Get recent client communications
                $communications = ClientComm::with(['client.contact', 'user'])
                    ->orderBy('created_at', 'desc')
                    ->limit($limit)
                    ->get()
                    ->map(function ($comm) {
                        $direction = $comm->direction === 'inbound' ? 'from' : 'to';
                        $contactName = $comm->client && $comm->client->contact ? $comm->client->contact->full_name : 'Unknown';
                        return [
                            'id' => $comm->id,
                            'type' => 'client_communication',
                            'title' => "Communication {$direction} {$contactName}",
                            'description' => "Via {$comm->channel}: " . (empty($comm->subject) ? substr($comm->content, 0, 50) : $comm->subject),
                            'date' => $comm->created_at,
                            'url' => '/clients/' . $comm->client_id . '/communications',
                            'user_id' => $comm->user_id,
                        ];
                    });
            }

            // Get recent tasks
            $tasks = Task::with(['project', 'assignee', 'creator'])
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get()
                ->map(function ($task) {
                    return [
                        'id' => $task->id,
                        'type' => 'task',
                        'title' => "Task: {$task->title}",
                        'description' => "Project: " . ($task->project ? $task->project->title : 'None'),
                        'date' => $task->created_at,
                        'url' => '/projects/tasks/' . $task->id,
                        'user_id' => $task->creator_id,
                        'status' => $task->status,
                        'priority' => $task->priority,
                    ];
                });

            // Get recent projects
            $projects = Project::with(['client', 'manager'])
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get()
                ->map(function ($project) {
                    return [
                        'id' => $project->id,
                        'type' => 'project',
                        'title' => "Project: {$project->title}",
                        'description' => "Client: " . ($project->client ? $project->client->name : 'None'),
                        'date' => $project->created_at,
                        'url' => '/projects/' . $project->id,
                        'user_id' => $project->manager_id,
                        'status' => $project->status,
                    ];
                });

            // Get recent deals
            $deals = Deal::with(['client', 'owner'])
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get()
                ->map(function ($deal) {
                    return [
                        'id' => $deal->id,
                        'type' => 'deal',
                        'title' => "Deal: {$deal->title}",
                        'description' => "Value: $" . number_format($deal->value, 2) . " - Stage: {$deal->stage}",
                        'date' => $deal->created_at,
                        'url' => '/sales/deals/' . $deal->id,
                        'user_id' => $deal->owner_id,
                        'status' => $deal->stage,
                    ];
                });

            // Get recent clients
            $clients = Client::with('contact')
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get()
                ->map(function ($client) {
                    return [
                        'id' => $client->id,
                        'type' => 'client',
                        'title' => "Client: {$client->name}",
                        'description' => "Contact: " . ($client->contact ? $client->contact->full_name : 'None'),
                        'date' => $client->created_at,
                        'url' => '/clients/' . $client->id,
                        'status' => $client->status,
                    ];
                });

            // Merge all activities, sort by date, and take the most recent ones
            return collect()
                ->merge($contacts)
                ->merge($communications)
                ->merge($tasks)
                ->merge($projects)
                ->merge($deals)
                ->merge($clients)
                ->sortByDesc('date')
                ->values()
                ->take($limit);
        } catch (\Exception $e) {
            // Return empty collection if there's an error
            \Log::error('Error getting recent activity: ' . $e->getMessage());
            return collect();
        }
    }
}
