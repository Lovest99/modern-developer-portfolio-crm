<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Contact;
use App\Models\ContactChannel;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all companies
        $companies = Company::all();

        // Create 2-3 contacts for each company
        foreach ($companies as $company) {
            $contactCount = rand(2, 3);

            for ($i = 0; $i < $contactCount; $i++) {
                $contact = Contact::create([
                    'first_name' => fake()->firstName(),
                    'last_name' => fake()->lastName(),
                    'company_id' => $company->id,
                    'notes' => fake()->optional(0.7)->sentence(),
                ]);

                // Add email channel
                ContactChannel::create([
                    'contact_id' => $contact->id,
                    'channel_type' => 'email',
                    'value' => fake()->email(),
                    'is_primary' => true,
                ]);

                // Add phone channel
                ContactChannel::create([
                    'contact_id' => $contact->id,
                    'channel_type' => 'phone',
                    'value' => fake()->phoneNumber(),
                    'is_primary' => true,
                ]);

                // Sometimes add a secondary email
                if (fake()->boolean(30)) {
                    ContactChannel::create([
                        'contact_id' => $contact->id,
                        'channel_type' => 'email',
                        'value' => fake()->companyEmail(),
                        'is_primary' => false,
                    ]);
                }
            }
        }

        // Create some additional contacts without companies
        for ($i = 0; $i < 5; $i++) {
            $contact = Contact::create([
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'company_id' => null,
                'notes' => fake()->optional(0.7)->sentence(),
            ]);

            // Add email channel
            ContactChannel::create([
                'contact_id' => $contact->id,
                'channel_type' => 'email',
                'value' => fake()->email(),
                'is_primary' => true,
            ]);

            // Add phone channel
            ContactChannel::create([
                'contact_id' => $contact->id,
                'channel_type' => 'phone',
                'value' => fake()->phoneNumber(),
                'is_primary' => true,
            ]);
        }
    }
}
