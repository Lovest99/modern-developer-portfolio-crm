<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuoteItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'quote_id',
        'product_id',
        'description',
        'quantity',
        'unit_price',
        'discount_percentage',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'unit_price' => 'decimal:2',
        'discount_percentage' => 'decimal:2',
    ];

    /**
     * Get the quote that owns the item.
     */
    public function quote(): BelongsTo
    {
        return $this->belongsTo(Quote::class);
    }

    /**
     * Get the product associated with the item.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Calculate the line total before discount.
     */
    public function getLineTotalAttribute(): float
    {
        return $this->quantity * $this->unit_price;
    }

    /**
     * Calculate the discount amount.
     */
    public function getDiscountAmountAttribute(): float
    {
        return $this->line_total * ($this->discount_percentage / 100);
    }

    /**
     * Calculate the final line total after discount.
     */
    public function getFinalLineTotalAttribute(): float
    {
        return $this->line_total - $this->discount_amount;
    }
}
