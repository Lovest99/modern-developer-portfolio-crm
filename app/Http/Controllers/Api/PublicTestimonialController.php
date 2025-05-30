<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;

class PublicTestimonialController extends Controller
{
    /**
     * Display a listing of active testimonials for the public website.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('created_at', 'desc')
            ->get();

        // Transform the testimonials to ensure image URLs are properly formatted
        $testimonials = $testimonials->map(function ($testimonial) {
            // Log the original image paths for debugging
            \Log::info('Original testimonial image paths:', [
                'id' => $testimonial->id,
                'profile_image' => $testimonial->profile_image,
                'company_logo' => $testimonial->company_logo
            ]);

            // Make sure profile_image has the full URL if it exists
            if ($testimonial->profile_image && !filter_var($testimonial->profile_image, FILTER_VALIDATE_URL)) {
                // If it's a relative path, convert to absolute URL
                if (strpos($testimonial->profile_image, '/storage/') === 0) {
                    $testimonial->profile_image = asset($testimonial->profile_image);
                }
            }

            // Make sure company_logo has the full URL if it exists
            if ($testimonial->company_logo && !filter_var($testimonial->company_logo, FILTER_VALIDATE_URL)) {
                // If it's a relative path, convert to absolute URL
                if (strpos($testimonial->company_logo, '/storage/') === 0) {
                    $testimonial->company_logo = asset($testimonial->company_logo);
                }
            }

            // Log the transformed image paths
            \Log::info('Transformed testimonial image paths:', [
                'id' => $testimonial->id,
                'profile_image' => $testimonial->profile_image,
                'company_logo' => $testimonial->company_logo
            ]);

            return $testimonial;
        });

        return response()->json($testimonials);
    }
}
