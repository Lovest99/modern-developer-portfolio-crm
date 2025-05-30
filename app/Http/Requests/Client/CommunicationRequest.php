<?php

namespace App\Http\Requests\Client;

use App\Http\Requests\BaseRequest;

class CommunicationRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_id' => 'required|exists:clients,id',
            'channel' => 'required|in:email,phone,meeting,video',
            'direction' => 'required|in:inbound,outbound',
            'subject' => 'nullable|string|max:255',
            'content' => 'required|string',
            'user_id' => 'nullable|exists:users,id',
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
            'user_id' => 'user',
        ];
    }
}
