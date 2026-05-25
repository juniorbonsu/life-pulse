# LifePulse — Personal Life Balance API

A RESTful backend API for tracking daily life balance across four core areas: **Gym & Fitness**, **Social Life**, **Work & Career**, and **Personal Peace**. Built to solve a real problem — the lack of a single, focused tool that tracks all dimensions of life balance with positive, motivating feedback.

---

## What It Does

LifePulse lets users:
- Create an account and authenticate securely
- Submit daily check-ins with ratings (1–5) for each life area
- Write a morning plan and evening reflection
- Create, update, and delete personal goals tied to specific life areas
- (Coming soon) Track streaks, receive smart nudges, and get AI-powered insights

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Auth | JWT + bcryptjs |
| Environment | dotenv |
| Dev Tools | Nodemon, Thunder Client |

---

## Project Structure

```
life-pulse-backend/
├── index.js                  # Entry point, server setup
├── prisma/
│   └── schema.prisma         # Database schema
└── src/
    ├── routes/
    │   ├── auth.js           # Auth route definitions
    │   ├── checkin.js        # Check-in route definitions
    │   └── goals.js          # Goals route definitions
    ├── controllers/
    │   ├── authController.js     # Signup + login logic
    │   ├── checkinController.js  # Daily check-in logic
    │   └── goalsController.js    # Goals CRUD logic
    └── middleware/
        └── protect.js        # JWT auth middleware
```

---

## Database Schema

```
User → has many → DailyLogs → has many → AreaRatings
User → has many → Goals
```

**Tables:** `User`, `DailyLog`, `AreaRating`, `Goal`

---

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/signup` | Create a new account | No |
| POST | `/api/auth/login` | Login and receive JWT token | No |

### Check-ins
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/checkin` | Submit a daily check-in with area ratings | Yes |

### Goals
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/goals` | Create a new goal | Yes |
| GET | `/api/goals` | Get all goals for logged in user | Yes |
| PUT | `/api/goals/:id` | Update a specific goal | Yes |
| DELETE | `/api/goals/:id` | Delete a specific goal | Yes |

---

## Getting Started

### Prerequisites
- Node.js v18+
- A Supabase account (free tier works)

### Installation

```bash
# Clone the repo
git clone https://github.com/juniorbonsu/life-pulse.git
cd life-pulse-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your values in .env

# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Start the development server
npm run dev
```

### Environment Variables

```
PORT=3000
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_supabase_session_pooler_url
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Authentication

All protected routes require a JWT token in the request header:

```
Authorization: Bearer <your_token>
```

Get your token by hitting the `/api/auth/login` endpoint.

---

## Example Request — Daily Check-in

```json
POST /api/checkin
Authorization: Bearer <token>

{
  "morningPlan": "Hit the gym and focus on deep work",
  "ratings": [
    { "area": "gym", "score": 4 },
    { "area": "social", "score": 3 },
    { "area": "work", "score": 5 },
    { "area": "peace", "score": 4 }
  ]
}
```

---

## Current Status

**Phase 1 ✅ — Auth + Project Setup**
- User signup and login
- Password hashing with bcrypt
- JWT token generation and verification
- Middleware for protected routes

**Phase 2 ✅ — Core Data Logic**
- Daily check-in with area ratings
- Goals CRUD with ownership validation

**Phase 3 🔄 — In Progress**
- Streak calculation
- Consecutive day tracking per life area

**Phase 4 📋 — Planned**
- Web Push notifications
- Browser service worker
- Claude AI insight generation
- Positive framing nudges

---

## Roadmap

- [ ] Streak tracking across all life areas
- [ ] Push notification scheduling
- [ ] AI-powered weekly insights via Claude API
- [ ] React + Vite frontend dashboard
- [ ] Radar chart visualizing life balance
- [ ] Mobile-responsive design
- [ ] Deployment — Vercel (frontend) + Railway (backend)

---
## Author

**Junior Bonsu** — [@juniorbonsu](https://github.com/juniorbonsu)

