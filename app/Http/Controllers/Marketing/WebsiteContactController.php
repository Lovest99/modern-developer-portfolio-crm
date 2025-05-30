<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\ContactChannel;
use App\Models\User;
use App\Models\WebsiteContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WebsiteContactController extends Controller
{
    /**
     * Display a listing of website contacts.
     */
    public function index(Request $request)
    {
        $query = WebsiteContact::with('assignedUser');

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->has('subject')) {
            $query->where('subject', $request->input('subject'));
        }

        if ($request->has('assigned_to')) {
            $assignedTo = $request->input('assigned_to');
            if ($assignedTo === 'me') {
                $query->where('assigned_to', auth()->id());
            } elseif ($assignedTo === 'unassigned') {
                $query->whereNull('assigned_to');
            } else {
                $query->where('assigned_to', $assignedTo);
            }
        }

        // Sort
        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $contacts = $query->paginate(20)->withQueryString();

        // Get team members for filter dropdown
        $teamMembers = User::whereHas('roles', function ($query) {
            $query->whereJsonContains('permissions->contacts', 'view');
        })->get(['id', 'name']);

        return Inertia::render('Marketing/WebsiteContacts', [
            'contacts' => $contacts,
            'teamMembers' => $teamMembers,
            'filters' => $request->only(['search', 'status', 'subject', 'assigned_to', 'sort_field', 'sort_direction']),
        ]);
    }

    /**
     * Display the specified website contact.
     */
    public function show(WebsiteContact $contact)
    {
        $contact->load('assignedUser');

        return Inertia::render('Marketing/WebsiteContactShow', [
            'contact' => $contact,
            'teamMembers' => User::whereHas('roles', function ($query) {
                $query->whereJsonContains('permissions->contacts', 'edit');
            })->get(['id', 'name']),
        ]);
    }

    /**
     * Update the status of the specified website contact.
     */
    public function updateStatus(Request $request, WebsiteContact $contact)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,responded,spam',
        ]);

        $contact->update(['status' => $validated['status']]);

        return redirect()->back()
            ->with('success', 'Contact status updated successfully.');
    }

    /**
     * Assign the specified website contact to a user.
     */
    public function assign(Request $request, WebsiteContact $contact)
    {
        $validated = $request->validate([
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $contact->update(['assigned_to' => $validated['assigned_to']]);

        return redirect()->back()
            ->with('success', 'Contact assigned successfully.');
    }

    /**
     * Convert the website contact to a contact/client.
     */
    public function convertToContact(Request $request, WebsiteContact $websiteContact)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'company_id' => 'nullable|exists:companies,id',
            'notes' => 'nullable|string',
            'convert_to_client' => 'boolean',
            'client_since' => 'required_if:convert_to_client,true|date',
        ]);

        DB::transaction(function () use ($validated, $websiteContact) {
            // Create contact
            $contact = Contact::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'company_id' => $validated['company_id'],
                'notes' => $validated['notes'] ?? $websiteContact->message,
            ]);

            // Add email channel
            ContactChannel::create([
                'contact_id' => $contact->id,
                'channel_type' => 'email',
                'value' => $websiteContact->email,
                'is_primary' => true,
            ]);

            // Create client if requested
            if (isset($validated['convert_to_client']) && $validated['convert_to_client']) {
                \App\Models\Client::create([
                    'contact_id' => $contact->id,
                    'client_since' => $validated['client_since'],
                    'status' => 'active',
                    'lifetime_value' => 0, // Initial value
                ]);
            }

            // Update website contact status
            $websiteContact->update(['status' => 'responded']);
        });

        return redirect()->route('marketing.website-contacts.index')
            ->with('success', 'Contact converted successfully.');
    }

    /**
     * Remove the specified website contact from storage.
     */
    public function destroy(WebsiteContact $contact)
    {
        $contact->delete();

        return redirect()->route('marketing.website-contacts.index')
            ->with('success', 'Contact deleted successfully.');
    }

    /**
     * Handle the contact form submission from the website.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255',
            'subject' => 'required|in:support,sales,partnership,other',
            'message' => 'required|string',
        ]);

        // Add IP and user agent
        $validated['ip_address'] = $request->ip();
        $validated['user_agent'] = $request->userAgent();
        $validated['status'] = 'new';

        WebsiteContact::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Your message has been sent successfully. We will get back to you soon.',
        ]);
    }
}
