<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS in production
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }

        // Share social media links with all Inertia views
        Inertia::share([
            'socialLinks' => fn () => [
                'github' => config('social.github'),
                'linkedin' => config('social.linkedin'),
                'twitter' => config('social.twitter'),
                'instagram' => config('social.instagram'),
                'whatsapp' => config('social.whatsapp'),
                'youtube' => config('social.youtube'),
                'threads' => config('social.threads'),
                'facebook' => config('social.facebook'),
            ],
        ]);
    }
}
