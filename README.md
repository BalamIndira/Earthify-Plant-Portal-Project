# Earthify Plant Portal 🌱

A full-stack e-commerce platform for plant enthusiasts, featuring user authentication, product management, payment integration, and admin dashboard.

## 🚀 Deployment Guide

### Backend Deployment (Render)

1. **Create Render Account**
   - Go to [render.com](https://render.com) and sign up

2. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `BalamIndira/Earthify-Plant-Portal-Project`
   - Set Root Directory: `backend`
   - Configure:
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Environment Variables for Backend**:

   ```env
   NODE_ENV=production
   PORT=4000
   MONGO_URI=mongodb+srv://balamindu2002_db_user:plant-2025@cluster1.9c6q7p9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
   JWT_SECRET=your_super_secret_jwt_key_here_please_change_this
   RAZORPAY_KEY_ID=rzp_test_RIdXio8j0F4v7b
   RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here
   ```

4. **Get Backend URL**
   - After deployment, copy the URL (e.g., `https://earthify-backend.onrender.com`)

### Frontend Deployment (Netlify)

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com) and sign up

2. **Deploy Frontend**
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repository
   - Configure Build Settings:
     ```
     Base directory: frontend
     Build command: npm run build
     Publish directory: dist
     ```

3. **Environment Variables for Frontend**:
   ```env
   VITE_BACKEND_HOST_URL=https://earthify-backend.onrender.com
   VITE_RAZORPAY_KEY_ID=rzp_test_RIdXio8j0F4v7b
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

## 🔧 Configuration Files

### Backend Files:

- `backend/.env` - Environment variables
- `backend/package.json` - Dependencies and scripts
- `backend/server.js` - Main server file
- `render.yaml` - Render deployment configuration

### Frontend Files:

- `frontend/.env.production` - Production environment variables
- `frontend/vite.config.js` - Vite configuration
- `frontend/tailwind.config.js` - Tailwind CSS configuration
- `netlify.toml` - Netlify deployment configuration

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Products

- `GET /api/products` - Get all products
- `POST /api/products/add` - Add new product (seller)
- `GET /api/products/:id` - Get product by ID

### Cart & Wishlist

- `GET /api/cart/:userId` - Get user cart
- `POST /api/cart/:userId` - Add to cart
- `GET /api/wishlist/:userId` - Get user wishlist
- `POST /api/wishlist` - Add to wishlist

### Payments

- `POST /api/payment/order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment

### Admin

- `GET /api/admin/feedback` - Get all feedback messages
- `PUT /api/messages/solve/:id` - Mark message as solved

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, JWT
- **Payment**: Razorpay
- **Authentication**: JWT, Google OAuth
- **Deployment**: Netlify (Frontend), Render (Backend)

## 📱 Features

- 🔐 User Authentication (Login/Register)
- 🛒 Product Browsing & Shopping Cart
- 💳 Secure Payment Integration
- 👨‍💼 Seller Dashboard
- 👨‍💻 Admin Panel
- 💬 Customer Support System
- 📱 Responsive Design

## 🚀 Local Development

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Git

### Setup

```bash
# Clone repository
git clone https://github.com/BalamIndira/Earthify-Plant-Portal-Project.git
cd Earthify-Plant-Portal-Project

# Backend setup
cd backend
npm install
# Create .env file with required variables
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

## 📞 Support

For deployment issues or questions, check the deployment logs in Render/Netlify dashboards.

---

**Happy Deploying! 🎉**
