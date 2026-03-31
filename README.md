<div align="center">
  <img src="https://via.placeholder.com/1200x400/1E3E3E/FFFFFF?text=PawMart+Banner" alt="PawMart Banner" width="100%">
  
  # 🐾 PawMart
  
  ### The all-in-one marketplace to adopt, shop, and care for your pets.
  
  ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&style=for-the-badge)
  ![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&style=for-the-badge)
  ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&style=for-the-badge)
  ![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&style=for-the-badge)
  ![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&style=for-the-badge)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&style=for-the-badge)
  
  [![Live Demo](https://img.shields.io/badge/Live_Demo-Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare)](https://YOUR_CLOUDFLARE_URL)
  [![Backend API](https://img.shields.io/badge/Backend_API-Vercel-000000?style=for-the-badge&logo=vercel)](https://YOUR_BACKEND_URL)
  [![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github)](https://github.com/YOUR_USERNAME/pawmart)
</div>

---

## 📋 Table of Contents
- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Challenges & Learnings](#challenges--learnings)
- [Future Enhancements](#future-enhancements)
- [Contact](#contact)

---

## 📖 About the Project

**PawMart** solves the problem of fragmented pet adoption and pet product discovery by bringing everything into one platform. Pet owners, shelters, and sellers can list pets and products while buyers can search, filter, and place orders with ease.

The platform uses Firebase for authentication synced with a custom JWT backend for secure API access. It features role-based dashboards for users and admins, a full order management system, and real-time analytics charts — all powered by a live MongoDB database with no hardcoded or placeholder content anywhere.

### Problem Statement
Finding pets for adoption, purchasing pet products, and connecting with veterinary services often requires visiting multiple platforms. PawMart consolidates these needs into a single, seamless experience.

### Solution
A comprehensive marketplace where users can:
- Browse and adopt pets from shelters
- Purchase pet products from sellers
- Access veterinary care services
- Manage orders and track statuses
- Leave reviews and ratings

---

## ✨ Key Features

### 👥 Role-Based Dashboards
- **User Dashboard**: Manage profile, view order history, track adoptions, leave reviews
- **Admin Dashboard**: Manage users, listings, orders, and view analytics
- **Live Charts**: Bar, line, and pie charts powered by Recharts with real MongoDB aggregation data

### 🔐 Authentication System
- Firebase Email/Password authentication
- Google Sign-In integration
- Custom JWT generation for backend API authorization
- bcryptjs password hashing
- Role-based middleware for protected routes

### 📦 Listings System
- Full CRUD operations for pet and product listings
- Search functionality with keyword matching
- Category filtering
- Price range filtering
- Sorting by date, price, and popularity
- Pagination handled by backend

### 📝 Order Management
- Users can place orders on listings
- Admin can update order statuses in real-time
- Order history and tracking

### ⭐ Reviews and Ratings
- Authenticated users can leave star ratings
- Written reviews on any listing
- Average rating calculation

### 🎨 UI/UX Features
- **Dark Mode**: Full light/dark theme toggle
- **Smooth Animations**: Framer Motion page and UI animations
- **Scroll Effects**: GSAP scroll-triggered animations
- **Smooth Scrolling**: Lenis integration

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS v4 | Styling |
| DaisyUI v5 | Component library |
| Framer Motion | Page and UI animations |
| GSAP | Scroll-triggered animations |
| Lenis | Smooth scrolling |
| Recharts | Dashboard charts |
| React Router DOM v6 | Client-side routing |
| Axios | HTTP requests |
| Firebase | Authentication and Google Sign-In |
| React Hot Toast | Notifications |
| SweetAlert2 | Confirmation dialogs |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Server framework |
| MongoDB native driver | Database queries |
| MongoDB Atlas | Cloud database |
| jsonwebtoken | JWT generation and verification |
| bcryptjs | Password hashing |
| CORS | Cross-origin request handling |
| dotenv | Environment variable management |

### Deployment
| Tool | Purpose |
|------|---------|
| Cloudflare Pages | Frontend hosting |
| Vercel | Backend hosting |
| Firebase Console | Auth provider management |
| Git + GitHub | Version control |

---

## 📸 Screenshots

> *Replace these placeholders with actual screenshots*

| Home Page | Explore Page |
|-----------|--------------|
| ![Home Page](https://via.placeholder.com/600x400/1E3E3E/FFFFFF?text=Home+Page) | ![Explore Page](https://via.placeholder.com/600x400/1E3E3E/FFFFFF?text=Explore+Page) |

| User Dashboard | Admin Dashboard |
|----------------|-----------------|
| ![User Dashboard](https://via.placeholder.com/600x400/1E3E3E/FFFFFF?text=User+Dashboard) | ![Admin Dashboard](https://via.placeholder.com/600x400/1E3E3E/FFFFFF?text=Admin+Dashboard) |

| Dark Mode | Mobile View |
|-----------|-------------|
| ![Dark Mode](https://via.placeholder.com/600x400/1E3E3E/FFFFFF?text=Dark+Mode) | ![Mobile View](https://via.placeholder.com/600x400/1E3E3E/FFFFFF?text=Mobile+View) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Firebase project

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/pawmart.git
cd pawmart
Install frontend dependencies

bash
cd frontend
npm install
Install backend dependencies

bash
cd ../backend
npm install
Set up environment variables (see Environment Variables section)

Run the development servers

Frontend:

bash
cd frontend
npm run dev
Backend:

bash
cd backend
npm run dev
Open your browser and navigate to http://localhost:5173

🔧 Environment Variables
Frontend (.env.local)
env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api
Backend (.env)
env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pawmart
JWT_SECRET=your_jwt_secret_key
FIREBASE_PROJECT_ID=your_firebase_project_id
CLIENT_URL=https://your-frontend-url.pages.dev
📡 API Documentation
Authentication Endpoints
Method	Endpoint	Description
POST	/api/auth/verify-token	Verify Firebase ID token and generate JWT
GET	/api/auth/me	Get current user details
Listings Endpoints
Method	Endpoint	Description
GET	/api/listings	Get all listings with filters
GET	/api/listings/:id	Get single listing
POST	/api/listings	Create new listing (Auth required)
PUT	/api/listings/:id	Update listing (Auth required)
DELETE	/api/listings/:id	Delete listing (Admin only)
Orders Endpoints
Method	Endpoint	Description
GET	/api/orders	Get user orders
POST	/api/orders	Create new order
PUT	/api/orders/:id	Update order status (Admin only)
Reviews Endpoints
Method	Endpoint	Description
GET	/api/reviews/:listingId	Get reviews for listing
POST	/api/reviews	Create review (Auth required)
Admin Endpoints
Method	Endpoint	Description
GET	/api/admin/stats	Get dashboard statistics
GET	/api/admin/users	Get all users
PUT	/api/admin/users/:id	Update user role
🌐 Deployment
Frontend (Cloudflare Pages)
Build the project:

bash
cd frontend
npm run build
Deploy to Cloudflare Pages:

Connect your GitHub repository

Set build command: npm run build

Set output directory: dist

Add environment variables

Backend (Vercel)
Install Vercel CLI:

bash
npm i -g vercel
Deploy:

bash
cd backend
vercel --prod
Add environment variables in Vercel dashboard

📚 Challenges & Learnings
🔥 Firebase and JWT Sync
Implementing dual authentication where Firebase handles the auth flow but a custom JWT is issued for backend API authorization required careful token lifecycle handling and state management.

🏗️ Modular Backend Refactor
Restructuring a monolithic single-file backend into a clean MVC architecture with separate routes, controllers, and middleware.

🎨 Tailwind v4 Differences
Adapting to the new @import and @plugin syntax of Tailwind CSS v4 which differs significantly from v3.

🌐 CORS in Production
Debugging cross-origin issues between Cloudflare Pages and Vercel backend required understanding exact origin string matching.

👥 Role-Based Access Control
Building admin-only and user-only protected routes on both the React frontend and Express backend simultaneously.

🔮 Future Enhancements
Real-time chat between buyers and sellers

Push notifications for order updates

Payment gateway integration (Stripe/Razorpay)

Email notifications for order confirmations

Social sharing for listings

Wishlist/Favorites functionality

User verification badges

Mobile app using React Native

📊 Project Metrics
Metric	Value
Total Pages	10+
Home Page Sections	8+
API Endpoints	20+
Chart Types	3
User Roles	2
Deployment Platforms	2
👨‍💻 Contact
Your Name

GitHub: @YOUR_USERNAME

LinkedIn: Your LinkedIn

Portfolio: Your Portfolio

Project Link: https://github.com/YOUR_USERNAME/pawmart

🙏 Acknowledgments
React

Tailwind CSS

Firebase

MongoDB Atlas

Cloudflare Pages

Vercel

<div align="center"> Made with ❤️ and 🐾 </div> ```
