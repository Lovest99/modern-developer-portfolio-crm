<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sales_forecasts', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100);
            $table->foreignId('created_by')->constrained('users');
            $table->date('forecast_date');
            $table->date('start_date');
            $table->date('end_date');
            $table->decimal('target_amount', 12, 2);
            $table->decimal('predicted_amount', 12, 2);
            $table->decimal('confidence_percentage', 5, 2)->default(0);
            $table->json('monthly_breakdown')->nullable();
            $table->json('product_breakdown')->nullable();
            $table->json('team_breakdown')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('forecast_scenarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sales_forecast_id')->constrained()->onDelete('cascade');
            $table->string('name', 50);
            $table->enum('type', ['optimistic', 'realistic', 'pessimistic'])->default('realistic');
            $table->decimal('adjustment_factor', 5, 2)->default(1.00);
            $table->decimal('predicted_amount', 12, 2);
            $table->json('assumptions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forecast_scenarios');
        Schema::dropIfExists('sales_forecasts');
    }
};
