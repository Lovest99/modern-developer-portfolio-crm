# Production Deployment Guide

This guide outlines the steps to deploy your Laravel + React portfolio application to a production environment.

## Prerequisites

- A server with PHP 8.2+ installed
- Composer
- Node.js 18+ and npm
- MySQL or PostgreSQL database
- Nginx or Apache web server
- Redis (recommended for caching and sessions)

## Server Setup

1. **Update your server packages**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install required PHP extensions**
   ```bash
   sudo apt install php8.2-fpm php8.2-mysql php8.2-mbstring php8.2-xml php8.2-bcmath php8.2-curl php8.2-zip php8.2-gd php8.2-redis
   ```

3. **Install Composer**
   ```bash
   curl -sS https://getcomposer.org/installer | php
   sudo mv composer.phar /usr/local/bin/composer
   ```

4. **Install Node.js and npm**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

5. **Install Redis**
   ```bash
   sudo apt install redis-server
   sudo systemctl enable redis-server
   ```

## Application Deployment

1. **Clone your repository**
   ```bash
   git clone https://your-repository-url.git /var/www/portfolio
   cd /var/www/portfolio
   ```

2. **Set up environment file**
   ```bash
   cp .env.production .env
   ```
   
   Edit the `.env` file to update:
   - `APP_URL` to your domain
   - Database credentials
   - Redis configuration
   - Mail settings

3. **Generate application key**
   ```bash
   php artisan key:generate
   ```

4. **Set proper permissions**
   ```bash
   sudo chown -R www-data:www-data /var/www/portfolio
   sudo find /var/www/portfolio -type f -exec chmod 644 {} \;
   sudo find /var/www/portfolio -type d -exec chmod 755 {} \;
   sudo chmod -R 775 /var/www/portfolio/storage /var/www/portfolio/bootstrap/cache
   ```

5. **Run the deployment script**
   ```bash
   ./deploy.sh
   ```

## Web Server Configuration

1. **Set up Nginx**
   ```bash
   sudo cp /var/www/portfolio/nginx.conf.example /etc/nginx/sites-available/portfolio
   ```
   
   Edit the file to update:
   - Server name to your domain
   - SSL certificate paths
   - PHP-FPM socket path

2. **Enable the site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

3. **Set up SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

## Performance Optimizations

1. **Set up a cron job for Laravel scheduler**
   ```bash
   crontab -e
   ```
   
   Add the following line:
   ```
   * * * * * cd /var/www/portfolio && php artisan schedule:run >> /dev/null 2>&1
   ```

2. **Set up Supervisor for queue workers**
   ```bash
   sudo apt install supervisor
   ```
   
   Create a configuration file:
   ```bash
   sudo nano /etc/supervisor/conf.d/portfolio-worker.conf
   ```
   
   Add the following content:
   ```
   [program:portfolio-worker]
   process_name=%(program_name)s_%(process_num)02d
   command=php /var/www/portfolio/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
   autostart=true
   autorestart=true
   stopasgroup=true
   killasgroup=true
   user=www-data
   numprocs=2
   redirect_stderr=true
   stdout_logfile=/var/www/portfolio/storage/logs/worker.log
   stopwaitsecs=3600
   ```
   
   Update Supervisor:
   ```bash
   sudo supervisorctl reread
   sudo supervisorctl update
   sudo supervisorctl start portfolio-worker:*
   ```

3. **Set up Redis for caching and sessions**
   
   Ensure your `.env` file has:
   ```
   CACHE_DRIVER=redis
   SESSION_DRIVER=redis
   QUEUE_CONNECTION=redis
   ```

## Monitoring and Maintenance

1. **Set up application monitoring**
   Consider using services like:
   - New Relic
   - Laravel Telescope (for development)
   - Laravel Horizon (for Redis queue monitoring)

2. **Set up server monitoring**
   - Consider tools like Netdata, Monit, or Datadog

3. **Regular maintenance**
   - Set up automated backups for your database
   - Regularly update your dependencies
   - Monitor your logs for errors

## Security Considerations

1. **Enable firewall**
   ```bash
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw enable
   ```

2. **Set up fail2ban**
   ```bash
   sudo apt install fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

3. **Regular security updates**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

## Troubleshooting

If you encounter issues:

1. Check the Laravel logs in `storage/logs/laravel.log`
2. Check the Nginx error logs in `/var/log/nginx/error.log`
3. Check PHP-FPM logs in `/var/log/php8.2-fpm.log`

## Rollback Plan

In case of deployment issues:

1. Restore from the most recent backup
2. Revert to the previous git commit
3. Run the deployment script again
