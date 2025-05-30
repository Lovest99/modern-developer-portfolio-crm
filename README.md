# Portfolio CRM Application

A comprehensive CRM and project management system built with Laravel, designed for freelancers and small agencies to manage clients, projects, sales, and marketing activities.

## Table of Contents

- [Features](#features)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Database Schema](#database-schema)
- [Models](#models)
- [Controllers](#controllers)
- [API Documentation](#api-documentation)
- [Frontend](#frontend)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

### Dashboard
- Overview with key metrics
- Activity feed with recent events
- Customizable widgets

### Contact Management
- Companies with industry categorization
- Contacts with multiple communication channels
- Detailed contact history

### Client Management
- Client lifecycle tracking
- Communication history
- Client value metrics

### Sales Pipeline
- Lead management
- Deal tracking with stages
- Product catalog
- Sales forecasting

### Project Management
- Project portfolio
- Task management
- Team collaboration
- Time tracking
- Project status monitoring

### Marketing Tools
- Newsletter subscriber management
- Website contact form integration
- Marketing campaign tracking
- Marketing analytics

### AI Integration
- Conversation history
- Sentiment analysis
- Action suggestions

### Affiliate Program
- Affiliate management
- Referral tracking
- Commission calculations

### System Administration
- User management
- Role-based access control
- Audit logging
- System settings

## System Requirements

- PHP 8.1+
- MySQL 8.0+ or PostgreSQL 13+
- Composer
- Node.js 16+ and NPM
- Laravel 10.x
- Redis (optional, for caching and queues)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-crm.git
   cd portfolio-crm
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install JavaScript dependencies:
   ```bash
   npm install
   ```

4. Create environment file:
   ```bash
   cp .env.example .env
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Configure your database in the `.env` file:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=portfolio
   DB_USERNAME=root
   DB_PASSWORD=
   ```

7. Run database migrations:
   ```bash
   php artisan migrate
   ```

8. Seed the database with initial data:
   ```bash
   php artisan db:seed
   ```

9. Build frontend assets:
   ```bash
   npm run dev
   ```

10. Start the development server:
    ```bash
    php artisan serve
    ```

## Database Schema

### Core Authentication
- **users**: User accounts
- **password_reset_tokens**: Password reset functionality
- **sessions**: User sessions

### Role Management
- **roles**: User roles with JSON permissions
- **user_roles**: User-role assignments

### Contact Management
- **companies**: Company information
- **contacts**: Contact information
- **contact_channels**: Communication channels (email, phone, etc.)

### Client Management
- **clients**: Client records linked to contacts

### Sales Pipeline
- **products**: Products/services offered
- **deals**: Sales opportunities
- **deal_products**: Products in deals

### Project Management
- **projects**: Project information
- **project_team**: Team assignments
- **tasks**: Task tracking
- **time_tracking**: Time entries

### Communication & Marketing
- **newsletters**: Newsletter subscribers
- **website_contacts**: Contact form submissions
- **client_comms**: Client communications
- **marketing_campaigns**: Marketing campaigns

### AI Agent
- **ai_conversations**: AI conversation history

### Affiliate Marketing
- **affiliates**: Affiliate partners
- **referrals**: Referral tracking

### System Management
- **audit_logs**: System activity logs
- **system_settings**: Application settings

## Models

### User and Role Models
- **User**: Authentication and authorization
- **Role**: Permission management

### Contact Models
- **Company**: Organization data
- **Contact**: Individual contact data
- **ContactChannel**: Communication methods

### Sales Models
- **Product**: Product/service offerings
- **Deal**: Sales opportunity tracking
- **Client**: Client relationship management

### Project Models
- **Project**: Project information
- **Task**: Task management
- **TimeTracking**: Time recording

### Marketing Models
- **Newsletter**: Subscriber management
- **WebsiteContact**: Contact form handling
- **MarketingCampaign**: Campaign tracking

### Affiliate Models
- **Affiliate**: Affiliate partner data
- **Referral**: Referral tracking

## Controllers

### Dashboard Controllers
- **DashboardController**: Dashboard views and metrics

### Sales Controllers
- **LeadController**: Lead management
- **DealController**: Deal pipeline
- **ProductController**: Product catalog

### Client Controllers
- **ClientController**: Client management
- **CommunicationController**: Client communications

### Project Controllers
- **ProjectController**: Project management
- **TaskController**: Task management
- **TimeTrackingController**: Time tracking

### Marketing Controllers
- **NewsletterController**: Newsletter management
- **WebsiteContactController**: Contact form processing
- **CampaignController**: Marketing campaigns

## API Documentation

The application provides a RESTful API for integration with other systems:

### Authentication
- `POST /api/login`: Authenticate user
- `POST /api/logout`: End session
- `GET /api/user`: Get authenticated user

### Clients
- `GET /api/clients`: List clients
- `POST /api/clients`: Create client
- `GET /api/clients/{id}`: Get client
- `PUT /api/clients/{id}`: Update client
- `DELETE /api/clients/{id}`: Delete client

### Projects
- `GET /api/projects`: List projects
- `POST /api/projects`: Create project
- `GET /api/projects/{id}`: Get project
- `PUT /api/projects/{id}`: Update project
- `DELETE /api/projects/{id}`: Delete project

### Tasks
- `GET /api/tasks`: List tasks
- `POST /api/tasks`: Create task
- `GET /api/tasks/{id}`: Get task
- `PUT /api/tasks/{id}`: Update task
- `DELETE /api/tasks/{id}`: Delete task

## Frontend

The application uses:
- Laravel Inertia.js for server-side rendering
- React for frontend components
- Tailwind CSS for styling

### Key Components
- Dashboard widgets
- Kanban board for deals
- Project portfolio
- Task management interface
- Time tracking tools
- Client management interface

## Testing

### Running Tests
```bash
php artisan test
```

### Test Coverage
- Unit tests for models
- Feature tests for controllers
- Browser tests for UI

## Deployment

### Production Server Requirements
- PHP 8.1+
- Nginx or Apache
- MySQL 8.0+ or PostgreSQL 13+
- Redis (recommended)
- SSL certificate

### Deployment Steps
1. Clone repository
2. Install dependencies
3. Configure environment
4. Run migrations
5. Build assets
6. Configure web server
7. Set up scheduler
8. Configure queue worker

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Laravel team for the amazing framework
- Inertia.js for the seamless SPA experience
- All contributors who have helped shape this project
