<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Call other seeders
        $this->call([
            UserSeeder::class,
            CompanySeeder::class,
            ContactSeeder::class,
            ClientSeeder::class,
            ProjectSeeder::class,
            TaskSeeder::class,
            DealSeeder::class,
            WebsiteContactSeeder::class,
            NewsletterSubscriberSeeder::class,
            TestimonialSeeder::class,
        ]);
    }
}
