<?php

namespace App\Http\Requests\Marketing;

use App\Http\Requests\BaseRequest;

class WebsiteContactRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ];

        // Add admin-only fields if the request is from an authenticated user
        if (auth()->check()) {
            $rules['status'] = 'nullable|in:new,in_progress,completed,spam';
            $rules['assigned_to'] = 'nullable|exists:users,id';
        }

        return $rules;
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'assigned_to' => 'assignee',
        ];
    }
}
