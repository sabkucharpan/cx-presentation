# Deployment Guide for GitHub Pages

## Option 1: Using GitHub Desktop (Recommended)

1. **Download GitHub Desktop** from https://desktop.github.com/
2. **Install and sign in** with your GitHub account
3. **Create a new repository**:
   - Click "New Repository"
   - Name it: `chargnex-presentation`
   - Make it Public
   - Don't initialize with README (we already have one)
4. **Add files**:
   - Drag and drop all files from this folder into GitHub Desktop
   - Commit with message: "Initial commit - Chargnex presentation"
   - Push to GitHub
5. **Enable GitHub Pages**:
   - Go to your repository on GitHub.com
   - Click "Settings" tab
   - Scroll down to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
6. **Your site will be available at**: `https://your-username.github.io/chargnex-presentation/`

## Option 2: Using GitHub Web Interface

1. **Go to GitHub.com** and sign in
2. **Create a new repository**:
   - Click the "+" icon → "New repository"
   - Name: `chargnex-presentation`
   - Make it Public
   - Don't initialize with README
3. **Upload files**:
   - Click "uploading an existing file"
   - Drag and drop all files from this folder
   - Commit with message: "Initial commit"
4. **Enable GitHub Pages** (same as Option 1, steps 5-6)

## Option 3: Using Command Line (if you install Git later)

```bash
# Install Git from https://git-scm.com/
git init
git add .
git commit -m "Initial commit - Chargnex presentation"
git branch -M main
git remote add origin https://github.com/your-username/chargnex-presentation.git
git push -u origin main
```

## Files to Include

Make sure these files are uploaded:
- `index.html`
- `style.css`
- `app.js`
- `README.md`
- Any other files in the project folder

## After Deployment

- Your presentation will be live at: `https://your-username.github.io/chargnex-presentation/`
- Share this link with others
- The site will automatically update when you push changes to the repository

## Troubleshooting

- If the site doesn't load immediately, wait a few minutes for GitHub Pages to build
- Check that all files are in the root directory of the repository
- Ensure the repository is public for free GitHub Pages hosting
