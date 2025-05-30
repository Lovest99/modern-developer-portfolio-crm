<?php

namespace App\Http\Requests\Client;

use App\Http\Requests\BaseRequest;

class ClientRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'contact_id' => 'required|exists:contacts,id',
            'client_since' => 'required|date',
            'status' => 'required|in:active,inactive,prospect',
            'lifetime_value' => 'nullable|numeric|min:0',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'contact_id' => 'contact',
            'client_since' => 'client since date',
            'lifetime_value' => 'lifetime value',
        ];
    }
}
