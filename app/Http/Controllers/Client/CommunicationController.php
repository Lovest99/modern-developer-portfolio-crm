<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\ClientComm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunicationController extends Controller
{
    /**
     * Display a listing of communications for all clients.
     */
    public function index(Request $request)
    {
        $query = ClientComm::with(['client.contact', 'user']);

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('subject', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhereHas('client.contact', function ($q) use ($search) {
                      $q->where(\DB::raw("CONCAT(first_name, ' ', last_name)"), 'like', "%{$search}%");
                  });
            });
        }

        if ($request->has('channel')) {
            $query->where('channel', $request->input('channel'));
        }

        if ($request->has('direction')) {
            $query->where('direction', $request->input('direction'));
        }

        // Sort
        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $communications = $query->paginate(15)->withQueryString();

        return Inertia::render('Clients/Communications', [
            'communications' => $communications,
            'filters' => $request->only(['search', 'channel', 'direction', 'sort_field', 'sort_direction']),
        ]);
    }

    /**
     * Display a listing of communications for a specific client.
     */
    public function clientCommunications(Request $request, Client $client)
    {
        $client->load('contact');

        $query = $client->communications()->with('user');

        // Apply filters
        if ($request->has('channel')) {
            $query->where('channel', $request->input('channel'));
        }

        if ($request->has('direction')) {
            $query->where('direction', $request->input('direction'));
        }

        // Sort
        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $communications = $query->paginate(15)->withQueryString();

        return Inertia::render('Clients/ClientCommunications', [
            'client' => $client,
            'communications' => $communications,
            'filters' => $request->only(['channel', 'direction', 'sort_field', 'sort_direction']),
        ]);
    }

    /**
     * Show the form for creating a new communication.
     */
    public function create(Request $request)
    {
        $clientId = $request->input('client_id');
        $client = null;

        if ($clientId) {
            $client = Client::with('contact')->findOrFail($clientId);
        } else {
            $clients = Client::with('contact')
                ->where('status', 'active')
                ->get()
                ->map(function ($client) {
                    return [
                        'id' => $client->id,
                        'name' => $client->contact->full_name,
                    ];
                });
        }

        return Inertia::render('Clients/CommunicationForm', [
            'client' => $client,
            'clients' => $clients ?? null,
        ]);
    }

    /**
     * Store a newly created communication in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'channel' => 'required|in:email,whatsapp,call,contact_form',
            'direction' => 'required|in:inbound,outbound',
            'subject' => 'nullable|string|max:255',
            'content' => 'nullable|string',
        ]);

        $validated['user_id'] = auth()->id();

        ClientComm::create($validated);

        if ($request->has('redirect_to_client')) {
            return redirect()->route('clients.communications', $validated['client_id'])
                ->with('success', 'Communication logged successfully.');
        }

        return redirect()->route('clients.communications.index')
            ->with('success', 'Communication logged successfully.');
    }

    /**
     * Display the specified communication.
     */
    public function show(ClientComm $communication)
    {
        $communication->load(['client.contact', 'user']);

        return Inertia::render('Clients/CommunicationShow', [
            'communication' => $communication,
        ]);
    }

    /**
     * Show the form for editing the specified communication.
     */
    public function edit(ClientComm $communication)
    {
        $communication->load(['client.contact']);

        return Inertia::render('Clients/CommunicationForm', [
            'communication' => $communication,
            'client' => $communication->client,
        ]);
    }

    /**
     * Update the specified communication in storage.
     */
    public function update(Request $request, ClientComm $communication)
    {
        $validated = $request->validate([
            'channel' => 'required|in:email,whatsapp,call,contact_form',
            'direction' => 'required|in:inbound,outbound',
            'subject' => 'nullable|string|max:255',
            'content' => 'nullable|string',
        ]);

        $communication->update($validated);

        if ($request->has('redirect_to_client')) {
            return redirect()->route('clients.communications', $communication->client_id)
                ->with('success', 'Communication updated successfully.');
        }

        return redirect()->route('clients.communications.index')
            ->with('success', 'Communication updated successfully.');
    }

    /**
     * Remove the specified communication from storage.
     */
    public function destroy(ClientComm $communication)
    {
        $clientId = $communication->client_id;
        $communication->delete();

        if (request()->has('redirect_to_client')) {
            return redirect()->route('clients.communications', $clientId)
                ->with('success', 'Communication deleted successfully.');
        }

        return redirect()->route('clients.communications.index')
            ->with('success', 'Communication deleted successfully.');
    }
}
