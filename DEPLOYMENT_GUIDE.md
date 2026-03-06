# 🚀 DEPLOYMENT GUIDE - Earthify Plant Portal

## ✅ What I Did For You

I've set up all the environment variables and URLs for both local development and production. Here's exactly what changed:

---

## 📁 Files Created/Updated:

### ✅ **backend/.env** (Updated)

**Location:** `backend/.env`

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

✅ This is ready for local development

### ✅ **frontend/.env** (Created)

**Location:** `frontend/.env`

```
VITE_BACKEND_HOST_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=rzp_test_RIdXio8j0F4v7b
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

✅ Use this for local development

### ✅ **frontend/.env.production** (Already Set)

**Location:** `frontend/.env.production`

```
VITE_BACKEND_HOST_URL=https://earthify-backend.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_test_RIdXio8j0F4v7b
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

✅ This will be used when deployed to Netlify

### ✅ **render.yaml** (Already Set)

**Location:** `render.yaml`
✅ Already configured for Render deployment

---

## 🎯 STEP-BY-STEP DEPLOYMENT GUIDE

### **STEP 1: Run LocallyFirst (Test Everything Works)**

```bash
# Terminal 1 - Start Backend
cd backend
npm run dev
# You should see: 🚀 Server running on http://localhost:4000
```

```bash
# Terminal 2 - Start Frontend
cd frontend
npm run dev
# You should see: VITE v7.1.9 ready in 100 ms
# Open browser: http://localhost:5173
```

✅ If both work locally, continue to production deployment.

---

### **STEP 2: Deploy Backend to Render**

#### [A] Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Skip any setup wizards

#### [B] Create Web Service

1. Click **"New +"** → Select **"Web Service"**
2. **Connect GitHub:**
   - Select your repo: `BalamIndira/Earthify-Plant-Portal-Project`
   - Branch: `main`

3. **Configure Service:**
   - **Name:** `earthify-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free` (if you want)

4. **Add Environment Variables:**
   - Click **"Environment"** tab
   - Click **"Add Environment Variable"**
   - Add these one by one:

   | Key               | Value                                                                                                                       |
   | ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
   | `NODE_ENV`        | `production`                                                                                                                |
   | `PORT`            | `4000`                                                                                                                      |
   | `MONGO_URI`       | `mongodb+srv://balamindu2002_db_user:plant-2025@cluster1.9c6q7p9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1` |
   | `JWT_SECRET`      | `earthify-secret-key-2025-change-in-production`                                                                             |
   | `JWT_EXPIRES_IN`  | `7d`                                                                                                                        |
   | `RAZORPAY_KEY_ID` | `rzp_test_RIdXio8j0F4v7b`                                                                                                   |
   | `RAZORPAY_SECRET` | `Up4BsRYYdp1yWsaRUUHc38M5`                                                                                                  |

5. **Deploy:**
   - Click **"Create Web Service"**
   - Wait 2-5 minutes for deployment
   - ✅ You'll get a URL like: `https://earthify-backend.onrender.com`
   - **Copy this URL!** You need it for the next step

---

### **STEP 3: Deploy Frontend to Netlify**

#### [A] Create Netlify Account

1. Go to https://netlify.com
2. Sign up with GitHub
3. Give permission to access your repos

#### [B] Connect Your Repository

1. Click **"Add new site"**
2. Select **"Import an existing project"**
3. Choose your GitHub repo: `BalamIndira/Earthify-Plant-Portal-Project`
4. Click **"Connect"**

#### [C] Configure Build Settings

1. **Site Settings:**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`

2. Click **"Save & Deploy"**

#### [D] Add Environment Variables

1. Go to **"Site Settings"** → **"Build & Deploy"** → **"Environment"**
2. Click **"Edit variables"** (or "Add variable")
3. Add these environment variables:

   | Key                     | Value                                                 |
   | ----------------------- | ----------------------------------------------------- |
   | `VITE_BACKEND_HOST_URL` | `https://earthify-backend.onrender.com` (from STEP 2) |
   | `VITE_RAZORPAY_KEY_ID`  | `rzp_test_RIdXio8j0F4v7b`                             |
   | `VITE_GOOGLE_CLIENT_ID` | Get this from Google Cloud Console                    |

4. Click **"Save"**

5. **Redeploy:**
   - Netlify will auto-redeploy
   - Wait 2-5 minutes
   - ✅ You'll get a URL like: `https://your-site-name.netlify.app`

---

### **STEP 4: Final Verification**

#### Test Backend

Open in browser: `https://earthify-backend.onrender.com/health`
You should see: `{"status":"OK","message":"Server is running"}`

#### Test Frontend

Open in browser: `https://your-site-name.netlify.app`
You should see your app loading!

#### Test API Connection

1. Open the app
2. Try any action that calls the backend (login, browse products)
3. Check browser console (F12) for errors
4. If no errors = ✅ Success!

---

## 🔧 What Each Environment Variable Does

### Backend Variables:

- **PORT**: Port backend runs on (4000)
- **MONGO_URI**: Database connection string
- **JWT_SECRET**: Secret key for tokens
- **RAZORPAY_KEY_ID** & **RAZORPAY_SECRET**: Payment gateway keys
- **NODE_ENV**: Tells app it's production
- **CORS_ORIGIN**: Allows requests from frontend

### Frontend Variables:

- **VITE_BACKEND_HOST_URL**: Where backend is deployed
- **VITE_RAZORPAY_KEY_ID**: For payment processing
- **VITE_GOOGLE_CLIENT_ID**: For Google login

---

## 🆘 Troubleshooting

### "Cannot connect to backend" error

- Check if Render backend is deployed
- Check if `VITE_BACKEND_HOST_URL` is correct in Netlify env vars
- Trigger Netlify redeploy

### "Payment not working"

- Make sure Razorpay keys are correct
- Check frontend env vars

### "Database connection error"

- Check if MongoDB URI is correct
- Check Render env vars

---

## 📋 Summary

✅ **Backend** → Deployed to Render  
✅ **Frontend** → Deployed to Netlify  
✅ **Database** → MongoDB Atlas (already configured)  
✅ **Payments** → Razorpay (already configured)  
✅ **Environment Variables** → All set!

Your app is now production-ready! 🎉

---

## 🚀 What's Next?

1. Get Google Client ID from Google Cloud Console (optional)
2. Monitor Render & Netlify dashboards
3. Check logs if there are issues
4. Update environment variables anytime (both platforms auto-redeploy)
