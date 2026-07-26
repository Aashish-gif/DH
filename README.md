# LeadDesk Mini

Monorepo for Task A — lead capture + admin inbox.

## Structure

```
/backend   Express + MongoDB API
/frontend  React + Vite + Tailwind
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

## Backend

```bash
cd backend
cp .env.example .env   # edit MONGO_URI and JWT_SECRET
npm install
npm run seed           # creates admin@leaddesk.com / AdminPassword123!
npm run dev
```

API runs at `http://localhost:5000`.

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/login` | Public | Admin login, returns JWT |
| POST | `/api/leads` | Public | Create lead (validated) |
| GET | `/api/leads?search=` | JWT | List / search leads |
| PATCH | `/api/leads/:id/status` | JWT | Update status |

**Default admin credentials** (after `npm run seed`):
- Email: `admin@leaddesk.com`
- Password: `AdminPassword123!`

## Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`.

- `/` — Landing page with lead form
- `/admin/login` — Admin sign-in
- `/admin` — Protected inbox (requires JWT)

The Vite dev server proxies `/api` to the backend.
# DH
