# Dev Dashboard - Netlify Deployment Guide

**Time Required:** 1-2 hours
**Difficulty:** Beginner-friendly

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [Step 1: Prepare Your Project](#step-1-prepare-your-project)
4. [Step 2: Set Up Git & GitHub](#step-2-set-up-git--github)
5. [Step 3: Deploy to Netlify](#step-3-deploy-to-netlify)
6. [Step 4: Configure Custom Domain (Optional)](#step-4-configure-custom-domain-optional)
7. [Step 5: Set Up Continuous Deployment](#step-5-set-up-continuous-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:
- [ ] A GitHub account (create at https://github.com/signup)
- [ ] A Netlify account (create at https://app.netlify.com/signup)
- [ ] Git installed (`git --version` to check)
- [ ] Node.js and npm installed (already confirmed since dev server works)

---

## Pre-Deployment Checklist

### Test Your Build Locally

```bash
# 1. Stop the dev server (Ctrl+C)
# 2. Run a production build
npm run build

# 3. Preview the production build
npm run preview

# 4. Visit http://localhost:4173 to test
```

**Expected Result:** The build should complete without errors and the preview should work correctly.

---

## Step 1: Prepare Your Project

### 1.1 Create Essential Files

#### Create `.gitignore` (if it doesn't exist)
```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json

# Build output
dist/
build/

# Environment variables
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Misc
*.log
.cache/
EOF
```

#### Create `netlify.toml` (Build Configuration)
```bash
cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
EOF
```

This file tells Netlify:
- How to build your project (`npm run build`)
- Where the built files are (`dist` folder)
- How to handle React Router (redirect all routes to index.html)
- Which Node.js version to use

#### Create `README.md` (Project Documentation)
```bash
cat > README.md << 'EOF'
# Dev Dashboard

A comprehensive developer dashboard built with React, Vite, and TailwindCSS.

## Features
- Code Snippets Manager
- Quick Links
- Daily Tasks
- Pomodoro Timer
- Quick Notes
- AI Assistant Integration
- Prompt Library

## Tech Stack
- React 19
- Vite 7
- TailwindCSS 4
- Lucide Icons
- PrismJS (code highlighting)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment
Deployed on Netlify: [Your URL will go here]
EOF
```

### 1.2 Verify Package.json Scripts

Your `package.json` should have these scripts (already confirmed):
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 1.3 Test Build Again
```bash
npm run build
```

**Checkpoint:** Build completes with no errors? ✓

---

## Step 2: Set Up Git & GitHub

### 2.1 Initialize Git (if not already done)

```bash
# Check if git is initialized
git status

# If you see "not a git repository", initialize it:
git init
```

### 2.2 Configure Git (First Time Only)

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify
git config --global --list
```

### 2.3 Create Initial Commit

```bash
# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Dev Dashboard ready for deployment"

# Verify
git log --oneline
```

### 2.4 Create GitHub Repository

**Option A: Via GitHub Website (Easier)**

1. Go to https://github.com/new
2. Repository name: `dev-dashboard`
3. Description: "Developer productivity dashboard"
4. Select: **Public** (or Private if you prefer)
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click **Create repository**

**Option B: Via GitHub CLI** (if you have `gh` installed)

```bash
gh repo create dev-dashboard --public --source=. --remote=origin --push
```

### 2.5 Push to GitHub

After creating the repo on GitHub, you'll see commands. Use these:

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR-USERNAME/dev-dashboard.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` with your actual GitHub username!**

**Checkpoint:** Visit your GitHub repo URL - you should see all your files! ✓

---

## Step 3: Deploy to Netlify

### 3.1 Sign Up for Netlify

1. Go to https://app.netlify.com/signup
2. Sign up with **GitHub** (recommended for easy integration)
3. Authorize Netlify to access your GitHub account

### 3.2 Import Your Project

**Method 1: Import from Git (Recommended)**

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Authorize Netlify (if not already done)
4. Find and select `dev-dashboard` repository
5. Configure build settings:
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**

**Method 2: Manual Deploy (Quick Test)**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build your project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### 3.3 Wait for Deployment

- Initial deploy takes 1-3 minutes
- You'll see a random URL like: `https://random-name-123456.netlify.app`
- Click the URL to view your live site!

**Checkpoint:** Site loads correctly? ✓

---

## Step 4: Configure Custom Domain (Optional)

### 4.1 Change Site Name (Free Netlify Subdomain)

1. In Netlify dashboard, go to **Site settings**
2. Click **Change site name**
3. Enter: `your-dev-dashboard` (or any available name)
4. Your new URL: `https://your-dev-dashboard.netlify.app`

### 4.2 Add Custom Domain (If You Own One)

1. Go to **Domain settings** → **Add custom domain**
2. Enter your domain: `yourdomain.com`
3. Follow Netlify's DNS configuration instructions
4. Wait for DNS propagation (5 minutes - 48 hours)
5. Netlify automatically provisions SSL certificate

---

## Step 5: Set Up Continuous Deployment

**Good News:** This is already done if you deployed via GitHub!

### How It Works:
- Any push to `main` branch triggers automatic deployment
- Netlify builds and deploys in ~1-3 minutes
- You get email notifications on deploy success/failure

### Workflow:
```bash
# Make changes to your code
# ...edit files...

# Commit and push
git add .
git commit -m "Add new feature"
git push

# Netlify automatically deploys! 🚀
```

### Deploy Previews for Branches
```bash
# Create a new branch
git checkout -b feature/new-component

# Make changes, commit
git add .
git commit -m "Add new component"
git push -u origin feature/new-component

# Netlify creates a preview URL automatically!
```

---

## Step 6: Environment Variables (If Needed)

If your app uses API keys or environment variables:

### 6.1 In Netlify Dashboard:
1. Go to **Site settings** → **Environment variables**
2. Add variables (e.g., `VITE_API_KEY=your-key`)
3. Redeploy the site

### 6.2 In Your Code:
```javascript
// Access environment variables
const apiKey = import.meta.env.VITE_API_KEY;
```

### 6.3 Local Development:
Create `.env.local` file:
```
VITE_API_KEY=your-local-key
```

**Note:** Never commit `.env.local` (it's in `.gitignore`)

---

## Troubleshooting

### Build Fails on Netlify

**Error: "Command failed with exit code 1"**

**Solution:**
```bash
# Test build locally first
npm run build

# Check for errors
# Fix them, then commit and push
git add .
git commit -m "Fix build errors"
git push
```

---

### 404 Error on Page Refresh

**Problem:** Refreshing a route like `/snippets` shows 404

**Solution:** Already handled by `netlify.toml` redirects!

If still occurring, verify `netlify.toml` exists and has:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Build Works Locally But Fails on Netlify

**Common Causes:**

1. **Missing dependencies**
   ```bash
   # Ensure all dependencies are in package.json
   npm install --save missing-package
   git add package.json package-lock.json
   git commit -m "Add missing dependency"
   git push
   ```

2. **Case-sensitive imports**
   - Local (Windows/Mac): Case-insensitive
   - Netlify (Linux): Case-sensitive

   ```javascript
   // ❌ Wrong
   import Header from './components/header';  // if file is Header.jsx

   // ✓ Correct
   import Header from './components/Header';
   ```

3. **Node version mismatch**
   - Specify in `netlify.toml`:
   ```toml
   [build.environment]
     NODE_VERSION = "18"
   ```

---

### Site Loads But Features Don't Work

**Check Browser Console:**
1. Open DevTools (F12)
2. Look for errors in Console tab
3. Common issues:
   - CORS errors → Check API configuration
   - Missing environment variables → Add in Netlify settings

---

### Slow Build Times

**Optimization Tips:**
1. Use Netlify's caching (automatic)
2. Minimize dependencies
3. Optimize images before deploying
4. Use Netlify's image optimization plugin (optional)

---

## Post-Deployment Checklist

- [ ] Site loads correctly at Netlify URL
- [ ] All routes work (navigation doesn't break)
- [ ] All features function as expected
- [ ] No console errors in browser DevTools
- [ ] Mobile view works correctly
- [ ] Dark/light theme toggle works
- [ ] Code snippets display correctly
- [ ] All links work

---

## Quick Reference Commands

```bash
# Local Development
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build

# Git Workflow
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push             # Push to GitHub (auto-deploys to Netlify)

# Netlify CLI
netlify login        # Login to Netlify
netlify open         # Open site dashboard
netlify deploy       # Deploy manually
```

---

## Next Steps After Deployment

1. **Share Your Site:**
   - Copy your Netlify URL
   - Share with friends, portfolio, resume

2. **Monitor Performance:**
   - Check Netlify Analytics (free tier available)
   - Monitor build times
   - Check deploy logs for issues

3. **Add Enhancements:**
   - Set up form handling (Netlify Forms)
   - Add serverless functions (Netlify Functions)
   - Enable branch deploys for testing

4. **Optimize:**
   - Add meta tags for SEO
   - Optimize images
   - Enable Netlify's asset optimization

5. **Backup:**
   - Keep your GitHub repo updated
   - Netlify keeps deploy history
   - You can rollback to any previous deploy instantly

---

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

## Support

If you encounter issues:
1. Check Netlify deploy logs (in Netlify dashboard)
2. Check browser console for frontend errors
3. Test build locally: `npm run build`
4. Search Netlify community: https://answers.netlify.com/

---

**Congratulations! Your Dev Dashboard is now live! 🎉**

Remember: Every push to `main` automatically updates your live site!
