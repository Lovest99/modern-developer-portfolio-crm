<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Models\Deal;
use App\Models\SalesForecast;
use App\Models\ForecastScenario;
use App\Models\User;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ForecastController extends Controller
{
    /**
     * Display the sales forecast.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // Get time period parameters
        $timeframe = $request->input('timeframe', 'quarter');
        $year = $request->input('year', date('Y'));
        $quarter = $request->input('quarter', $this->getCurrentQuarter());
        $month = $request->input('month', date('n'));

        // Calculate date ranges based on timeframe
        $dateRange = $this->calculateDateRange($timeframe, $year, $quarter, $month);
        $startDate = $dateRange['start_date'];
        $endDate = $dateRange['end_date'];

        // Get deals within the date range
        $deals = Deal::where(function($query) use ($startDate, $endDate) {
                $query->whereBetween('expected_close_date', [$startDate, $endDate])
                      ->orWhereBetween('created_at', [$startDate, $endDate]);
            })
            ->with(['company', 'creator', 'assignee', 'products'])
            ->get();

        // Calculate forecast metrics
        $forecastData = $this->calculateForecastMetrics($deals, $startDate, $endDate, $timeframe);

        // Get existing forecast if available
        $existingForecast = SalesForecast::where('start_date', $startDate)
            ->where('end_date', $endDate)
            ->with('scenarios')
            ->first();

        // Get users for filtering
        $users = User::orderBy('name')->get(['id', 'name']);

        // Get products for product breakdown
        $products = Product::where('is_active', true)->orderBy('name')->get(['id', 'name', 'category']);

        return Inertia::render('Sales/Forecast', [
            'forecastData' => $forecastData,
            'existingForecast' => $existingForecast,
            'timeframe' => $timeframe,
            'year' => $year,
            'quarter' => $quarter,
            'month' => $month,
            'users' => $users,
            'products' => $products,
            'dateRange' => [
                'start' => $startDate->format('Y-m-d'),
                'end' => $endDate->format('Y-m-d')
            ]
        ]);
    }

    /**
     * Generate and save a forecast report.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function generateReport(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'target_amount' => 'required|numeric|min:0',
            'predicted_amount' => 'required|numeric|min:0',
            'confidence_percentage' => 'required|numeric|min:0|max:100',
            'monthly_breakdown' => 'nullable|array',
            'product_breakdown' => 'nullable|array',
            'team_breakdown' => 'nullable|array',
            'notes' => 'nullable|string',
            'scenarios' => 'nullable|array',
            'scenarios.*.name' => 'required|string|max:50',
            'scenarios.*.type' => 'required|in:optimistic,realistic,pessimistic',
            'scenarios.*.adjustment_factor' => 'required|numeric|min:0.1|max:2',
            'scenarios.*.predicted_amount' => 'required|numeric|min:0',
            'scenarios.*.assumptions' => 'nullable|array',
        ]);

        try {
            DB::beginTransaction();

            // Create or update forecast
            $forecast = SalesForecast::updateOrCreate(
                [
                    'start_date' => $validated['start_date'],
                    'end_date' => $validated['end_date'],
                ],
                [
                    'title' => $validated['title'],
                    'created_by' => auth()->id(),
                    'forecast_date' => now(),
                    'target_amount' => $validated['target_amount'],
                    'predicted_amount' => $validated['predicted_amount'],
                    'confidence_percentage' => $validated['confidence_percentage'],
                    'monthly_breakdown' => $validated['monthly_breakdown'] ?? null,
                    'product_breakdown' => $validated['product_breakdown'] ?? null,
                    'team_breakdown' => $validated['team_breakdown'] ?? null,
                    'notes' => $validated['notes'] ?? null,
                ]
            );

            // Delete existing scenarios
            $forecast->scenarios()->delete();

            // Create new scenarios
            if (isset($validated['scenarios']) && is_array($validated['scenarios'])) {
                foreach ($validated['scenarios'] as $scenarioData) {
                    $forecast->scenarios()->create([
                        'name' => $scenarioData['name'],
                        'type' => $scenarioData['type'],
                        'adjustment_factor' => $scenarioData['adjustment_factor'],
                        'predicted_amount' => $scenarioData['predicted_amount'],
                        'assumptions' => $scenarioData['assumptions'] ?? null,
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('sales.forecast', [
                'timeframe' => $request->input('timeframe', 'quarter'),
                'year' => $request->input('year', date('Y')),
                'quarter' => $request->input('quarter', $this->getCurrentQuarter()),
                'month' => $request->input('month', date('n')),
            ])->with('success', 'Forecast report generated successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to generate forecast: ' . $e->getMessage()]);
        }
    }

    /**
     * Calculate date range based on timeframe.
     *
     * @param  string  $timeframe
     * @param  string  $year
     * @param  string  $quarter
     * @param  string  $month
     * @return array
     */
    private function calculateDateRange($timeframe, $year, $quarter, $month)
    {
        $startDate = null;
        $endDate = null;

        switch ($timeframe) {
            case 'month':
                $startDate = Carbon::createFromDate($year, $month, 1)->startOfMonth();
                $endDate = Carbon::createFromDate($year, $month, 1)->endOfMonth();
                break;

            case 'quarter':
                $quarterMap = [
                    'Q1' => 1,
                    'Q2' => 4,
                    'Q3' => 7,
                    'Q4' => 10
                ];
                $quarterStartMonth = $quarterMap[$quarter] ?? 1;
                $startDate = Carbon::createFromDate($year, $quarterStartMonth, 1)->startOfMonth();
                $endDate = $startDate->copy()->addMonths(2)->endOfMonth();
                break;

            case 'year':
                $startDate = Carbon::createFromDate($year, 1, 1)->startOfYear();
                $endDate = Carbon::createFromDate($year, 12, 31)->endOfYear();
                break;

            default:
                // Default to current quarter
                $currentQuarter = $this->getCurrentQuarter();
                $quarterMap = [
                    'Q1' => 1,
                    'Q2' => 4,
                    'Q3' => 7,
                    'Q4' => 10
                ];
                $quarterStartMonth = $quarterMap[$currentQuarter] ?? 1;
                $startDate = Carbon::createFromDate($year, $quarterStartMonth, 1)->startOfMonth();
                $endDate = $startDate->copy()->addMonths(2)->endOfMonth();
        }

        return [
            'start_date' => $startDate,
            'end_date' => $endDate
        ];
    }

    /**
     * Calculate forecast metrics based on deals.
     *
     * @param  \Illuminate\Database\Eloquent\Collection  $deals
     * @param  \Carbon\Carbon  $startDate
     * @param  \Carbon\Carbon  $endDate
     * @param  string  $timeframe
     * @return array
     */
    private function calculateForecastMetrics($deals, $startDate, $endDate, $timeframe)
    {
        // Initialize metrics
        $totalForecast = 0;
        $closedDeals = 0;
        $pipeline = 0;
        $byStage = [
            'prospect' => ['amount' => 0, 'count' => 0, 'color' => 'bg-blue-200'],
            'qualified' => ['amount' => 0, 'count' => 0, 'color' => 'bg-blue-400'],
            'proposal' => ['amount' => 0, 'count' => 0, 'color' => 'bg-blue-600'],
            'closed' => ['amount' => 0, 'count' => 0, 'color' => 'bg-blue-800']
        ];

        // Calculate monthly breakdown
        $monthlyBreakdown = [];
        $currentDate = $startDate->copy();
        while ($currentDate->lte($endDate)) {
            $monthKey = $currentDate->format('M');
            $monthlyBreakdown[$monthKey] = [
                'month' => $monthKey,
                'amount' => 0,
                'target' => $this->calculateMonthlyTarget($timeframe, $currentDate),
                'forecast' => 0
            ];
            $currentDate->addMonth();
        }

        // Calculate product breakdown
        $productBreakdown = [];

        // Calculate team breakdown
        $teamBreakdown = [];

        // Process each deal
        foreach ($deals as $deal) {
            $dealAmount = $deal->amount ?? 0;
            $probability = $deal->probability ?? 0;
            $weightedAmount = $dealAmount * ($probability / 100);

            // Add to total forecast
            $totalForecast += $weightedAmount;

            // Add to stage breakdown
            if (isset($byStage[$deal->stage])) {
                $byStage[$deal->stage]['amount'] += $weightedAmount;
                $byStage[$deal->stage]['count']++;
            }

            // Add to closed or pipeline
            if ($deal->stage === 'closed') {
                $closedDeals += $dealAmount;
            } else {
                $pipeline += $weightedAmount;
            }

            // Add to monthly breakdown
            $dealMonth = Carbon::parse($deal->expected_close_date ?? $deal->created_at)->format('M');
            if (isset($monthlyBreakdown[$dealMonth])) {
                if ($deal->stage === 'closed') {
                    $monthlyBreakdown[$dealMonth]['amount'] += $dealAmount;
                } else {
                    $monthlyBreakdown[$dealMonth]['forecast'] += $weightedAmount;
                }
            }

            // Add to product breakdown
            foreach ($deal->products as $product) {
                $productId = $product->id;
                if (!isset($productBreakdown[$productId])) {
                    $productBreakdown[$productId] = [
                        'id' => $productId,
                        'name' => $product->name,
                        'category' => $product->category,
                        'amount' => 0,
                        'count' => 0
                    ];
                }
                $productAmount = $product->pivot->quantity * ($product->monthly_price ?? 0);
                $productBreakdown[$productId]['amount'] += $productAmount * ($probability / 100);
                $productBreakdown[$productId]['count']++;
            }

            // Add to team breakdown
            $assigneeId = $deal->assigned_to ?? $deal->created_by;
            if ($assigneeId) {
                if (!isset($teamBreakdown[$assigneeId])) {
                    $teamBreakdown[$assigneeId] = [
                        'id' => $assigneeId,
                        'name' => $deal->assignee ? $deal->assignee->name : ($deal->creator ? $deal->creator->name : 'Unknown'),
                        'amount' => 0,
                        'count' => 0
                    ];
                }
                $teamBreakdown[$assigneeId]['amount'] += $weightedAmount;
                $teamBreakdown[$assigneeId]['count']++;
            }
        }

        // Calculate target completion
        $targetAmount = $this->calculateTargetAmount($timeframe, $startDate, $endDate);
        $targetCompletion = $targetAmount > 0 ? round(($totalForecast / $targetAmount) * 100) : 0;

        // Get top deals
        $topDeals = $deals->where('stage', '!=', 'closed')
            ->sortByDesc('amount')
            ->take(5)
            ->map(function ($deal) {
                return [
                    'id' => $deal->id,
                    'name' => $deal->name,
                    'company' => $deal->company ? $deal->company->name : 'No company',
                    'amount' => $deal->amount,
                    'probability' => $deal->probability,
                    'stage' => $deal->stage
                ];
            })
            ->values()
            ->toArray();

        return [
            'summary' => [
                'totalForecast' => $totalForecast,
                'closedDeals' => $closedDeals,
                'pipeline' => $pipeline,
                'targetCompletion' => $targetCompletion,
                'targetAmount' => $targetAmount,
                'yearToDate' => $this->calculateYearToDateSales()
            ],
            'byStage' => array_values($byStage),
            'byMonth' => array_values($monthlyBreakdown),
            'byProduct' => array_values($productBreakdown),
            'byTeam' => array_values($teamBreakdown),
            'topDeals' => $topDeals
        ];
    }

    /**
     * Calculate monthly target amount.
     *
     * @param  string  $timeframe
     * @param  \Carbon\Carbon  $month
     * @return float
     */
    private function calculateMonthlyTarget($timeframe, $month)
    {
        // This could be based on company goals, historical data, etc.
        // For now, using a simple calculation
        $baseTarget = 120000; // Base monthly target

        // Adjust based on quarter (Q4 typically higher)
        $quarter = ceil($month->format('n') / 3);
        $quarterMultiplier = $quarter === 4 ? 1.25 : 1.0;

        return $baseTarget * $quarterMultiplier;
    }

    /**
     * Calculate target amount for the given timeframe.
     *
     * @param  string  $timeframe
     * @param  \Carbon\Carbon  $startDate
     * @param  \Carbon\Carbon  $endDate
     * @return float
     */
    private function calculateTargetAmount($timeframe, $startDate, $endDate)
    {
        switch ($timeframe) {
            case 'month':
                return $this->calculateMonthlyTarget($timeframe, $startDate);

            case 'quarter':
                $months = $startDate->diffInMonths($endDate) + 1;
                $total = 0;
                $currentMonth = $startDate->copy();
                for ($i = 0; $i < $months; $i++) {
                    $total += $this->calculateMonthlyTarget($timeframe, $currentMonth);
                    $currentMonth->addMonth();
                }
                return $total;

            case 'year':
                return 1500000; // Annual target

            default:
                return 380000; // Default quarterly target
        }
    }

    /**
     * Calculate year-to-date sales.
     *
     * @return float
     */
    private function calculateYearToDateSales()
    {
        $startOfYear = Carbon::now()->startOfYear();
        $today = Carbon::now();

        return Deal::where('stage', 'closed')
            ->whereBetween('created_at', [$startOfYear, $today])
            ->sum('amount');
    }

    /**
     * Get the current quarter as a string (Q1, Q2, etc.).
     *
     * @return string
     */
    private function getCurrentQuarter()
    {
        $month = date('n');
        if ($month <= 3) return 'Q1';
        if ($month <= 6) return 'Q2';
        if ($month <= 9) return 'Q3';
        return 'Q4';
    }
}
