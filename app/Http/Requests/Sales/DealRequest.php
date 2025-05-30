<?php

namespace App\Http\Requests\Sales;

use App\Http\Requests\BaseRequest;

class DealRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'value' => 'required|numeric|min:0',
            'stage' => 'required|in:prospect,qualified,proposal,negotiation,closed_won,closed_lost',
            'client_id' => 'required|exists:clients,id',
            'assigned_to' => 'nullable|exists:users,id',
            'expected_close_date' => 'nullable|date',
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
            'client_id' => 'client',
            'assigned_to' => 'assignee',
            'expected_close_date' => 'expected close date',
        ];
    }
}
