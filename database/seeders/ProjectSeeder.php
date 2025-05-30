<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        $projects = [
            [
                'title' => 'E-commerce Platform',
                'description' => 'A full-featured e-commerce platform built with Laravel and React.',
                'technologies' => ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
                'github_url' => 'https://github.com/example/ecommerce',
                'live_url' => 'https://ecommerce-demo.example.com',
                'status' => 'development',
            ],
            [
                'title' => 'Task Management App',
                'description' => 'A productivity app for managing tasks and projects.',
                'technologies' => ['Laravel', 'Vue.js', 'PostgreSQL', 'Bootstrap'],
                'github_url' => 'https://github.com/example/task-manager',
                'live_url' => null,
                'status' => 'planning',
            ],
            [
                'title' => 'Weather Dashboard',
                'description' => 'Real-time weather information with interactive maps.',
                'technologies' => ['React', 'Node.js', 'OpenWeather API', 'Chart.js'],
                'github_url' => 'https://github.com/example/weather-app',
                'live_url' => 'https://weather-dashboard-demo.example.com',
                'status' => 'completed',
            ],
            [
                'title' => 'Portfolio Website',
                'description' => 'Professional portfolio website with admin dashboard.',
                'technologies' => ['Laravel', 'Inertia.js', 'React', 'Tailwind CSS'],
                'github_url' => 'https://github.com/example/portfolio',
                'live_url' => 'https://portfolio-demo.example.com',
                'status' => 'development',
            ],
            [
                'title' => 'Inventory Management System',
                'description' => 'System for tracking inventory, orders, and suppliers.',
                'technologies' => ['Laravel', 'Alpine.js', 'MySQL', 'Livewire'],
                'github_url' => 'https://github.com/example/inventory',
                'live_url' => null,
                'status' => 'planning',
            ],
            [
                'title' => 'Blog Platform',
                'description' => 'Content management system for blogs with SEO features.',
                'technologies' => ['WordPress', 'PHP', 'MySQL', 'JavaScript'],
                'github_url' => null,
                'live_url' => 'https://blog-platform-demo.example.com',
                'status' => 'completed',
            ],
            [
                'title' => 'AI Chat Application',
                'description' => 'Chat application with AI-powered responses.',
                'technologies' => ['Python', 'Django', 'React', 'TensorFlow'],
                'github_url' => 'https://github.com/example/ai-chat',
                'live_url' => 'https://ai-chat-demo.example.com',
                'status' => 'development',
            ],
        ];

        foreach ($projects as $project) {
            Project::create([
                'title' => $project['title'],
                'description' => $project['description'],
                'technologies' => $project['technologies'],
                'github_url' => $project['github_url'],
                'live_url' => $project['live_url'],
                'status' => $project['status'],
                'user_id' => $users->random()->id,
                'deal_id' => null, // Will be updated in DealSeeder
            ]);
        }
    }
}
