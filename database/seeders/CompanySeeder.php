<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = [
            [
                'name' => 'Acme Corporation',
                'industry' => 'Technology',
                'website' => 'https://acme.example.com',
                'notes' => 'Large enterprise client with multiple projects',
            ],
            [
                'name' => 'Globex Industries',
                'industry' => 'Manufacturing',
                'website' => 'https://globex.example.com',
                'notes' => 'Medium-sized manufacturing company',
            ],
            [
                'name' => 'Stark Enterprises',
                'industry' => 'Technology',
                'website' => 'https://stark.example.com',
                'notes' => 'Innovative tech company with focus on AI',
            ],
            [
                'name' => 'Wayne Enterprises',
                'industry' => 'Conglomerate',
                'website' => 'https://wayne.example.com',
                'notes' => 'Diversified business with multiple divisions',
            ],
            [
                'name' => 'Umbrella Corporation',
                'industry' => 'Pharmaceuticals',
                'website' => 'https://umbrella.example.com',
                'notes' => 'Healthcare and pharmaceutical company',
            ],
            [
                'name' => 'Cyberdyne Systems',
                'industry' => 'Technology',
                'website' => 'https://cyberdyne.example.com',
                'notes' => 'Specializes in robotics and AI',
            ],
            [
                'name' => 'Oscorp Industries',
                'industry' => 'Research',
                'website' => 'https://oscorp.example.com',
                'notes' => 'Research and development company',
            ],
        ];

        foreach ($companies as $company) {
            Company::create($company);
        }
    }
}
