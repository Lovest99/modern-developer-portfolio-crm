<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Carbon\Carbon;

class SubscriberController extends Controller
{
    /**
     * Display a listing of the subscribers.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $query = Newsletter::query();

        // Apply filters
        if ($request->has('search') && $request->input('search')) {
            $search = $request->input('search');
            $query->where('email', 'like', "%{$search}%");
        }

        if ($request->has('source') && $request->input('source')) {
            $query->where('source', $request->input('source'));
        }

        if ($request->has('status') && $request->input('status')) {
            $status = $request->input('status');

            if ($status === 'confirmed') {
                $query->where('is_confirmed', true)
                      ->whereNull('unsubscribed_at');
            } elseif ($status === 'unconfirmed') {
                $query->where('is_confirmed', false)
                      ->whereNull('unsubscribed_at');
            } elseif ($status === 'unsubscribed') {
                $query->whereNotNull('unsubscribed_at');
            }
        }

        // Apply sorting
        $sortField = $request->input('sort_field', 'subscribed_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $subscribers = $query->paginate(10)
            ->withQueryString();

        // Get subscriber stats
        $stats = [
            'total' => Newsletter::count(),
            'confirmed' => Newsletter::where('is_confirmed', true)->whereNull('unsubscribed_at')->count(),
            'unconfirmed' => Newsletter::where('is_confirmed', false)->whereNull('unsubscribed_at')->count(),
            'unsubscribed' => Newsletter::whereNotNull('unsubscribed_at')->count(),
        ];

        return Inertia::render('Marketing/Subscribers', [
            'subscribers' => $subscribers,
            'filters' => $request->only(['search', 'source', 'status', 'sort_field', 'sort_direction']),
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new subscriber.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Marketing/SubscriberForm');
    }

    /**
     * Store a newly created subscriber in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:newsletters,email',
            'is_confirmed' => 'boolean',
            'source' => 'required|in:website,import,manual',
        ]);

        $validated['subscribed_at'] = Carbon::now();

        Newsletter::create($validated);

        return redirect()->route('marketing.subscribers.index')
            ->with('success', 'Subscriber added successfully.');
    }

    /**
     * Update the specified subscriber's confirmation status.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function confirm($id)
    {
        $subscriber = Newsletter::findOrFail($id);
        $subscriber->is_confirmed = true;
        $subscriber->save();

        return redirect()->back()
            ->with('success', 'Subscriber confirmed successfully.');
    }

    /**
     * Remove the specified subscriber from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $subscriber = Newsletter::findOrFail($id);
        $subscriber->delete();

        return redirect()->back()
            ->with('success', 'Subscriber deleted successfully.');
    }

    /**
     * Import subscribers from a CSV file.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:10240',
        ]);

        $file = $request->file('file');
        $path = $file->getRealPath();

        $handle = fopen($path, 'r');
        $header = fgetcsv($handle);

        // Find the email column index
        $emailIndex = array_search('email', array_map('strtolower', $header));

        if ($emailIndex === false) {
            return redirect()->back()
                ->with('error', 'CSV file must contain an "email" column.');
        }

        $imported = 0;
        $skipped = 0;

        while (($data = fgetcsv($handle)) !== false) {
            if (isset($data[$emailIndex]) && filter_var($data[$emailIndex], FILTER_VALIDATE_EMAIL)) {
                $email = $data[$emailIndex];

                // Check if the email already exists
                if (!Newsletter::where('email', $email)->exists()) {
                    Newsletter::create([
                        'email' => $email,
                        'is_confirmed' => false,
                        'source' => 'import',
                        'subscribed_at' => Carbon::now(),
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
     * Export subscribers to a CSV file.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function export(Request $request)
    {
        $query = Newsletter::query();

        // Apply filters
        if ($request->has('source') && $request->input('source')) {
            $query->where('source', $request->input('source'));
        }

        if ($request->has('status') && $request->input('status')) {
            $status = $request->input('status');

            if ($status === 'confirmed') {
                $query->where('is_confirmed', true)
                      ->whereNull('unsubscribed_at');
            } elseif ($status === 'unconfirmed') {
                $query->where('is_confirmed', false)
                      ->whereNull('unsubscribed_at');
            } elseif ($status === 'unsubscribed') {
                $query->whereNotNull('unsubscribed_at');
            }
        }

        $subscribers = $query->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="subscribers.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () use ($subscribers) {
            $file = fopen('php://output', 'w');

            // Add headers
            fputcsv($file, ['Email', 'Status', 'Source', 'Subscribed At', 'Unsubscribed At']);

            // Add rows
            foreach ($subscribers as $subscriber) {
                $status = $subscriber->unsubscribed_at ? 'Unsubscribed' : ($subscriber->is_confirmed ? 'Confirmed' : 'Unconfirmed');

                fputcsv($file, [
                    $subscriber->email,
                    $status,
                    $subscriber->source,
                    $subscriber->subscribed_at,
                    $subscriber->unsubscribed_at,
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
