<?php

namespace App\Http\Requests\Marketing;

use App\Http\Requests\BaseRequest;

class NewsletterSubscriberRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'email' => 'required|email|max:255|unique:newsletter_subscribers,email',
            'name' => 'nullable|string|max:255',
        ];

        // Add admin-only fields if the request is from an authenticated user
        if (auth()->check()) {
            $rules['confirmed'] = 'nullable|boolean';
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
            'email' => 'email address',
        ];
    }
}
