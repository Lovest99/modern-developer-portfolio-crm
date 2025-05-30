<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Deal;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class DealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients = Client::all();
        $users = User::all();
        $projects = Project::all();

        // Create deals for active clients
        $activeClients = $clients->where('status', 'active');

        foreach ($activeClients as $client) {
            // Create 1-3 deals per active client
            $dealCount = rand(1, 3);

            for ($i = 0; $i < $dealCount; $i++) {
                $deal = Deal::create([
                    'title' => fake()->randomElement([
                        'Website Development',
                        'Mobile App',
                        'E-commerce Platform',
                        'CRM Implementation',
                        'SEO Services',
                        'Content Marketing',
                        'UI/UX Redesign',
                        'Custom Software Development',
                        'Maintenance Contract',
                        'Consulting Services',
                    ]),
                    'description' => fake()->paragraph(),
                    'value' => fake()->randomFloat(2, 1000, 50000),
                    'stage' => fake()->randomElement(['prospect', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost']),
                    'client_id' => $client->id,
                    'assigned_to' => $users->random()->id,
                    'expected_close_date' => fake()->dateTimeBetween('now', '+3 months'),
                    'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
                    'updated_at' => fake()->dateTimeBetween('-1 year', 'now'),
                ]);

                // Assign a project to some deals that are closed_won
                if ($deal->stage === 'closed_won' && $projects->where('deal_id', null)->count() > 0) {
                    $project = $projects->where('deal_id', null)->random();
                    $project->deal_id = $deal->id;
                    $project->save();
                }
            }
        }

        // Create some deals for prospect clients
        $prospectClients = $clients->where('status', 'prospect');

        foreach ($prospectClients as $client) {
            Deal::create([
                'title' => fake()->randomElement([
                    'Initial Consultation',
                    'Website Proposal',
                    'Digital Marketing Package',
                    'Software Development Proposal',
                    'Maintenance Plan',
                ]),
                'description' => fake()->paragraph(),
                'value' => fake()->randomFloat(2, 1000, 20000),
                'stage' => fake()->randomElement(['prospect', 'qualified']),
                'client_id' => $client->id,
                'assigned_to' => $users->random()->id,
                'expected_close_date' => fake()->dateTimeBetween('now', '+6 months'),
                'created_at' => fake()->dateTimeBetween('-3 months', 'now'),
                'updated_at' => fake()->dateTimeBetween('-3 months', 'now'),
            ]);
        }
    }
}
