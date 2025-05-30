<?php

namespace Database\Seeders;

use App\Models\NewsletterSubscriber;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NewsletterSubscriberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 25 newsletter subscribers with different statuses
        for ($i = 0; $i < 25; $i++) {
            $confirmed = fake()->boolean(80); // 80% are confirmed

            NewsletterSubscriber::create([
                'email' => fake()->unique()->email(),
                'name' => fake()->optional(0.7)->name(), // 70% have names
                'token' => Str::random(32),
                'confirmed' => $confirmed,
                'created_at' => fake()->dateTimeBetween('-6 months', 'now'),
                'updated_at' => fake()->dateTimeBetween('-6 months', 'now'),
                'confirmed_at' => $confirmed ? fake()->dateTimeBetween('-6 months', 'now') : null,
            ]);
        }
    }
}
