<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\ClientComm;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all contacts
        $contacts = Contact::all();

        // Get users for communications
        $users = User::all();

        // Convert some contacts to clients
        $clientContacts = $contacts->random(min(10, $contacts->count()));

        foreach ($clientContacts as $contact) {
            $client = Client::create([
                'contact_id' => $contact->id,
                'client_since' => fake()->dateTimeBetween('-2 years', 'now'),
                'status' => fake()->randomElement(['active', 'inactive', 'prospect']),
                'lifetime_value' => fake()->randomFloat(2, 1000, 50000),
            ]);

            // Add some communications for each client
            $commCount = rand(2, 5);
            for ($i = 0; $i < $commCount; $i++) {
                ClientComm::create([
                    'client_id' => $client->id,
                    'channel' => fake()->randomElement(['email', 'phone', 'meeting', 'video']),
                    'direction' => fake()->randomElement(['inbound', 'outbound']),
                    'subject' => fake()->optional(0.8)->sentence(4),
                    'content' => fake()->paragraph(),
                    'user_id' => $users->random()->id,
                    'created_at' => fake()->dateTimeBetween('-6 months', 'now'),
                    'updated_at' => fake()->dateTimeBetween('-6 months', 'now'),
                ]);
            }
        }
    }
}
