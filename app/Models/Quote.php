<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quote extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'deal_id',
        'company_id',
        'created_by',
        'assigned_to',
        'total_amount',
        'discount_percentage',
        'tax_percentage',
        'valid_until',
        'status',
        'notes',
        'terms_and_conditions',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'total_amount' => 'decimal:2',
        'discount_percentage' => 'decimal:2',
        'tax_percentage' => 'decimal:2',
        'valid_until' => 'date',
    ];

    /**
     * Get the deal associated with the quote.
     */
    public function deal(): BelongsTo
    {
        return $this->belongsTo(Deal::class);
    }

    /**
     * Get the company associated with the quote.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the user who created the quote.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user assigned to the quote.
     */
    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    /**
     * Get the items for the quote.
     */
    public function items(): HasMany
    {
        return $this->hasMany(QuoteItem::class);
    }

    /**
     * Calculate the subtotal (before discount and tax).
     */
    public function getSubtotalAttribute(): float
    {
        return $this->items->sum(function ($item) {
            return $item->quantity * $item->unit_price * (1 - $item->discount_percentage / 100);
        });
    }

    /**
     * Calculate the discount amount.
     */
    public function getDiscountAmountAttribute(): float
    {
        return $this->subtotal * ($this->discount_percentage / 100);
    }

    /**
     * Calculate the taxable amount (after discount).
     */
    public function getTaxableAmountAttribute(): float
    {
        return $this->subtotal - $this->discount_amount;
    }

    /**
     * Calculate the tax amount.
     */
    public function getTaxAmountAttribute(): float
    {
        return $this->taxable_amount * ($this->tax_percentage / 100);
    }

    /**
     * Calculate the final total (after discount and tax).
     */
    public function getFinalTotalAttribute(): float
    {
        return $this->taxable_amount + $this->tax_amount;
    }
}
