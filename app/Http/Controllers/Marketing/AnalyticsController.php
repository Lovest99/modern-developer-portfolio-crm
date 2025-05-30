<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\MarketingCampaign;
use App\Models\WebsiteContact;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    /**
     * Display the marketing analytics dashboard.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // Get date range from request or use default (last 30 days)
        $startDate = $request->input('start_date', Carbon::now()->subDays(30)->toDateString());
        $endDate = $request->input('end_date', Carbon::now()->toDateString());

        // Get campaigns grouped by type
        $campaignsByType = MarketingCampaign::selectRaw('type, COUNT(*) as count, SUM(budget) as total_budget, SUM(cost) as total_cost')
            ->whereBetween('start_date', [$startDate, $endDate])
            ->orWhereBetween('end_date', [$startDate, $endDate])
            ->orWhere(function ($query) use ($startDate, $endDate) {
                $query->where('start_date', '<=', $startDate)
                      ->where('end_date', '>=', $endDate);
            })
            ->groupBy('type')
            ->get();

        // Get campaigns with ROI calculations
        $campaignsWithROI = MarketingCampaign::whereBetween('start_date', [$startDate, $endDate])
            ->orWhereBetween('end_date', [$startDate, $endDate])
            ->orWhere(function ($query) use ($startDate, $endDate) {
                $query->where('start_date', '<=', $startDate)
                      ->where('end_date', '>=', $endDate);
            })
            ->get()
            ->map(function ($campaign) {
                // Calculate ROI if both cost and revenue are available
                if ($campaign->cost > 0 && $campaign->metrics && isset($campaign->metrics['revenue'])) {
                    $revenue = $campaign->metrics['revenue'];
                    $roi = round((($revenue - $campaign->cost) / $campaign->cost) * 100, 2);
                    $campaign->roi = $roi;
                } else {
                    $campaign->roi = 0;
                }

                return $campaign;
            })
            ->sortByDesc('roi')
            ->take(5)
            ->values();

        // Website statistics
        $websiteStats = [
            'visitors' => rand(1000, 5000), // Mock data - replace with actual analytics
            'visitorChange' => rand(-10, 20),
            'conversionRate' => rand(1, 5) + (rand(0, 99) / 100),
            'conversionChange' => rand(-10, 20),
            'roi' => rand(50, 200) + (rand(0, 99) / 100),
            'roiChange' => rand(-10, 20),
        ];

        // Email statistics
        $emailStats = [
            'openRate' => rand(15, 30) + (rand(0, 99) / 100),
            'openRateChange' => rand(-5, 10),
            'clickRate' => rand(2, 8) + (rand(0, 99) / 100),
            'clickRateChange' => rand(-5, 10),
            'conversionRate' => rand(0, 2) + (rand(0, 99) / 100),
            'conversionRateChange' => rand(-5, 10),
        ];

        return Inertia::render('Marketing/Analytics', [
            'campaignsByType' => $campaignsByType,
            'campaignsWithROI' => $campaignsWithROI,
            'websiteStats' => $websiteStats,
            'emailStats' => $emailStats,
        ]);
    }
}
