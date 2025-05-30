# Modern Developer Portfolio & CRM

![Modern Developer Portfolio & CRM](https://github.com/Lovest99/modern-developer-portfolio-crm/raw/main/public/images/portfolio-preview.png)

A modern, full-featured portfolio website with an integrated CRM system built with Laravel 12 and React. This application serves as both a professional showcase for developers and a comprehensive client management tool.

## 🌟 Overview

This project combines a stunning portfolio website with a powerful CRM system, allowing developers to:
- Showcase their skills, projects, and testimonials with a modern, responsive design
- Manage clients, projects, sales, and marketing activities from a single dashboard
- Track time, manage tasks, and handle client communications efficiently

## 🔗 Live Demo

Visit the [live demo](https://portfolio.lovest.tech) to see the portfolio in action.

## 📋 Table of Contents

- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Portfolio Customization](#portfolio-customization)
- [CRM Features](#crm-features)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [About the Author](#about-the-author)

## ✨ Key Features

### Portfolio Website
- **Modern Design** - Sleek, responsive interface with dark/light mode
- **Project Showcase** - Highlight your best work with detailed project pages
- **Skills Section** - Visual representation of your technical expertise
- **Testimonials** - Display client feedback with profile images
- **Contact Form** - Integrated form for potential clients to reach you
- **Blog Ready** - Share your knowledge with an integrated blog system
- **SEO Optimized** - Built with search engine visibility in mind

### CRM Dashboard
- **Unified Overview** - Key metrics and activity feed in one place
- **Customizable Widgets** - Tailor the dashboard to your workflow
- **Real-time Updates** - Stay informed with instant notifications

### Client Management
- **Complete Client Profiles** - Store all client information in one place
- **Communication History** - Track all client interactions
- **Document Management** - Store and share files securely
- **Client Portal** - Optional client access to project status

### Project Management
- **Visual Project Boards** - Kanban-style project management
- **Task Tracking** - Assign, prioritize and track tasks
- **Time Tracking** - Record time spent on projects and tasks
- **Team Collaboration** - Assign team members to projects
- **Milestone Tracking** - Set and monitor project milestones

### Sales Pipeline
- **Lead Management** - Track potential clients through your sales funnel
- **Deal Tracking** - Monitor opportunities with customizable stages
- **Product Catalog** - Manage your service offerings
- **Proposal Generation** - Create professional proposals
- **Sales Forecasting** - Predict future revenue

### Marketing Tools
- **Contact Form Integration** - Capture leads directly from your portfolio
- **Newsletter Management** - Build and manage your subscriber list
- **Campaign Tracking** - Monitor marketing campaign performance
- **Analytics Dashboard** - Measure marketing effectiveness

## 🛠️ Technology Stack

- **Backend**: Laravel 12.x with PHP 8.2+
- **Frontend**: React 18 with TypeScript
- **UI Framework**: Tailwind CSS with ShadcnUI components
- **Database**: MySQL 8.0+ or PostgreSQL 14+
- **State Management**: Inertia.js for seamless SPA experience
- **Authentication**: Laravel Sanctum
- **File Storage**: Laravel Filesystem with S3 compatibility
- **Caching**: Redis (optional)
- **Queue System**: Laravel Horizon (optional)

## 💻 System Requirements

- PHP 8.2+
- MySQL 8.0+ or PostgreSQL 14+
- Composer 2.0+
- Node.js 18+ and NPM
- Git
- Redis (optional, for caching and queues)

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Lovest99/modern-developer-portfolio-crm.git
   cd modern-developer-portfolio-crm
   ```

2. **Install PHP dependencies**:
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure your database** in the `.env` file:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=portfolio
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

6. **Run database migrations and seed**:
   ```bash
   php artisan migrate --seed
   ```

7. **Build frontend assets**:
   ```bash
   npm run build
   ```

8. **Start the development server**:
   ```bash
   php artisan serve
   ```

9. **Access the application** at `http://localhost:8000`

10. **Default login credentials**:
    - Email: `admin@example.com`
    - Password: `password`

## 🎨 Portfolio Customization

The portfolio section is designed to be easily customizable to showcase your personal brand and work.

### Personalizing Your Portfolio

1. **Profile Information**:
   - Edit your personal details in the admin dashboard
   - Update your profile photo, bio, and contact information
   - Customize your social media links

2. **Projects Showcase**:
   - Add your projects with detailed descriptions
   - Upload screenshots and link to live demos
   - Tag projects with relevant technologies
   - Highlight featured projects

3. **Skills Section**:
   - Add and categorize your technical skills
   - Set proficiency levels for each skill
   - Group skills by category (Frontend, Backend, etc.)

4. **Testimonials**:
   - Add client testimonials with their photos
   - Include company names and logos
   - Set display order and active status

5. **Experience & Education**:
   - Add your work history with detailed descriptions
   - Include your educational background
   - Highlight key achievements

6. **Blog Posts**:
   - Share your knowledge with the integrated blog
   - Categorize posts by topic
   - Include code snippets and images

7. **Theme Customization**:
   - Choose between light and dark mode
   - Customize primary and accent colors
   - Adjust typography and spacing

## 💼 CRM Features

The integrated CRM system helps you manage your freelance business efficiently.

### Client Management

- **Client Database**: Store comprehensive client information
- **Communication Log**: Track all client interactions
- **Document Storage**: Securely store client-related files
- **Client Notes**: Keep detailed notes on client preferences

### Project Management

- **Project Dashboard**: Overview of all active projects
- **Task Management**: Create, assign, and track tasks
- **Time Tracking**: Record time spent on projects
- **Invoicing**: Generate invoices based on tracked time
- **File Sharing**: Share project files with clients

### Sales Pipeline

- **Lead Tracking**: Monitor potential clients
- **Deal Stages**: Customize your sales process
- **Opportunity Management**: Track potential revenue
- **Proposal Generation**: Create professional proposals
- **Follow-up Reminders**: Never miss a follow-up

## 🔌 API Documentation

The application provides a comprehensive RESTful API for integration with other systems:

### API Authentication
- Secure authentication using Laravel Sanctum
- API token management through the admin interface
- Rate limiting to prevent abuse

### Available Endpoints

#### Portfolio Data
- `GET /api/portfolio/projects`: List public projects
- `GET /api/portfolio/skills`: List skills by category
- `GET /api/portfolio/testimonials`: List active testimonials
- `GET /api/portfolio/experience`: List work experience
- `GET /api/portfolio/contact`: Submit contact form

#### CRM Data (Authenticated)
- `GET /api/clients`: List clients
- `POST /api/clients`: Create client
- `GET /api/clients/{id}`: Get client details
- `PUT /api/clients/{id}`: Update client
- `DELETE /api/clients/{id}`: Delete client

- `GET /api/projects`: List projects
- `POST /api/projects`: Create project
- `GET /api/projects/{id}`: Get project details
- `PUT /api/projects/{id}`: Update project
- `DELETE /api/projects/{id}`: Delete project

- `GET /api/tasks`: List tasks
- `POST /api/tasks`: Create task
- `GET /api/tasks/{id}`: Get task details
- `PUT /api/tasks/{id}`: Update task
- `DELETE /api/tasks/{id}`: Delete task

## 🧪 Testing

The application includes comprehensive tests to ensure reliability:

### Test Suite
```bash
php artisan test
```

### Coverage
- Unit tests for models and services
- Feature tests for controllers and API endpoints
- Browser tests for UI components
- Integration tests for key workflows

## 🚀 Deployment

### Production Requirements
- PHP 8.2+
- Nginx or Apache
- MySQL 8.0+ or PostgreSQL 14+
- Redis (recommended for caching)
- SSL certificate (required for security)
- Composer 2.0+
- Node.js 18+ (for asset building)

### Deployment Options

#### Shared Hosting
1. Upload files to your hosting provider
2. Set up database and configure `.env`
3. Run migrations and seed data
4. Set up cron job for scheduler
5. Configure web server

#### VPS/Dedicated Server
1. Clone repository to your server
2. Install dependencies with Composer and NPM
3. Configure environment variables
4. Set up database and run migrations
5. Build frontend assets
6. Configure Nginx/Apache
7. Set up SSL with Let's Encrypt
8. Configure scheduler and queue worker

#### Docker Deployment
The repository includes Docker configuration for easy deployment:
```bash
docker-compose up -d
```

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how you can contribute:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Run tests**: `php artisan test`
5. **Commit your changes**: `git commit -m 'Add some amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

Please make sure your code follows the project's coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Author

**Lovest Tech** - Full Stack Developer specializing in Laravel and React applications.

- 🌐 [Website](https://lovest.tech)
- 💼 [LinkedIn](https://linkedin.com/in/lovest)
- 🐦 [Twitter](https://twitter.com/lovest_tech)
- 📧 [Email](mailto:contact@lovest.tech)

---

Built with ❤️ using Laravel 12 and React
