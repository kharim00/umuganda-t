# 🚀 Render Deployment Guide for Umuganda-T

## ✅ What Was Done

1. **Created root `Procfile`** — Tells Render how to start the app from repo root
2. **Created root `render.yaml`** — Render Blueprint configuration at repo root
3. **Updated root `package.json`** — Added `start` script for root-level deployments
4. **Created `backend/Procfile`** — Legacy fallback for backend-only deployments
5. **Created `backend/render.yaml`** — Legacy fallback blueprint
6. **Created `backend/.env.example`** — Environment variable template
7. **Pushed all changes to GitHub**

## 📋 Prerequisites

- GitHub account with your code pushed
- Render account (free tier available at [render.com](https://render.com))

## 🚀 Step-by-Step Deployment (Recommended — Root Directory)

### 1. Go to Render Dashboard
- Visit [dashboard.render.com](https://dashboard.render.com)
- Click **"New +"** → **"Web Service"**

### 2. Connect Your Repository
- Connect your GitHub account if not already done
- Select your `umuganda-t` repository
- Click **"Connect"**

### 3. Configure the Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `umuganda-t` (or your preferred name) |
| **Environment** | `Node` |
| **Region** | `Oregon (US West)` (or closest to you) |
| **Branch** | `blackboxai/fix-root-dev-script` (or `main` if merged) |
| **Root Directory** | *(leave empty — deploy from repo root)* |
| **Build Command** | `npm install && cd backend && npm install` |
| **Start Command** | `cd backend && node index.js` |
| **Plan** | `Free` |

> **Note:** If you leave the Root Directory empty, Render will auto-detect the root `render.yaml` or use the build/start commands above.

### 4. Environment Variables (Optional)

Add these in the **Environment** section if needed:

```
NODE_ENV=production
PORT=10000
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=sk-your-key (optional, for AI translations)
```

> **Note:** The app works without these — it uses safe defaults from `appConfig.js`.

### 5. Deploy!

- Click **"Create Web Service"**
- Wait for build to complete (2-3 minutes)
- Once deployed, click the URL (e.g., `https://umuganda-t.onrender.com`)

## 🔍 Verify Deployment

Open your deployed URL and check:

```
✅ Homepage loads with Umuganda-T UI
✅ POST /api/auth/register works
✅ POST /api/auth/login works
✅ GET /api/dashboard returns data
✅ Frontend and API work together
```

## 📁 Important Files for Render (Root Deployment)

```
(root)
├── package.json      ← Root package with `start` script ✅
├── Procfile          ← Start command for Render ✅
├── render.yaml       ← Blueprint config at root ✅
└── backend/
    ├── index.js          ← Entry point
    ├── package.json      ← Backend dependencies
    ├── Procfile          ← Legacy fallback
    ├── render.yaml       ← Legacy fallback
    └── .env.example      ← Env var template
```

## 🔄 Auto-Deploy

Render automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update features"
git push origin main
```

Render will detect the push and rebuild automatically.

## 🛠 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Build fails** | Check `npm install` output in Render logs |
| **Command "start" not found** | Ensure root `package.json` has `"start": "cd backend && npm start"` |
| **Port error** | Ensure `app.listen(config.port)` uses `process.env.PORT` |
| **CORS errors** | Backend already allows `*` origins |
| **404 on frontend** | Backend serves static files from `umugandapro/` directory |
| **Data lost on restart** | Normal on free tier — data persists in `backend/data/demo-data.json` |

## 🎯 Key Architecture Points

- **Single Server:** Backend serves frontend via `express.static()`
- **No Database Required:** Uses `demo-json` mode (data in JSON file)
- **Port:** Render assigns `PORT` env var automatically
- **API Base:** Frontend calls `/api/...` (same origin)

## 📞 Support

If issues arise, check:
1. Render Dashboard → Logs tab
2. Ensure **Root Directory is empty** (or set to `backend` with matching commands)
3. Verify root `Procfile` has: `web: cd backend && node index.js`
4. Verify root `package.json` has: `"start": "cd backend && npm start"`

---

**Your app is ready to deploy!** 🚀

