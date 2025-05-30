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
        // Role Management
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique();
            $table->json('permissions')->default('{}');
            $table->timestamps();
        });

        Schema::create('user_roles', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('role_id')->constrained()->onDelete('cascade');
            $table->timestamp('assigned_at')->useCurrent();
            $table->primary(['user_id', 'role_id']);
        });

        // Contact Management
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('industry', 50)->nullable();
            $table->string('website', 100)->nullable();
            $table->timestamps();
        });

        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->foreignId('company_id')->nullable()->constrained();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('contact_channels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contact_id')->constrained()->onDelete('cascade');
            $table->enum('channel_type', ['email', 'phone', 'whatsapp', 'telegram', 'other']);
            $table->string('value', 255);
            $table->boolean('is_primary')->default(false);
            $table->boolean('verified')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->unique(['channel_type', 'value']);
        });

        // Client Management
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contact_id')->constrained()->onDelete('cascade');
            $table->date('client_since');
            $table->enum('status', ['active', 'inactive', 'churned'])->default('active');
            $table->decimal('lifetime_value', 12, 2)->default(0);
            $table->unique('contact_id');
        });

        // Sales Pipeline
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->decimal('monthly_price', 10, 2)->nullable();
            $table->decimal('annual_price', 10, 2)->nullable();
            $table->string('category', 50)->nullable();
            $table->timestamps();
        });

        Schema::create('deals', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->decimal('amount', 12, 2)->nullable();
            $table->enum('stage', ['prospect', 'qualified', 'proposal', 'closed'])->default('prospect');
            $table->foreignId('company_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });

        Schema::create('deal_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('deal_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained();
            $table->integer('quantity')->default(1);
        });

        // Project Management
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->string('image', 255)->nullable();
            $table->json('technologies')->nullable();
            $table->string('github_url', 255)->nullable();
            $table->string('live_url', 255)->nullable();
            $table->enum('status', ['planning', 'development', 'completed', 'archived'])->default('planning');
            $table->foreignId('user_id')->constrained();
            $table->foreignId('deal_id')->nullable()->constrained();
            $table->timestamps();
        });

        Schema::create('project_team', function (Blueprint $table) {
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('role', 50)->nullable();
            $table->primary(['project_id', 'user_id']);
        });

        // Tasks Management (Missing in original schema)
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->enum('status', ['todo', 'in_progress', 'review', 'completed'])->default('todo');
            $table->foreignId('project_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('created_by')->constrained('users');
            $table->date('due_date')->nullable();
            $table->timestamps();
        });

        // Time Tracking (Missing in original schema)
        Schema::create('time_tracking', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('project_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('task_id')->nullable()->constrained()->onDelete('cascade');
            $table->dateTime('start_time');
            $table->dateTime('end_time')->nullable();
            $table->text('description')->nullable();
            $table->boolean('billable')->default(true);
            $table->timestamps();
        });

        // Communication & Marketing
        Schema::create('newsletters', function (Blueprint $table) {
            $table->id();
            $table->string('email', 255)->unique();
            $table->string('subscription_token', 100)->unique()->nullable();
            $table->boolean('is_confirmed')->default(false);
            $table->timestamp('subscribed_at')->useCurrent();
            $table->timestamp('unsubscribed_at')->nullable();
            $table->enum('source', ['website', 'import', 'manual'])->default('website');
        });

        Schema::create('website_contacts', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('email', 255);
            $table->enum('subject', ['support', 'sales', 'partnership', 'other']);
            $table->text('message');
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->enum('status', ['new', 'responded', 'spam'])->default('new');
            $table->foreignId('assigned_to')->nullable()->constrained('users');
            $table->timestamps();
        });

        Schema::create('client_comms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained();
            $table->enum('channel', ['email', 'whatsapp', 'call', 'contact_form']);
            $table->enum('direction', ['inbound', 'outbound']);
            $table->string('subject', 255)->nullable();
            $table->text('content')->nullable();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->timestamps();
        });

        // Marketing Campaigns (Missing in original schema)
        Schema::create('marketing_campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->text('description')->nullable();
            $table->enum('type', ['email', 'social', 'content', 'ppc', 'other']);
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->decimal('budget', 10, 2)->nullable();
            $table->decimal('cost', 10, 2)->nullable();
            $table->json('metrics')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });

        // AI Agent
        Schema::create('ai_conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contact_id')->constrained();
            $table->json('transcript')->nullable();
            $table->decimal('sentiment_score', 3, 2)->nullable();
            $table->text('suggested_action')->nullable();
            $table->timestamps();
        });

        // Affiliate Marketing
        Schema::create('affiliates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contact_id')->constrained();
            $table->string('referral_code', 20)->unique();
            $table->decimal('commission_rate', 5, 2);
            $table->decimal('balance', 10, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('referrals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('affiliate_id')->constrained();
            $table->foreignId('deal_id')->constrained();
            $table->decimal('commission_amount', 10, 2);
            $table->enum('status', ['pending', 'approved', 'paid'])->default('pending');
            $table->timestamps();
        });

        // Audit Logs (Missing in original schema)
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->string('action', 50);
            $table->string('model_type', 50);
            $table->unsignedBigInteger('model_id')->nullable();
            $table->json('old_values')->nullable();
            $table->json('new_values')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent', 255)->nullable();
            $table->timestamps();
        });

        // System Settings (Missing in original schema)
        Schema::create('system_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key', 50)->unique();
            $table->text('value')->nullable();
            $table->string('group', 50)->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_public')->default(false);
            $table->timestamps();
        });

        // Create indexes
        Schema::table('contact_channels', function (Blueprint $table) {
            $table->index('contact_id');
        });

        Schema::table('deals', function (Blueprint $table) {
            $table->index('stage');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->index('status');
        });

        Schema::table('affiliates', function (Blueprint $table) {
            $table->index('referral_code');
        });

        Schema::table('website_contacts', function (Blueprint $table) {
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop tables in reverse order to avoid foreign key constraints
        Schema::dropIfExists('system_settings');
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('referrals');
        Schema::dropIfExists('affiliates');
        Schema::dropIfExists('ai_conversations');
        Schema::dropIfExists('marketing_campaigns');
        Schema::dropIfExists('client_comms');
        Schema::dropIfExists('website_contacts');
        Schema::dropIfExists('newsletters');
        Schema::dropIfExists('time_tracking');
        Schema::dropIfExists('tasks');
        Schema::dropIfExists('project_team');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('deal_products');
        Schema::dropIfExists('deals');
        Schema::dropIfExists('products');
        Schema::dropIfExists('clients');
        Schema::dropIfExists('contact_channels');
        Schema::dropIfExists('contacts');
        Schema::dropIfExists('companies');
        Schema::dropIfExists('user_roles');
        Schema::dropIfExists('roles');
    }
};
