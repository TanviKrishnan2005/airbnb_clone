# 🏡 Airbnb Clone

A full-stack Airbnb-inspired web application built with **Next.js, FastAPI, SQLite, and Tailwind CSS**. The application recreates Airbnb's browsing, booking, and hosting experience, allowing users to explore properties, book stays, manage trips, and host their own listings.

---

## 🌐 Live Demo

### 🚀 Frontend
https://airbnb-clone-ten-sage.vercel.app/

### ⚡ Backend API
https://airbnb-clone-backend-8f5q.onrender.com

### 📖 API Documentation
https://airbnb-clone-backend-8f5q.onrender.com/docs

---

# 📸 Screenshots

> Add screenshots of the following pages:

- Home Page
- Listing Detail Page
- Checkout Page
- My Trips
- Host Dashboard

---

# ✨ Features

## 🏠 Home & Search

- Airbnb-inspired responsive UI
- Property listing grid
- Beautiful listing cards
- Search by location
- Price filter
- Property type filter
- Amenities filter
- Wishlist / Favorites
- Load More pagination

---

## 🏡 Listing Details

- Large property image
- Property description
- Location information
- Amenities section
- Guest reviews
- Price breakdown
- Date selection
- Guest selection

---

## 📅 Booking Flow

- Select check-in & check-out dates
- Guest selection
- Booking summary
- Mock checkout page
- Booking confirmation
- Prevent overlapping bookings
- Persistent bookings stored in SQLite

---

## ✈️ My Trips

- View all booked trips
- Booking dates
- Guest count
- Total booking price

---

## 👨‍💼 Host Dashboard

- Create new listings
- Edit existing listings
- Delete listings
- View all hosted listings
- View bookings for each listing

---

## ❤️ Wishlist

- Add and remove favourite properties

---

## 🔔 Notifications

- Booking confirmation
- CRUD success notifications
- Validation errors
- User-friendly toast notifications

---

# 🛠 Tech Stack

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- React Icons
- React Toastify

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- SQLite

## Deployment

- Vercel (Frontend)
- Render (Backend)

---

# 🏗 Architecture

```
                Next.js Frontend
                        │
                  REST API Calls
                        │
                FastAPI Backend
                        │
                  SQLAlchemy ORM
                        │
                   SQLite Database
```

---

# 🗄 Database Schema

## Listings

| Field | Type |
|--------|------|
| id | Integer |
| title | String |
| description | Text |
| location | String |
| price | Float |
| rating | Float |
| image | String |
| amenities | String |
| property_type | String |
| host_id | Integer |

---

## Bookings

| Field | Type |
|--------|------|
| id | Integer |
| listing_id | Integer |
| guest_id | Integer |
| check_in | Date |
| check_out | Date |
| guests | Integer |
| total_price | Float |

---

# 🔌 API Endpoints

## Listings

| Method | Endpoint | Description |
|----------|----------------------|----------------------|
| GET | `/listings` | Get all listings |
| GET | `/listings/{id}` | Get listing details |
| POST | `/listings` | Create listing |
| PUT | `/listings/{id}` | Update listing |
| DELETE | `/listings/{id}` | Delete listing |

---

## Bookings

| Method | Endpoint | Description |
|----------|------------------|----------------------|
| GET | `/bookings` | Get all bookings |
| POST | `/bookings` | Create booking |

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/TanviKrishnan2005/airbnb_clone.git
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

# 📂 Project Structure

```
airbnb_clone
│
├── backend
│   ├── app
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   └── ...
│   └── requirements.txt
│
├── frontend
│   ├── app
│   ├── components
│   ├── public
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# ✅ Assignment Requirements Covered

- Airbnb-inspired UI
- Property browsing
- Listing details
- Search functionality
- Filters
- Pagination
- Wishlist
- End-to-end booking flow
- Mock checkout
- Prevent overlapping bookings
- My Trips
- Host CRUD
- Host bookings dashboard
- Responsive UI
- Toast notifications
- FastAPI REST API
- SQLite persistence

---

# 📌 Assumptions

- Authentication is simplified/mocked.
- Payment processing is mocked through a checkout confirmation page.
- Property images use placeholder URLs.
- SQLite is used for local data persistence.

---

# 🚀 Future Improvements

- User authentication (JWT/OAuth)
- Image uploads to cloud storage
- Interactive maps
- Messaging between host and guest
- Leave reviews after completed stays
- Superhost badges
- Dark mode
- Advanced search filters

---

# 👩‍💻 Author

**Tanvi Lekshmi RM**

B.Tech Computer Science Engineering  
Bennett University

