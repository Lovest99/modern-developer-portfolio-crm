<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Contact;
use App\Models\ContactChannel;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of clients.
     */
    public function index(Request $request)
    {
        $query = Client::with(['contact' => function ($query) {
            $query->with(['company', 'channels' => function ($query) {
                $query->where('is_primary', true);
            }]);
        }]);

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->whereHas('contact', function ($q) use ($search) {
                $q->where(DB::raw("CONCAT(first_name, ' ', last_name)"), 'like', "%{$search}%")
                  ->orWhereHas('company', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        // Sort
        $sortField = $request->input('sort_field', 'client_since');
        $sortDirection = $request->input('sort_direction', 'desc');

        if ($sortField === 'name') {
            $query->join('contacts', 'clients.contact_id', '=', 'contacts.id')
                  ->orderBy('contacts.first_name', $sortDirection)
                  ->orderBy('contacts.last_name', $sortDirection)
                  ->select('clients.*');
        } elseif ($sortField === 'company') {
            $query->join('contacts', 'clients.contact_id', '=', 'contacts.id')
                  ->leftJoin('companies', 'contacts.company_id', '=', 'companies.id')
                  ->orderBy('companies.name', $sortDirection)
                  ->select('clients.*');
        } else {
            $query->orderBy($sortField, $sortDirection);
        }

        $clients = $query->paginate(10)->withQueryString();

        return Inertia::render('Clients/Index', [
            'clients' => $clients,
            'filters' => $request->only(['search', 'status', 'sort_field', 'sort_direction']),
        ]);
    }

    /**
     * Show the form for creating a new client.
     */
    public function create()
    {
        $companies = Company::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Clients/ClientForm', [
            'companies' => $companies,
        ]);
    }

    /**
     * Store a newly created client in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'company_id' => 'nullable|exists:companies,id',
            'notes' => 'nullable|string',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:255',
            'client_since' => 'required|date',
            'status' => 'required|in:active,inactive,churned',
        ]);

        DB::transaction(function () use ($validated) {
            // Create contact
            $contact = Contact::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'company_id' => $validated['company_id'],
                'notes' => $validated['notes'],
            ]);

            // Add email channel
            ContactChannel::create([
                'contact_id' => $contact->id,
                'channel_type' => 'email',
                'value' => $validated['email'],
                'is_primary' => true,
            ]);

            // Add phone channel if provided
            if (!empty($validated['phone'])) {
                ContactChannel::create([
                    'contact_id' => $contact->id,
                    'channel_type' => 'phone',
                    'value' => $validated['phone'],
                    'is_primary' => true,
                ]);
            }

            // Create client
            Client::create([
                'contact_id' => $contact->id,
                'client_since' => $validated['client_since'],
                'status' => $validated['status'],
                'lifetime_value' => 0, // Initial value
            ]);
        });

        return redirect()->route('clients.index')
            ->with('success', 'Client created successfully.');
    }

    /**
     * Display the specified client.
     */
    public function show(Client $client)
    {
        $client->load([
            'contact' => function ($query) {
                $query->with(['company', 'channels']);
            },
            'communications' => function ($query) {
                $query->with('user')->orderBy('created_at', 'desc');
            }
        ]);

        // Get deals related to this client's company
        $deals = [];
        if ($client->contact->company_id) {
            $deals = \App\Models\Deal::where('company_id', $client->contact->company_id)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return Inertia::render('Clients/ClientShow', [
            'client' => $client,
            'deals' => $deals,
        ]);
    }

    /**
     * Show the form for editing the specified client.
     */
    public function edit(Client $client)
    {
        $client->load(['contact' => function ($query) {
            $query->with('channels');
        }]);

        $companies = Company::orderBy('name')->get(['id', 'name']);

        // Extract primary email and phone
        $email = $client->contact->channels->where('channel_type', 'email')->where('is_primary', true)->first()?->value;
        $phone = $client->contact->channels->where('channel_type', 'phone')->where('is_primary', true)->first()?->value;

        return Inertia::render('Clients/ClientForm', [
            'client' => $client,
            'contact' => $client->contact,
            'email' => $email,
            'phone' => $phone,
            'companies' => $companies,
        ]);
    }

    /**
     * Update the specified client in storage.
     */
    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'company_id' => 'nullable|exists:companies,id',
            'notes' => 'nullable|string',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:255',
            'client_since' => 'required|date',
            'status' => 'required|in:active,inactive,churned',
            'lifetime_value' => 'nullable|numeric|min:0',
        ]);

        DB::transaction(function () use ($validated, $client) {
            // Update contact
            $client->contact->update([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'company_id' => $validated['company_id'],
                'notes' => $validated['notes'],
            ]);

            // Update email channel
            $emailChannel = $client->contact->channels->where('channel_type', 'email')->where('is_primary', true)->first();
            if ($emailChannel) {
                $emailChannel->update(['value' => $validated['email']]);
            } else {
                ContactChannel::create([
                    'contact_id' => $client->contact_id,
                    'channel_type' => 'email',
                    'value' => $validated['email'],
                    'is_primary' => true,
                ]);
            }

            // Update phone channel
            $phoneChannel = $client->contact->channels->where('channel_type', 'phone')->where('is_primary', true)->first();
            if (!empty($validated['phone'])) {
                if ($phoneChannel) {
                    $phoneChannel->update(['value' => $validated['phone']]);
                } else {
                    ContactChannel::create([
                        'contact_id' => $client->contact_id,
                        'channel_type' => 'phone',
                        'value' => $validated['phone'],
                        'is_primary' => true,
                    ]);
                }
            } elseif ($phoneChannel) {
                $phoneChannel->delete();
            }

            // Update client
            $client->update([
                'client_since' => $validated['client_since'],
                'status' => $validated['status'],
                'lifetime_value' => $validated['lifetime_value'] ?? $client->lifetime_value,
            ]);
        });

        return redirect()->route('clients.index')
            ->with('success', 'Client updated successfully.');
    }

    /**
     * Remove the specified client from storage.
     */
    public function destroy(Client $client)
    {
        // Check if client has communications
        if ($client->communications()->exists()) {
            return redirect()->route('clients.index')
                ->with('error', 'Cannot delete client because they have communication records.');
        }

        DB::transaction(function () use ($client) {
            // Delete contact channels
            $client->contact->channels()->delete();

            // Delete client
            $client->delete();

            // Delete contact
            $client->contact->delete();
        });

        return redirect()->route('clients.index')
            ->with('success', 'Client deleted successfully.');
    }
}
