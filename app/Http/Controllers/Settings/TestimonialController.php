<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    /**
     * Display a listing of testimonials.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $testimonials = Testimonial::orderBy('display_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('settings/testimonials/Index', [
            'testimonials' => $testimonials
        ]);
    }

    /**
     * Show the form for creating a new testimonial.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('settings/testimonials/Create');
    }

    /**
     * Store a newly created testimonial in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:100',
            'role' => 'required|string|max:100',
            'company' => 'required|string|max:100',
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'is_active' => 'boolean',
            'display_order' => 'integer',
        ];

        // Check if we're uploading files or using URLs
        if ($request->hasFile('profile_image')) {
            $rules['profile_image'] = 'nullable|image|max:2048';
        } else {
            $rules['profile_image'] = 'nullable|string|max:255';
        }

        if ($request->hasFile('company_logo')) {
            $rules['company_logo'] = 'nullable|image|max:2048';
        } else {
            $rules['company_logo'] = 'nullable|string|max:255';
        }

        $validated = $request->validate($rules);

        // Set default values
        $validated['is_active'] = $request->has('is_active');
        $validated['display_order'] = $validated['display_order'] ?? 0;

        // Handle file uploads
        if ($request->hasFile('profile_image')) {
            // Ensure directory exists
            Storage::disk('public')->makeDirectory('testimonials/profiles');

            // Get the file and generate a unique name
            $file = $request->file('profile_image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

            // Store the file with the custom filename
            $path = $file->storeAs('testimonials/profiles', $filename, 'public');

            // Store the full URL in the database for direct access
            $validated['profile_image'] = asset('storage/' . $path);

            // For debugging
            \Log::info('Profile image uploaded to: ' . $path);
            \Log::info('Full URL stored in database: ' . $validated['profile_image']);
        }

        if ($request->hasFile('company_logo')) {
            // Ensure directory exists
            Storage::disk('public')->makeDirectory('testimonials/logos');

            // Get the file and generate a unique name
            $file = $request->file('company_logo');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

            // Store the file with the custom filename
            $path = $file->storeAs('testimonials/logos', $filename, 'public');

            // Store the full URL in the database for direct access
            $validated['company_logo'] = asset('storage/' . $path);

            // For debugging
            \Log::info('Company logo uploaded to: ' . $path);
            \Log::info('Full URL stored in database: ' . $validated['company_logo']);
        }

        Testimonial::create($validated);

        return redirect()->route('settings.testimonials.index')
            ->with('success', 'Testimonial created successfully.');
    }

    /**
     * Show the form for editing the specified testimonial.
     *
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Inertia\Response
     */
    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('settings/testimonials/Edit', [
            'testimonial' => $testimonial
        ]);
    }

    /**
     * Update the specified testimonial in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        $rules = [
            'name' => 'required|string|max:100',
            'role' => 'required|string|max:100',
            'company' => 'required|string|max:100',
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'display_order' => 'integer',
        ];

        // Check if we're uploading files or using URLs
        if ($request->hasFile('profile_image')) {
            $rules['profile_image'] = 'nullable|image|max:2048';
        } else {
            $rules['profile_image'] = 'nullable|string|max:255';
        }

        if ($request->hasFile('company_logo')) {
            $rules['company_logo'] = 'nullable|image|max:2048';
        } else {
            $rules['company_logo'] = 'nullable|string|max:255';
        }

        $validated = $request->validate($rules);

        // Set default values
        $validated['is_active'] = $request->has('is_active');
        $validated['display_order'] = $validated['display_order'] ?? 0;

        // Handle file uploads
        if ($request->hasFile('profile_image')) {
            // Delete old file if exists and is stored locally
            if ($testimonial->profile_image) {
                // Handle both relative paths and full URLs
                $oldPath = $testimonial->profile_image;

                // If it's a full URL, extract the path
                if (filter_var($oldPath, FILTER_VALIDATE_URL)) {
                    $parsedUrl = parse_url($oldPath);
                    if (isset($parsedUrl['path']) && strpos($parsedUrl['path'], '/storage/') === 0) {
                        $oldPath = $parsedUrl['path'];
                    }
                }

                // If it's a storage path, delete the file
                if (strpos($oldPath, '/storage/') === 0) {
                    $oldPath = str_replace('/storage/', '', $oldPath);
                    Storage::disk('public')->delete($oldPath);
                    \Log::info('Deleted old profile image: ' . $oldPath);
                }
            }

            // Ensure directory exists
            Storage::disk('public')->makeDirectory('testimonials/profiles');

            // Get the file and generate a unique name
            $file = $request->file('profile_image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

            // Store the file with the custom filename
            $path = $file->storeAs('testimonials/profiles', $filename, 'public');

            // Store the full URL in the database for direct access
            $validated['profile_image'] = asset('storage/' . $path);

            // For debugging
            \Log::info('Profile image updated to: ' . $path);
            \Log::info('Full URL stored in database: ' . $validated['profile_image']);
        }

        if ($request->hasFile('company_logo')) {
            // Delete old file if exists and is stored locally
            if ($testimonial->company_logo) {
                // Handle both relative paths and full URLs
                $oldPath = $testimonial->company_logo;

                // If it's a full URL, extract the path
                if (filter_var($oldPath, FILTER_VALIDATE_URL)) {
                    $parsedUrl = parse_url($oldPath);
                    if (isset($parsedUrl['path']) && strpos($parsedUrl['path'], '/storage/') === 0) {
                        $oldPath = $parsedUrl['path'];
                    }
                }

                // If it's a storage path, delete the file
                if (strpos($oldPath, '/storage/') === 0) {
                    $oldPath = str_replace('/storage/', '', $oldPath);
                    Storage::disk('public')->delete($oldPath);
                    \Log::info('Deleted old company logo: ' . $oldPath);
                }
            }

            // Ensure directory exists
            Storage::disk('public')->makeDirectory('testimonials/logos');

            // Get the file and generate a unique name
            $file = $request->file('company_logo');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

            // Store the file with the custom filename
            $path = $file->storeAs('testimonials/logos', $filename, 'public');

            // Store the full URL in the database for direct access
            $validated['company_logo'] = asset('storage/' . $path);

            // For debugging
            \Log::info('Company logo updated to: ' . $path);
            \Log::info('Full URL stored in database: ' . $validated['company_logo']);
        }

        $testimonial->update($validated);

        return redirect()->route('settings.testimonials.index')
            ->with('success', 'Testimonial updated successfully.');
    }

    /**
     * Remove the specified testimonial from storage.
     *
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Testimonial $testimonial)
    {
        // Delete associated files if they exist and are stored locally
        if ($testimonial->profile_image && strpos($testimonial->profile_image, '/storage/') === 0) {
            $path = str_replace('/storage/', '', $testimonial->profile_image);
            Storage::disk('public')->delete($path);
        }

        if ($testimonial->company_logo && strpos($testimonial->company_logo, '/storage/') === 0) {
            $path = str_replace('/storage/', '', $testimonial->company_logo);
            Storage::disk('public')->delete($path);
        }

        $testimonial->delete();

        return redirect()->route('settings.testimonials.index')
            ->with('success', 'Testimonial deleted successfully.');
    }

    /**
     * Toggle the active status of the specified testimonial.
     *
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\RedirectResponse
     */
    public function toggleActive(Testimonial $testimonial)
    {
        $testimonial->update([
            'is_active' => !$testimonial->is_active,
        ]);

        return redirect()->route('settings.testimonials.index')
            ->with('success', 'Testimonial status updated successfully.');
    }

    /**
     * Reorder testimonials.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'testimonials' => 'required|array',
            'testimonials.*.id' => 'required|exists:testimonials,id',
            'testimonials.*.order' => 'required|integer|min:0',
        ]);

        foreach ($validated['testimonials'] as $item) {
            Testimonial::where('id', $item['id'])->update(['display_order' => $item['order']]);
        }

        return redirect()->route('settings.testimonials.index')
            ->with('success', 'Testimonials reordered successfully.');
    }
}
