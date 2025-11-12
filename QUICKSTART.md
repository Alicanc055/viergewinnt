# 🚀 Quick Start: Deploy to GitHub Pages

## Step-by-Step Guide

### 1️⃣ Update package.json

Open `package.json` and update the `homepage` field with your GitHub username:

```json
"homepage": "https://YOUR-GITHUB-USERNAME.github.io/viergewinnt",
```

Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username.

### 2️⃣ Create GitHub Repository (if not exists)

Visit https://github.com/new and create a new repository named `viergewinnt`.

### 3️⃣ Push to GitHub

```bash
# If this is a new repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/viergewinnt.git
git push -u origin main
```

```bash
# If repository already exists
git add .
git commit -m "Ready for GitHub Pages deployment"
git push origin main
```

### 4️⃣ Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Build a `gh-pages` branch
- Copy all files from `public/` folder
- Push to GitHub

### 5️⃣ Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (tab at the top)
3. Click **Pages** (in the left sidebar)
4. Under **Source**:
   - Select branch: `gh-pages`
   - Select folder: `/ (root)`
5. Click **Save**

### 6️⃣ Access Your Game

After 1-2 minutes, your game will be live at:

```
https://YOUR-GITHUB-USERNAME.github.io/viergewinnt/
```

## ✅ What's Been Set Up

✅ **index.html** - Redirect page in `public/` folder  
✅ **Dual-mode support** - Works with or without server  
✅ **localStorage** - Save/Load works in the browser  
✅ **gh-pages** - Deploy script configured  
✅ **.nojekyll** - Prevents Jekyll processing  

## 🔄 Updating After Changes

Whenever you make changes:

```bash
git add .
git commit -m "Your update message"
git push origin main
npm run deploy
```

## 🎮 How It Works

### On GitHub Pages (Production)
- Game runs 100% in the browser
- Save/Load uses `localStorage`
- No server required
- Works offline after first load

### On localhost (Development)
- Game uses Express server API
- Save/Load uses REST API
- Data stored on server
- Can sync between browsers

## 🆘 Troubleshooting

**"Package.json not found"**
```bash
# Make sure you're in the right directory
cd /Users/jeanalicapar/WebstormProjects/viergewinnt
```

**"gh-pages not found"**
```bash
npm install
```

**"Permission denied"**
```bash
# Configure git with your credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Changes not showing**
- Wait 2-3 minutes for GitHub Pages to rebuild
- Clear browser cache (Cmd+Shift+R)
- Check that you ran `npm run deploy`

## 📚 More Information

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the complete guide including:
- Backend deployment options
- Troubleshooting tips
- CORS configuration
- Advanced setup

---

**Ready to deploy?** Run `npm run deploy` now! 🚀

