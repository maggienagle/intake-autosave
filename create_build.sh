#!/bin/bash

# Create build directory and necessary subdirectories
mkdir -p build/css build/js build/assets

# Copy HTML file
cp "project 3/index.html" build/index.html

# Copy CSS files
cp "project 3/css/normalize.css" build/css/normalize.css
cp "project 3/css/styles.css" build/css/styles.css

# Copy JS file
cp "project 3/js/settings.js" build/js/settings.js

# Copy font assets if they exist
cp "project 3/assets/SharpSansMedium.woff" build/assets/ 2>/dev/null || :
cp "project 3/assets/SharpSansMedium.woff2" build/assets/ 2>/dev/null || :
cp "project 3/assets/SharpSansSemibold.woff" build/assets/ 2>/dev/null || :
cp "project 3/assets/SharpSansSemibold.woff2" build/assets/ 2>/dev/null || :

echo "Build folder created successfully!"
echo "Upload the 'build' folder to TinyHost."