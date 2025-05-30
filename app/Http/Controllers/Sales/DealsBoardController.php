<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Models\Deal;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DealsBoardController extends Controller
{
    /**
     * Display the deals board.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $query = Deal::with(['company', 'user']);

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

        if ($request->has('user_id') && $request->input('user_id')) {
            $userId = $request->input('user_id');

            if ($userId === 'mine') {
                $query->where('user_id', auth()->id());
            } else {
                $query->where('user_id', $userId);
            }
        }

        // Get all deals
        $deals = $query->get();

        // For demonstration purposes, create sample deals if none exist
        if ($deals->isEmpty()) {
            $sampleDeals = $this->getSampleDeals();
            $dealsByStage = [
                'prospect' => collect($sampleDeals['prospect']),
                'qualified' => collect($sampleDeals['qualified']),
                'proposal' => collect($sampleDeals['proposal']),
                'closed' => collect($sampleDeals['closed']),
            ];
        } else {
            // Group deals by stage
            $dealsByStage = [
                'prospect' => $deals->where('stage', 'prospect')->values(),
                'qualified' => $deals->where('stage', 'qualified')->values(),
                'proposal' => $deals->where('stage', 'proposal')->values(),
                'closed' => $deals->where('stage', 'closed')->values(),
            ];
        }

        return Inertia::render('Sales/DealsBoard', [
            'dealsByStage' => $dealsByStage,
            'filters' => $request->only(['search', 'stage', 'user_id']),
        ]);
    }

    /**
     * Update the stage of a deal.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateStage(Request $request, $id)
    {
        $validated = $request->validate([
            'stage' => 'required|in:prospect,qualified,proposal,closed',
        ]);

        $deal = Deal::findOrFail($id);
        $deal->stage = $validated['stage'];
        $deal->save();

        return redirect()->back();
    }

    /**
     * Get sample deals for demonstration purposes.
     *
     * @return array
     */
    private function getSampleDeals()
    {
        return [
            'prospect' => [
                [
                    'id' => 1001,
                    'name' => 'Website Redesign Project',
                    'description' => 'Complete website overhaul with modern design and improved UX',
                    'amount' => 15000,
                    'stage' => 'prospect',
                    'company' => ['name' => 'Acme Corp'],
                    'user' => ['name' => 'John Doe'],
                    'created_at' => now()->subDays(5),
                    'updated_at' => now()->subDays(2),
                ],
                [
                    'id' => 1002,
                    'name' => 'Mobile App Development',
                    'description' => 'iOS and Android app for customer engagement',
                    'amount' => 25000,
                    'stage' => 'prospect',
                    'company' => ['name' => 'TechStart Inc'],
                    'user' => ['name' => 'Jane Smith'],
                    'created_at' => now()->subDays(7),
                    'updated_at' => now()->subDays(3),
                ],
                [
                    'id' => 1003,
                    'name' => 'SEO Optimization Package',
                    'description' => 'Comprehensive SEO services to improve search rankings',
                    'amount' => 5000,
                    'stage' => 'prospect',
                    'company' => ['name' => 'Local Business LLC'],
                    'user' => ['name' => 'John Doe'],
                    'created_at' => now()->subDays(2),
                    'updated_at' => now()->subDays(1),
                ],
            ],
            'qualified' => [
                [
                    'id' => 1004,
                    'name' => 'E-commerce Integration',
                    'description' => 'Adding online store functionality to existing website',
                    'amount' => 12000,
                    'stage' => 'qualified',
                    'company' => ['name' => 'Retail Solutions'],
                    'user' => ['name' => 'Jane Smith'],
                    'created_at' => now()->subDays(14),
                    'updated_at' => now()->subDays(5),
                ],
                [
                    'id' => 1005,
                    'name' => 'CRM Implementation',
                    'description' => 'Custom CRM solution for sales team',
                    'amount' => 20000,
                    'stage' => 'qualified',
                    'company' => ['name' => 'Global Enterprises'],
                    'user' => ['name' => 'John Doe'],
                    'created_at' => now()->subDays(10),
                    'updated_at' => now()->subDays(4),
                ],
            ],
            'proposal' => [
                [
                    'id' => 1006,
                    'name' => 'Digital Marketing Campaign',
                    'description' => 'Comprehensive digital marketing strategy and execution',
                    'amount' => 8000,
                    'stage' => 'proposal',
                    'company' => ['name' => 'Growth Ventures'],
                    'user' => ['name' => 'Jane Smith'],
                    'created_at' => now()->subDays(20),
                    'updated_at' => now()->subDays(7),
                ],
                [
                    'id' => 1007,
                    'name' => 'IT Infrastructure Upgrade',
                    'description' => 'Modernizing server and network infrastructure',
                    'amount' => 35000,
                    'stage' => 'proposal',
                    'company' => ['name' => 'Enterprise Solutions'],
                    'user' => ['name' => 'John Doe'],
                    'created_at' => now()->subDays(15),
                    'updated_at' => now()->subDays(6),
                ],
            ],
            'closed' => [
                [
                    'id' => 1008,
                    'name' => 'Content Creation Package',
                    'description' => 'Blog posts, social media content, and email newsletters',
                    'amount' => 6000,
                    'stage' => 'closed',
                    'company' => ['name' => 'Media Group'],
                    'user' => ['name' => 'Jane Smith'],
                    'created_at' => now()->subDays(30),
                    'updated_at' => now()->subDays(10),
                ],
                [
                    'id' => 1009,
                    'name' => 'Staff Training Program',
                    'description' => 'Technical skills development for IT team',
                    'amount' => 10000,
                    'stage' => 'closed',
                    'company' => ['name' => 'Education First'],
                    'user' => ['name' => 'John Doe'],
                    'created_at' => now()->subDays(25),
                    'updated_at' => now()->subDays(8),
                ],
            ],
        ];
    }
}
