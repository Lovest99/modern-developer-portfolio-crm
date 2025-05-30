<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = Project::all();
        $users = User::all();

        // Common task templates for different project types
        $taskTemplates = [
            // Design tasks
            ['title' => 'Create wireframes', 'priority' => 'medium', 'status' => 'completed'],
            ['title' => 'Design UI mockups', 'priority' => 'high', 'status' => 'completed'],
            ['title' => 'Create style guide', 'priority' => 'medium', 'status' => 'in_progress'],
            ['title' => 'Design responsive layouts', 'priority' => 'high', 'status' => 'todo'],

            // Development tasks
            ['title' => 'Set up project structure', 'priority' => 'high', 'status' => 'completed'],
            ['title' => 'Implement authentication', 'priority' => 'high', 'status' => 'completed'],
            ['title' => 'Create database migrations', 'priority' => 'medium', 'status' => 'completed'],
            ['title' => 'Develop API endpoints', 'priority' => 'high', 'status' => 'in_progress'],
            ['title' => 'Implement frontend components', 'priority' => 'medium', 'status' => 'in_progress'],
            ['title' => 'Add form validation', 'priority' => 'medium', 'status' => 'todo'],
            ['title' => 'Optimize database queries', 'priority' => 'low', 'status' => 'todo'],

            // Testing tasks
            ['title' => 'Write unit tests', 'priority' => 'medium', 'status' => 'todo'],
            ['title' => 'Perform integration testing', 'priority' => 'high', 'status' => 'todo'],
            ['title' => 'Conduct user acceptance testing', 'priority' => 'high', 'status' => 'todo'],

            // Deployment tasks
            ['title' => 'Configure CI/CD pipeline', 'priority' => 'medium', 'status' => 'todo'],
            ['title' => 'Set up staging environment', 'priority' => 'medium', 'status' => 'todo'],
            ['title' => 'Deploy to production', 'priority' => 'high', 'status' => 'todo'],
        ];

        // Create 5-10 tasks for each project
        foreach ($projects as $project) {
            // Skip if project is completed
            if ($project->status === 'completed') {
                continue;
            }

            // Determine how many tasks to create
            $taskCount = rand(5, 10);

            // Shuffle task templates to get random ones
            $shuffledTasks = collect($taskTemplates)->shuffle()->take($taskCount);

            foreach ($shuffledTasks as $taskTemplate) {
                $creator = $users->random();
                $assignee = $users->random();

                Task::create([
                    'title' => $taskTemplate['title'],
                    'description' => fake()->paragraph(),
                    'priority' => $taskTemplate['priority'],
                    'status' => $taskTemplate['status'],
                    'project_id' => $project->id,
                    'assigned_to' => $assignee->id,
                    'created_by' => $creator->id,
                    'due_date' => fake()->dateTimeBetween('now', '+2 months'),
                ]);
            }
        }
    }
}
