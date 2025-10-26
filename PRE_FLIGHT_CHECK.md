# Pre-Flight Deployment Check

Run these commands to verify you're ready to deploy.

## System Requirements Check

### 1. Check Node.js and npm
```bash
node --version    # Should show v18 or higher
npm --version     # Should show v8 or higher
```

### 2. Check Git
```bash
git --version     # Should be installed
```

**If Git is not installed:**
```bash
# Ubuntu/Debian/WSL
sudo apt update && sudo apt install git -y

# macOS
brew install git
```

### 3. Verify Project Build
```bash
npm run build
```

**Expected:** Should complete without errors and create a `dist/` folder.

---

## Account Setup Check

### Before You Start, Create These Free Accounts:

1. **GitHub Account**
   - Sign up: https://github.com/signup
   - Free tier is perfect
   - Verify your email address

2. **Netlify Account**
   - Sign up: https://app.netlify.com/signup
   - Use "Sign up with GitHub" (easiest)
   - Free tier includes everything you need

---

## Pre-Deployment File Check

Verify these files exist in your project:

```bash
ls -la /home/cjval/dev-dashboard/
```

**Required files:**
- [x] `.gitignore` - Created ✓
- [x] `netlify.toml` - Created ✓
- [x] `README.md` - Created ✓
- [x] `package.json` - Exists ✓
- [x] `index.html` - Exists ✓
- [x] `src/` directory - Exists ✓

**All files present!** You're ready to deploy.

---

## Quick Build Test

Run this to make sure everything works:

```bash
# Clean build
rm -rf dist/
npm run build

# Check output
ls -l dist/
# Should show: assets/ and index.html
```

---

## What You'll Need During Deployment

Keep these ready:

1. **GitHub username** - You'll need this for the repository URL
2. **Email** - For GitHub and Netlify verification
3. **Project name** - Suggestion: `dev-dashboard`
4. **Custom site name** (optional) - For Netlify URL like `your-name-dashboard.netlify.app`

---

## Time Estimate

- **Git & GitHub setup:** 20 minutes
- **Netlify deployment:** 15 minutes
- **Testing & verification:** 15 minutes
- **Custom domain (optional):** 10 minutes

**Total:** 60-90 minutes

---

## Ready to Deploy?

If all checks pass, proceed to:

**→ [QUICK_START_CHECKLIST.md](./QUICK_START_CHECKLIST.md)** for step-by-step commands

**→ [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for detailed explanations

---

## Quick Start (Ultra-Fast Path)

If you're experienced with Git/GitHub:

```bash
# 1. Build test
npm run build

# 2. Git setup
git init
git add .
git commit -m "Initial commit"

# 3. Create GitHub repo at: https://github.com/new
# Name it: dev-dashboard

# 4. Push to GitHub (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/dev-dashboard.git
git branch -M main
git push -u origin main

# 5. Deploy on Netlify
# Visit: https://app.netlify.com/start
# Import your GitHub repo
# Settings: build = "npm run build", publish = "dist"
# Click Deploy!
```

Done in 30 minutes!

---

## Support

**Questions?** See the detailed guides:
- Beginner-friendly: [QUICK_START_CHECKLIST.md](./QUICK_START_CHECKLIST.md)
- Comprehensive guide: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Ready when you are! 🚀**
