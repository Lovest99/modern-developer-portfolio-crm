<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TestimonialController extends Controller
{
    /**
     * Display a listing of active testimonials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($testimonials);
    }

    /**
     * Store a newly created testimonial in storage.
     * This endpoint is protected and only accessible to authenticated users.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'role' => 'required|string|max:100',
            'company' => 'required|string|max:100',
            'company_logo' => 'nullable|string|max:255',
            'profile_image' => 'nullable|string|max:255',
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'is_active' => 'boolean',
            'display_order' => 'integer',
        ]);

        $testimonial = Testimonial::create($validated);

        return response()->json($testimonial, 201);
    }

    /**
     * Display the specified testimonial.
     *
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Testimonial $testimonial): JsonResponse
    {
        return response()->json($testimonial);
    }

    /**
     * Update the specified testimonial in storage.
     * This endpoint is protected and only accessible to authenticated users.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Testimonial $testimonial): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'string|max:100',
            'role' => 'string|max:100',
            'company' => 'string|max:100',
            'company_logo' => 'nullable|string|max:255',
            'profile_image' => 'nullable|string|max:255',
            'content' => 'string',
            'rating' => 'integer|min:1|max:5',
            'is_active' => 'boolean',
            'display_order' => 'integer',
        ]);

        $testimonial->update($validated);

        return response()->json($testimonial);
    }

    /**
     * Remove the specified testimonial from storage.
     * This endpoint is protected and only accessible to authenticated users.
     *
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Testimonial $testimonial): JsonResponse
    {
        $testimonial->delete();

        return response()->json(null, 204);
    }
}
