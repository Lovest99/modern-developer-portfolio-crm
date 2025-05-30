<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ApiTokenController extends Controller
{
    /**
     * Display the API token management page.
     */
    public function index()
    {
        $tokens = auth()->user()->tokens;

        return Inertia::render('Settings/ApiTokens', [
            'tokens' => $tokens,
        ]);
    }

    /**
     * Create a new API token.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $token = auth()->user()->createToken($request->name);

        return back()->with([
            'token' => $token->plainTextToken,
            'message' => 'API token created successfully.',
        ]);
    }

    /**
     * Delete the specified API token.
     */
    public function destroy(Request $request, $id)
    {
        auth()->user()->tokens()->where('id', $id)->delete();

        return back()->with('message', 'API token deleted successfully.');
    }
}
