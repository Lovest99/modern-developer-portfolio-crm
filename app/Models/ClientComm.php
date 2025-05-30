<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientComm extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'client_id',
        'channel',
        'direction',
        'subject',
        'content',
        'user_id',
    ];

    /**
     * Get the client that owns the communication.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * Get the user that owns the communication.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
