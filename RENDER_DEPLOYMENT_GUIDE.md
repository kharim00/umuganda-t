# 🚀 Render Deployment Guide for Umuganda-T

## ✅ What Was Done

1. **Created `backend/Procfile`** — Tells Render how to start the app
2. **Created `backend/render.yaml`** — Render Blueprint configuration
3. **Created `backend/.env.example`** — Environment variable template
4. **Pushed all changes to GitHub**

## 📋 Prerequisites

- GitHub account with your code pushed
- Render account (free tier available at [render.com](https://render.com))

## 🚀 Step-by-Step Deployment

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
| **Root Directory** | `backend` |
| **Build Command** | `npm install` |
| **Start Command** | `node index.js` |
| **Plan** | `Free` |

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

## 📁 Important Files for Render

```
backend/
├── index.js          ← Entry point (already configured)
├── package.json      ← Dependencies (already configured)
├── Procfile          ← Start command for Render ✅
├── render.yaml       ← Blueprint config ✅
└── .env.example      ← Env var template ✅
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
2. Ensure `backend/` is set as Root Directory
3. Verify `Procfile` has: `web: node index.js`

---

**Your app is ready to deploy!** 🚀

