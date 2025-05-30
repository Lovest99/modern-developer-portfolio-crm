<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SalesForecast extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'created_by',
        'forecast_date',
        'start_date',
        'end_date',
        'target_amount',
        'predicted_amount',
        'confidence_percentage',
        'monthly_breakdown',
        'product_breakdown',
        'team_breakdown',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'forecast_date' => 'date',
        'start_date' => 'date',
        'end_date' => 'date',
        'target_amount' => 'decimal:2',
        'predicted_amount' => 'decimal:2',
        'confidence_percentage' => 'decimal:2',
        'monthly_breakdown' => 'array',
        'product_breakdown' => 'array',
        'team_breakdown' => 'array',
    ];

    /**
     * Get the user who created the forecast.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the scenarios for the forecast.
     */
    public function scenarios(): HasMany
    {
        return $this->hasMany(ForecastScenario::class);
    }

    /**
     * Calculate the variance between target and predicted amount.
     */
    public function getVarianceAttribute(): float
    {
        return $this->predicted_amount - $this->target_amount;
    }

    /**
     * Calculate the variance percentage.
     */
    public function getVariancePercentageAttribute(): float
    {
        if ($this->target_amount == 0) {
            return 0;
        }

        return ($this->variance / $this->target_amount) * 100;
    }
}
