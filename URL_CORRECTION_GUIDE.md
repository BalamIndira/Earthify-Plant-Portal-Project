# ✅ COMPLETE URL CORRECTION GUIDE

## What You Need To Do - Step By Step

### ✅ STEP 1: Verify Environment Files Are Correct

**Check these 3 files:**

#### File 1: `backend/.env`
```
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb+srv://balamindu2002_db_user:plant-2025@cluster1.9c6q7p9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
JWT_SECRET=earthify-secret-key-2025-change-in-production
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=rzp_test_RIdXio8j0F4v7b
RAZORPAY_SECRET=Up4BsRYYdp1yWsaRUUHc38M5
CORS_ORIGIN=http://localhost:5173
```
✅ **This is CORRECT** - Backend will run on `http://localhost:4000`

---

#### File 2: `frontend/.env`
```
VITE_BACKEND_HOST_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=rzp_test_RIdXio8j0F4v7b
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```
✅ **This is CORRECT** - Frontend will connect to backend at `http://localhost:4000`

---

#### File 3: `frontend/.env.production`
```
VITE_BACKEND_HOST_URL=https://earthify-backend.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_test_RIdXio8j0F4v7b
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```
✅ **This is CORRECT** - When deployed to Netlify, it uses the Render backend URL

---

### ✅ STEP 2: Run Locally To Test Everything

#### Open Terminal 1 (Backend):
```bash
cd backend
npm run dev
```
**Expected output:**
```
🚀 Server running on http://localhost:4000
```

---

#### Open Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```
**Expected output:**
```
VITE v7.1.9 ready in XXX ms
➜  Local:   http://localhost:5173/
```

---

#### Open Browser:
- Go to: `http://localhost:5173`
- You should see your app loading
- Try any action (login, browse products)
- Check Console (F12) for any errors

---

### ✅ STEP 3: Fix Any Errors That Appear

If you see errors in console, they might be:

**Error 1: "Cannot connect to backend"**
- **Cause:** Backend not running
- **Fix:** Make sure `npm run dev` is running in the backend terminal
- **Check:** Can you visit `http://localhost:4000` in browser? You should see the home page

**Error 2: "CORS error"**
- **Cause:** Frontend trying to connect to wrong backend URL
- **Fix:** Check `frontend/.env` has `VITE_BACKEND_HOST_URL=http://localhost:4000`
- **Then:** Restart frontend with `npm run dev`

**Error 3: "MongoDB connection error"**
- **Cause:** Database connection issue
- **Fix:** Check your internet is working
- **Then:** Verify MONGO_URI in `backend/.env` is correct

---

### ✅ STEP 4: Deploy to Production (When Ready)

When everything works locally, follow this:

#### A. Deploy Backend to Render
1. Go to https://render.com
2. Create Web Service from GitHub
3. Select: `BalamIndira/Earthify-Plant-Portal-Project`
4. Root Directory: `backend`
5. Add Environment Variables (same as backend/.env)
6. Click Deploy
7. Copy the URL you get (e.g., `https://earthify-backend.onrender.com`)

#### B. Deploy Frontend to Netlify
1. Go to https://netlify.com
2. Connect GitHub repo
3. Base directory: `frontend`
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add Environment Variables:
   - `VITE_BACKEND_HOST_URL` = `https://earthify-backend.onrender.com` (from step A)
   - `VITE_RAZORPAY_KEY_ID` = `rzp_test_RIdXio8j0F4v7b`
   - `VITE_GOOGLE_CLIENT_ID` = your_google_id
7. Click Deploy

---

## 🎯 Summary of All URLs:

| What | Local Dev | Production |
|-----|----------|-----------|
| **Backend API** | `http://localhost:4000` | `https://earthify-backend.onrender.com` |
| **Backend in Environment** | Set in `backend/.env` | Set in Render dashboard |
| **Frontend URL** | `http://localhost:5173` | `https://your-site.netlify.app` |
| **Frontend connects to** | `http://localhost:4000` | `https://earthify-backend.onrender.com` |
| **Where configured** | `frontend/.env` | `frontend/.env.production` (auto-used) |

---

## ❌ Common Mistakes To Avoid:

1. ❌ **Forgetting to restart the dev server after changing .env**
   - ✅ Always restart with `npm run dev`

2. ❌ **Using localhost in production**
   - ✅ Always use the actual Render/Netlify URL in production

3. ❌ **Wrong port numbers**
   - ✅ Backend: 4000, Frontend: 5173 (Vite default)

4. ❌ **Not updating Netlify env vars after deploying backend**
   - ✅ Always update `VITE_BACKEND_HOST_URL` in Netlify with the actual Render URL

---

## 📋 Checklist Before Deployment:

- [ ] `backend/.env` has PORT=4000
- [ ] `frontend/.env` points to `http://localhost:4000`
- [ ] `frontend/.env.production` points to Render URL
- [ ] Backend runs without errors locally
- [ ] Frontend runs without errors locally
- [ ] Can load frontend at `http://localhost:5173`
- [ ] Can call backend API from frontend
- [ ] No CORS errors in browser console
- [ ] Ready to push to GitHub

---

## 🚀 Ready to Deploy?

When all checks pass:
```bash
git add .
git commit -m "Ready for production deployment"
git push
```

Then follow steps in "STEP 4: Deploy to Production" above.

---

**All your URLs are already correct! Just verify the files match and you're ready to go.** ✅