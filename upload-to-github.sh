#!/bin/bash

# HostScore React App - GitHub Upload Script
# This script helps you upload your React app to GitHub

echo "🚀 HostScore React App - GitHub Upload Helper"
echo "=============================================="
echo ""

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Git is not available. Please install git or accept Xcode license:"
    echo "   sudo xcodebuild -license"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the hostscore-react directory"
    exit 1
fi

echo "📋 Pre-upload checklist:"
echo "✅ Git is available"
echo "✅ In correct directory"
echo ""

# Check if git repo is initialized
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
    
    echo "👤 Please enter your GitHub details:"
    read -p "Your name: " user_name
    read -p "Your email: " user_email
    
    git config user.name "$user_name"
    git config user.email "$user_email"
    
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "📁 Adding files to git..."
git add .

echo ""
echo "💬 Creating commit..."
git commit -m "Initial commit: HostScore React application

- Complete migration from static HTML/CSS/JS to React
- Responsive design with modern UI components  
- Interactive audit tool with multi-step wizard
- Blog system with dynamic content
- Contact forms with Formspree integration
- Google Analytics 4 tracking
- Production-ready build system with Vite"

echo ""
echo "🌐 Next steps:"
echo "1. Create a new repository on GitHub.com:"
echo "   - Repository name: hostscore-react"
echo "   - Description: HostScore - Airbnb listing optimization tool built with React"
echo "   - Make it Public (or Private if preferred)"
echo "   - DO NOT initialize with README, .gitignore, or license"
echo ""
echo "2. After creating the repository, run these commands:"
echo "   (Replace YOUR_USERNAME with your actual GitHub username)"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/hostscore-react.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "🎉 Your repository will be available at:"
echo "   https://github.com/YOUR_USERNAME/hostscore-react"
echo ""
echo "🚀 To enable GitHub Pages deployment:"
echo "   1. Go to repository Settings > Pages"
echo "   2. Select 'GitHub Actions' as source"
echo "   3. The workflow is already configured!"
echo ""
echo "🔧 Don't forget to configure:"
echo "   - Formspree form ID in src/utils/forms.js"
echo "   - Google Analytics ID in src/utils/analytics.js"
echo ""
echo "✨ Happy coding!"