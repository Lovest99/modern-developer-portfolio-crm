<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Deal extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'amount',
        'stage',
        'company_id',
        'created_by',
        'assigned_to',
        'description',
        'expected_close_date',
        'probability',
        'source',
        'loss_reason',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'probability' => 'decimal:2',
        'expected_close_date' => 'date',
    ];

    /**
     * Get the company that owns the deal.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the user who created the deal.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user assigned to the deal.
     */
    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    /**
     * Get the quotes associated with the deal.
     */
    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class);
    }

    /**
     * The products that belong to the deal.
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'deal_products')
            ->withPivot('quantity');
    }

    /**
     * Get the project associated with the deal.
     */
    public function project(): HasOne
    {
        return $this->hasOne(Project::class);
    }

    /**
     * Get the referrals for the deal.
     */
    public function referrals(): HasMany
    {
        return $this->hasMany(Referral::class);
    }
}
