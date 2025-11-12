# 🚀 GitHub Pages Deployment Guide

This guide explains how to deploy the Vier gewinnt game to GitHub Pages.

## 📋 Prerequisites

1. **GitHub Account** - Create one at https://github.com
2. **Git installed** - Download from https://git-scm.com/
3. **Project dependencies installed** - Run `npm install` in the project directory

## 🔧 Deployment Steps

### 1. Create GitHub Repository

```bash
# Navigate to your project directory
cd /Users/jeanalicapar/WebstormProjects/viergewinnt

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Vier gewinnt game"

# Create repository on GitHub (via web interface or CLI)
# Then add the remote
git remote add origin https://github.com/YOUR-USERNAME/viergewinnt.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy to GitHub Pages

```bash
# Deploy the public folder to GitHub Pages
npm run deploy
```

This command will:
- Create a `gh-pages` branch
- Copy the `public/` folder contents to the branch
- Push to GitHub

### 3. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select branch `gh-pages` and folder `/ (root)`
4. Click **Save**
5. Your site will be published at: `https://YOUR-USERNAME.github.io/viergewinnt/`

## 🎮 How it Works

### Dual Mode: Server + GitHub Pages

The game automatically detects its environment:

#### **Local Development** (with Express server)
- Uses REST API at `http://localhost:3000`
- Save/Load communicates with the server
- Supports multi-browser synchronization

#### **GitHub Pages** (static hosting)
- Uses browser's `localStorage` for persistence
- Save/Load works within the same browser
- No server required
- Fully functional offline

### Code Detection

```javascript
const IS_GITHUB_PAGES = window.location.hostname.includes('github.io')
const API_URL = IS_GITHUB_PAGES ? null : 'http://localhost:3000'
```

## 📦 What Gets Deployed

Only the `public/` folder is deployed to GitHub Pages:
- `index.html` - Redirect page
- `connect4.html` - Main game
- `connect4.css` - Styles
- `memo.js` - Memoization utility

The Express server (`index.js`) is **not** deployed to GitHub Pages.

## 🔄 Updating Your Deployment

After making changes:

```bash
# Commit your changes
git add .
git commit -m "Your change description"
git push origin main

# Re-deploy to GitHub Pages
npm run deploy
```

## 🌐 Optional: Deploy Backend Separately

If you want to use the server API with your GitHub Pages frontend:

### Option 1: Deploy to Render.com

1. Go to https://render.com
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Deploy and get your service URL (e.g., `https://viergewinnt.onrender.com`)

### Option 2: Deploy to Railway.app

1. Go to https://railway.app
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Railway will auto-detect Node.js and deploy
5. Get your deployment URL

### Then Update Frontend

Update `connect4.html`:

```javascript
const IS_GITHUB_PAGES = window.location.hostname.includes('github.io')
const API_URL = IS_GITHUB_PAGES 
  ? 'https://your-backend.onrender.com'  // Your deployed backend
  : 'http://localhost:3000'
```

⚠️ **Important**: You'll also need to enable CORS on your backend for cross-origin requests.

## 🛠️ Troubleshooting

### "404 Not Found" on GitHub Pages
- Wait 2-3 minutes after deployment
- Check Settings → Pages to confirm the branch is set correctly
- Clear browser cache

### Save/Load doesn't work
- **On GitHub Pages**: This is normal - uses localStorage (browser-specific)
- **Locally**: Make sure the Express server is running (`npm start`)

### Changes not showing
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check if you ran `npm run deploy` after making changes
- Verify the `gh-pages` branch has the latest changes

### CSS not loading
- Check that `connect4.css` is in the `public/` folder
- Verify the path in the HTML: `<link rel="stylesheet" href="connect4.css">`
- Use relative paths (no leading `/`)

## 📝 Package.json Configuration

The deployment is configured in `package.json`:

```json
{
  "homepage": "https://YOUR-USERNAME.github.io/viergewinnt",
  "scripts": {
    "deploy": "gh-pages -d public"
  },
  "devDependencies": {
    "gh-pages": "^6.3.0"
  }
}
```

**Important**: Update the `homepage` field with your actual GitHub username!

## 🎯 Summary

✅ **Deployed**: Static game files on GitHub Pages  
✅ **Works**: Full game functionality with localStorage  
✅ **Fast**: No server needed, instant loading  
✅ **Free**: GitHub Pages is completely free  
⚠️ **Limitation**: Save/Load is browser-specific (no cross-browser sync without backend)

For full server functionality, deploy the backend separately and update the API_URL.

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)
- [Render.com](https://render.com) - Backend hosting
- [Railway.app](https://railway.app) - Backend hosting

---

**Need help?** Check the main [README.md](./README.md) for game instructions.

