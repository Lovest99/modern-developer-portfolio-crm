#!/bin/bash

# Production Deployment Script for Laravel Portfolio
echo "Starting deployment process..."

# Pull latest changes
echo "Pulling latest changes from git..."
git pull

# Install/update PHP dependencies
echo "Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

# Install/update Node.js dependencies
echo "Installing Node.js dependencies..."
npm ci

# Build frontend assets
echo "Building frontend assets..."
npm run build

# Clear and rebuild cache
echo "Optimizing Laravel application..."
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Set proper permissions
echo "Setting proper permissions..."
find storage bootstrap/cache -type d -exec chmod 775 {} \;
find storage bootstrap/cache -type f -exec chmod 664 {} \;

# Restart queue workers
echo "Restarting queue workers..."
php artisan queue:restart

echo "Deployment completed successfully!"
