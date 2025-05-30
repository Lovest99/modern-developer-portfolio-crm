<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\MarketingCampaign;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignController extends Controller
{
    /**
     * Display a listing of marketing campaigns.
     */
    public function index(Request $request)
    {
        $query = MarketingCampaign::with('creator');

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->has('type')) {
            $query->where('type', $request->input('type'));
        }

        if ($request->has('status')) {
            $status = $request->input('status');
            $now = now()->format('Y-m-d');

            if ($status === 'active') {
                $query->where('start_date', '<=', $now)
                      ->where(function ($q) use ($now) {
                          $q->where('end_date', '>=', $now)
                            ->orWhereNull('end_date');
                      });
            } elseif ($status === 'upcoming') {
                $query->where('start_date', '>', $now);
            } elseif ($status === 'completed') {
                $query->where('end_date', '<', $now);
            }
        }

        // Sort
        $sortField = $request->input('sort_field', 'start_date');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $campaigns = $query->paginate(10)->withQueryString();

        return Inertia::render('Marketing/Campaigns', [
            'campaigns' => $campaigns,
            'filters' => $request->only(['search', 'type', 'status', 'sort_field', 'sort_direction']),
        ]);
    }

    /**
     * Show the form for creating a new campaign.
     */
    public function create()
    {
        return Inertia::render('Marketing/CampaignForm');
    }

    /**
     * Store a newly created campaign in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'type' => 'required|in:email,social,content,ppc,other',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric|min:0',
            'cost' => 'nullable|numeric|min:0',
            'metrics' => 'nullable|array',
        ]);

        $validated['created_by'] = auth()->id();

        MarketingCampaign::create($validated);

        return redirect()->route('marketing.campaigns.index')
            ->with('success', 'Campaign created successfully.');
    }

    /**
     * Display the specified campaign.
     */
    public function show(MarketingCampaign $campaign)
    {
        $campaign->load('creator');

        return Inertia::render('Marketing/CampaignShow', [
            'campaign' => $campaign,
        ]);
    }

    /**
     * Show the form for editing the specified campaign.
     */
    public function edit(MarketingCampaign $campaign)
    {
        return Inertia::render('Marketing/CampaignForm', [
            'campaign' => $campaign,
        ]);
    }

    /**
     * Update the specified campaign in storage.
     */
    public function update(Request $request, MarketingCampaign $campaign)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'type' => 'required|in:email,social,content,ppc,other',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric|min:0',
            'cost' => 'nullable|numeric|min:0',
            'metrics' => 'nullable|array',
        ]);

        $campaign->update($validated);

        return redirect()->route('marketing.campaigns.index')
            ->with('success', 'Campaign updated successfully.');
    }

    /**
     * Update campaign metrics.
     */
    public function updateMetrics(Request $request, MarketingCampaign $campaign)
    {
        $validated = $request->validate([
            'metrics' => 'required|array',
        ]);

        $campaign->update(['metrics' => $validated['metrics']]);

        return redirect()->route('marketing.campaigns.show', $campaign)
            ->with('success', 'Campaign metrics updated successfully.');
    }

    /**
     * Remove the specified campaign from storage.
     */
    public function destroy(MarketingCampaign $campaign)
    {
        $campaign->delete();

        return redirect()->route('marketing.campaigns.index')
            ->with('success', 'Campaign deleted successfully.');
    }

    /**
     * Display marketing analytics.
     */
    public function analytics()
    {
        // Get campaign metrics grouped by type
        $campaignsByType = MarketingCampaign::selectRaw('type, COUNT(*) as count, SUM(budget) as total_budget, SUM(cost) as total_cost')
            ->groupBy('type')
            ->get();

        // Get recent campaigns
        $recentCampaigns = MarketingCampaign::with('creator')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Get active campaigns
        $now = now()->format('Y-m-d');
        $activeCampaigns = MarketingCampaign::with('creator')
            ->where('start_date', '<=', $now)
            ->where(function ($q) use ($now) {
                $q->where('end_date', '>=', $now)
                  ->orWhereNull('end_date');
            })
            ->get();

        // Calculate ROI if metrics contain revenue data
        $campaignsWithROI = MarketingCampaign::whereNotNull('cost')
            ->whereNotNull('metrics->revenue')
            ->get()
            ->map(function ($campaign) {
                $revenue = $campaign->metrics['revenue'] ?? 0;
                $cost = $campaign->cost;
                $roi = $cost > 0 ? (($revenue - $cost) / $cost) * 100 : 0;

                return [
                    'id' => $campaign->id,
                    'name' => $campaign->name,
                    'type' => $campaign->type,
                    'cost' => $campaign->cost,
                    'revenue' => $revenue,
                    'roi' => round($roi, 2),
                ];
            });

        return Inertia::render('Marketing/Analytics', [
            'campaignsByType' => $campaignsByType,
            'recentCampaigns' => $recentCampaigns,
            'activeCampaigns' => $activeCampaigns,
            'campaignsWithROI' => $campaignsWithROI,
        ]);
    }
}
