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
        Schema::table('products', function (Blueprint $table) {
            // Add new columns to the products table
            $table->text('description')->nullable()->after('name');
            $table->string('sku', 50)->nullable()->after('description');
            $table->decimal('cost_price', 10, 2)->nullable()->after('annual_price');
            $table->integer('stock_quantity')->nullable()->after('cost_price');
            $table->boolean('is_active')->default(true)->after('stock_quantity');
            $table->string('image_path', 255)->nullable()->after('is_active');
            $table->json('features')->nullable()->after('image_path');
            $table->json('specifications')->nullable()->after('features');

            // Add new indexes
            $table->index('category');
            $table->index('is_active');
            $table->index('sku');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Drop indexes
            $table->dropIndex(['category']);
            $table->dropIndex(['is_active']);
            $table->dropIndex(['sku']);

            // Drop new columns
            $table->dropColumn([
                'description',
                'sku',
                'cost_price',
                'stock_quantity',
                'is_active',
                'image_path',
                'features',
                'specifications'
            ]);
        });
    }
};
