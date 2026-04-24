# Umuganda-T — How to Run & How to Put It on the Internet

This guide explains everything step-by-step: how to run the website on your computer, how to deploy it so anyone in the world can use it, and how to get it found on Google.

---

## 1. What You Need Installed First (Prerequisites)

Before doing anything, make sure these are on your computer:

| Tool | Why You Need It | Download Link |
|------|----------------|---------------|
| **Node.js** (v18 or higher) | Runs the server code | https://nodejs.org → click the green **LTS** button |
| **Git** | Pushes your code online | https://git-scm.com/downloads |
| **VS Code** (or any code editor) | Edit your files | https://code.visualstudio.com |
| **A web browser** | View the website | Chrome, Edge, Firefox, etc. |

**Check if Node.js is installed:**
Open your terminal (in VS Code: press `` Ctrl + ` ``) and type:
```bash
node --version
```
If you see a number like `v20.x.x`, you're good. If not, install Node.js first.

---

## 2. How to Run the Website on Your Computer (Local Development)

### Step 2.1 — Open the Project in VS Code
1. Open VS Code
2. Click `File` → `Open Folder...`
3. Select the folder: `c:/Users/ISS/Downloads/umuganda_t`
4. Click **Open**

### Step 2.2 — Install All Dependencies
Open the VS Code terminal (`` Ctrl + ` ``) and run these commands one by one:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install
```

> **What this does:** Downloads all the code libraries the project needs to work.

### Step 2.3 — Start the Server
In the terminal, run:

```bash
cd backend
node index.js
```

You should see output like:
```
Umuganda-T app running on http://localhost:7000
Mode: demo-json
```

### Step 2.4 — Open the Website in Your Browser
Open your browser and go to:
```
http://localhost:7000
```

The website should load! You can now:
- Browse the homepage
- Register new accounts
- Log in and use the dashboard

### Step 2.5 — Default Login (Pre-made Admin Account)

| Field | Value |
|-------|-------|
| Email | `admin@umuganda.rw` |
| Password | `Admin123!` |
| Role | `Admin` |

Use these to log in as an administrator and approve other users.

### Step 2.6 — Stop the Server
When you're done, go back to the terminal and press:
```
Ctrl + C
```

---

## 3. Understanding Your Project Structure

Think of your project as **two parts that work together:**

```
umuganda_t/                          ← Your main project folder
├── backend/                         ← THE SERVER (brain of the app)
│   ├── index.js                     ← Starts the server
│   ├── src/app.js                   ← Express app setup
│   ├── src/config/appConfig.js      ← Settings (port, secrets)
│   ├── src/routes/                  ← API endpoints (/api/users, /api/auth...)
│   ├── src/controller/              ← Logic for each feature
│   └── data/demo-data.json          ← Where data is saved (no database needed!)
│
├── umugandapro/                     ← THE FRONTEND (what users see)
│   ├── index.html                   ← Main webpage
│   ├── styles.css                   ← Makes it look good
│   ├── script.js                    ← Makes buttons work
│   └── server.js                    ← Standalone server (not needed with backend)
│
├── package.json                     ← Root scripts & commands
├── render.yaml                      ← Deployment config for Render
├── Procfile                         ← Tells Render how to start
└── RENDER_DEPLOYMENT_GUIDE.md       ← Advanced Render instructions
```

**How it works:** When you run `node backend/index.js`, the backend starts on port 7000. It serves the frontend files AND handles API requests. One server does everything!

---

## 4. How to Deploy to the Internet (So Anyone Can Use It)

You have **two ways** to put this online:
- **Option A: Render (Recommended)** — Free, easy, already configured
- **Option B: Other platforms** — Vercel, Railway, etc.

---

### Option A: Deploy on Render (Free & Recommended)

Your project is **already set up** for Render deployment! Files like `render.yaml` and `Procfile` are ready.

#### Step 4A.1 — Push Your Code to GitHub

1. Go to https://github.com and create a free account if you don't have one
2. Click the **+** button (top right) → **New repository**
3. Name it `umuganda-t`
4. Click **Create repository**
5. Go back to VS Code terminal and run:

```bash
# Make sure you're in the project root
cd c:/Users/ISS/Downloads/umuganda_t

# Initialize Git
git init

# Add all files
git add .

# Save your first version
git commit -m "First version of Umuganda-T"

# Connect to GitHub (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/umuganda-t.git

# Push your code online
git push -u origin main
```

> **Note:** If `main` doesn't work, try `git push -u origin master`

#### Step 4A.2 — Deploy on Render

1. Go to https://render.com and sign up (free)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account
4. Find and select your `umuganda-t` repository
5. Click **Connect**

#### Step 4A.3 — Configure Render Settings

Fill in these exact values:

| Setting | Value |
|---------|-------|
| **Name** | `umuganda-t` (or any name you want) |
| **Environment** | `Node` |
| **Region** | `Oregon (US West)` (or closest to Rwanda: `Frankfurt (EU Central)`) |
| **Branch** | `main` |
| **Root Directory** | *(leave empty)* |
| **Build Command** | `npm install && cd backend && npm install` |
| **Start Command** | `cd backend && node index.js` |
| **Plan** | `Free` |

#### Step 4A.4 — Add Environment Variables (Optional)

In the **Environment** section, click **Add Environment Variable**:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | `your-secret-key-here-change-this` |

> The app works without these — it uses safe defaults. But adding `JWT_SECRET` makes it more secure.

#### Step 4A.5 — Deploy!

Click **"Create Web Service"**

Wait 2-3 minutes for the build to finish. Then click the URL shown at the top — it will look like:
```
https://umuganda-t.onrender.com
```

🎉 **Your website is now live on the internet!** Share that link with anyone.

#### Step 4A.6 — Update Your Website Anytime

Whenever you make changes:
```bash
git add .
git commit -m "Updated features"
git push origin main
```

Render will **automatically** rebuild and redeploy! No need to log in to Render again.

---

### Option B: Deploy on Railway (Alternative)

1. Go to https://railway.app and sign up
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `umuganda-t` repository
4. Railway will auto-detect it's a Node.js project
5. Add an environment variable: `NODE_ENV=production`
6. Click **Deploy**
7. Your site will be live at a URL like `https://umuganda-t.up.railway.app`

---

### Option C: Deploy Frontend Only (Static Hosting)

If you ONLY want the frontend (without the backend API), you can use:

| Platform | Steps |
|----------|-------|
| **Netlify** | Drag & drop the `umugandapro/` folder to https://app.netlify.com/drop |
| **Vercel** | Install Vercel CLI, run `vercel` inside `umugandapro/` |
| **GitHub Pages** | Push `umugandapro/` contents to a GitHub repository |

> **Warning:** Without the backend, login, registration, events, tasks, and attendance tracking will NOT work. The backend is required for full functionality.

---

## 5. How to Get Your Website on Google (So People Can Find It)

Just being online isn't enough — you need Google to know your website exists. Here's how:

### Step 5.1 — Get Your Live URL
After deploying, you have a URL like:
```
https://umuganda-t.onrender.com
```

### Step 5.2 — Submit to Google Search Console

1. Go to https://search.google.com/search-console
2. Sign in with your Google account
3. Click **"Add Property"**
4. Choose **"URL prefix"**
5. Enter your website URL: `https://umuganda-t.onrender.com`
6. Click **Continue**
7. Verify ownership (choose the **HTML tag** method)
8. Copy the meta tag Google gives you (looks like: `<meta name="google-site-verification" content="..." />`)
9. Open `umugandapro/index.html` in VS Code
10. Paste the meta tag inside the `<head>` section, near the top
11. Save the file
12. Push to GitHub: `git add . && git commit -m "Add Google verification" && git push origin main`
13. Wait for Render to redeploy (1-2 minutes)
14. Go back to Google Search Console and click **Verify**

### Step 5.3 — Submit Your Sitemap

1. In Google Search Console, click **"Sitemaps"** on the left
2. Enter: `sitemap.xml`
3. Click **Submit**

> Your app doesn't have a sitemap yet. For a simple single-page app, Google will still crawl it. For better SEO, you can create a `sitemap.xml` file later.

### Step 5.4 — Request Indexing

1. In Google Search Console, click **"URL Inspection"**
2. Enter your homepage URL
3. Click **"Request Indexing"**

Google will visit your site and add it to search results within a few days.

---

## 6. SEO Tips to Rank Higher on Google

To help people find `Umuganda-T` when they search:

### 6.1 — Add Meta Tags to `index.html`

Open `umugandapro/index.html` and make sure your `<head>` section looks like this:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Umuganda-T is a community work tracker for Rwanda. Track attendance, manage events, and organize Umuganda participation.">
  <meta name="keywords" content="Umuganda, Rwanda, community work, attendance tracker, Kigali, community service">
  <meta name="author" content="Your Name">
  <title>Umuganda-T | Community Work Tracker for Rwanda</title>
  
  <!-- Open Graph (for Facebook/LinkedIn sharing) -->
  <meta property="og:title" content="Umuganda-T | Community Work Tracker">
  <meta property="og:description" content="Track community work attendance and manage events in Rwanda.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://umuganda-t.onrender.com">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Umuganda-T">
  <meta name="twitter:description" content="Community work tracker for Rwanda.">
  
  <link rel="stylesheet" href="styles.css">
</head>
```

### 6.2 — Get a Custom Domain (Professional Look)

Free Render URLs look like `something.onrender.com`. For a professional look:

1. Buy a domain from:
   - https://namecheap.com (~$10/year)
   - https://godaddy.com
   - https://hostinger.com

2. Good domain ideas:
   - `umuganda-tracker.rw`
   - `umuganda-app.com`
   - `communitywork.rw`

3. In Render dashboard → Your Web Service → **Settings** → **Custom Domains**
4. Follow Render's instructions to connect your domain

### 6.3 — Create a `robots.txt` File

Create a new file: `umugandapro/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://umuganda-t.onrender.com/sitemap.xml
```

> Replace `https://umuganda-t.onrender.com` with your actual URL.

### 6.4 — Share Your Link

Google ranks websites higher when people visit them. Share your link:
- WhatsApp groups
- Facebook
- Twitter/X
- Email
- Tell friends to visit and create accounts

---

## 7. Quick Command Cheat Sheet

| What You Want To Do | Command |
|---------------------|---------|
| Install everything | `npm install && cd backend && npm install` |
| Start the server | `cd backend && node index.js` |
| Stop the server | `Ctrl + C` |
| Save code changes to Git | `git add . && git commit -m "description"` |
| Push code to GitHub | `git push origin main` |
| Check if server is running | Open `http://localhost:7000` in browser |
| View server logs (errors) | Look at the terminal where you ran `node index.js` |

---

## 8. Common Problems & How to Fix Them

### Problem: "Port 7000 is already in use"
**Fix:** Change the port in `backend/src/config/appConfig.js` or close the other program using port 7000.

### Problem: "Cannot find module 'express'"
**Fix:** Run `cd backend && npm install` again. You forgot to install dependencies.

### Problem: "Module not found" errors
**Fix:** Make sure you ran `npm install` in BOTH the root folder AND the `backend` folder.

### Problem: "Command not found: git"
**Fix:** Install Git from https://git-scm.com/downloads

### Problem: Frontend loads but API doesn't work
**Fix:** Make sure you started the BACKEND server (`node index.js` in the `backend` folder), not the frontend server.

### Problem: "Forbidden" or "Not authorized" when logging in
**Fix:** Use the default admin credentials: `admin@umuganda.rw` / `Admin123!`

### Problem: Changes I made aren't showing online
**Fix:** Did you push to GitHub? Run `git push origin main` and wait 2 minutes for Render to rebuild.

---

## 9. What to Do Next

1. ✅ Run the website locally (follow Section 2)
2. ✅ Create a GitHub account and push your code (Section 4A.1)
3. ✅ Deploy on Render (Section 4A)
4. ✅ Share the live link with friends
5. ✅ Submit to Google Search Console (Section 5)
6. ✅ Add better meta tags (Section 6.1)
7. 🎯 Consider buying a custom `.rw` domain

---

## 10. Need Help?

If something doesn't work:
1. Check the **terminal error messages** — they usually tell you exactly what's wrong
2. Re-read the step above carefully
3. Make sure you didn't skip any commands
4. Try closing VS Code and opening it again
5. Ask for help with the exact error message you see

---

**Good luck! Your Umuganda-T app is going to help communities in Rwanda. 🚀🇷🇼**

