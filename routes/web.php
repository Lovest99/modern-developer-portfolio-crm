<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PortfolioController;

// Portfolio Routes - Streamlined
Route::get('/', [PortfolioController::class, 'home'])->name('home');
Route::get('/about', [PortfolioController::class, 'about'])->name('about');
Route::get('/portfolio', [PortfolioController::class, 'portfolio'])->name('portfolio');
Route::get('/resume', [PortfolioController::class, 'resume'])->name('resume');
Route::get('/contact', [PortfolioController::class, 'contact'])->name('contact');

// Legacy route for the single-page version
Route::get('/welcome', [PortfolioController::class, 'welcome'])->name('welcome');

// Download CV
Route::get('/download/cv', [PortfolioController::class, 'downloadCV']);

// Public contact form submission
Route::post('/contact', [App\Http\Controllers\Marketing\WebsiteContactController::class, 'store'])->name('contact.store');
Route::post('/newsletter/subscribe', [App\Http\Controllers\Marketing\NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');
Route::get('/newsletter/confirm/{token}', [App\Http\Controllers\Marketing\NewsletterController::class, 'confirmSubscription'])->name('newsletter.confirm');
Route::get('/newsletter/unsubscribe/{token}', [App\Http\Controllers\Marketing\NewsletterController::class, 'unsubscribeWithToken'])->name('newsletter.unsubscribe');

// Public API endpoint for testimonials
Route::get('/api/public/testimonials', [App\Http\Controllers\Api\PublicTestimonialController::class, 'index']);

// Include dashboard routes
require __DIR__.'/dashboard.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
