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
        Schema::table('deals', function (Blueprint $table) {
            // Add new columns to the deals table
            $table->date('expected_close_date')->nullable()->after('stage');
            $table->decimal('probability', 5, 2)->default(0)->after('expected_close_date');
            $table->string('source', 50)->nullable()->after('probability');
            $table->string('loss_reason', 100)->nullable()->after('source');
            $table->foreignId('assigned_to')->nullable()->after('user_id')->constrained('users');

            // Rename existing columns for clarity
            $table->renameColumn('user_id', 'created_by');

            // Add new indexes
            $table->index('expected_close_date');
            $table->index('probability');
            $table->index('source');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('deals', function (Blueprint $table) {
            // Drop indexes
            $table->dropIndex(['expected_close_date']);
            $table->dropIndex(['probability']);
            $table->dropIndex(['source']);

            // Drop new columns
            $table->dropColumn([
                'expected_close_date',
                'probability',
                'source',
                'loss_reason',
                'assigned_to'
            ]);

            // Rename columns back
            $table->renameColumn('created_by', 'user_id');
        });
    }
};
