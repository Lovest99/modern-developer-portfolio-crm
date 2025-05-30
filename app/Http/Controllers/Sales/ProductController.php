<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of products.
     */
    public function index(Request $request)
    {
        $query = Product::query();

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        // Sort
        $sortField = $request->input('sort_field', 'name');
        $sortDirection = $request->input('sort_direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $products = $query->paginate(10)->withQueryString();

        // Get unique categories for filter dropdown
        $categories = Product::distinct()->pluck('category')->filter()->values();

        return Inertia::render('Sales/Products', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'sort_field', 'sort_direction']),
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        return Inertia::render('Sales/ProductForm');
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'monthly_price' => 'nullable|numeric|min:0',
            'annual_price' => 'nullable|numeric|min:0',
            'category' => 'nullable|string|max:50',
        ]);

        Product::create($validated);

        return redirect()->route('sales.products.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        // Count deals using this product
        $dealCount = $product->deals()->count();

        return Inertia::render('Sales/ProductShow', [
            'product' => $product,
            'dealCount' => $dealCount,
        ]);
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Sales/ProductForm', [
            'product' => $product,
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'monthly_price' => 'nullable|numeric|min:0',
            'annual_price' => 'nullable|numeric|min:0',
            'category' => 'nullable|string|max:50',
        ]);

        $product->update($validated);

        return redirect()->route('sales.products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        // Check if product is used in any deals
        if ($product->deals()->exists()) {
            return redirect()->route('sales.products.index')
                ->with('error', 'Cannot delete product because it is used in one or more deals.');
        }

        $product->delete();

        return redirect()->route('sales.products.index')
            ->with('success', 'Product deleted successfully.');
    }
}
