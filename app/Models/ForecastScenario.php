<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ForecastScenario extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sales_forecast_id',
        'name',
        'type',
        'adjustment_factor',
        'predicted_amount',
        'assumptions',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'adjustment_factor' => 'decimal:2',
        'predicted_amount' => 'decimal:2',
        'assumptions' => 'array',
    ];

    /**
     * Get the forecast that owns the scenario.
     */
    public function forecast(): BelongsTo
    {
        return $this->belongsTo(SalesForecast::class, 'sales_forecast_id');
    }
}
