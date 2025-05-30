<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'McDonald Siriza',
                'role' => 'CEO & Director',
                'company' => 'Mist Corporate Services',
                'company_logo' => 'https://ui-avatars.com/api/?name=Mist+Corporate&background=0D8ABC&color=fff&format=svg',
                'profile_image' => 'https://ui-avatars.com/api/?name=McDonald+Siriza&background=0D8ABC&color=fff',
                'content' => 'Working with Bright was a game-changer for our web presence. His attention to detail and innovative approach to problem-solving resulted in a platform that exceeded our expectations. Not only did he deliver on time, but he also provided valuable insights that improved our overall digital strategy.',
                'rating' => 5,
                'is_active' => true,
                'display_order' => 1,
            ],
            [
                'name' => 'Michael Chen',
                'role' => 'CTO',
                'company' => 'Innovate Solutions',
                'company_logo' => 'https://ui-avatars.com/api/?name=Innovate+Solutions&background=4F46E5&color=fff&format=svg',
                'profile_image' => 'https://ui-avatars.com/api/?name=Michael+Chen&background=4F46E5&color=fff',
                'content' => 'Bright\'s expertise in both frontend and backend technologies made him the perfect developer for our complex project. He quickly understood our requirements and implemented solutions that were both elegant and efficient. His knowledge of AI integration was particularly valuable for our data-driven application.',
                'rating' => 5,
                'is_active' => true,
                'display_order' => 2,
            ],
            [
                'name' => 'Emily Rodriguez',
                'role' => 'Product Manager',
                'company' => 'CreativeFlow',
                'company_logo' => 'https://ui-avatars.com/api/?name=Creative+Flow&background=D946EF&color=fff&format=svg',
                'profile_image' => 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=D946EF&color=fff',
                'content' => 'I\'ve worked with many developers, but Bright stands out for his combination of technical skill and creative thinking. He doesn\'t just write code; he contributes meaningful ideas to the product development process. His work on our user interface significantly improved our conversion rates.',
                'rating' => 5,
                'is_active' => true,
                'display_order' => 3,
            ],
            [
                'name' => 'David Okafor',
                'role' => 'Founder & CEO',
                'company' => 'StartupLaunch',
                'company_logo' => 'https://ui-avatars.com/api/?name=Startup+Launch&background=F59E0B&color=fff&format=svg',
                'profile_image' => 'https://ui-avatars.com/api/?name=David+Okafor&background=F59E0B&color=fff',
                'content' => 'As a startup founder, finding a developer who understands both technology and business needs is crucial. Bright not only delivered a robust application but also helped us optimize our development process. His work was instrumental in securing our next round of funding.',
                'rating' => 5,
                'is_active' => true,
                'display_order' => 4,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
