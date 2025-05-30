<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Deal;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DealController extends Controller
{
    /**
     * Display a listing of deals in a kanban board.
     */
    public function index(Request $request)
    {
        $query = Deal::with(['company', 'user', 'products']);

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhereHas('company', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->has('user_id')) {
            $query->where('user_id', $request->input('user_id'));
        }

        // Group deals by stage for kanban board
        $deals = $query->get()->groupBy('stage');

        // Ensure all stages are represented, even if empty
        $stages = ['prospect', 'qualified', 'proposal', 'closed'];
        foreach ($stages as $stage) {
            if (!isset($deals[$stage])) {
                $deals[$stage] = collect();
            }
        }

        return Inertia::render('Sales/DealsBoard', [
            'dealsByStage' => $deals,
            'filters' => $request->only(['search', 'user_id']),
        ]);
    }

    /**
     * Show the form for creating a new deal.
     */
    public function create()
    {
        $companies = Company::orderBy('name')->get(['id', 'name']);
        $allProducts = Product::orderBy('name')->get(['id', 'name', 'monthly_price', 'annual_price']);
        $users = \App\Models\User::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Sales/DealForm', [
            'companies' => $companies,
            'allProducts' => $allProducts,
            'products' => [],
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created deal in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'amount' => 'nullable|numeric|min:0',
            'stage' => 'required|in:prospect,qualified,proposal,closed',
            'company_id' => 'required|exists:companies,id',
            'user_id' => 'nullable|exists:users,id',
            'description' => 'nullable|string',
            'products' => 'nullable|array',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        // If user_id is not provided, use the authenticated user
        if (!isset($validated['user_id'])) {
            $validated['user_id'] = auth()->id();
        }

        // Create the deal
        $deal = Deal::create([
            'name' => $validated['name'],
            'amount' => $validated['amount'],
            'stage' => $validated['stage'],
            'company_id' => $validated['company_id'],
            'user_id' => $validated['user_id'],
            'description' => $validated['description'] ?? null,
        ]);

        // Attach products if any
        if (isset($validated['products']) && count($validated['products']) > 0) {
            foreach ($validated['products'] as $product) {
                $deal->products()->attach($product['product_id'], ['quantity' => $product['quantity']]);
            }
        }

        return redirect()->route('sales.deals.show', $deal)
            ->with('success', 'Deal created successfully.');
    }

    /**
     * Display the specified deal.
     */
    public function show(Deal $deal)
    {
        $deal->load(['company', 'user', 'products']);
        $products = $deal->products;

        return Inertia::render('Sales/DealDetail', [
            'deal' => $deal,
            'products' => $products,
        ]);
    }

    /**
     * Show the form for editing the specified deal.
     */
    public function edit(Deal $deal)
    {
        $deal->load('products');
        $companies = Company::orderBy('name')->get(['id', 'name']);
        $allProducts = Product::orderBy('name')->get(['id', 'name', 'monthly_price', 'annual_price']);
        $users = \App\Models\User::orderBy('name')->get(['id', 'name']);

        // Format products for the form
        $products = $deal->products->map(function ($product) {
            return [
                'product_id' => $product->id,
                'quantity' => $product->pivot->quantity
            ];
        });

        return Inertia::render('Sales/DealForm', [
            'deal' => $deal,
            'companies' => $companies,
            'allProducts' => $allProducts,
            'products' => $products,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified deal in storage.
     */
    public function update(Request $request, Deal $deal)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'amount' => 'nullable|numeric|min:0',
            'stage' => 'required|in:prospect,qualified,proposal,closed',
            'company_id' => 'required|exists:companies,id',
            'user_id' => 'nullable|exists:users,id',
            'description' => 'nullable|string',
            'products' => 'nullable|array',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        // Update the deal
        $deal->update([
            'name' => $validated['name'],
            'amount' => $validated['amount'],
            'stage' => $validated['stage'],
            'company_id' => $validated['company_id'],
            'user_id' => $validated['user_id'] ?? $deal->user_id,
            'description' => $validated['description'] ?? $deal->description,
        ]);

        // Sync products
        if (isset($validated['products']) && count($validated['products']) > 0) {
            $syncData = [];
            foreach ($validated['products'] as $product) {
                $syncData[$product['product_id']] = ['quantity' => $product['quantity']];
            }
            $deal->products()->sync($syncData);
        } else {
            $deal->products()->detach();
        }

        return redirect()->route('sales.deals.show', $deal)
            ->with('success', 'Deal updated successfully.');
    }

    /**
     * Update the deal stage (for drag-and-drop kanban).
     */
    public function updateStage(Request $request, Deal $deal)
    {
        $validated = $request->validate([
            'stage' => 'required|in:prospect,qualified,proposal,closed',
        ]);

        $deal->update(['stage' => $validated['stage']]);

        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified deal from storage.
     */
    public function destroy(Deal $deal)
    {
        $deal->products()->detach();
        $deal->delete();

        return redirect()->route('sales.deals.board')
            ->with('success', 'Deal deleted successfully.');
    }
}
