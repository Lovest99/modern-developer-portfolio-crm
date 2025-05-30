<?php

namespace App\Http\Requests\Project;

use App\Http\Requests\BaseRequest;

class ProjectRequest extends BaseRequest
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
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:50',
            'github_url' => 'nullable|url|max:255',
            'live_url' => 'nullable|url|max:255',
            'status' => 'required|in:planning,development,completed,on_hold,cancelled',
            'user_id' => 'nullable|exists:users,id',
            'deal_id' => 'nullable|exists:deals,id',
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
            'user_id' => 'user',
            'deal_id' => 'deal',
            'github_url' => 'GitHub URL',
            'live_url' => 'live URL',
        ];
    }
}
