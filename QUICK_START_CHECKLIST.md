# Quick Start Deployment Checklist

Follow these commands in order to deploy your Dev Dashboard to Netlify in under 2 hours.

## Phase 1: Preparation (15 minutes)

### Step 1: Test Your Build
```bash
npm run build
npm run preview
# Visit http://localhost:4173 and verify everything works
# Press Ctrl+C to stop preview
```

### Step 2: Configure Git
```bash
# Set your Git identity (skip if already configured)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## Phase 2: Git & GitHub Setup (20 minutes)

### Step 3: Initialize Git Repository
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Dev Dashboard ready for deployment"
```

### Step 4: Create GitHub Repository

**Go to:** https://github.com/new

- Repository name: `dev-dashboard`
- Description: "Developer productivity dashboard"
- Public or Private: Your choice
- **DO NOT** initialize with README (we already have files)
- Click "Create repository"

### Step 5: Push to GitHub
```bash
# Add GitHub as remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/dev-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Verify:** Visit your GitHub repo URL to see your code online!

---

## Phase 3: Netlify Deployment (20 minutes)

### Step 6: Sign Up for Netlify

**Go to:** https://app.netlify.com/signup

- Sign up with your **GitHub account** (easiest option)
- Authorize Netlify to access your GitHub

### Step 7: Deploy Your Site

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select your `dev-dashboard` repository
4. Configure settings:
   - Branch: `main`
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **"Deploy site"**
6. Wait 2-3 minutes for deployment

**Result:** You'll get a URL like: `https://random-name-123456.netlify.app`

### Step 8: Customize Your URL (Optional)

1. In Netlify dashboard, go to **Site settings**
2. Click **"Change site name"**
3. Enter a custom name: `your-dev-dashboard`
4. New URL: `https://your-dev-dashboard.netlify.app`

---

## Phase 4: Test & Verify (10 minutes)

### Step 9: Test Your Live Site

Visit your Netlify URL and verify:
- [ ] Site loads correctly
- [ ] All navigation links work
- [ ] Code snippets display properly
- [ ] Theme toggle works
- [ ] No console errors (press F12 to check)
- [ ] Mobile view works (resize browser)

---

## Phase 5: Set Up Continuous Deployment (5 minutes)

### Step 10: Test Auto-Deploy

Make a small change to test automatic deployment:

```bash
# Edit README.md or any file
echo "## Live Demo\n\nView at: https://your-site.netlify.app" >> README.md

# Commit and push
git add .
git commit -m "Add live demo link to README"
git push

# Check Netlify dashboard - it should auto-deploy!
# Wait 2-3 minutes, then refresh your site
```

---

## Troubleshooting Quick Fixes

### Build Fails?
```bash
# Test locally first
npm run build

# If it fails, fix errors, then:
git add .
git commit -m "Fix build errors"
git push
```

### 404 on Page Refresh?
Already fixed by `netlify.toml` - no action needed!

### Git Push Fails?
```bash
# Make sure you replaced YOUR-USERNAME with your actual GitHub username
git remote -v  # Check your remote URL

# If wrong, remove and re-add:
git remote remove origin
git remote add origin https://github.com/YOUR-ACTUAL-USERNAME/dev-dashboard.git
git push -u origin main
```

---

## Success Checklist

- [ ] Local build works (`npm run build`)
- [ ] Code pushed to GitHub
- [ ] Site deployed to Netlify
- [ ] Live site loads correctly
- [ ] Custom URL configured (optional)
- [ ] Auto-deploy tested and working

---

## Your URLs

Fill these in as you complete the steps:

- **GitHub Repo:** https://github.com/____________/dev-dashboard
- **Live Site:** https://____________.netlify.app
- **Netlify Dashboard:** https://app.netlify.com/sites/____________

---

## Next Steps

1. **Share your site** with friends and on your portfolio
2. **Make updates** by editing code and pushing to GitHub
3. **Add a custom domain** (optional, see DEPLOYMENT_GUIDE.md)
4. **Monitor** your site in Netlify dashboard

---

## Quick Reference

```bash
# Daily workflow after deployment
git add .
git commit -m "description of changes"
git push
# Netlify auto-deploys in 2-3 minutes!
```

---

**Need help?** See the full [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed explanations.

**Estimated Total Time:** 60-90 minutes
