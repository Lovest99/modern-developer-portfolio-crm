<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Marketing\NewsletterSubscriberRequest;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsletterSubscriberController extends ApiController
{
    /**
     * Display a listing of the newsletter subscribers.
     */
    public function index(Request $request): JsonResponse
    {
        // Only allow authenticated users to view subscribers
        if (!auth()->check()) {
            return $this->errorResponse('Unauthorized', 401);
        }

        $query = NewsletterSubscriber::query();

        // Filter by confirmation status if provided
        if ($request->has('confirmed')) {
            $confirmed = filter_var($request->confirmed, FILTER_VALIDATE_BOOLEAN);
            $query->where('confirmed', $confirmed);
        }

        // Filter by date range if provided
        if ($request->has('date_from') && $request->has('date_to')) {
            $query->whereBetween('created_at', [$request->date_from, $request->date_to]);
        } elseif ($request->has('date_from')) {
            $query->where('created_at', '>=', $request->date_from);
        } elseif ($request->has('date_to')) {
            $query->where('created_at', '<=', $request->date_to);
        }

        // Search by name or email
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortField = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $allowedSortFields = ['name', 'email', 'confirmed', 'created_at', 'confirmed_at'];

        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Pagination
        $perPage = $request->input('per_page', 15);
        $subscribers = $query->paginate($perPage);

        return $this->successResponse($subscribers);
    }

    /**
     * Store a newly created newsletter subscriber in storage.
     */
    public function store(NewsletterSubscriberRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Generate a unique token for confirmation
        $data['token'] = Str::random(32);

        // Set confirmed to false by default
        if (!isset($data['confirmed'])) {
            $data['confirmed'] = false;
        }

        $subscriber = NewsletterSubscriber::create($data);

        // If this is a public subscription (not from admin), send confirmation email
        if (!auth()->check()) {
            // TODO: Send confirmation email with token
            // This would typically be handled by a notification or mail class
        }

        return $this->successResponse($subscriber, 'Subscription received successfully', 201);
    }

    /**
     * Display the specified newsletter subscriber.
     */
    public function show(NewsletterSubscriber $subscriber): JsonResponse
    {
        // Only allow authenticated users to view subscriber details
        if (!auth()->check()) {
            return $this->errorResponse('Unauthorized', 401);
        }

        return $this->successResponse($subscriber);
    }

    /**
     * Update the specified newsletter subscriber in storage.
     */
    public function update(NewsletterSubscriberRequest $request, NewsletterSubscriber $subscriber): JsonResponse
    {
        // Only allow authenticated users to update
        if (!auth()->check()) {
            return $this->errorResponse('Unauthorized', 401);
        }

        $data = $request->validated();
        $subscriber->update($data);

        return $this->successResponse($subscriber, 'Subscriber updated successfully');
    }

    /**
     * Remove the specified newsletter subscriber from storage.
     */
    public function destroy(NewsletterSubscriber $subscriber): JsonResponse
    {
        // Allow both authenticated users and the subscriber themselves (via token) to unsubscribe
        if (!auth()->check() && !request()->has('token')) {
            return $this->errorResponse('Unauthorized', 401);
        }

        // If token is provided, verify it matches
        if (request()->has('token') && request()->token !== $subscriber->token) {
            return $this->errorResponse('Invalid token', 401);
        }

        $subscriber->delete();
        return $this->successResponse(null, 'Unsubscribed successfully');
    }

    /**
     * Confirm a newsletter subscription.
     */
    public function confirm(Request $request): JsonResponse
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        $subscriber = NewsletterSubscriber::where('token', $request->token)
            ->where('confirmed', false)
            ->first();

        if (!$subscriber) {
            return $this->errorResponse('Invalid or expired token', 404);
        }

        $subscriber->update([
            'confirmed' => true,
            'confirmed_at' => now(),
        ]);

        return $this->successResponse(null, 'Subscription confirmed successfully');
    }

    /**
     * Get subscriber statistics.
     */
    public function statistics(): JsonResponse
    {
        // Only allow authenticated users to view statistics
        if (!auth()->check()) {
            return $this->errorResponse('Unauthorized', 401);
        }

        $stats = [
            'total' => NewsletterSubscriber::count(),
            'confirmed' => NewsletterSubscriber::where('confirmed', true)->count(),
            'unconfirmed' => NewsletterSubscriber::where('confirmed', false)->count(),
            'recent' => NewsletterSubscriber::where('created_at', '>=', now()->subDays(30))->count(),
            'confirmation_rate' => NewsletterSubscriber::count() > 0
                ? (NewsletterSubscriber::where('confirmed', true)->count() / NewsletterSubscriber::count()) * 100
                : 0,
        ];

        return $this->successResponse($stats);
    }
}
