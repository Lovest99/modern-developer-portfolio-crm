#!/bin/bash

# This script generates favicon files from a source image
# Requires ImageMagick to be installed: brew install imagemagick

# Source image (should be at least 512x512 pixels)
SOURCE_IMAGE="public/images/logo.png"

# Check if source image exists
if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "Source image not found: $SOURCE_IMAGE"
    exit 1
fi

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is required but not installed. Please install it first."
    echo "On macOS: brew install imagemagick"
    echo "On Ubuntu: sudo apt-get install imagemagick"
    exit 1
fi

echo "Generating favicons from $SOURCE_IMAGE..."

# Generate favicon.ico (16x16, 32x32, 48x48)
convert "$SOURCE_IMAGE" -define icon:auto-resize=16,32,48 "public/favicon.ico"
echo "✓ Generated favicon.ico"

# Generate apple-touch-icon.png (180x180)
convert "$SOURCE_IMAGE" -resize 180x180 "public/apple-touch-icon.png"
echo "✓ Generated apple-touch-icon.png"

# Generate favicon-32x32.png
convert "$SOURCE_IMAGE" -resize 32x32 "public/favicon-32x32.png"
echo "✓ Generated favicon-32x32.png"

# Generate favicon-16x16.png
convert "$SOURCE_IMAGE" -resize 16x16 "public/favicon-16x16.png"
echo "✓ Generated favicon-16x16.png"

# Generate android-chrome-192x192.png
convert "$SOURCE_IMAGE" -resize 192x192 "public/android-chrome-192x192.png"
echo "✓ Generated android-chrome-192x192.png"

# Generate android-chrome-512x512.png
convert "$SOURCE_IMAGE" -resize 512x512 "public/android-chrome-512x512.png"
echo "✓ Generated android-chrome-512x512.png"

# Generate site.webmanifest
cat > "public/site.webmanifest" << EOF
{
    "name": "Bright Cheteni",
    "short_name": "Bright",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#ffffff",
    "background_color": "#ffffff",
    "display": "standalone"
}
EOF
echo "✓ Generated site.webmanifest"

echo "All favicons generated successfully!"
