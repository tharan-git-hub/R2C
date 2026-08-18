# R2C – Code Snippet Manager

A full‑stack web application for storing, searching and sharing code snippets.  
Built with **React + Vite** on the front‑end and **Node.js / Express + MongoDB** on the back‑end.

---

## Tech Stack
| Layer | Technologies |
|-------|--------------|
| Front‑end | React 19, Vite, TailwindCSS 4, React Router 7, Axios, Lucide‑React, react‑syntax‑highlighter |
| Back‑end | Express 5, Mongoose 8, JWT authentication, bcrypt / bcryptjs, express‑validator, express‑rate‑limit, cors |
| Database | MongoDB (WiredTiger) |
| Dev Tools | Nodemon, ESLint, dotenv |

---

## Project Structure
```
R2C/
├─ backend/                 # Express API
│  ├─ config/
│  │   └─ db.js            # MongoDB connection
│  ├─ controllers/         # Route handlers (auth, snippets, user)
│  ├─ middleware/
│  │   └─ authMiddleware.js
│  ├─ models/              # Mongoose models (User, Snippet)
│  ├─ routes/
│  │   ├─ authRoutes.js
│  │   ├─ snippetRoutes.js
│  │   └─ userRoutes.js
│  ├─ .env                 # Environment variables (not committed)
│  ├─ .env.example
│  ├─ server.js            # Entry point
│  └─ package.json
│
├─ frontend/                # React + Vite app
│  ├─ src/
│  │   ├─ components/      # Reusable UI components
│  │   ├─ pages/           # Page components (Login, Register, Dashboard, SnippetView …)
│  │   ├─ services/        # Axios instance & API calls
│  │   ├─ context/         # React context (auth, snippets)
│  │   ├─ hooks/           # Custom hooks
│  │   ├─ main.jsx         # App bootstrap
│  │   └─ App.jsx
│  ├─ index.html
│  ├─ package.json
│  └─ vite.config.js
│
└─ README.md               # This file
```

---

## Getting Started

### Prerequisites
* Node.js ≥ 18
* MongoDB instance (local or Atlas)

### 1. Clone & install
```bash
git clone <repo-url>
cd R2C
# Backend
cd backend
npm install
# Frontend
cd ../frontend
npm install
```

### 2. Environment variables
Create a **`.env`** file in `backend/` (copy from `.env.example`):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/r2c
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
```

Frontend uses Vite’s import.meta.env – no extra file needed (API base URL defaults to `http://localhost:5000/api`).

### 3. Run development servers
```bash
# Terminal 1 – backend
cd backend
npm run dev        # uses nodemon

# Terminal 2 – frontend
cd frontend
npm run dev        # Vite dev server on http://localhost:5173
```

The front‑end proxies `/api` requests to the back‑end (configured in `vite.config.js`).

---

## Available Scripts
| Folder | Command | Description |
|--------|---------|-------------|
| backend | `npm run dev` | Start Express with Nodemon |
| backend | `npm start`   | Production start (`node server.js`) |
| frontend | `npm run dev` | Vite dev server |
| frontend | `npm run build` | Production build (`dist/`) |
| frontend | `npm run preview` | Preview production build |
| frontend | `npm run lint` | ESLint check |

---

## API Endpoints (prefixed with `/api`)

### Health Check
| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Service health status (no auth) |
| GET | `/api/health` | Service health status under API prefix (no auth) |

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login – returns JWT |

### User (protected)
| Method | Path | Description |
|--------|------|-------------|
| PUT | `/user/profile` | Update profile |
| GET | `/user/dashboard` | Dashboard data |

### Snippets
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/snippets` | optional | List all public snippets |
| GET | `/snippets/my-snippets` | ✔ | Current user’s snippets |
| GET | `/snippets/search` | ✔ | Search snippets (query `q`) |
| GET | `/snippets/search2` | optional | Public search endpoint |
| POST | `/snippets` | ✔ | Create snippet |
| GET | `/snippets/:id` | ✔ | Get single snippet |
| PUT | `/snippets/:id` | ✔ | Update snippet |
| DELETE | `/snippets/:id` | ✔ | Delete snippet |

All protected routes require `Authorization: Bearer <token>` header.

---

## Deployment Tips
1. **Build frontend**: `npm run build` → serves static files from `frontend/dist`.
2. **Serve static files** from Express (add `app.use(express.static(path.join(__dirname, '../frontend/dist')));` and fallback to `index.html`).
3. Set production `MONGO_URI`, `JWT_SECRET`, and `PORT` in the hosting environment.
4. Use a process manager (PM2, systemd) for the Node server.
5. Enable HTTPS and configure CORS for your domain.

---

## Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feat/awesome`).
3. Commit changes (`git commit -m "Add awesome feature"`).
4. Push and open a Pull Request.

---

## License
ISC – feel free to use and modify.