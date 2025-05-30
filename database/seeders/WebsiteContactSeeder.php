<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\WebsiteContact;
use Illuminate\Database\Seeder;

class WebsiteContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        // Create 15 website contacts with different statuses
        for ($i = 0; $i < 15; $i++) {
            $status = fake()->randomElement(['new', 'in_progress', 'completed', 'spam']);
            $assignedTo = ($status === 'new' || $status === 'spam') ? null : $users->random()->id;

            WebsiteContact::create([
                'name' => fake()->name(),
                'email' => fake()->email(),
                'subject' => fake()->sentence(),
                'message' => fake()->paragraphs(rand(1, 3), true),
                'status' => $status,
                'assigned_to' => $assignedTo,
                'created_at' => fake()->dateTimeBetween('-3 months', 'now'),
                'updated_at' => fake()->dateTimeBetween('-3 months', 'now'),
            ]);
        }
    }
}
