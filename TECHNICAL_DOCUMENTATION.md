# Portfolio CRM - Technical Documentation

This document provides detailed technical information about the database schema, models, controllers, and relationships in the Portfolio CRM application.

## Table of Contents

1. [Database Schema](#database-schema)
2. [Models](#models)
3. [Controllers](#controllers)
4. [Relationships](#relationships)
5. [Authentication & Authorization](#authentication--authorization)
6. [Validation](#validation)
7. [File Storage](#file-storage)
8. [Events & Listeners](#events--listeners)

## Database Schema

### Core Authentication Tables
- **users**
  - `id` - bigint, primary key
  - `name` - varchar(255)
  - `email` - varchar(255), unique
  - `email_verified_at` - timestamp, nullable
  - `password` - varchar(255)
  - `remember_token` - varchar(100), nullable
  - `timestamps` - created_at, updated_at

- **password_reset_tokens**
  - `email` - varchar(255), primary key
  - `token` - varchar(255)
  - `created_at` - timestamp, nullable

- **sessions**
  - `id` - varchar(255), primary key
  - `user_id` - bigint, nullable, foreign key
  - `ip_address` - varchar(45), nullable
  - `user_agent` - text, nullable
  - `payload` - text
  - `last_activity` - integer

### Role Management Tables
- **roles**
  - `id` - bigint, primary key
  - `name` - varchar(50), unique
  - `permissions` - json
  - `timestamps` - created_at, updated_at

- **user_roles**
  - `user_id` - bigint, foreign key
  - `role_id` - bigint, foreign key
  - `assigned_at` - timestamp
  - Primary key: (user_id, role_id)

### Contact Management Tables
- **companies**
  - `id` - bigint, primary key
  - `name` - varchar(100)
  - `industry` - varchar(50), nullable
  - `website` - varchar(100), nullable
  - `timestamps` - created_at, updated_at

- **contacts**
  - `id` - bigint, primary key
  - `first_name` - varchar(50)
  - `last_name` - varchar(50)
  - `company_id` - bigint, nullable, foreign key
  - `notes` - text, nullable
  - `timestamps` - created_at, updated_at

- **contact_channels**
  - `id` - bigint, primary key
  - `contact_id` - bigint, foreign key
  - `channel_type` - enum('email', 'phone', 'whatsapp', 'telegram', 'other')
  - `value` - varchar(255)
  - `is_primary` - boolean, default false
  - `verified` - boolean, default false
  - `created_at` - timestamp
  - Unique: (channel_type, value)

### Client Management Tables
- **clients**
  - `id` - bigint, primary key
  - `contact_id` - bigint, foreign key
  - `client_since` - date
  - `status` - enum('active', 'inactive', 'churned'), default 'active'
  - `lifetime_value` - decimal(12,2), default 0
  - Unique: contact_id

### Sales Pipeline Tables
- **products**
  - `id` - bigint, primary key
  - `name` - varchar(100)
  - `monthly_price` - decimal(10,2), nullable
  - `annual_price` - decimal(10,2), nullable
  - `category` - varchar(50), nullable
  - `timestamps` - created_at, updated_at

- **deals**
  - `id` - bigint, primary key
  - `name` - varchar(100)
  - `amount` - decimal(12,2), nullable
  - `stage` - enum('prospect', 'qualified', 'proposal', 'closed'), default 'prospect'
  - `company_id` - bigint, foreign key
  - `user_id` - bigint, foreign key
  - `timestamps` - created_at, updated_at

- **deal_products**
  - `id` - bigint, primary key
  - `deal_id` - bigint, foreign key
  - `product_id` - bigint, foreign key
  - `quantity` - integer, default 1

### Project Management Tables
- **projects**
  - `id` - bigint, primary key
  - `title` - varchar(255)
  - `description` - text, nullable
  - `image` - varchar(255), nullable
  - `technologies` - json, nullable
  - `github_url` - varchar(255), nullable
  - `live_url` - varchar(255), nullable
  - `status` - enum('planning', 'development', 'completed', 'archived'), default 'planning'
  - `user_id` - bigint, foreign key
  - `deal_id` - bigint, nullable, foreign key
  - `timestamps` - created_at, updated_at

- **project_team**
  - `project_id` - bigint, foreign key
  - `user_id` - bigint, foreign key
  - `role` - varchar(50), nullable
  - Primary key: (project_id, user_id)

- **tasks**
  - `id` - bigint, primary key
  - `title` - varchar(255)
  - `description` - text, nullable
  - `priority` - enum('low', 'medium', 'high', 'urgent'), default 'medium'
  - `status` - enum('todo', 'in_progress', 'review', 'completed'), default 'todo'
  - `project_id` - bigint, nullable, foreign key
  - `assigned_to` - bigint, nullable, foreign key
  - `created_by` - bigint, foreign key
  - `due_date` - date, nullable
  - `timestamps` - created_at, updated_at

- **time_tracking**
  - `id` - bigint, primary key
  - `user_id` - bigint, foreign key
  - `project_id` - bigint, nullable, foreign key
  - `task_id` - bigint, nullable, foreign key
  - `start_time` - datetime
  - `end_time` - datetime, nullable
  - `description` - text, nullable
  - `billable` - boolean, default true
  - `timestamps` - created_at, updated_at

### Communication & Marketing Tables
- **newsletters**
  - `id` - bigint, primary key
  - `email` - varchar(255), unique
  - `subscription_token` - varchar(100), unique, nullable
  - `is_confirmed` - boolean, default false
  - `subscribed_at` - timestamp
  - `unsubscribed_at` - timestamp, nullable
  - `source` - enum('website', 'import', 'manual'), default 'website'

- **website_contacts**
  - `id` - bigint, primary key
  - `name` - varchar(100)
  - `email` - varchar(255)
  - `subject` - enum('support', 'sales', 'partnership', 'other')
  - `message` - text
  - `ip_address` - varchar(45), nullable
  - `user_agent` - text, nullable
  - `status` - enum('new', 'responded', 'spam'), default 'new'
  - `assigned_to` - bigint, nullable, foreign key
  - `timestamps` - created_at, updated_at

- **client_comms**
  - `id` - bigint, primary key
  - `client_id` - bigint, foreign key
  - `channel` - enum('email', 'whatsapp', 'call', 'contact_form')
  - `direction` - enum('inbound', 'outbound')
  - `subject` - varchar(255), nullable
  - `content` - text, nullable
  - `user_id` - bigint, nullable, foreign key
  - `timestamps` - created_at, updated_at

- **marketing_campaigns**
  - `id` - bigint, primary key
  - `name` - varchar(100)
  - `description` - text, nullable
  - `type` - enum('email', 'social', 'content', 'ppc', 'other')
  - `start_date` - date
  - `end_date` - date, nullable
  - `budget` - decimal(10,2), nullable
  - `cost` - decimal(10,2), nullable
  - `metrics` - json, nullable
  - `created_by` - bigint, foreign key
  - `timestamps` - created_at, updated_at

### AI Agent Tables
- **ai_conversations**
  - `id` - bigint, primary key
  - `contact_id` - bigint, foreign key
  - `transcript` - json, nullable
  - `sentiment_score` - decimal(3,2), nullable
  - `suggested_action` - text, nullable
  - `timestamps` - created_at, updated_at

### Affiliate Marketing Tables
- **affiliates**
  - `id` - bigint, primary key
  - `contact_id` - bigint, foreign key
  - `referral_code` - varchar(20), unique
  - `commission_rate` - decimal(5,2)
  - `balance` - decimal(10,2), default 0
  - `timestamps` - created_at, updated_at

- **referrals**
  - `id` - bigint, primary key
  - `affiliate_id` - bigint, foreign key
  - `deal_id` - bigint, foreign key
  - `commission_amount` - decimal(10,2)
  - `status` - enum('pending', 'approved', 'paid'), default 'pending'
  - `timestamps` - created_at, updated_at

### System Management Tables
- **audit_logs**
  - `id` - bigint, primary key
  - `user_id` - bigint, nullable, foreign key
  - `action` - varchar(50)
  - `model_type` - varchar(50)
  - `model_id` - bigint, nullable
  - `old_values` - json, nullable
  - `new_values` - json, nullable
  - `ip_address` - varchar(45), nullable
  - `user_agent` - varchar(255), nullable
  - `timestamps` - created_at, updated_at

- **system_settings**
  - `id` - bigint, primary key
  - `key` - varchar(50), unique
  - `value` - text, nullable
  - `group` - varchar(50), nullable
  - `description` - text, nullable
  - `is_public` - boolean, default false
  - `timestamps` - created_at, updated_at

## Models

### User and Role Models

#### User Model
```php
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['name', 'email', 'password'];
    protected $hidden = ['password', 'remember_token'];
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'user_roles')
            ->withPivot('assigned_at')
            ->withTimestamps();
    }

    public function hasPermission($permission): bool
    {
        return $this->roles()->whereJsonContains('permissions', $permission)->exists();
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function assignedTasks(): HasMany
    {
        return $this->hasMany(Task::class, 'assigned_to');
    }

    public function createdTasks(): HasMany
    {
        return $this->hasMany(Task::class, 'created_by');
    }

    public function timeEntries(): HasMany
    {
        return $this->hasMany(TimeTracking::class);
    }

    public function deals(): HasMany
    {
        return $this->hasMany(Deal::class);
    }
}
```

#### Role Model
```php
class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'permissions'];
    protected $casts = ['permissions' => 'json'];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_roles')
            ->withPivot('assigned_at')
            ->withTimestamps();
    }
}
```

### Contact Models

#### Company Model
```php
class Company extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'industry', 'website'];

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    public function deals(): HasMany
    {
        return $this->hasMany(Deal::class);
    }
}
```

#### Contact Model
```php
class Contact extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'company_id', 'notes'];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function channels(): HasMany
    {
        return $this->hasMany(ContactChannel::class);
    }

    public function client(): HasOne
    {
        return $this->hasOne(Client::class);
    }

    public function affiliate(): HasOne
    {
        return $this->hasOne(Affiliate::class);
    }

    public function aiConversations(): HasMany
    {
        return $this->hasMany(AiConversation::class);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getPrimaryEmailAttribute(): ?string
    {
        $emailChannel = $this->channels()
            ->where('channel_type', 'email')
            ->where('is_primary', true)
            ->first();

        return $emailChannel ? $emailChannel->value : null;
    }

    public function getPrimaryPhoneAttribute(): ?string
    {
        $phoneChannel = $this->channels()
            ->where('channel_type', 'phone')
            ->where('is_primary', true)
            ->first();

        return $phoneChannel ? $phoneChannel->value : null;
    }
}
```

#### ContactChannel Model
```php
class ContactChannel extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $fillable = [
        'contact_id',
        'channel_type',
        'value',
        'is_primary',
        'verified',
    ];
    
    protected $casts = [
        'is_primary' => 'boolean',
        'verified' => 'boolean',
        'created_at' => 'datetime',
    ];

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class);
    }
}
```

### Client and Sales Models

#### Client Model
```php
class Client extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $fillable = [
        'contact_id',
        'client_since',
        'status',
        'lifetime_value',
    ];
    
    protected $casts = [
        'client_since' => 'date',
        'lifetime_value' => 'decimal:2',
    ];

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class);
    }

    public function communications(): HasMany
    {
        return $this->hasMany(ClientComm::class);
    }
}
```

#### Product Model
```php
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'monthly_price',
        'annual_price',
        'category',
    ];
    
    protected $casts = [
        'monthly_price' => 'decimal:2',
        'annual_price' => 'decimal:2',
    ];

    public function deals(): BelongsToMany
    {
        return $this->belongsToMany(Deal::class, 'deal_products')
            ->withPivot('quantity');
    }
}
```

#### Deal Model
```php
class Deal extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'amount',
        'stage',
        'company_id',
        'user_id',
    ];
    
    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'deal_products')
            ->withPivot('quantity');
    }

    public function project(): HasOne
    {
        return $this->hasOne(Project::class);
    }

    public function referrals(): HasMany
    {
        return $this->hasMany(Referral::class);
    }
}
```

### Project Management Models

#### Project Model
```php
class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'technologies',
        'github_url',
        'live_url',
        'status',
        'user_id',
        'deal_id',
    ];
    
    protected $casts = [
        'technologies' => 'json',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function deal(): BelongsTo
    {
        return $this->belongsTo(Deal::class);
    }

    public function team(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'project_team')
            ->withPivot('role');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function timeEntries(): HasMany
    {
        return $this->hasMany(TimeTracking::class);
    }
}
```

#### Task Model
```php
class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'priority',
        'status',
        'project_id',
        'assigned_to',
        'created_by',
        'due_date',
    ];
    
    protected $casts = [
        'due_date' => 'date',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function timeEntries(): HasMany
    {
        return $this->hasMany(TimeTracking::class);
    }
}
```

#### TimeTracking Model
```php
class TimeTracking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'project_id',
        'task_id',
        'start_time',
        'end_time',
        'description',
        'billable',
    ];
    
    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'billable' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }

    public function getDurationAttribute(): ?int
    {
        if (!$this->end_time) {
            return null;
        }

        return $this->end_time->diffInSeconds($this->start_time);
    }

    public function getFormattedDurationAttribute(): ?string
    {
        $duration = $this->duration;

        if ($duration === null) {
            return null;
        }

        $hours = floor($duration / 3600);
        $minutes = floor(($duration % 3600) / 60);

        return sprintf('%02d:%02d', $hours, $minutes);
    }
}
```

## Controllers

### Dashboard Controller
```php
class DashboardController extends Controller
{
    public function index()
    {
        // Key metrics
        $metrics = [
            'activeDeals' => Deal::whereIn('stage', ['prospect', 'qualified', 'proposal'])->count(),
            'activeProjects' => Project::whereIn('status', ['planning', 'development'])->count(),
            'activeClients' => Client::where('status', 'active')->count(),
            'pendingTasks' => Task::where('assigned_to', auth()->id())
                ->whereIn('status', ['todo', 'in_progress'])
                ->count(),
        ];

        // Recent activity
        $recentActivity = $this->getRecentActivity();

        return Inertia::render('Dashboard/Overview', [
            'metrics' => $metrics,
            'recentActivity' => $recentActivity,
        ]);
    }

    public function activity()
    {
        $activity = $this->getRecentActivity(50);

        return Inertia::render('Dashboard/Activity', [
            'activity' => $activity,
        ]);
    }

    private function getRecentActivity($limit = 10)
    {
        // Get recent website contacts, communications, tasks
        // Merge all activities, sort by date, and take the most recent ones
        // Return formatted activity feed
    }
}
```

### Project Controllers

#### ProjectController
```php
class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with(['user', 'deal.company']);

        // Apply filters
        if ($request->has('search')) {
            $query->where('title', 'like', "%{$request->input('search')}%");
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        // Sort
        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $projects = $query->paginate(12)->withQueryString();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'filters' => $request->only(['search', 'status', 'user_id', 'sort_field', 'sort_direction']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'technologies' => 'nullable|array',
            'github_url' => 'nullable|url|max:255',
            'live_url' => 'nullable|url|max:255',
            'status' => 'required|in:planning,development,completed,archived',
            'deal_id' => 'nullable|exists:deals,id',
            'team_members' => 'nullable|array',
            'team_members.*.id' => 'exists:users,id',
            'team_members.*.role' => 'nullable|string|max:50',
        ]);

        $validated['user_id'] = auth()->id();

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validated['image'] = $path;
        }

        // Create project
        $project = Project::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'image' => $validated['image'] ?? null,
            'technologies' => $validated['technologies'] ?? null,
            'github_url' => $validated['github_url'],
            'live_url' => $validated['live_url'],
            'status' => $validated['status'],
            'user_id' => $validated['user_id'],
            'deal_id' => $validated['deal_id'],
        ]);

        // Attach team members
        if (isset($validated['team_members'])) {
            foreach ($validated['team_members'] as $member) {
                $project->team()->attach($member['id'], ['role' => $member['role'] ?? null]);
            }
        }

        return redirect()->route('projects.index')
            ->with('success', 'Project created successfully.');
    }

    // Other methods: show, edit, update, destroy
}
```

#### TaskController
```php
class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::with(['project', 'assignee', 'creator']);

        // Apply filters
        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->has('priority')) {
            $query->where('priority', $request->input('priority'));
        }

        if ($request->has('project_id')) {
            $query->where('project_id', $request->input('project_id'));
        }

        // Sort
        $sortField = $request->input('sort_field', 'due_date');
        $sortDirection = $request->input('sort_direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $tasks = $query->paginate(20)->withQueryString();

        return Inertia::render('Projects/Tasks', [
            'tasks' => $tasks,
            'filters' => $request->only(['search', 'status', 'priority', 'project_id', 'assigned_to', 'sort_field', 'sort_direction']),
        ]);
    }

    public function myTasks(Request $request)
    {
        $query = Task::with(['project', 'creator'])
            ->where('assigned_to', auth()->id());

        // Apply filters
        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        // Sort
        $sortField = $request->input('sort_field', 'due_date');
        $sortDirection = $request->input('sort_direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $tasks = $query->paginate(20)->withQueryString();

        return Inertia::render('Projects/MyTasks', [
            'tasks' => $tasks,
            'filters' => $request->only(['search', 'status', 'priority', 'project_id', 'sort_field', 'sort_direction']),
        ]);
    }

    // Other methods: create, store, show, edit, update, updateStatus, destroy
}
```

### Marketing Controllers

#### CampaignController
```php
class CampaignController extends Controller
{
    public function index(Request $request)
    {
        $query = MarketingCampaign::with('creator');

        // Apply filters
        if ($request->has('type')) {
            $query->where('type', $request->input('type'));
        }

        if ($request->has('status')) {
            $status = $request->input('status');
            $now = now()->format('Y-m-d');
            
            if ($status === 'active') {
                $query->where('start_date', '<=', $now)
                      ->where(function ($q) use ($now) {
                          $q->where('end_date', '>=', $now)
                            ->orWhereNull('end_date');
                      });
            } elseif ($status === 'upcoming') {
                $query->where('start_date', '>', $now);
            } elseif ($status === 'completed') {
                $query->where('end_date', '<', $now);
            }
        }

        // Sort
        $sortField = $request->input('sort_field', 'start_date');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $campaigns = $query->paginate(10)->withQueryString();

        return Inertia::render('Marketing/Campaigns', [
            'campaigns' => $campaigns,
            'filters' => $request->only(['search', 'type', 'status', 'sort_field', 'sort_direction']),
        ]);
    }

    public function analytics()
    {
        // Get campaign metrics grouped by type
        $campaignsByType = MarketingCampaign::selectRaw('type, COUNT(*) as count, SUM(budget) as total_budget, SUM(cost) as total_cost')
            ->groupBy('type')
            ->get();
            
        // Calculate ROI if metrics contain revenue data
        $campaignsWithROI = MarketingCampaign::whereNotNull('cost')
            ->whereNotNull('metrics->revenue')
            ->get()
            ->map(function ($campaign) {
                $revenue = $campaign->metrics['revenue'] ?? 0;
                $cost = $campaign->cost;
                $roi = $cost > 0 ? (($revenue - $cost) / $cost) * 100 : 0;
                
                return [
                    'id' => $campaign->id,
                    'name' => $campaign->name,
                    'type' => $campaign->type,
                    'cost' => $campaign->cost,
                    'revenue' => $revenue,
                    'roi' => round($roi, 2),
                ];
            });

        return Inertia::render('Marketing/Analytics', [
            'campaignsByType' => $campaignsByType,
            'campaignsWithROI' => $campaignsWithROI,
        ]);
    }

    // Other methods: create, store, show, edit, update, updateMetrics, destroy
}
```

## Relationships

### One-to-Many Relationships
- User → Projects
- User → Tasks (as assignee)
- User → Tasks (as creator)
- User → Deals
- User → TimeTracking
- Company → Contacts
- Company → Deals
- Contact → ContactChannels
- Contact → AiConversations
- Client → ClientComms
- Project → Tasks
- Project → TimeTracking
- Task → TimeTracking
- Deal → Referrals
- Affiliate → Referrals

### One-to-One Relationships
- Contact → Client
- Contact → Affiliate
- Deal → Project

### Many-to-Many Relationships
- User ↔ Role (through user_roles)
- User ↔ Project (through project_team)
- Deal ↔ Product (through deal_products)

## Authentication & Authorization

The application uses Laravel's built-in authentication system with role-based access control:

1. **User Authentication**
   - Standard Laravel authentication
   - Email/password login
   - Remember me functionality
   - Password reset

2. **Role-Based Access Control**
   - Roles stored in the `roles` table
   - Permissions stored as JSON in the `permissions` column
   - User-role relationships in the `user_roles` table

3. **Permission Check Example**
   ```php
   if ($user->hasPermission('projects.edit')) {
       // User can edit projects
   }
   ```

4. **Middleware**
   ```php
   Route::middleware(['auth', 'permission:projects.view'])->group(function () {
       Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
   });
   ```

## Validation

The application uses Laravel's validation system for form validation:

```php
$validated = $request->validate([
    'title' => 'required|string|max:255',
    'description' => 'nullable|string',
    'image' => 'nullable|image|max:2048',
    'technologies' => 'nullable|array',
    'github_url' => 'nullable|url|max:255',
    'live_url' => 'nullable|url|max:255',
    'status' => 'required|in:planning,development,completed,archived',
    'deal_id' => 'nullable|exists:deals,id',
    'team_members' => 'nullable|array',
    'team_members.*.id' => 'exists:users,id',
    'team_members.*.role' => 'nullable|string|max:50',
]);
```

## File Storage

The application uses Laravel's file storage system for handling file uploads:

```php
// Store file
if ($request->hasFile('image')) {
    $path = $request->file('image')->store('projects', 'public');
    $validated['image'] = $path;
}

// Delete file
if ($project->image) {
    Storage::disk('public')->delete($project->image);
}
```

## Events & Listeners

The application uses Laravel's event system for various actions:

### Events
- `ProjectCreated`: Fired when a new project is created
- `TaskAssigned`: Fired when a task is assigned to a user
- `DealStageChanged`: Fired when a deal changes stage
- `ClientStatusChanged`: Fired when a client's status changes

### Listeners
- `NotifyTeamMembers`: Notifies team members when added to a project
- `NotifyTaskAssignee`: Notifies user when assigned a task
- `UpdateClientLifetimeValue`: Updates client lifetime value when a deal is closed
- `LogAuditTrail`: Logs changes to important models

## Conclusion

This technical documentation provides a comprehensive overview of the database schema, models, controllers, and relationships in the Portfolio CRM application. The application follows Laravel best practices for database design, model relationships, validation, and authorization.

The modular design allows for easy extension and maintenance, while the comprehensive schema supports a wide range of business processes from contact management to project tracking and marketing campaigns.
