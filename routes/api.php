<?php

use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CommunicationController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DealController;
use App\Http\Controllers\Api\NewsletterSubscriberController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\TimeEntryController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WebsiteContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('contacts', [WebsiteContactController::class, 'store']);
Route::post('newsletter/subscribe', [NewsletterSubscriberController::class, 'store']);
Route::post('newsletter/confirm', [NewsletterSubscriberController::class, 'confirm']);
Route::delete('newsletter/unsubscribe/{subscriber}', [NewsletterSubscriberController::class, 'destroy']);

// Testimonials - public read access
Route::get('testimonials', [TestimonialController::class, 'index']);
Route::get('testimonials/{testimonial}', [TestimonialController::class, 'show']);

// Direct testimonials endpoint for frontend
Route::get('/public/testimonials', [App\Http\Controllers\Api\PublicTestimonialController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // User info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Projects
    Route::apiResource('projects', ProjectController::class);

    // Tasks
    Route::apiResource('tasks', TaskController::class);
    Route::get('my-tasks', [TaskController::class, 'myTasks']);

    // Clients
    Route::apiResource('clients', ClientController::class);
    Route::get('clients/statistics', [ClientController::class, 'statistics']);

    // Deals
    Route::apiResource('deals', DealController::class);
    Route::get('deals/statistics', [DealController::class, 'statistics']);
    Route::get('my-deals', [DealController::class, 'myDeals']);

    // Website Contacts
    Route::apiResource('website-contacts', WebsiteContactController::class)->except(['store']);
    Route::get('website-contacts/statistics', [WebsiteContactController::class, 'statistics']);

    // Newsletter Subscribers
    Route::apiResource('newsletter-subscribers', NewsletterSubscriberController::class)->except(['store', 'destroy']);
    Route::get('newsletter-subscribers/statistics', [NewsletterSubscriberController::class, 'statistics']);

    // Testimonials Management
    Route::post('testimonials', [TestimonialController::class, 'store']);
    Route::put('testimonials/{testimonial}', [TestimonialController::class, 'update']);
    Route::delete('testimonials/{testimonial}', [TestimonialController::class, 'destroy']);
});
