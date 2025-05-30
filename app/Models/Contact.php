<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Contact extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'company_id',
        'notes',
    ];

    /**
     * Get the company that owns the contact.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the channels for the contact.
     */
    public function channels(): HasMany
    {
        return $this->hasMany(ContactChannel::class);
    }

    /**
     * Get the client record associated with the contact.
     */
    public function client(): HasOne
    {
        return $this->hasOne(Client::class);
    }

    /**
     * Get the affiliate record associated with the contact.
     */
    public function affiliate(): HasOne
    {
        return $this->hasOne(Affiliate::class);
    }

    /**
     * Get the AI conversations for the contact.
     */
    public function aiConversations(): HasMany
    {
        return $this->hasMany(AiConversation::class);
    }

    /**
     * Get the full name of the contact.
     */
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    /**
     * Get the primary email of the contact.
     */
    public function getPrimaryEmailAttribute(): ?string
    {
        $emailChannel = $this->channels()
            ->where('channel_type', 'email')
            ->where('is_primary', true)
            ->first();

        return $emailChannel ? $emailChannel->value : null;
    }

    /**
     * Get the primary phone of the contact.
     */
    public function getPrimaryPhoneAttribute(): ?string
    {
        $phoneChannel = $this->channels()
            ->where('channel_type', 'phone')
            ->where('is_primary', true)
            ->first();

        return $phoneChannel ? $phoneChannel->value : null;
    }
}
