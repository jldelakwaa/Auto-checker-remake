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
chmod +x artisan
chmod +x fix-permissions.sh

# Set writable directories
chmod -R 775 storage bootstrap/cache resources/js/actions resources/js/routes

echo "✅ Permissions fixed!"
echo ""
echo "⚠️  Remember: Never run 'php artisan' commands with 'sudo'!"
