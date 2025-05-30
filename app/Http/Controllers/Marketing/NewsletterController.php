<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    /**
     * Display a listing of newsletter subscribers.
     */
    public function index(Request $request)
    {
        $query = Newsletter::query();

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('email', 'like', "%{$search}%");
        }

        if ($request->has('status')) {
            $status = $request->input('status');
            if ($status === 'confirmed') {
                $query->where('is_confirmed', true);
            } elseif ($status === 'unconfirmed') {
                $query->where('is_confirmed', false);
            } elseif ($status === 'unsubscribed') {
                $query->whereNotNull('unsubscribed_at');
            } elseif ($status === 'active') {
                $query->where('is_confirmed', true)->whereNull('unsubscribed_at');
            }
        }

        if ($request->has('source')) {
            $query->where('source', $request->input('source'));
        }

        // Sort
        $sortField = $request->input('sort_field', 'subscribed_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $subscribers = $query->paginate(20)->withQueryString();

        // Get statistics
        $stats = [
            'total' => Newsletter::count(),
            'confirmed' => Newsletter::where('is_confirmed', true)->count(),
            'unconfirmed' => Newsletter::where('is_confirmed', false)->count(),
            'unsubscribed' => Newsletter::whereNotNull('unsubscribed_at')->count(),
            'active' => Newsletter::where('is_confirmed', true)->whereNull('unsubscribed_at')->count(),
        ];

        return Inertia::render('Marketing/Subscribers', [
            'subscribers' => $subscribers,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status', 'source', 'sort_field', 'sort_direction']),
        ]);
    }

    /**
     * Show the form for creating a new subscriber.
     */
    public function create()
    {
        return Inertia::render('Marketing/SubscriberForm');
    }

    /**
     * Store a newly created subscriber in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255|unique:newsletters,email',
            'is_confirmed' => 'boolean',
            'source' => 'required|in:website,import,manual',
        ]);

        $validated['subscription_token'] = Str::random(40);
        $validated['subscribed_at'] = now();

        Newsletter::create($validated);

        return redirect()->route('marketing.subscribers.index')
            ->with('success', 'Subscriber added successfully.');
    }

    /**
     * Import subscribers from a CSV file.
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048',
            'is_confirmed' => 'boolean',
        ]);

        $file = $request->file('file');
        $isConfirmed = $request->boolean('is_confirmed', false);

        $handle = fopen($file->getPathname(), 'r');
        $header = fgetcsv($handle);

        $emailColumnIndex = array_search('email', array_map('strtolower', $header));

        if ($emailColumnIndex === false) {
            return redirect()->route('marketing.subscribers.index')
                ->with('error', 'CSV file must contain an "email" column.');
        }

        $imported = 0;
        $skipped = 0;

        while (($data = fgetcsv($handle)) !== false) {
            $email = $data[$emailColumnIndex];

            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $exists = Newsletter::where('email', $email)->exists();

                if (!$exists) {
                    Newsletter::create([
                        'email' => $email,
                        'subscription_token' => Str::random(40),
                        'is_confirmed' => $isConfirmed,
                        'subscribed_at' => now(),
                        'source' => 'import',
                    ]);

                    $imported++;
                } else {
                    $skipped++;
                }
            } else {
                $skipped++;
            }
        }

        fclose($handle);

        return redirect()->route('marketing.subscribers.index')
            ->with('success', "Import completed: {$imported} subscribers imported, {$skipped} skipped.");
    }

    /**
     * Toggle the confirmation status of a subscriber.
     */
    public function toggleConfirmation(Newsletter $subscriber)
    {
        $subscriber->update([
            'is_confirmed' => !$subscriber->is_confirmed,
        ]);

        return redirect()->route('marketing.subscribers.index')
            ->with('success', 'Subscriber status updated successfully.');
    }

    /**
     * Unsubscribe a subscriber.
     */
    public function unsubscribe(Newsletter $subscriber)
    {
        $subscriber->update([
            'unsubscribed_at' => now(),
        ]);

        return redirect()->route('marketing.subscribers.index')
            ->with('success', 'Subscriber unsubscribed successfully.');
    }

    /**
     * Resubscribe a subscriber.
     */
    public function resubscribe(Newsletter $subscriber)
    {
        $subscriber->update([
            'unsubscribed_at' => null,
        ]);

        return redirect()->route('marketing.subscribers.index')
            ->with('success', 'Subscriber resubscribed successfully.');
    }

    /**
     * Remove the specified subscriber from storage.
     */
    public function destroy(Newsletter $subscriber)
    {
        $subscriber->delete();

        return redirect()->route('marketing.subscribers.index')
            ->with('success', 'Subscriber deleted successfully.');
    }

    /**
     * Export subscribers to CSV.
     */
    public function export(Request $request)
    {
        $query = Newsletter::query();

        // Apply filters
        if ($request->has('status')) {
            $status = $request->input('status');
            if ($status === 'confirmed') {
                $query->where('is_confirmed', true);
            } elseif ($status === 'unconfirmed') {
                $query->where('is_confirmed', false);
            } elseif ($status === 'unsubscribed') {
                $query->whereNotNull('unsubscribed_at');
            } elseif ($status === 'active') {
                $query->where('is_confirmed', true)->whereNull('unsubscribed_at');
            }
        }

        $subscribers = $query->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="subscribers.csv"',
        ];

        $callback = function() use ($subscribers) {
            $file = fopen('php://output', 'w');

            fputcsv($file, ['Email', 'Status', 'Source', 'Subscribed At', 'Unsubscribed At']);

            foreach ($subscribers as $subscriber) {
                $status = $subscriber->unsubscribed_at ? 'Unsubscribed' : ($subscriber->is_confirmed ? 'Confirmed' : 'Unconfirmed');

                fputcsv($file, [
                    $subscriber->email,
                    $status,
                    $subscriber->source,
                    $subscriber->subscribed_at->format('Y-m-d H:i:s'),
                    $subscriber->unsubscribed_at ? $subscriber->unsubscribed_at->format('Y-m-d H:i:s') : '',
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Handle a subscription request from the public website.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        // Check if already subscribed
        $existing = Newsletter::where('email', $validated['email'])->first();

        if ($existing) {
            if ($existing->unsubscribed_at) {
                // Resubscribe
                $existing->update([
                    'unsubscribed_at' => null,
                    'subscription_token' => Str::random(32),
                    'is_confirmed' => false,
                    'subscribed_at' => now(),
                    'source' => 'website',
                ]);

                // Send confirmation email (in a real app)
                // Mail::to($existing->email)->send(new ConfirmSubscription($existing));

                return response()->json([
                    'success' => true,
                    'message' => 'Thank you for resubscribing! Please check your email to confirm your subscription.',
                ]);
            } elseif (!$existing->is_confirmed) {
                // Already subscribed but not confirmed
                // Resend confirmation email (in a real app)
                // Mail::to($existing->email)->send(new ConfirmSubscription($existing));

                return response()->json([
                    'success' => true,
                    'message' => 'You are already subscribed. We have sent you another confirmation email.',
                ]);
            } else {
                // Already subscribed and confirmed
                return response()->json([
                    'success' => true,
                    'message' => 'You are already subscribed to our newsletter.',
                ]);
            }
        }

        // Create new subscription
        $newsletter = Newsletter::create([
            'email' => $validated['email'],
            'subscription_token' => Str::random(32),
            'is_confirmed' => false,
            'subscribed_at' => now(),
            'source' => 'website',
        ]);

        // Send confirmation email (in a real app)
        // Mail::to($newsletter->email)->send(new ConfirmSubscription($newsletter));

        return response()->json([
            'success' => true,
            'message' => 'Thank you for subscribing! Please check your email to confirm your subscription.',
        ]);
    }

    /**
     * Confirm a subscription.
     *
     * @param  string  $token
     * @return \Illuminate\Http\RedirectResponse
     */
    public function confirmSubscription($token)
    {
        $subscriber = Newsletter::where('subscription_token', $token)
            ->where('is_confirmed', false)
            ->whereNull('unsubscribed_at')
            ->first();

        if (!$subscriber) {
            return redirect()->route('home')
                ->with('error', 'Invalid or expired confirmation link.');
        }

        $subscriber->update([
            'is_confirmed' => true,
            'subscription_token' => null,
        ]);

        return redirect()->route('home')
            ->with('success', 'Your subscription has been confirmed. Thank you!');
    }

    /**
     * Unsubscribe from the newsletter.
     *
     * @param  string  $token
     * @return \Illuminate\Http\RedirectResponse
     */
    public function unsubscribeWithToken($token)
    {
        $subscriber = Newsletter::where('subscription_token', $token)
            ->whereNull('unsubscribed_at')
            ->first();

        if (!$subscriber) {
            return redirect()->route('home')
                ->with('error', 'Invalid or expired unsubscribe link.');
        }

        $subscriber->update([
            'unsubscribed_at' => now(),
            'subscription_token' => null,
        ]);

        return redirect()->route('home')
            ->with('success', 'You have been unsubscribed from our newsletter.');
    }
}
