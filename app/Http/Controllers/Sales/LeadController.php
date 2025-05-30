<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Deal;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class LeadController extends Controller
{
    /**
     * Display a listing of leads.
     */
    public function index(Request $request)
    {
        $query = Deal::with(['company', 'creator', 'assignee', 'products'])
            ->whereIn('stage', ['prospect', 'qualified']);

        // Apply filters
        if ($request->has('search') && $request->input('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhereHas('company', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->has('stage') && $request->input('stage')) {
            $query->where('stage', $request->input('stage'));
        }

        if ($request->has('assigned_to') && $request->input('assigned_to')) {
            $assignedTo = $request->input('assigned_to');

            if ($assignedTo === 'mine') {
                $query->where('assigned_to', auth()->id());
            } else {
                $query->where('assigned_to', $assignedTo);
            }
        }

        if ($request->has('created_by') && $request->input('created_by')) {
            $query->where('created_by', $request->input('created_by'));
        }

        if ($request->has('source') && $request->input('source')) {
            $query->where('source', $request->input('source'));
        }

        if ($request->has('date_range') && is_array($request->input('date_range'))) {
            $dateRange = $request->input('date_range');
            if (isset($dateRange['start']) && isset($dateRange['end'])) {
                $query->whereBetween('created_at', [$dateRange['start'], $dateRange['end']]);
            }
        }

        if ($request->has('value_min') && $request->input('value_min')) {
            $query->where('amount', '>=', $request->input('value_min'));
        }

        if ($request->has('value_max') && $request->input('value_max')) {
            $query->where('amount', '<=', $request->input('value_max'));
        }

        // Sort
        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        // Get leads for pagination
        $leads = $query->paginate(10)->withQueryString();

        // Get all leads for kanban view (without pagination)
        $allLeads = null;
        if ($request->has('view') && $request->input('view') === 'kanban') {
            $allLeads = $query->get()->groupBy('stage');
        }

        // Get users for filtering
        $users = User::orderBy('name')->get(['id', 'name']);

        // Get lead sources for filtering
        $sources = Deal::whereNotNull('source')->distinct()->pluck('source');

        // Calculate lead metrics
        $metrics = [
            'total_count' => Deal::whereIn('stage', ['prospect', 'qualified'])->count(),
            'total_value' => Deal::whereIn('stage', ['prospect', 'qualified'])->sum('amount'),
            'prospect_count' => Deal::where('stage', 'prospect')->count(),
            'qualified_count' => Deal::where('stage', 'qualified')->count(),
            'conversion_rate' => $this->calculateLeadConversionRate(),
            'avg_qualification_time' => $this->calculateAvgQualificationTime(),
        ];

        return Inertia::render('Sales/LeadsPipeline', [
            'leads' => $leads,
            'allLeads' => $allLeads,
            'filters' => $request->only([
                'search', 'stage', 'assigned_to', 'created_by', 'source',
                'date_range', 'value_min', 'value_max', 'sort_field',
                'sort_direction', 'view'
            ]),
            'users' => $users,
            'sources' => $sources,
            'metrics' => $metrics,
        ]);
    }

    /**
     * Calculate the lead conversion rate.
     *
     * @return float
     */
    private function calculateLeadConversionRate()
    {
        $startDate = now()->subMonths(3);
        $endDate = now();

        $totalLeads = Deal::where('created_at', '>=', $startDate)
            ->where('stage', 'prospect')
            ->count();

        if ($totalLeads === 0) {
            return 0;
        }

        $convertedLeads = Deal::where('created_at', '>=', $startDate)
            ->where('stage', 'qualified')
            ->count();

        return round(($convertedLeads / $totalLeads) * 100, 1);
    }

    /**
     * Calculate the average time to qualify a lead.
     *
     * @return int
     */
    private function calculateAvgQualificationTime()
    {
        // This would typically use a leads_history table to track stage changes
        // For now, returning a sample value
        return 5; // 5 days
    }

    /**
     * Show the form for creating a new lead.
     */
    public function create()
    {
        $companies = Company::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Sales/LeadForm', [
            'companies' => $companies,
        ]);
    }

    /**
     * Store a newly created lead in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'amount' => 'nullable|numeric|min:0',
            'stage' => 'required|in:prospect,qualified',
            'company_id' => 'required|exists:companies,id',
        ]);

        $validated['user_id'] = auth()->id();

        Deal::create($validated);

        return redirect()->route('sales.leads.index')
            ->with('success', 'Lead created successfully.');
    }

    /**
     * Display the specified lead.
     */
    public function show(Deal $lead)
    {
        $lead->load(['company', 'user', 'products']);

        return Inertia::render('Sales/LeadShow', [
            'lead' => $lead,
        ]);
    }

    /**
     * Show the form for editing the specified lead.
     */
    public function edit(Deal $lead)
    {
        $companies = Company::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Sales/LeadForm', [
            'lead' => $lead,
            'companies' => $companies,
        ]);
    }

    /**
     * Update the specified lead in storage.
     */
    public function update(Request $request, Deal $lead)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'amount' => 'nullable|numeric|min:0',
            'stage' => 'required|in:prospect,qualified',
            'company_id' => 'required|exists:companies,id',
        ]);

        $lead->update($validated);

        return redirect()->route('sales.leads.index')
            ->with('success', 'Lead updated successfully.');
    }

    /**
     * Remove the specified lead from storage.
     */
    public function destroy(Deal $lead)
    {
        $lead->delete();

        return redirect()->route('sales.leads.index')
            ->with('success', 'Lead deleted successfully.');
    }
}
