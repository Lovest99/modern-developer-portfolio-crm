<?php

use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Client\ClientController;
use App\Http\Controllers\Client\CommunicationController;
use App\Http\Controllers\Marketing\AnalyticsController;
use App\Http\Controllers\Marketing\CampaignController;
use App\Http\Controllers\Marketing\NewsletterController;
use App\Http\Controllers\Marketing\SubscriberController;
use App\Http\Controllers\Marketing\WebsiteContactController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\Project\TaskController;
use App\Http\Controllers\Project\TimeTrackingController;
use App\Http\Controllers\Sales\DealController;
use App\Http\Controllers\Sales\DealsBoardController;
use App\Http\Controllers\Sales\LeadController;
use App\Http\Controllers\Sales\ProductController;
use App\Http\Controllers\Settings\TeamController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/activity', [DashboardController::class, 'activity'])->name('dashboard.activity');

    // API Documentation
    Route::get('/api-docs', function () {
        return Inertia\Inertia::render('ApiDocs');
    })->name('api.docs');

    // Clients
    Route::resource('clients', ClientController::class);
    Route::resource('clients.communications', CommunicationController::class);

    // Sales
    Route::resource('sales/deals', DealController::class, ['as' => 'sales']);
    Route::put('sales/deals/{deal}/update-stage', [DealController::class, 'updateStage'])->name('sales.deals.update-stage');
    Route::get('sales/deals-board', [DealsBoardController::class, 'index'])->name('sales.deals.board');
    Route::put('sales/deals-board/{deal}', [DealsBoardController::class, 'updateStage'])->name('sales.deals.board.update-stage');
    Route::resource('sales/leads', LeadController::class, ['as' => 'sales']);
    Route::resource('sales/products', ProductController::class, ['as' => 'sales']);

    // Sales Quotes
    Route::resource('sales/quotes', \App\Http\Controllers\Sales\QuoteController::class, ['as' => 'sales']);

    // Sales Forecast
    Route::get('sales/forecast', [\App\Http\Controllers\Sales\ForecastController::class, 'index'])->name('sales.forecast');
    Route::post('sales/forecast/report', [\App\Http\Controllers\Sales\ForecastController::class, 'generateReport'])->name('sales.forecast.report');

    // Test Route
    Route::get('sales/test', [\App\Http\Controllers\Sales\TestController::class, 'index'])->name('sales.test');

    // Sales Calendar
    Route::get('sales/calendar', [\App\Http\Controllers\Sales\CalendarController::class, 'index'])->name('sales.calendar');
    Route::post('sales/calendar/events', [\App\Http\Controllers\Sales\CalendarController::class, 'storeEvent'])->name('sales.calendar.events.store');
    Route::put('sales/calendar/events/{event}', [\App\Http\Controllers\Sales\CalendarController::class, 'updateEvent'])->name('sales.calendar.events.update');
    Route::delete('sales/calendar/events/{event}', [\App\Http\Controllers\Sales\CalendarController::class, 'destroyEvent'])->name('sales.calendar.events.destroy');

    // Projects
    Route::resource('projects', ProjectController::class);
    Route::resource('projects/tasks', TaskController::class);
    Route::put('projects/tasks/{task}/update-status', [TaskController::class, 'updateStatus'])->name('projects.tasks.update-status');

    // Time Tracking
    Route::get('projects/time', [TimeTrackingController::class, 'index'])->name('projects.time.index');
    Route::get('projects/time/create', [TimeTrackingController::class, 'create'])->name('projects.time.create');
    Route::post('projects/time', [TimeTrackingController::class, 'store'])->name('projects.time.store');
    Route::get('projects/time/{timeEntry}/edit', [TimeTrackingController::class, 'edit'])->name('projects.time.edit');
    Route::put('projects/time/{timeEntry}', [TimeTrackingController::class, 'update'])->name('projects.time.update');
    Route::delete('projects/time/{timeEntry}', [TimeTrackingController::class, 'destroy'])->name('projects.time.destroy');
    Route::post('projects/time/start', [TimeTrackingController::class, 'start'])->name('projects.time.start');
    Route::put('projects/time/{timeEntry}/stop', [TimeTrackingController::class, 'stop'])->name('projects.time.stop');
    Route::get('projects/{project}/tasks', [TimeTrackingController::class, 'getProjectTasks'])->name('projects.tasks.list');

    // Marketing
    Route::resource('marketing/campaigns', CampaignController::class);
    Route::get('marketing/analytics', [AnalyticsController::class, 'index'])->name('marketing.analytics');

    // Website Contacts
    Route::get('marketing/website-contacts', [WebsiteContactController::class, 'index'])->name('marketing.website-contacts.index');
    Route::get('marketing/website-contacts/{contact}', [WebsiteContactController::class, 'show'])->name('marketing.website-contacts.show');
    Route::put('marketing/website-contacts/{contact}/status', [WebsiteContactController::class, 'updateStatus'])->name('marketing.website-contacts.update-status');
    Route::put('marketing/website-contacts/{contact}/assign', [WebsiteContactController::class, 'assign'])->name('marketing.website-contacts.assign');
    Route::post('marketing/website-contacts/{websiteContact}/convert', [WebsiteContactController::class, 'convertToContact'])->name('marketing.website-contacts.convert');
    Route::delete('marketing/website-contacts/{contact}', [WebsiteContactController::class, 'destroy'])->name('marketing.website-contacts.destroy');

    // Newsletter Subscribers
    Route::get('marketing/subscribers', [SubscriberController::class, 'index'])->name('marketing.subscribers.index');
    Route::get('marketing/subscribers/create', [SubscriberController::class, 'create'])->name('marketing.subscribers.create');
    Route::post('marketing/subscribers', [SubscriberController::class, 'store'])->name('marketing.subscribers.store');
    Route::put('marketing/subscribers/{subscriber}/confirm', [SubscriberController::class, 'confirm'])->name('marketing.subscribers.confirm');
    Route::delete('marketing/subscribers/{subscriber}', [SubscriberController::class, 'destroy'])->name('marketing.subscribers.destroy');
    Route::post('marketing/subscribers/import', [SubscriberController::class, 'import'])->name('marketing.subscribers.import');
    Route::get('marketing/subscribers/export', [SubscriberController::class, 'export'])->name('marketing.subscribers.export');

    // Team Settings
    Route::get('settings/team', [TeamController::class, 'index'])->name('settings.team');
    Route::post('settings/team/invite', [TeamController::class, 'invite'])->name('team.invite');
    Route::put('settings/team/{user}/role', [TeamController::class, 'updateRole'])->name('team.update-role');
    Route::delete('settings/team/{user}', [TeamController::class, 'destroy'])->name('team.destroy');

    // API Token Management
    Route::get('settings/api-tokens', [App\Http\Controllers\Settings\ApiTokenController::class, 'index'])->name('settings.api-tokens');
    Route::post('settings/api-tokens', [App\Http\Controllers\Settings\ApiTokenController::class, 'store'])->name('settings.api-tokens.store');
    Route::delete('settings/api-tokens/{token}', [App\Http\Controllers\Settings\ApiTokenController::class, 'destroy'])->name('settings.api-tokens.destroy');
});
