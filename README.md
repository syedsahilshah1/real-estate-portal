# Premium Corporate Real Estate Platform

A full-stack premium real estate web application modeled after high-end corporate builder websites like Faisal Town Group. It includes a responsive, modern frontend and a robust RESTful API database backend.

## 🚀 Key Features

### Frontend (React + Vite + Tailwind CSS v4)
- **High-Aesthetic Landing Page**: Corporate hero slides, search filter sliders, floating milestone panels.
- **Projects Catalog**: Filterable catalog by category (Residential, Commercial, High-rise) and location.
- **Interactive Master Plan Map**: A grid map component allowing users to click and select plot inventory units visually.
- **Installment Amortization Calculator**: Instantly calculates plot rate values, required downpayment, and monthly installment distributions.
- **Member Portal (User Dashboard)**: Users can track plot booking statuses, view installment plans, and print payment challans.
- **Admin Dashboard**: Gated panel for managing projects, plot listings, bookings approval workflows, and reading inquiry emails.
- **Mock Fallback System**: Global state connects to the Laravel API and falls back to a full-featured browser-storage simulator if the backend is offline.

### Backend (Laravel RESTful API + SQLite)
- **Laravel Sanctum Auth**: Token-based login, logout, and registration.
- **CRUD Operations**: Secure administrative controllers for projects and plots.
- **Booking & Inquiry APIs**: Records customer plot booking entries and logs contact queries.
- **CORS Support**: Configured to work smoothly with local Vite clients.

---

## 🛠️ Quick Start

### 1. Backend Server Setup
```bash
cd server
composer install
php artisan migrate:fresh --seed
php artisan serve
```
*Laravel API runs on http://127.0.0.1:8000.*

### 2. Frontend Client Setup
```bash
cd client
npm install
npm run dev
```
*React Client runs on http://localhost:5173.*

### 🔑 Demo Accounts
- **Admin Role**: `admin@faisaltown.com` (password: `admin123`)
- **Member Role**: `user@example.com` (password: `user123`)
