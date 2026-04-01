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


