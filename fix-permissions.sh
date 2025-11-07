#!/bin/bash

# Fix Laravel permissions script
# Run this if you encounter permission issues

echo "🔧 Fixing Laravel file permissions..."

# Set ownership to current user
sudo chown -R $USER:$USER .

# Set directory permissions
find . -type d -exec chmod 755 {} \;

# Set file permissions
find . -type f -exec chmod 644 {} \;

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x artisan
chmod +x fix-permissions.sh

# Make vendor binaries executable
if [ -d "vendor/bin" ]; then
    echo "🔧 Fixing vendor/bin permissions..."
    chmod +x vendor/bin/*
    if [ -f "vendor/laravel/sail/bin/sail" ]; then
        chmod +x vendor/laravel/sail/bin/sail
    fi
fi

# Ensure wayfinder directories exist
echo "🔧 Creating wayfinder directories..."
mkdir -p resources/js/actions/{App,Illuminate,Laravel}
mkdir -p resources/js/routes
mkdir -p resources/js/wayfinder

# Set writable directories
echo "🔧 Setting writable directories..."
chmod -R 775 storage bootstrap/cache
chmod -R 775 resources/js/actions resources/js/routes resources/js/wayfinder

# Set ownership specifically for generated files directories
sudo chown -R $USER:$USER resources/js/actions
sudo chown -R $USER:$USER resources/js/routes
sudo chown -R $USER:$USER resources/js/wayfinder

echo ""
echo "✅ Permissions fixed successfully!"
echo ""
echo "ℹ️  The following directories are now writable for wayfinder:generate:"
echo "   - resources/js/actions/"
echo "   - resources/js/routes/"
echo "   - resources/js/wayfinder/"
echo ""
echo "⚠️  Remember: Never run 'php artisan' commands with 'sudo'!"
