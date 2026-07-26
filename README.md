<div align="center">

# 🌿 LeadDesk Mini

**Sleek lead-capture landing page + moss-green admin inbox.**
Built for Digital Heroes Training — Task A.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=for-the-badge)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-A855F7?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white&style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white&style=for-the-badge)](https://www.mongodb.com/)

**📘 Postman Docs:**
[documenter.getpostman.com/view/39216526/2sBY4QtfSh](https://documenter.getpostman.com/view/39216526/2sBY4QtfSh)

**🎬 Demo Video:**
<!-- ⬇️ Replace with your real link after recording ⬇️ -->
`# DEMO_VIDEO_LINK_COMING_SOON`

</div>

---

## ✨ Overview

LeadDesk Mini captures lead inquiries from a beautiful public landing page, then surfaces them in a moss-themed protected admin inbox — where staff can search, list, and update each lead's status (`New` → `Contacted` → `Closed`) with a keyboard-friendly status dropdown.

Backend is deployed on **Render**:

```
https://dh-0ils.onrender.com/
```

---

## 🧱 Architecture Flow

```
                      ┌──────────────────────────────────────────────────────────────┐
                      │                    Visitor's Browser (SPA)                   │
                      │                                                              │
                      │   ┌───────────────────┐         ┌────────────────────────┐   │
                      │   │   🏠 Landing Page │         │   🛡 Admin Inbox Page   │   │
                      │   │  · Lead form      │         │  · Table + search      │   │
                      │   │  · Budget picker  │  ────►  │  · Status dropdown     │   │
                      │   └────────┬──────────┘         └──────────┬─────────────┘   │
                      │            │                               │                 │
                      │            └──────────────┬────────────────┘                 │
                      │                           │                                  │
                      └───────────────────────────┼──────────────────────────────────┘
                                                  │
                                   VITE_API_URL   │
                           = https://dh-0ils.onrender.com
                                                  │
                       ┌──────────────────────────▼──────────────────────────────┐
                       │          🌐 Render — Express.js + Node 18               │
                       │                                                          │
                       │   ┌─────────────────────────────────────────────────┐    │
                       │   │                     Middleware                  │    │
                       │   │   · CORS · express.json() · JWT auth           │    │
                       │   │   · express-validator (field-level validation)  │    │
                       │   └─────────────────────────────────────────────────┘    │
                       │                                                          │
                       │   ┌─────────────────────┐  ┌────────────────────────┐   │
                       │   │  🔓 Public routes   │  │   🔐 Protected routes   │   │
                       │   │  · POST /api/leads  │  │   · GET  /api/leads    │   │
                       │   │  · POST /api/auth/  │  │   · PATCH /api/leads/  │   │
                       │   │       login         │  │      :id/status         │   │
                       │   │  · GET  /api/health │  │   (Bearer JWT — 24h)    │   │
                       │   └────────────┬────────┘  └────────────┬───────────┘   │
                       └────────────────┼────────────────────────┼─────────────────┘
                                        │                        │
                                  CREATE Lead              READ / UPDATE Lead
                                        │                        │
                       ┌────────────────▼────────────────────────▼─────────────────┐
                       │                   💽 MongoDB (Atlas / Local)                │
                       │                                                             │
                       │  · users   — { email (unique), password (bcrypt 10) }      │
                       │  · leads   — { name, email, budgetRange, message,         │
                       │              status: New|Contacted|Closed, createdAt }     │
                       └─────────────────────────────────────────────────────────────┘
```

### Color-coded data flow

```
   🖊 Visitor fills form
       │
       ├─► 🟢 POST /api/leads            (validation →  201 Created + saved to DB)
       │
   🔐 Admin logs in
       │
       ├─► 🟡 POST /api/auth/login       (bcrypt →  returns JWT token)
       │
   🔐 Admin opens inbox
       │
       ├─► 🔵 GET /api/leads             (Bearer token →  200 + lead array)
       │
   🔐 Admin updates row
       │
       └─► 🟣 PATCH /api/leads/:id/status → returns updated lead + toast confirmation
```

---

## 📁 Repository Structure

```
Digital Heroes/
├── backend/                 Express + Mongoose API
│   ├── src/
│   │   ├── middleware/      JWT auth + express-validator runner
│   │   ├── models/          User.js, Lead.js (MongoDB schemas)
│   │   ├── routes/          auth.js, leads.js
│   │   ├── validators/      leadValidators.js (budget ranges + status enum)
│   │   └── server.js        entry point — mounts /api/auth + /api/leads
│   ├── seedAdmin.js         seeds admin@leaddesk.com / AdminPassword123!
│   ├── package.json
│   └── .env.example
│
├── frontend/                React 18 + Vite 6 + Tailwind CSS 3.4
│   ├── src/
│   │   ├── api/             auth.js, leads.js (fetch wrappers)
│   │   ├── components/      Layout, Footer, CustomSelect, ProtectedRoute, Toast
│   │   ├── pages/           LandingPage, LoginPage, AdminPage
│   │   ├── utils/           auth.js (token storage), statusConfig.js, validation.js
│   │   ├── App.jsx          routes: / · /admin/login · /admin
│   │   ├── main.jsx
│   │   └── index.css        moss-gradient theme + component layer classes
│   ├── tailwind.config.js   moss palette, animations, gradients, shadows
│   ├── postcss.config.js
│   ├── vite.config.js       dev proxy /api → localhost:5000
│   ├── package.json
│   └── .env.example         VITE_API_URL=https://dh-0ils.onrender.com
│
└── postman/                 ⬇️ Import both files into Postman ⬇️
    ├── LeadDesk API.postman_collection.json       (v2.1 — 5 requests + examples + tests)
    └── LeadDesk Mini - Local.postman_environment.json   (baseUrl / token / leadId)
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **MongoDB** — either local (`mongodb://127.0.0.1:27017/leaddesk`) or a **MongoDB Atlas** connection string

---

### Backend (Express + MongoDB)

```bash
cd backend
cp .env.example .env       # paste MONGO_URI + JWT_SECRET
npm install
npm run seed               # creates: admin@leaddesk.com  /  AdminPassword123!
npm run dev                # ✅ http://localhost:5000
```

Sanity-check:

```
GET  http://localhost:5000/api/health
→ { "success": true, "message": "LeadDesk API is running" }
```

---

### Frontend (React + Vite)

```bash
cd frontend
cp .env.example .env       # uses Render backend: https://dh-0ils.onrender.com
npm install
npm run dev                # ✅ http://localhost:5173
```

> The Vite **dev proxy** (`/api → http://localhost:5000`) kicks in *only* when `VITE_API_URL` is empty. So:
>
> - Want local backend? Leave `VITE_API_URL` blank in `.env`.
> - Want live Render backend? Keep `VITE_API_URL=https://dh-0ils.onrender.com` as set in `.env.example`.

**App routes:**

| Path          | Purpose                                                       |
|---------------|---------------------------------------------------------------|
| `/`           | Landing page — lead intake form + budget-range dropdown       |
| `/admin/login`| Admin login with seeded credentials                           |
| `/admin`      | Protected inbox — search + status dropdown per lead (JWT)     |

---

## 🔌 API Endpoints

> **Full interactive docs with examples →**
> [📘 Postman Collection](https://documenter.getpostman.com/view/39216526/2sBY4QtfSh)

| Method | Route                         | Auth   | Description                                      |
|--------|-------------------------------|--------|--------------------------------------------------|
| GET    | `/api/health`                 | ❌     | Service + DB health check                        |
| POST   | `/api/auth/login`             | ❌     | `{ email, password }` → returns `{ token }`      |
| POST   | `/api/leads`                  | ❌     | Public form submission → creates `New` lead      |
| GET    | `/api/leads?search=`          | 🔐 JWT | List all leads; `search` matches name **or** email (case-insensitive) |
| PATCH  | `/api/leads/:id/status`       | 🔐 JWT | `{ status: "New"|"Contacted"|"Closed" }`         |

### Allowed values

- **budgetRange:**
  `Under $1,000` · `$1,000 - $5,000` · `$5,000 - $10,000` · `$10,000 - $25,000` · `$25,000+`
- **status:**
  `New` · `Contacted` · `Closed`

### Default admin (after `npm run seed`)

| Field    | Value              |
|----------|--------------------|
| Email    | `admin@leaddesk.com` |
| Password | `AdminPassword123!`  |

---

## 📬 Run the Postman collection

The `postman/` folder has everything import-ready for one-click testing.

### 1. Import
- Open Postman → **Import** → drag both files from `postman/` into the window.
- Select the **LeadDesk Mini (Local)** environment from the top-right dropdown.

> If you're hitting **Render** instead of local, edit the env's `baseUrl` to `https://dh-0ils.onrender.com`.

### 2. Send requests in order (test scripts do the rest)
1. **Auth → POST Login** → test script auto-saves `token` to env.
2. **Leads → POST Create** → test script auto-saves `leadId`.
3. **Leads → GET List** (try `?search=alex`)
4. **Leads → PATCH Update status** — uses `{{leadId}}` automatically.

### 3. Publish to the web
Right-click the imported collection → **Publish Docs** → the example responses + descriptions are already embedded for a polished API Network page.

---

## 🎥 Demo Video

<!--
  ⬇️  Replace the line below with your real recorded URL:
  e.g. https://youtu.be/xxxxxx  or  https://www.loom.com/share/xxxxxx
-->
**Recording coming soon — will be inserted here before final submission.**

Suggested shot list when you record:
1. `/` landing page — submit a test lead
2. `/admin/login` — sign in with seeded admin
3. `/admin` inbox — search, then change status (New → Contacted → Closed) via dropdown
4. Open Postman → run the collection in Runner to show the backend contract passes

---

## 🎨 Design Notes

- **Moss-only palette** (no violet/amber/ember anywhere) — see `frontend/tailwind.config.js`
- **Dark, glassy UI** via `backdrop-blur` + radial-gradient `bg-hero-mesh` / `bg-admin-mesh`
- **CustomSelect UX**: keyboard nav (ArrowUp/Down + Enter + Esc), loading spinner overlay when a status update is in-flight, highlighted hover-row sync'd with keyboard index, trigger styled as a proper input (not a status pill)
- **Optimistic UI** on status updates: lead row updates instantly in React state; if backend fails, it rolls back and shows an error toast

---

<div align="center">

Built as part of **Digital Heroes Training · Task A**.

</div>
