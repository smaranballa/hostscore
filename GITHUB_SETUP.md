# 🚀 GitHub Upload Instructions for HostScore React App

Follow these steps to upload your HostScore React application to GitHub.

## 📋 Prerequisites

1. **Accept Xcode License** (Required for git on macOS):
   ```bash
   sudo xcodebuild -license
   ```
   Press space to scroll through the license, then type `agree` when prompted.

2. **GitHub Account**: Make sure you have a GitHub account and are logged in.

## 🔧 Step 1: Initialize Git Repository

Open Terminal in your project directory and run:

```bash
cd /Users/smaran.balla/Downloads/hostscore/hostscore-react
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## 📁 Step 2: Add Files to Git

```bash
git add .
git commit -m "Initial commit: HostScore React application

- Complete migration from static HTML/CSS/JS to React
- Responsive design with modern UI components
- Interactive audit tool with multi-step wizard
- Blog system with dynamic content
- Contact forms with Formspree integration
- Google Analytics 4 tracking
- Production-ready build system with Vite"
```

## 🌐 Step 3: Create GitHub Repository

### Option A: Using GitHub CLI (if installed)
```bash
gh repo create hostscore-react --public --description "HostScore - Airbnb listing optimization tool built with React"
git remote add origin https://github.com/YOUR_USERNAME/hostscore-react.git
git branch -M main
git push -u origin main
```

### Option B: Using GitHub Website
1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `hostscore-react`
   - **Description**: `HostScore - Airbnb listing optimization tool built with React`
   - **Visibility**: Public (or Private if preferred)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## 🔗 Step 4: Connect Local Repository to GitHub

After creating the repository on GitHub, run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/hostscore-react.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## 🎯 Step 5: Verify Upload

1. Go to your GitHub repository URL
2. You should see all your files uploaded
3. The README.md should display the project documentation

## 🚀 Step 6: Set Up GitHub Pages (Optional)

To deploy your app using GitHub Pages:

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm install

    - name: Build
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: \${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🔧 Configuration Before Deployment

Before deploying, make sure to update:

1. **Formspree Form ID** in `src/utils/forms.js`:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_ACTUAL_FORM_ID';
   ```

2. **Google Analytics ID** in `src/utils/analytics.js`:
   ```javascript
   const GA_MEASUREMENT_ID = 'G-YOUR_ACTUAL_GA_ID';
   ```

3. **Base URL** in `vite.config.js` (if deploying to GitHub Pages):
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/hostscore-react/', // Add this line
   })
   ```

## 📝 Repository Structure

Your GitHub repository will contain:

```
hostscore-react/
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
├── GITHUB_SETUP.md         # This setup guide
├── deploy.sh               # Deployment script
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── index.html              # HTML template
├── src/                    # Source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utility functions
│   └── styles/            # CSS files
└── public/                # Static assets
```

## 🎉 Success!

Once uploaded, your repository URL will be:
`https://github.com/YOUR_USERNAME/hostscore-react`

If you set up GitHub Pages, your live site will be at:
`https://YOUR_USERNAME.github.io/hostscore-react`

## 🆘 Troubleshooting

### Common Issues:

1. **Permission denied (publickey)**:
   - Set up SSH keys or use HTTPS with personal access token
   - Guide: https://docs.github.com/en/authentication

2. **Xcode license not accepted**:
   ```bash
   sudo xcodebuild -license
   ```

3. **Git not found**:
   - Install Xcode Command Line Tools: `xcode-select --install`

4. **Repository already exists**:
   - Use a different name or delete the existing repository

### Need Help?

- GitHub Documentation: https://docs.github.com
- Git Documentation: https://git-scm.com/doc
- Contact support if you encounter issues

---

**Happy coding! 🚀**