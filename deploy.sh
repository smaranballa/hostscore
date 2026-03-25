#!/bin/bash

# HostScore React App Deployment Script
# This script builds the application and prepares it for deployment

echo "🚀 Starting HostScore React App deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Run linting (if available)
echo "🔍 Running linter..."
npm run lint 2>/dev/null || echo "⚠️  Linting not available or failed"

# Build the application
echo "🏗️  Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Built files are in the 'dist' directory"
echo ""
echo "🚀 Deployment options:"
echo "1. Upload the 'dist' folder to your web server"
echo "2. Deploy to Vercel: vercel --prod"
echo "3. Deploy to Netlify: netlify deploy --prod --dir=dist"
echo "4. Deploy to AWS S3: aws s3 sync dist/ s3://your-bucket-name"
echo ""
echo "🔧 Don't forget to:"
echo "- Configure your Formspree form ID in src/utils/forms.js"
echo "- Set up Google Analytics 4 ID in src/utils/analytics.js"
echo "- Update any environment-specific configurations"
echo ""
echo "✨ HostScore React App is ready for deployment!"