# 🚀 MongoDB Atlas Setup - Complete Fix Guide

## ❌ What's Currently Happening?

Your MongoDB Atlas connection is commented out in `.env`, so backend uses local MongoDB only.

```env
# MONGO_URI=mongodb+srv://balamindu2002_db_user:plant-2025@cluster1.9c6q7p9.mongodb.net/...
# Commented out!
```

---

## ✅ Step-by-Step Fix For MongoDB Atlas

### **Step 1: Go to MongoDB Atlas Website**

1. Open: https://cloud.mongodb.com
2. **Login** with your account
   - Email: (the one you used to create account)
   - Password: (your password)

### **Step 2: Check Your Cluster Status**

1. Click your **Project** (should see "Cluster0" or "Cluster1")
2. Look for **Cluster Status**:
   - **Green "Running"** ✅ = Good, continue to Step 3
   - **Paused/Gray** ❌ = Click **"Resume"** button first
   - **Deleted** ❌ = Create new cluster (see bottom of this guide)

### **Step 3: Allow Your Computer's IP Address**

This is the **MOST IMPORTANT STEP** - MongoDB Atlas blocks all IPs by default!

1. In MongoDB Atlas, find **"Network Access"** (left sidebar)
2. Click **"ADD IP ADDRESS"** button
3. Choose one option:
   - **Option A (Easiest for Development)**: Click **"Add Current IP Address"**
     - Automatically adds your current IP
   - **Option B (Allow All IPs)**: Enter `0.0.0.0/0`
     - Allows from anywhere (less secure, but works)
4. Click **"Confirm"**
5. **Wait 1-2 minutes** for it to apply

### **Step 4: Test Connection Before Breaking**

Let's verify the connection string works **before** uncommenting it.

1. In MongoDB Atlas, click **"Databases"**
2. Find your cluster, click **"Connect"** button
3. Choose **"Connect your application"**
4. Select:
   - **Driver**: Node.js
   - **Version**: 4.1 or later
5. Copy the connection string (it will look like):
   ```
   mongodb+srv://balamindu2002_db_user:plant-2025@cluster1.9c6q7p9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
   ```

### **Step 5: Update Your backend/.env File**

Now uncomment the MONGO_URI:

**Current (Commented):**

```env
# MONGO_URI=mongodb+srv://balamindu2002_db_user:plant-2025@cluster1.9c6q7p9.mongodb.net/...
```

**Change to (Uncommented):**

```env
MONGO_URI=mongodb+srv://balamindu2002_db_user:plant-2025@cluster1.9c6q7p9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
```

**Make sure:**

- Remove the `#` at the start
- Connection string has `?retryWrites=true&w=majority&appName=Cluster1` at the end
- No spaces before `mongodb`

### **Step 6: Restart Your Backend Server**

```bash
cd backend
npm run dev
```

**Expected Output (Success):**

```
🔄 Attempting to connect to MongoDB Atlas...
✅ MongoDB Atlas connected successfully
🚀 Server running on http://localhost:4000
```

**If Error Still Happens:**

```
❌ MongoDB Atlas connection failed: querySrv ENOTFOUND...
⚠️  Falling back to local MongoDB...
```

→ Go to **Troubleshooting** section below

---

## 🧪 Test MongoDB Atlas Connection

### Test 1: Check Server is Running

```bash
curl http://localhost:4000
# Should return: 🌱 Plant Store Backend Running...
```

### Test 2: Test API with Database

In your frontend, try:

- Login with an account
- Create a product
- Add to cart
- Browse products

If data shows up = **MongoDB Atlas is working!** ✅

---

## ⚠️ Troubleshooting - Common Issues

### **Issue 1: Still getting `ENOTFOUND` error**

**Cause:** IP address not whitelisted OR cluster is paused

**Fix:**

1. Go to **Network Access** in MongoDB Atlas
2. Check if your IP is in the list
3. Click **"Resume"** if cluster is paused
4. Wait 2-3 minutes
5. Restart backend: `npm run dev`

### **Issue 2: Authentication failed**

**Cause:** Wrong password in connection string

**Fix:**

1. Go to **Database Access** in MongoDB Atlas
2. Edit your user (`balamindu2002_db_user`)
3. Click **"Edit Password"**
4. Generate a **new random password**
5. Copy the new password
6. Update your `.env` file with new password:
   ```env
   MONGO_URI=mongodb+srv://balamindu2002_db_user:NEW_PASSWORD@cluster1.9c6q7p9.mongodb.net/...
   ```
7. Restart backend

### **Issue 3: Connection times out**

**Cause:** Cluster doesn't exist OR deleted

**Fix:** Create new cluster (see bottom)

### **Issue 4: Wrong cluster name**

**Cause:** Connection string has wrong cluster name

**Fix:**

1. Open MongoDB Atlas
2. Click **"Databases"**
3. Find your cluster name (like "cluster1" or "Cluster0")
4. Get the correct connection string by clicking **"Connect"**
5. Use the exact string provided

---

## 📊 How to Verify Everything is Working

### Check 1: Connection String Format

```
✅ Correct: mongodb+srv://USER:PASSWORD@cluster1.9c6q7p9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
❌ Wrong:  mongodb://localhost:27017/earthify_db
```

### Check 2: MONGO_URI in .env

```bash
# Windows PowerShell
(Get-Content backend/.env) -match "MONGO_URI"
# Should show: MONGO_URI=mongodb+srv://...
```

### Check 3: Backend Startup Logs

```bash
cd backend
npm run dev
# Look for: ✅ MongoDB Atlas connected successfully
```

### Check 4: Test Data Persistence

1. Start backend
2. Create a new product via API or frontend
3. Stop backend (Ctrl+C)
4. Start backend again
5. Check if product still exists
6. If yes = **Atlas is working!** ✅

---

## 🔄 Create New MongoDB Atlas Cluster (If Needed)

If your cluster was deleted:

1. Go to: https://cloud.mongodb.com
2. Login
3. Click **"+ Create"** or **"Create Database"**
4. Choose:
   - **Cluster Name**: `cluster1` (or any name)
   - **Cloud Provider**: AWS
   - **Region**: Choose closest to you
   - **Tier**: M0 (Free)
5. Click **"Create"**
6. Wait 1-2 minutes for cluster to initialize
7. Click **"Database Access"** → Create a user:
   - **Username**: `balamindu2002_db_user`
   - **Password**: `plant-2025`
   - Click **"Create User"**
8. Click **"Network Access"** → **Add IP Address**
   - Add `0.0.0.0/0` for development
9. Get connection string from **"Connect"** button
10. Update `.env` with new connection string

---

## 📋 Complete .env File (After Fix)

```env
NODE_ENV=development
PORT=4000

# MongoDB Atlas Connection (UNCOMMENTED)
MONGO_URI=mongodb+srv://balamindu2002_db_user:plant-2025@cluster1.9c6q7p9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1

# JWT Configuration
JWT_SECRET=earthify-secret-key-2025-change-in-production
JWT_EXPIRES_IN=7d

# Razorpay Payment Keys
RAZORPAY_KEY_ID=rzp_test_RIdXio8j0F4v7b
RAZORPAY_SECRET=Up4BsRYYdp1yWsaRUUHc38M5

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

---

## 🚀 Quick Checklist

Before running backend, verify:

- [ ] MongoDB Atlas account is active
- [ ] Cluster is **"Running"** (not paused)
- [ ] Your IP is in **"Network Access"**
- [ ] User credentials are correct (`balamindu2002_db_user` / `plant-2025`)
- [ ] MONGO_URI is **uncommented** in `.env`
- [ ] Connection string includes `?retryWrites=true&w=majority`
- [ ] No spaces before `mongodb+srv`

---

## ✅ Success Indicators

After fixing, you should see:

```
[nodemon] starting `node server.js`
[dotenv@17.2.2] injecting env (8) from .env
🔄 Attempting to connect to MongoDB Atlas...
✅ MongoDB Atlas connected successfully
🚀 Server running on http://localhost:4000
```

**NOT this:**

```
⚠️  No MongoDB Atlas URI provided, using local MongoDB...
✅ Local MongoDB connected successfully
```

---

## 📞 Still Not Working?

Try this diagnostic:

```bash
cd backend

# Check if MONGO_URI is set
echo $env:MONGO_URI

# Run dev and watch for Atlas message
npm run dev
```

If you see **"Using local MongoDB"** instead of **"MongoDB Atlas connected"** → Your MONGO_URI is still commented or empty!

---

**Follow this guide exactly and MongoDB Atlas will work!** 🎉
