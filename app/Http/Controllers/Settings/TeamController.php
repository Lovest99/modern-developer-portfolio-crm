<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TeamController extends Controller
{
    /**
     * Display the team settings page.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $users = User::with('role')->get();
        $roles = Role::all();

        return Inertia::render('Settings/Team', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    /**
     * Invite a new user to the team.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function invite(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'role' => 'required|exists:roles,name',
        ]);

        // Generate a random password
        $password = Str::random(12);

        // Create the user
        $user = User::create([
            'name' => explode('@', $validated['email'])[0], // Use part of email as name
            'email' => $validated['email'],
            'password' => Hash::make($password),
        ]);

        // Assign role
        $role = Role::where('name', $validated['role'])->first();
        $user->role()->associate($role);
        $user->save();

        // Send invitation email (in a real app)
        // Mail::to($user->email)->send(new TeamInvitation($user, $password));

        return redirect()->back()
            ->with('success', 'Invitation sent successfully.');
    }

    /**
     * Update the role of a team member.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateRole(Request $request, $id)
    {
        $validated = $request->validate([
            'role' => 'required|exists:roles,name',
        ]);

        $user = User::findOrFail($id);

        // Prevent changing the role of the last admin
        if ($user->role->name === 'admin' && $validated['role'] !== 'admin') {
            $adminCount = User::whereHas('role', function ($query) {
                $query->where('name', 'admin');
            })->count();

            if ($adminCount <= 1) {
                return redirect()->back()
                    ->with('error', 'Cannot change the role of the last admin.');
            }
        }

        $role = Role::where('name', $validated['role'])->first();
        $user->role()->associate($role);
        $user->save();

        return redirect()->back()
            ->with('success', 'Role updated successfully.');
    }

    /**
     * Remove a user from the team.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Prevent deleting the last admin
        if ($user->role->name === 'admin') {
            $adminCount = User::whereHas('role', function ($query) {
                $query->where('name', 'admin');
            })->count();

            if ($adminCount <= 1) {
                return redirect()->back()
                    ->with('error', 'Cannot delete the last admin.');
            }
        }

        // Prevent self-deletion
        if ($user->id === auth()->id()) {
            return redirect()->back()
                ->with('error', 'You cannot remove yourself from the team.');
        }

        $user->delete();

        return redirect()->back()
            ->with('success', 'User removed successfully.');
    }
}
