<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'sku',
        'monthly_price',
        'annual_price',
        'cost_price',
        'category',
        'stock_quantity',
        'is_active',
        'image_path',
        'features',
        'specifications',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'monthly_price' => 'decimal:2',
        'annual_price' => 'decimal:2',
        'cost_price' => 'decimal:2',
        'is_active' => 'boolean',
        'features' => 'array',
        'specifications' => 'array',
    ];

    /**
     * The deals that belong to the product.
     */
    public function deals(): BelongsToMany
    {
        return $this->belongsToMany(Deal::class, 'deal_products')
            ->withPivot('quantity');
    }

    /**
     * Get the quote items for the product.
     */
    public function quoteItems(): HasMany
    {
        return $this->hasMany(QuoteItem::class);
    }

    /**
     * Calculate the profit margin percentage for monthly price.
     */
    public function getMonthlyMarginPercentageAttribute(): float
    {
        if (!$this->monthly_price || !$this->cost_price || $this->cost_price == 0) {
            return 0;
        }

        return (($this->monthly_price - $this->cost_price) / $this->cost_price) * 100;
    }

    /**
     * Calculate the profit margin percentage for annual price.
     */
    public function getAnnualMarginPercentageAttribute(): float
    {
        if (!$this->annual_price || !$this->cost_price || $this->cost_price == 0) {
            return 0;
        }

        return (($this->annual_price - $this->cost_price) / $this->cost_price) * 100;
    }
}
